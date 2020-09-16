import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TiledKaleidoscopeCanvas from "../kaleidoscopeCanvas/TiledKaleidoscopeCanvas";
import {
  createTriangleCanvas,
  drawPolygonCanvas,
  getTriangleData,
} from "../functions/drawPolygons";

const AnimatedKaleidoscope = ({ srcImg, frameNumber, settings }) => {
  const srcCanvasRef = React.useRef(null);
  const triCanvasRef = React.useRef(null);
  const polyCanvasRef = React.useRef(null);
  const [kaleidCanvas, setKaleidCanvas] = useState(null);

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

    setKaleidCanvas(polyCanvas);

    drawPolyCanvasToScreen(polyCanvas, polyCanvasRef.current);
  }, [srcImg, frameNumber, settings]);

  return (
    <>
      <Holder>
        <CanvasHolder>
          <canvas ref={srcCanvasRef} style={{ flex: 2 }} />
        </CanvasHolder>
        <CanvasHolder>
          <canvas ref={triCanvasRef} />
        </CanvasHolder>
        <CanvasHolder>
          <canvas ref={polyCanvasRef} />
        </CanvasHolder>
      </Holder>
      <TiledCanvasHolder>
        <TiledKaleidoscopeCanvas
          kaleidCanvas={kaleidCanvas}
          frameNumber={frameNumber}
          settings={settings}
        />
      </TiledCanvasHolder>
    </>
  );
};

export default AnimatedKaleidoscope;

const Holder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-height: 300px;
`;

const TiledCanvasHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */

  canvas {
    display: block;
    max-width: 100%;
  }
`;

const CanvasHolder = styled.div`
  max-height: 300px;

  canvas {
    display: block;
    max-width: 100%;
    max-height: 100%;
    max-height: 300px;
  }
`;

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
