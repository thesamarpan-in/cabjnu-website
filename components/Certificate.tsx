'use client';

import { useRef } from 'react';

const CLAY = '#D95D39';
const GOLD = '#C5A059';
const INK = '#1C1C1C';
const MUTED = '#666666';
const CREAM = '#FDFBF7';

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

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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

  // Simple hand-drawn laurel leaf motif — one side, mirrored for the other.
  function drawLaurelSprig(ctx: CanvasRenderingContext2D, x: number, y: number, mirror: boolean) {
    const dir = mirror ? -1 : 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1);
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(40, -10, 70, -55);
    ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const lx = 70 * t;
      const ly = -55 * t * t * 1.1 - 2;
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(-0.6 - t * 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = GOLD;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1400;
    const H = 990;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, W, H);

    // Faint corner-to-corner radial tint for depth
    const grad = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W / 1.2);
    grad.addColorStop(0, 'rgba(217,93,57,0)');
    grad.addColorStop(1, 'rgba(197,160,89,0.06)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Outer thin gold border, inner thicker clay border
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, W - 56, H - 56);
    ctx.strokeStyle = CLAY;
    ctx.lineWidth = 4;
    ctx.strokeRect(46, 46, W - 92, H - 92);

    // Corner flourishes (small quarter-arc accents)
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    const cOff = 46;
    const cLen = 34;
    [[cOff, cOff, 1, 1], [W - cOff, cOff, -1, 1], [cOff, H - cOff, 1, -1], [W - cOff, H - cOff, -1, -1]].forEach(
      ([cx, cy, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + cLen * (sy as number));
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + cLen * (sx as number), cy);
        ctx.stroke();
      }
    );

    ctx.textAlign = 'center';

    // Laurel emblem with center circle at top
    const emblemY = 128;
    drawLaurelSprig(ctx, W / 2 - 14, emblemY + 14, false);
    drawLaurelSprig(ctx, W / 2 + 14, emblemY + 14, true);
    ctx.beginPath();
    ctx.arc(W / 2, emblemY, 26, 0, Math.PI * 2);
    ctx.strokeStyle = CLAY;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = CLAY;
    ctx.font = '22px Georgia';
    ctx.fillText('✿', W / 2, emblemY + 8);

    // Eyebrow
    ctx.fillStyle = CLAY;
    ctx.font = 'bold 15px Georgia';
    ctx.save();
    ctx.letterSpacing = '4px';
    ctx.fillText('CENTRE FOR AYURVEDA BIOLOGY  ·  JNU', W / 2, 210);
    ctx.restore();

    // Title
    ctx.fillStyle = INK;
    ctx.font = 'italic 52px Georgia';
    ctx.fillText('Certificate of Participation', W / 2, 280);

    // Gold rule under title
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 90, 305);
    ctx.lineTo(W / 2 + 90, 305);
    ctx.stroke();

    ctx.fillStyle = MUTED;
    ctx.font = '20px Georgia';
    ctx.fillText('This certifies that', W / 2, 365);

    // Name — the centerpiece
    ctx.fillStyle = CLAY;
    ctx.font = 'bold 58px Georgia';
    ctx.fillText(name || 'Participant', W / 2, 440);
    // underline flourish beneath name
    const nameWidth = ctx.measureText(name || 'Participant').width;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nameWidth / 2 - 10, 458);
    ctx.lineTo(W / 2 + nameWidth / 2 + 10, 458);
    ctx.stroke();

    ctx.fillStyle = INK;
    ctx.font = '21px Georgia';
    const lines = wrapText(
      ctx,
      `has completed the "${subtitle}" quiz with a score of ${score} out of ${total}.`,
      W - 380
    );
    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, 510 + i * 32);
    });

    // Score badge (circular, gold ring)
    const badgeY = 620;
    ctx.beginPath();
    ctx.arc(W / 2, badgeY, 46, 0, Math.PI * 2);
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = CLAY;
    ctx.font = 'bold 30px Georgia';
    ctx.fillText(`${score}/${total}`, W / 2, badgeY + 10);

    // Date
    ctx.font = '17px Georgia';
    ctx.fillStyle = MUTED;
    ctx.fillText(
      new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      W / 2,
      H - 110
    );

    // Bottom ornament
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 140, H - 90);
    ctx.lineTo(W / 2 - 20, H - 90);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W / 2 + 20, H - 90);
    ctx.lineTo(W / 2 + 140, H - 90);
    ctx.stroke();
    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.arc(W / 2, H - 90, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'italic 15px Georgia';
    ctx.fillStyle = MUTED;
    ctx.fillText('Auto-generated — not an official academic credential', W / 2, H - 60);
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
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      <button
        onClick={download}
        className="font-body text-sm bg-ink hover:bg-clay text-white px-6 py-2.5 rounded-sm transition-colors"
      >
        Download Certificate
      </button>
      <p className="font-body text-xs text-ink/50 mt-2">
        Auto-generated — not an official academic credential.
      </p>
    </div>
  );
}
