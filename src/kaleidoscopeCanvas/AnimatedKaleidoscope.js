import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TiledKaleidoscopeCanvas from "../kaleidoscopeCanvas/TiledKaleidoscopeCanvas";
import {
  createTriangleCanvas,
  drawPolygonCanvas,
  getTriangleData
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

    drawSrcCanvasToScreen(
      srcImg,
      srcCanvasRef.current,
      triangleData,
      settings.rotation
    );
    // triangle canvas showing just the triangle
    const triCanvas = createTriangleCanvas(
      srcImg,
      useSplitSegments,
      triangleData,
      settings.rotation
    );
    drawTriangleCanvasToScreen(triCanvas, triCanvasRef.current, triangleData);
    // full polygon canvas
    const polyCanvas = drawPolygonCanvas(triCanvas, numSegments);

    setKaleidCanvas(polyCanvas);

    drawPolyCanvasToScreen(
      polyCanvas,
      polyCanvasRef.current,
      triangleData,
      triCanvas,
      settings.rotation
    );
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

const drawSrcCanvasToScreen = (
  srcImg,
  screenCanvas,
  triangleData,
  rotation
) => {
  screenCanvas.width = srcImg.width;
  screenCanvas.height = srcImg.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(srcImg, 0, 0);

  // draw triangle
  const { points } = triangleData;

  ctx.beginPath();

  ctx.translate(points[0].x, points[0].y);
  ctx.rotate((-rotation * Math.PI) / 180);
  ctx.translate(-points[0].x, -points[0].y);

  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.lineTo(points[0].x, points[0].y);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 16;
  ctx.strokeStyle = "yellow";

  ctx.stroke();
};

const drawTriangleCanvasToScreen = (triCanvas, screenCanvas, triangleData) => {
  screenCanvas.width = triCanvas.width;
  screenCanvas.height = triCanvas.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(triCanvas, 0, 0);

  const offset = 2;
  const rightX = triangleData.useSplitSegments
    ? triCanvas.width / 2 - offset
    : triCanvas.width - offset;

  ctx.beginPath();
  ctx.moveTo(offset, offset);
  ctx.lineTo(rightX, offset);
  ctx.lineTo(triCanvas.width / 2, triCanvas.height - offset);
  ctx.closePath();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.stroke();
};

const drawPolyCanvasToScreen = (
  polyCanvas,
  screenCanvas,
  triangleData,
  triCanvas,
  rotation
) => {
  screenCanvas.width = polyCanvas.width;
  screenCanvas.height = polyCanvas.height;

  const ctx = screenCanvas.getContext("2d");
  ctx.drawImage(polyCanvas, 0, 0);

  const { useSplitSegments } = triangleData;
  const halfSideLength = triCanvas.width / 2;

  const rightX = useSplitSegments
    ? triCanvas.width
    : halfSideLength + triCanvas.width;

  const offset = 2;

  ctx.beginPath();
  ctx.moveTo(halfSideLength, offset);
  ctx.lineTo(rightX, offset);
  ctx.lineTo(triCanvas.width, triCanvas.height);
  ctx.closePath();
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "red";

  ctx.stroke();
};
