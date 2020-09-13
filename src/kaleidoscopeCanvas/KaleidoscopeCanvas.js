import React, { useEffect } from "react";
import { drawPolygonCanvas } from "../functions/drawPolygons";

const KaleidoscopeCanvas = ({ srcImg, frameNumber, settings }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !srcImg) return;

    const { numSegments, useSplitSegments, polyHeight } = settings;

    const screenCanvas = canvasRef.current;
    const kaleidCanvas = drawPolygonCanvas(
      srcImg,
      numSegments,
      useSplitSegments
    );

    const heightToWidthRatio = kaleidCanvas.width / kaleidCanvas.height;
    const polyWidth = polyHeight * heightToWidthRatio;

    screenCanvas.width = polyWidth;
    screenCanvas.height = polyHeight;

    const ctx = screenCanvas.getContext("2d");
    ctx.drawImage(
      kaleidCanvas,
      0,
      0,
      kaleidCanvas.width,
      kaleidCanvas.height,
      0,
      0,
      screenCanvas.width,
      screenCanvas.height
    );
  }, [srcImg, frameNumber, settings]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default KaleidoscopeCanvas;
