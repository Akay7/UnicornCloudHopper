export function drawUnicorn(ctx, x, y, angle, flicker, frame, onCloud, isPlaying) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const alpha = (flicker && Math.floor(Date.now() / 80) % 2 === 0) ? 0.3 : 1;
  ctx.globalAlpha = alpha;

  const t = frame * 0.15;
  const S = 1.7;

  ctx.save();
  ctx.scale(S, S);

  function fill(color) { ctx.fillStyle = color; ctx.strokeStyle = '#c084e8'; ctx.lineWidth = 1 / S; }
  function stroke(color, w) { ctx.strokeStyle = color; ctx.lineWidth = w / S; }

  // ── Tail ──
  const tailWag = Math.sin(t * 0.7) * 8;
  const tailCols = ['#c77dff', '#4d96ff', '#6bcb77', '#ffd93d', '#ff6b6b'];
  const tailStrands = [
    { cp1x: -22, cp1y: -2, cp2x: -38 + tailWag * 0.4, cp2y: 10,  ex: -36 + tailWag,       ey: 28 },
    { cp1x: -22, cp1y:  2, cp2x: -36 + tailWag * 0.3, cp2y: 16,  ex: -34 + tailWag * 0.8, ey: 32 },
    { cp1x: -20, cp1y:  6, cp2x: -32 + tailWag * 0.2, cp2y: 20,  ex: -30 + tailWag * 0.5, ey: 34 },
  ];
  for (const strand of tailStrands) {
    for (let i = 0; i < 5; i++) {
      stroke(tailCols[i], 4 - i * 0.4);
      ctx.beginPath();
      ctx.moveTo(-13 + i * 0.5, 4);
      ctx.bezierCurveTo(
        strand.cp1x + i * 0.3, strand.cp1y,
        strand.cp2x + i * 0.3, strand.cp2y,
        strand.ex   + i * 0.3, strand.ey
      );
      ctx.stroke();
    }
  }

  const flying = !onCloud;
  const flyFrontAngle = -1.31;
  const frontSwing = Math.sin(t) * 0.35;
  const backSwing  = Math.sin(t + Math.PI) * 0.35;

  // Draws a leg at (lx, ly) with given angle.
  // mirror=true flips horizontally so it points the opposite direction (back leg).
  function drawLeg(lx, ly, ang, near, mirror = false) {
    fill(near ? '#eec8ff' : '#ddb8ee');
    ctx.save();
    ctx.translate(lx, ly);
    if (mirror) ctx.scale(-1, 1);
    ctx.rotate(ang);
    ctx.beginPath(); ctx.roundRect(-3, 0, 6, 12, 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  // ── Far legs (behind body) ──
  // far front: hip x=8, points forward
  drawLeg( 8, 11, flying ? flyFrontAngle : -frontSwing, false, false);
  // far back: mirrored front, hip at x=-8
  drawLeg(-8, 11, flying ? flyFrontAngle :  backSwing,  false, true);

  // ── Body ──
  fill('#f5d6ff');
  ctx.beginPath();
  ctx.ellipse(0, 2, 18, 11, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // ── Neck ──
  fill('#f5d6ff');
  ctx.beginPath();
  ctx.moveTo(10, -2);
  ctx.bezierCurveTo(12, -10, 16, -14, 14, -16);
  ctx.bezierCurveTo(20, -15, 22, -10, 20, -3);
  ctx.bezierCurveTo(18, 0, 14, 2, 10, 2);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // ── Ear ──
  ctx.fillStyle = '#f0b8ff'; ctx.strokeStyle = '#c084e8'; ctx.lineWidth = 0.8 / S;
  ctx.beginPath();
  ctx.moveTo(13, -14); ctx.lineTo(11, -20); ctx.lineTo(17, -14);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  // ── Horn ──
  ctx.fillStyle = '#ffd700'; ctx.strokeStyle = '#d4a000'; ctx.lineWidth = 0.8 / S;
  ctx.beginPath();
  ctx.moveTo(17, -17); ctx.lineTo(14, -9); ctx.lineTo(20, -9);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  stroke('#fff8aa', 0.8);
  ctx.beginPath(); ctx.moveTo(16, -16); ctx.lineTo(15, -11); ctx.stroke();

  // ── Head ──
  fill('#f5d6ff');
  ctx.beginPath(); ctx.ellipse(19, -10, 9, 7, -0.15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // Snout
  fill('#f0c8ff');
  ctx.beginPath(); ctx.ellipse(25, -8, 5, 4, 0.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // Nostril
  ctx.fillStyle = '#d090e0';
  ctx.beginPath(); ctx.ellipse(27, -7, 1.2, 0.8, 0.3, 0, Math.PI * 2); ctx.fill();

  // Smile
  stroke('#b060d0', 1.2);
  ctx.beginPath(); ctx.arc(25, -6.5, 2.5, 0.2, Math.PI * 0.85); ctx.stroke();

  // ── Eye ──
  ctx.fillStyle = '#4a1a80';
  ctx.beginPath(); ctx.arc(21, -11, 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(22, -12, 0.8, 0, Math.PI * 2); ctx.fill();
  stroke('#4a1a80', 0.8);
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(21 + i * 1.2, -13); ctx.lineTo(21 + i * 1.5, -15);
    ctx.stroke();
  }

  // ── Mane ──
  const maneCols = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff'];
  for (let i = 0; i < 5; i++) {
    stroke(maneCols[i], 2.5);
    ctx.beginPath();
    ctx.moveTo(14 - i * 0.5, -15);
    ctx.bezierCurveTo(10 - i, -10 + i, 12 - i, -4 + i, 10 - i * 0.5, 0);
    ctx.stroke();
  }

  // ── Near legs (in front of body) ──
  // near front: hip x=12, points forward
  drawLeg(12, 11, flying ? flyFrontAngle :  frontSwing, true, false);
  // near back: mirrored front, hip at x=-12
  drawLeg(-12, 11, flying ? flyFrontAngle : -backSwing,  true, true);

  ctx.restore(); // scale

  // ── Particle trail ──
  if (isPlaying) {
    const cols = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff'];
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(-28 - i * 7, 4 + (i % 2) * 4, 3 - i * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = cols[i];
      ctx.globalAlpha = alpha * (0.7 - i * 0.12);
      ctx.fill();
    }
    ctx.globalAlpha = alpha;
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}
