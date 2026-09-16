export type Faculty = {
  slug: string;
  name: string;
  designation: string;
  researchArea: string; // should match a slug in research-areas.ts
  bio: string;
  scholarUrl?: string;
};

// Deliberately empty. Do not fill this with placeholder or invented names —
// a public academic site with fabricated faculty entries is worse than an
// honest "not yet published" state. Add real entries only after each
// faculty member has confirmed their own bio and links. Shape to follow:
//
// {
//   slug: 'jane-doe',
//   name: 'Dr. Jane Doe',
//   designation: 'Associate Professor',
//   researchArea: 'molecular-ayurveda',
//   bio: 'One or two confirmed sentences from the faculty member themself.',
//   scholarUrl: 'https://scholar.google.com/citations?user=...',
// },
export const faculty: Faculty[] = [];
