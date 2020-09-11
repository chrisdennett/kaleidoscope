import React from "react";
import { drawPolygonCanvas } from "./functions/drawPolygons";
import { drawTiledHexagonCanvas } from "./functions/drawTiledHexagons";

const TiledKaleidoscopeCanvas = ({ srcImg, frameNumber }) => {
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

    screenCanvas.width = window.innerWidth;
    screenCanvas.height = window.innerHeight;

    const rectCanvas = drawTiledHexagonCanvas(kaleidCanvas, polyHeight);
    // tile
    const totalHeight = yOffset + window.innerHeight;
    const totalWidth = xOffset + window.innerWidth;

    const ctx = screenCanvas.getContext("2d");
    const cols = Math.ceil(totalWidth / rectCanvas.width);
    const rows = Math.ceil(totalHeight / rectCanvas.height);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        ctx.drawImage(
          rectCanvas,
          c * rectCanvas.width - 2 - xOffset,
          r * rectCanvas.height - 2 - yOffset
        );
      }
    }
  }, [srcImg, frameNumber]);

  return (
    <div>
      <h1>KaleidoscopeCanvas</h1>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default TiledKaleidoscopeCanvas;
