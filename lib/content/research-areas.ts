export type ResearchArea = {
  slug: string;
  name: string;
  description: string;
};

// Edit this file to change what appears on the homepage and
// /research-areas — no other file needs to change.
export const researchAreas: ResearchArea[] = [
  {
    slug: 'medicinal-plant-biology',
    name: 'Medicinal Plant Biology',
    description:
      'Taxonomy, cultivation, and biology of medicinally significant plant species.',
  },
  {
    slug: 'molecular-ayurveda',
    name: 'Molecular Ayurveda',
    description:
      'Mapping classical Ayurvedic concepts (rasa, guna, virya, vipaka) against measurable molecular and physiological effects.',
  },
  {
    slug: 'natural-product-discovery',
    name: 'Natural Product Discovery',
    description:
      'Isolation and characterization of bioactive phytochemicals from traditional plant sources.',
  },
  {
    slug: 'ayurveda-microbiology',
    name: 'Ayurveda and Microbiology',
    description:
      'Antimicrobial and antimicrobial-resistance-related activity of plant-derived compounds.',
  },
  {
    slug: 'yoga-neuroscience',
    name: 'Yoga and Neuroscience',
    description:
      'Physiological and neuroendocrine research on yogic and meditative practice.',
  },
  {
    slug: 'integrative-medicine',
    name: 'Integrative Medicine',
    description:
      'Combining Ayurvedic and biomedical frameworks in disease management research.',
  },
  {
    slug: 'computational-ayurveda',
    name: 'Computational Ayurveda',
    description:
      'Bioinformatics and computational approaches to plant-compound-target relationships.',
  },
];
