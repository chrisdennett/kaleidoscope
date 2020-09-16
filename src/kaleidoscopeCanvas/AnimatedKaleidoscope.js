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

    drawPolyCanvasToScreen(polyCanvas, polyCanvasRef.current, triangleData);
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
  justify-content: left;
  width: 100vw;
  max-height: 300px;
  margin-bottom: 10px;
`;

const TiledCanvasHolder = styled.div`
  display: flex;

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
  ctx.lineJoin = "round";
  ctx.lineWidth = 16;
  ctx.stroke();
};

const drawTriangleCanvasToScreen = (triCanvas, screenCanvas, triangleData) => {
  screenCanvas.width = triCanvas.width;
  screenCanvas.height = triCanvas.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(triCanvas, 0, 0);

  const offset = 4;
  const rightX = triangleData.useSplitSegments
    ? triCanvas.width / 2 - offset
    : triCanvas.width - offset;

  ctx.beginPath();
  ctx.moveTo(offset, offset);
  ctx.lineTo(rightX, offset);
  ctx.lineTo(triCanvas.width / 2, triCanvas.height - offset);
  ctx.closePath();
  ctx.lineJoin = "round";
  ctx.lineWidth = 8;
  ctx.strokeStyle = "red";
  ctx.stroke();
};

const drawPolyCanvasToScreen = (polyCanvas, screenCanvas, triangleData) => {
  screenCanvas.width = polyCanvas.width;
  screenCanvas.height = polyCanvas.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(polyCanvas, 0, 0);

  const { sideLength, height, useSplitSegments } = triangleData;
  const halfSideLength = sideLength / 2;

  const rightX = useSplitSegments ? sideLength : halfSideLength + sideLength;

  const offset = 9;
  ctx.beginPath();
  ctx.moveTo(halfSideLength, offset);
  ctx.lineTo(rightX, offset);
  ctx.lineTo(sideLength, height);
  ctx.closePath();
  ctx.lineWidth = 18;
  ctx.lineJoin = "round";
  ctx.strokeStyle = "red";
  ctx.stroke();
};
