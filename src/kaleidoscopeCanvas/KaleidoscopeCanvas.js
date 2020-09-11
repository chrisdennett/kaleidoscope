import React, { useEffect } from "react";
import { drawPolygonCanvas } from "../functions/drawPolygons";

const KaleidoscopeCanvas = ({ srcImg, frameNumber }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !srcImg) return;

    const numSegments = 6;
    const useSplitSegments = false;

    const screenCanvas = canvasRef.current;
    const kaleidCanvas = drawPolygonCanvas(
      srcImg,
      numSegments,
      useSplitSegments
    );

    screenCanvas.width = kaleidCanvas.width;
    screenCanvas.height = kaleidCanvas.height;

    const ctx = screenCanvas.getContext("2d");
    ctx.drawImage(kaleidCanvas, 0, 0);
  }, [srcImg, frameNumber]);

  return (
    <div>
      <h1>KaleidoscopeCanvas</h1>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default KaleidoscopeCanvas;
