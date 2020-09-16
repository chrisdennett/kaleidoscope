export function drawTriangleCanvas(img, bounds) {
  const outCanvas = document.createElement("canvas");
  const halfTriWidth = bounds.w / 2;

  // added size buffer to avoid gaps between triangles
  const buffer = 2;

  outCanvas.width = Math.ceil(bounds.w + buffer);
  outCanvas.height = bounds.h;

  // draw clip path
  const ctx = outCanvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(bounds.w + buffer, 0);
  ctx.lineTo(halfTriWidth + buffer, bounds.h);
  ctx.lineTo(halfTriWidth, bounds.h);
  ctx.clip();

  ctx.drawImage(
    img,
    bounds.x,
    bounds.y,
    bounds.w,
    bounds.h,
    0,
    0,
    bounds.w,
    bounds.h
  );

  return outCanvas;
}

export function drawSplitTriangleCanvas(img, bounds) {
  const { x, y, w, h } = bounds;

  const halfCanvas = document.createElement("canvas");
  const outCanvas = document.createElement("canvas");

  // added size buffer to avoid gaps between triangles
  const buffer = 2;
  const doubleW = w * 2;

  halfCanvas.width = Math.ceil(w + buffer);
  halfCanvas.height = h;
  outCanvas.width = Math.ceil(doubleW + buffer);
  outCanvas.height = h;

  const ctx = halfCanvas.getContext("2d");
  ctx.beginPath();
  ctx.save();
  ctx.moveTo(0, 0);
  ctx.lineTo(w + buffer, 0);
  ctx.lineTo(w + buffer, h);
  ctx.lineTo(w, h);
  ctx.clip();

  ctx.drawImage(img, x, y, img.width, img.height, 0, 0, img.width, img.height);
  ctx.restore();

  const outCtx = outCanvas.getContext("2d");
  outCtx.drawImage(halfCanvas, 0, 0);
  outCtx.scale(-1, 1);
  outCtx.drawImage(halfCanvas, -(doubleW + buffer), 0);

  return outCanvas;
}
