import React, { useEffect } from "react";
import { drawPolygonCanvas } from "../functions/drawPolygons";

const KaleidoscopeCanvas = ({ srcImg, frameNumber, settings }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !srcImg) return;

    const { numSegments, useSplitSegments, polyHeight, heightFrac } = settings;

    const screenCanvas = canvasRef.current;
    const kaleidCanvas = drawPolygonCanvas(
      srcImg,
      numSegments,
      useSplitSegments,
      heightFrac
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

  let style = {
    display: "block",
    position: "fixed",
    zIndex: -1,
    left: settings.xOffset + "px",
    top: settings.yOffset + "px",
  };

  return (
    <div style={style}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default KaleidoscopeCanvas;
