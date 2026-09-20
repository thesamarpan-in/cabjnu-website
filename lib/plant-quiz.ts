import { plants, type Plant } from './content/plants';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function distractors(field: keyof Plant, exclude: string, count: number): string[] {
  const pool = plants
    .map((p) => String(p[field]))
    .filter((v) => v !== exclude);
  return shuffle(Array.from(new Set(pool))).slice(0, count);
}

export function buildPlantQuiz(plant: Plant) {
  const familyOptions = shuffle([
    plant.family,
    ...distractors('family', plant.family, 3),
  ]);
  const nameOptions = shuffle([
    plant.commonName,
    ...distractors('commonName', plant.commonName, 3),
  ]);
  const locationOptions = shuffle([
    plant.location,
    ...distractors('location', plant.location, 3),
  ]);

  return [
    {
      question: `What plant family does ${plant.scientificName} belong to?`,
      options: familyOptions,
      correctIndex: familyOptions.indexOf(plant.family),
    },
    {
      question: `What is the common name of ${plant.scientificName}?`,
      options: nameOptions,
      correctIndex: nameOptions.indexOf(plant.commonName),
    },
    {
      question: `Where is ${plant.scientificName} located on the JNU campus?`,
      options: locationOptions,
      correctIndex: locationOptions.indexOf(plant.location),
    },
  ];
}
