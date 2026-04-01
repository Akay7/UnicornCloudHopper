export function drawCloud(ctx, x, y, w, h, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const cx = x + w / 2, cy = y + h / 2;
  const grad = ctx.createRadialGradient(cx, cy - 4, 2, cx, cy, w * 0.6);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(1, '#dff0ff');
  ctx.fillStyle = grad;
  ctx.shadowColor = 'rgba(150,200,255,0.6)';
  ctx.shadowBlur  = 10;
  const puffs = [
    [cx,          cy,         w * 0.28],
    [cx - w*0.22, cy + h*0.1, w * 0.20],
    [cx + w*0.22, cy + h*0.1, w * 0.20],
    [cx - w*0.12, cy - h*0.2, w * 0.22],
    [cx + w*0.12, cy - h*0.18,w * 0.20],
  ];
  ctx.beginPath();
  puffs.forEach(([px, py, pr]) => ctx.arc(px, py, pr, 0, Math.PI * 2));
  ctx.fill();
  ctx.restore();
}
