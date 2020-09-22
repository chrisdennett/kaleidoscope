export function drawTriangleCanvas(img, bounds, outHeightFrac) {
  const triCanvas = document.createElement("canvas");

  const halfTriWidth = bounds.w / 2;

  // added size buffer to avoid gaps between triangles
  const buffer = 2;

  triCanvas.width = Math.ceil(bounds.w + buffer);
  triCanvas.height = bounds.h;

  // draw clip path
  const ctx = triCanvas.getContext("2d");

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

  const outCanvas = document.createElement("canvas");
  const outCtx = outCanvas.getContext("2d");
  const outWidth = triCanvas.width * outHeightFrac;
  const outHeight = triCanvas.height * outHeightFrac;

  outCanvas.width = outWidth;
  outCanvas.height = outHeight;
  outCtx.drawImage(
    triCanvas,
    0,
    0,
    triCanvas.width,
    triCanvas.height,
    0,
    0,
    outWidth,
    outHeight
  );

  return outCanvas;
}

export function drawSplitTriangleCanvas(img, bounds, outHeightFrac) {
  const { x, y, w, h } = bounds;

  const halfCanvas = document.createElement("canvas");
  const doubleCanvas = document.createElement("canvas");
  const outCanvas = document.createElement("canvas");

  // added size buffer to avoid gaps between triangles
  const buffer = 2;
  const doubleW = w * 2;

  halfCanvas.width = Math.ceil(w + buffer);
  halfCanvas.height = h;
  doubleCanvas.width = Math.ceil(doubleW + buffer);
  doubleCanvas.height = h;

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

  const doubledCtx = doubleCanvas.getContext("2d");
  doubledCtx.drawImage(halfCanvas, 0, 0);
  doubledCtx.scale(-1, 1);
  doubledCtx.drawImage(halfCanvas, -(doubleW + buffer), 0);

  const outCtx = outCanvas.getContext("2d");
  const outWidth = doubleCanvas.width * outHeightFrac;
  const outHeight = doubleCanvas.height * outHeightFrac;

  outCanvas.width = outWidth;
  outCanvas.height = outHeight;
  outCtx.drawImage(
    doubleCanvas,
    0,
    0,
    doubleCanvas.width,
    doubleCanvas.height,
    0,
    0,
    outWidth,
    outHeight
  );

  return outCanvas;
}
