export function drawSun(ctx, W, frame) {
  const sx = W - 58, sy = 52, sr = 26;
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(frame * 0.008);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (sr + 4),  Math.sin(a) * (sr + 4));
    ctx.lineTo(Math.cos(a) * (sr + 14), Math.sin(a) * (sr + 14));
    ctx.strokeStyle = 'rgba(255,220,50,0.7)';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  ctx.restore();
  const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, sr);
  g.addColorStop(0, '#fff176');
  g.addColorStop(1, '#ffd600');
  ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.shadowColor = 'rgba(255,200,0,0.6)'; ctx.shadowBlur = 16;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('🌞', sx, sy);
}
