'use client';

import Quiz from './Quiz';
import { plants } from '@/lib/content/plants';
import { researchAreas } from '@/lib/content/research-areas';

export default function HomeQuiz() {
  const questions = [
    {
      question: 'Which university hosts the Centre for Ayurveda Biology?',
      options: ['Jawaharlal Nehru University', 'Delhi University', 'BHU', 'IIT Delhi'],
      correctIndex: 0,
    },
    {
      question: `How many medicinal plants are currently documented in the Atlas?`,
      options: shuffleOnce([
        String(plants.length),
        String(plants.length + 5),
        String(plants.length - 3 > 0 ? plants.length - 3 : plants.length + 10),
        String(plants.length + 15),
      ]),
      correctIndex: 0, // fixed below after shuffle
    },
    {
      question: `How many research areas does the Centre focus on?`,
      options: shuffleOnce([
        String(researchAreas.length),
        String(researchAreas.length + 2),
        String(researchAreas.length - 2 > 0 ? researchAreas.length - 2 : researchAreas.length + 4),
        String(researchAreas.length + 5),
      ]),
      correctIndex: 0,
    },
  ];

  // Fix correctIndex to point at the actual value after shuffling above.
  questions[1].correctIndex = questions[1].options.indexOf(String(plants.length));
  questions[2].correctIndex = questions[2].options.indexOf(String(researchAreas.length));

  return (
    <Quiz
      title="How well do you know CAB-JNU?"
      questions={questions}
      certificateSubtitle="Centre for Ayurveda Biology — General Quiz"
    />
  );
}

function shuffleOnce<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
