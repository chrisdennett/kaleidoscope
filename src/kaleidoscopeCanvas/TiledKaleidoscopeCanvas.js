import React, { useEffect } from "react";
import { drawPolygonCanvas } from "../functions/drawPolygons";
import { drawTiledHexagonCanvas } from "../functions/drawTiledHexagons";

const TiledKaleidoscopeCanvas = ({ srcImg, frameNumber, settings }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !srcImg) return;

    const {
      numSegments,
      useSplitSegments,
      polyHeight,
      yOffset,
      xOffset,
    } = settings;

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
    const totalHeight = window.innerHeight;
    // const totalHeight = yOffset + window.innerHeight;
    const totalWidth = window.innerWidth;
    // const totalWidth = xOffset + window.innerWidth;

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

    // eslint-disable-next-line
  }, [srcImg, frameNumber]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default TiledKaleidoscopeCanvas;
