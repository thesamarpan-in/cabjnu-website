# Apps Script backend — Quiz Results + Moderated Comments

One Apps Script Web App handles both features (matches the pattern
already used elsewhere on Samarpan's site — one endpoint, routed by
payload shape). Deploy once, use the same URL for both.

## Setup

1. Create a new Google Sheet (e.g. "CAB-JNU Data"). Add two tabs:
   - `QuizResults` — columns: `Timestamp | Name | Quiz | Score | Total`
   - `Comments` — columns: `Timestamp | Name | Comment | Status`
2. Extensions -> Apps Script. Delete the placeholder code and paste
   `Code.gs` (below).
3. Deploy -> New deployment -> type "Web app" -> Execute as "Me" ->
   Who has access "Anyone" -> Deploy. Authorize when prompted.
4. Copy the deployment URL (ends in `/exec`).
5. In the website repo: GitHub Settings -> Secrets -> add two secrets
   (both can be the SAME url):
   - `NEXT_PUBLIC_QUIZ_RESULTS_ENDPOINT`
   - `NEXT_PUBLIC_COMMENTS_ENDPOINT`
6. Also add both to `.env.local` for local testing.
7. Update the GitHub Actions build step (`.github/workflows/deploy.yml`)
   to pass these two env vars through — see the note at the bottom of
   this file.

## Moderating comments

Open the `Comments` sheet. New submissions land with `Status` = `pending`
and are NOT shown on the site. To publish one, change its `Status` cell
to exactly `approved` (lowercase). The site re-checks the sheet on every
page load — no redeploy needed.

## Code.gs

```javascript
const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE'; // from the sheet's URL

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(SHEET_ID);

  if (data.quizTitle !== undefined) {
    // Quiz result submission
    const sheet = ss.getSheetByName('QuizResults');
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.quizTitle || '',
      data.score,
      data.total,
    ]);
  } else if (data.action === 'submit') {
    // Comment submission — always lands as pending
    const sheet = ss.getSheetByName('Comments');
    sheet.appendRow([new Date(), data.name || '', data.comment || '', 'pending']);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (e.parameter.action === 'list') {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Comments');
    const rows = sheet.getDataRange().getValues();
    // rows[0] is the header row: Timestamp | Name | Comment | Status
    const approved = rows
      .slice(1)
      .filter((r) => String(r[3]).trim().toLowerCase() === 'approved')
      .map((r) => ({
        date: r[0],
        name: r[1],
        comment: r[2],
      }));
    return ContentService.createTextOutput(
      JSON.stringify(approved)
    ).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(
    JSON.stringify({ error: 'unknown action' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## Wiring the env vars into the build

Add these two lines to the `env:` block of the "Build (static export)"
step in `.github/workflows/deploy.yml`, alongside the existing
Supabase/sheet variables:

```yaml
NEXT_PUBLIC_QUIZ_RESULTS_ENDPOINT: ${{ secrets.NEXT_PUBLIC_QUIZ_RESULTS_ENDPOINT }}
NEXT_PUBLIC_COMMENTS_ENDPOINT: ${{ secrets.NEXT_PUBLIC_COMMENTS_ENDPOINT }}
```

Until these are set, the quiz still works (score + certificate), it
just doesn't log to a sheet — and the comments section shows "isn't
connected yet" instead of breaking. Nothing depends on this being set
up immediately.
