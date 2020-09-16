import React, { useEffect } from "react";
import {
  createTriangleCanvas,
  drawPolygonCanvas,
  getTriangleData,
} from "../functions/drawPolygons";

const AnimatedKaleidoscope = ({ srcImg, frameNumber, settings }) => {
  const srcCanvasRef = React.useRef(null);
  const triCanvasRef = React.useRef(null);
  const polyCanvasRef = React.useRef(null);

  useEffect(() => {
    if (
      !srcCanvasRef ||
      !srcCanvasRef.current ||
      !triCanvasRef ||
      !triCanvasRef.current ||
      !srcImg
    )
      return;

    const { numSegments, useSplitSegments } = settings;
    const triangleData = getTriangleData(srcImg, settings);
    // source canvas showing orig image
    drawSrcCanvasToScreen(srcImg, srcCanvasRef.current, triangleData);
    // triangle canvas showing just the triangle
    const triCanvas = createTriangleCanvas(
      srcImg,
      useSplitSegments,
      triangleData
    );
    drawTriangleCanvasToScreen(triCanvas, triCanvasRef.current, triangleData);
    // full polygon canvas
    const polyCanvas = drawPolygonCanvas(
      triCanvas,
      triangleData.height,
      triangleData.sideLength,
      numSegments
    );
    drawPolyCanvasToScreen(polyCanvas, polyCanvasRef.current);
  }, [srcImg, frameNumber, settings]);

  return (
    <div>
      <canvas ref={srcCanvasRef} />
      <canvas ref={triCanvasRef} />
      <canvas ref={polyCanvasRef} />
    </div>
  );
};

export default AnimatedKaleidoscope;

const drawSrcCanvasToScreen = (srcImg, screenCanvas, triangleData) => {
  screenCanvas.width = srcImg.width;
  screenCanvas.height = srcImg.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(srcImg, 0, 0);

  // draw triangle
  const { points } = triangleData;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.lineTo(points[0].x, points[0].y);
  ctx.strokeStyle = "rgb(255,0,0)";
  ctx.lineWidth = 4;
  ctx.stroke();
};

const drawTriangleCanvasToScreen = (triCanvas, screenCanvas) => {
  screenCanvas.width = triCanvas.width;
  screenCanvas.height = triCanvas.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(triCanvas, 0, 0);
};

const drawPolyCanvasToScreen = (polyCanvas, screenCanvas) => {
  screenCanvas.width = polyCanvas.width;
  screenCanvas.height = polyCanvas.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(polyCanvas, 0, 0);
};
