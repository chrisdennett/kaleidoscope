import React, { useEffect } from "react";
import { createTriangleCanvas } from "../functions/drawPolygons";
import KaleidoscopeCanvas from "./KaleidoscopeCanvas";

const AnimatedKaleidoscope = ({ srcImg, frameNumber, settings }) => {
  const srcCanvasRef = React.useRef(null);
  const triCanvasRef = React.useRef(null);

  useEffect(() => {
    if (!srcCanvasRef || !srcCanvasRef.current || !srcImg) return;

    const screenCanvas = srcCanvasRef.current;

    screenCanvas.width = srcImg.width;
    screenCanvas.height = srcImg.height;

    const ctx = screenCanvas.getContext("2d");
    ctx.drawImage(srcImg, 0, 0);
  }, [srcImg, frameNumber, settings]);

  useEffect(() => {
    if (!triCanvasRef || !triCanvasRef.current || !srcImg) return;

    const { numSegments, useSplitSegments, heightFrac } = settings;

    const screenCanvas = triCanvasRef.current;
    const triCanvas = createTriangleCanvas(
      srcImg,
      numSegments,
      useSplitSegments,
      heightFrac
    );

    screenCanvas.width = triCanvas.width;
    screenCanvas.height = triCanvas.height;

    const ctx = screenCanvas.getContext("2d");
    ctx.drawImage(triCanvas, 0, 0);
  }, [srcImg, frameNumber, settings]);

  return (
    <div>
      <h1>AnimatedKaleidoscope</h1>
      <canvas ref={srcCanvasRef} />
      <canvas ref={triCanvasRef} />
      <KaleidoscopeCanvas
        srcImg={srcImg}
        frameNumber={frameNumber}
        settings={settings}
      />
    </div>
  );
};

export default AnimatedKaleidoscope;
