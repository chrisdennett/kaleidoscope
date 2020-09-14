import { drawSplitTriangleCanvas, drawTriangleCanvas } from "./drawTriangles";

export const getTriangleData = (img, numSegments, heightFrac) => {
  const height = img.height * heightFrac;
  const halfSideLength = height * Math.tan(Math.PI / numSegments);
  const sideLength = halfSideLength * 2;

  const x1 = 0;
  const y1 = 0;
  const x2 = x1 + sideLength;
  const y2 = y1;
  const x3 = x1 + halfSideLength;
  const y3 = y1 + height;

  return {
    height,
    sideLength,
    points: [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
    ],
  };
};

export const createTriangleCanvas = (
  img,
  useSplitSegments,
  height,
  sideLength
) => {
  const triCanvas = useSplitSegments
    ? drawSplitTriangleCanvas(img, sideLength, height)
    : drawTriangleCanvas(img, sideLength, height);

  return triCanvas;
};

export function drawPolygonCanvas(
  triCanvas,
  segHeight,
  sideLength,
  numSegments
) {
  const outCanvas = document.createElement("canvas");

  const angle = 360 / numSegments;
  const halfSideLength = sideLength / 2;

  const ctx = outCanvas.getContext("2d");
  // if half number of segments is an odd number the pointy bits
  // will stick out the sides so need to offset by the long triangle edge
  // otherwise offset by short triangle edge
  const spokeLength = Math.sqrt(
    segHeight * segHeight + halfSideLength * halfSideLength
  );
  const halfWidth = (numSegments / 2) % 2 === 0 ? segHeight : spokeLength;
  const width = halfWidth * 2;

  outCanvas.width = width;
  outCanvas.height = segHeight * 2;

  for (let s = 0; s < numSegments; s++) {
    const isFlipped = s % 2 !== 0;
    drawSegment(ctx, triCanvas, s * angle, isFlipped, halfWidth);
  }

  return outCanvas;
}

// export function drawPolygonCanvas(
//   img,
//   numSegments,
//   useSplitSegments,
//   heightFrac
// ) {
//   const outCanvas = document.createElement("canvas");

//   const angle = 360 / numSegments;
//   const segHeight = img.height;
//   const halfSideLength = segHeight * Math.tan(Math.PI / numSegments);

//   const triCanvas = createTriangleCanvas(
//     img,
//     numSegments,
//     useSplitSegments,
//     heightFrac
//   );

//   const ctx = outCanvas.getContext("2d");
//   // if half number of segments is an odd number the pointy bits
//   // will stick out the sides so need to offset by the long triangle edge
//   // otherwise offset by short triangle edge
//   const spokeLength = Math.sqrt(
//     segHeight * segHeight + halfSideLength * halfSideLength
//   );
//   const halfWidth = (numSegments / 2) % 2 === 0 ? segHeight : spokeLength;
//   const width = halfWidth * 2;

//   outCanvas.width = width;
//   outCanvas.height = segHeight * 2;

//   for (let s = 0; s < numSegments; s++) {
//     const isFlipped = s % 2 !== 0;
//     drawSegment(ctx, triCanvas, s * angle, isFlipped, halfWidth);
//   }

//   return outCanvas;
// }

function drawSegment(ctx, img, rotation, flipped, centerX) {
  const x = img.width / 2;
  const y = img.height; // -1 removed slight gap between wedges
  let drawX = -x;
  const drawY = -y;

  ctx.save();
  ctx.translate(centerX, y);
  ctx.rotate(degToRad(rotation));
  if (flipped) {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(img, drawX, drawY);
  ctx.restore();
}

function degToRad(d) {
  // Converts degrees to radians
  return d * 0.01745;
}
