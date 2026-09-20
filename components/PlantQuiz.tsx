'use client';

import { useMemo } from 'react';
import Quiz from './Quiz';
import { buildPlantQuiz } from '@/lib/plant-quiz';
import type { Plant } from '@/lib/content/plants';

export default function PlantQuiz({ plant }: { plant: Plant }) {
  // Computed client-side (not at build time) so each visitor gets a
  // freshly shuffled set of distractor options, not a build-time-frozen one.
  const questions = useMemo(() => buildPlantQuiz(plant), [plant]);

  return (
    <Quiz
      title={`${plant.commonName} Quiz`}
      questions={questions}
      certificateSubtitle={plant.commonName}
    />
  );
}
