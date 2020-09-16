import React, { useEffect } from "react";
import { drawTiledHexagonCanvas } from "../functions/drawTiledHexagons";
import useWindowSize from "../hooks/useWindowResize";

const TiledKaleidoscopeCanvas = ({ kaleidCanvas, frameNumber, settings }) => {
  const canvasRef = React.useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !kaleidCanvas) return;

    const canvasHeight = window.innerHeight + 10; //kaleidCanvas.height * 2;

    const screenCanvas = canvasRef.current;
    screenCanvas.width = window.innerWidth;
    screenCanvas.height = canvasHeight;

    const rectCanvas = drawTiledHexagonCanvas(
      kaleidCanvas,
      kaleidCanvas.height
    );
    // tile
    const totalWidth = window.innerWidth;
    const totalHeight = canvasHeight;

    const ctx = screenCanvas.getContext("2d");
    const cols = Math.ceil(totalWidth / rectCanvas.width);
    const rows = Math.ceil(totalHeight / rectCanvas.height);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        ctx.drawImage(
          rectCanvas,
          c * rectCanvas.width - 2,
          r * rectCanvas.height - 2
        );
      }
    }

    // eslint-disable-next-line
  }, [kaleidCanvas, frameNumber, size]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default TiledKaleidoscopeCanvas;
