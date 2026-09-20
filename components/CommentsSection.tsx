'use client';

import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

type ApprovedComment = {
  name: string;
  comment: string;
  date: string;
};

export default function CommentsSection() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loadTime] = useState(Date.now());
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [approved, setApproved] = useState<ApprovedComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const endpoint = process.env.NEXT_PUBLIC_COMMENTS_ENDPOINT;

  useEffect(() => {
    if (!endpoint) {
      setLoadingComments(false);
      return;
    }
    fetch(`${endpoint}?action=list`)
      .then((r) => r.json())
      .then((data) => setApproved(Array.isArray(data) ? data : []))
      .catch(() => setApproved([]))
      .finally(() => setLoadingComments(false));
  }, [endpoint]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) return;
    // Basic spam guards: honeypot field + minimum time-on-form
    if (honeypot) return;
    if (Date.now() - loadTime < 1500) return;
    if (!name.trim() || !comment.trim()) return;

    setStatus('sending');
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: 'submit',
          name: name.trim(),
          comment: comment.trim(),
          date: new Date().toISOString(),
        }),
      });
      setStatus('sent');
      setName('');
      setComment('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <div className="feature-card max-w-2xl mb-8">
        <h3 className="font-display text-xl mb-2">Leave feedback</h3>
        <p className="font-body text-sm text-ink/60 mb-4">
          Comments are reviewed before appearing publicly — yours won&apos;t
          show up immediately.
        </p>
        {status === 'sent' ? (
          <p className="font-body text-sm text-clay">
            Thanks — your comment has been submitted for review.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-transparent"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your feedback or comment"
              required
              rows={3}
              className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-transparent"
            />
            {/* Honeypot — hidden from real users, bots often fill every field */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px]"
              aria-hidden="true"
            />
            <button
              type="submit"
              disabled={status === 'sending' || !endpoint}
              className="font-body text-sm bg-clay hover:bg-clay-dark disabled:opacity-40 text-white px-6 py-2.5 rounded-full transition-colors"
            >
              {status === 'sending' ? 'Sending...' : 'Submit for review'}
            </button>
            {status === 'error' && (
              <p className="font-body text-xs text-clay">
                Something went wrong — please try again.
              </p>
            )}
            {!endpoint && (
              <p className="font-body text-xs text-ink/40">
                Feedback submission isn&apos;t connected yet.
              </p>
            )}
          </form>
        )}
      </div>

      <div>
        <h3 className="font-display text-xl mb-4">Community Feedback</h3>
        {loadingComments ? (
          <p className="font-body text-sm text-ink/50">Loading...</p>
        ) : approved.length === 0 ? (
          <div className="feature-card max-w-md">
            <span className="icon-badge mb-3">
              <MessageSquare size={18} strokeWidth={1.75} />
            </span>
            <p className="font-body text-sm text-ink/60">
              No approved comments yet — be the first to share feedback.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {approved.map((c, i) => (
              <div key={i} className="feature-card">
                <p className="font-body text-sm text-ink/80">
                  &ldquo;{c.comment}&rdquo;
                </p>
                <p className="font-body text-xs text-clay mt-2">
                  — {c.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
