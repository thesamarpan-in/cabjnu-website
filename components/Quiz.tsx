'use client';

import { useState } from 'react';
import Certificate from './Certificate';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export default function Quiz({
  title,
  questions,
  certificateSubtitle,
}: {
  title: string;
  questions: QuizQuestion[];
  certificateSubtitle: string;
}) {
  const [stage, setStage] = useState<'name' | 'quiz' | 'result'>('name');
  const [name, setName] = useState('');
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle');

  const q = questions[current];

  function selectAnswer(i: number) {
    if (selected !== null) return; // lock after first pick
    setSelected(i);
    const correct = i === q.correctIndex;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        const finalScore = correct ? score + 1 : score;
        setStage('result');
        submitResult(finalScore);
      }
    }, 600);
  }

  async function submitResult(finalScore: number) {
    const endpoint = process.env.NEXT_PUBLIC_QUIZ_RESULTS_ENDPOINT;
    if (!endpoint) return; // not configured yet — quiz still works, just doesn't log
    setSubmitStatus('sending');
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name,
          quizTitle: title,
          score: finalScore,
          total: questions.length,
          date: new Date().toISOString(),
        }),
      });
      setSubmitStatus('sent');
    } catch {
      setSubmitStatus('error');
    }
  }

  if (stage === 'name') {
    return (
      <div className="feature-card max-w-md">
        <h3 className="font-display text-xl mb-2">{title}</h3>
        <p className="font-body text-sm text-ink/60 mb-4">
          Enter your name to start — you&apos;ll get a certificate at the end.
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-line rounded-lg px-4 py-2.5 text-sm mb-4 bg-transparent"
        />
        <button
          disabled={!name.trim()}
          onClick={() => setStage('quiz')}
          className="font-body text-sm bg-clay hover:bg-clay-dark disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full transition-colors"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (stage === 'quiz') {
    return (
      <div className="feature-card max-w-md">
        <p className="eyebrow mb-3">
          Question {current + 1} of {questions.length}
        </p>
        <h3 className="font-body font-bold text-ink mb-4">{q.question}</h3>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = selected !== null && i === q.correctIndex;
            const isWrongPick =
              selected === i && i !== q.correctIndex;
            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left font-body text-sm px-4 py-2.5 rounded-lg border transition-colors ${
                  isCorrect
                    ? 'border-clay bg-blush'
                    : isWrongPick
                    ? 'border-clay bg-clay/10'
                    : 'border-line hover:border-clay'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // result
  return (
    <div className="feature-card max-w-md">
      <h3 className="font-display text-xl mb-2">Quiz complete!</h3>
      <p className="font-body text-ink/80 mb-1">
        {name}, you scored{' '}
        <span className="font-bold text-clay">
          {score} / {questions.length}
        </span>
      </p>
      {submitStatus === 'error' && (
        <p className="font-body text-xs text-clay mt-2">
          Couldn&apos;t save your result right now, but your certificate
          still works below.
        </p>
      )}
      <div className="mt-5">
        <Certificate
          name={name}
          subtitle={certificateSubtitle}
          score={score}
          total={questions.length}
        />
      </div>
    </div>
  );
}
