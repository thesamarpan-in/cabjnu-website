'use client';

import { useRef } from 'react';

export default function Certificate({
  name,
  subtitle,
  score,
  total,
}: {
  name: string;
  subtitle: string;
  score: number;
  total: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1400;
    canvas.height = 990;

    // Background
    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#1C1C1C';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.strokeStyle = '#D95D39';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    ctx.textAlign = 'center';

    // Header
    ctx.fillStyle = '#D95D39';
    ctx.font = '20px Georgia';
    ctx.fillText(
      'CENTRE FOR AYURVEDA BIOLOGY · JNU',
      canvas.width / 2,
      140
    );

    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'italic 48px Georgia';
    ctx.fillText('Certificate of Participation', canvas.width / 2, 220);

    ctx.font = '22px Georgia';
    ctx.fillStyle = '#1C1C1C';
    ctx.fillText('This certifies that', canvas.width / 2, 320);

    ctx.font = 'bold 56px Georgia';
    ctx.fillStyle = '#1C1C1C';
    ctx.fillText(name || 'Participant', canvas.width / 2, 400);

    ctx.font = '22px Georgia';
    ctx.fillStyle = '#1C1C1C';
    const lines = wrapText(
      ctx,
      `has completed the "${subtitle}" quiz with a score of ${score} out of ${total}.`,
      canvas.width - 300
    );
    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, 460 + i * 34);
    });

    ctx.font = '16px Georgia';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText(
      new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      canvas.width / 2,
      canvas.height - 100
    );

    ctx.font = 'italic 16px Georgia';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText(
      'Auto-generated — not an official academic credential',
      canvas.width / 2,
      canvas.height - 70
    );
  }

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const test = line + word + ' ';
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = test;
      }
    }
    if (line) lines.push(line.trim());
    return lines;
  }

  function download() {
    draw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `certificate-${(name || 'participant').replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="hidden"
        aria-hidden="true"
      />
      <button
        onClick={download}
        className="font-body text-sm bg-ink hover:bg-clay text-white px-6 py-2.5 rounded-full transition-colors"
      >
        Download Certificate
      </button>
      <p className="font-body text-xs text-ink/50 mt-2">
        Auto-generated — not an official academic credential.
      </p>
    </div>
  );
}
