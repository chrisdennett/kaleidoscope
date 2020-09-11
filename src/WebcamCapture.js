import React from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
// import { drawPolygonCanvas } from "./functions/drawPolygons";
// import { drawTiledHexagonCanvas } from "./functions/drawTiledHexagons";
import KaleidoscopeCanvas from "./kaleidoscopeCanvas/KaleidoscopeCanvas";
import TiledKaleidoscopeCanvas from "./kaleidoscopeCanvas/TiledKaleidoscopeCanvas";

const videoConstraints = {
  width: 1024,
  height: 768,
  facingMode: "user",
};

export const WebcamCapture = ({ onClick }) => {
  const [mediaReady, setMediaReady] = React.useState(false);
  const [frameNumber, setFrameNumber] = React.useState(0);
  const [srcImg, setSrcImg] = React.useState(null);
  // const canvasRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  useAnimationFrame(() => {
    if (!webcamRef || !webcamRef.current) return;
    const frameCanvas = webcamRef.current.getCanvas();
    setSrcImg(frameCanvas);
    setFrameNumber((prev) => prev + 1);
  });

  //   const kaleidCanvas = drawPolygonCanvas(
  //     frameCanvas,
  //     numSegments,
  //     useSplitSegments
  //   );

  //   screenCanvas.width = window.innerWidth;
  //   screenCanvas.height = window.innerHeight;

  //   const rectCanvas = drawTiledHexagonCanvas(kaleidCanvas, polyHeight);

  //   // tile
  //   const totalHeight = yOffset + window.innerHeight;
  //   const totalWidth = xOffset + window.innerWidth;

  //   const ctx = screenCanvas.getContext("2d");
  //   const cols = Math.ceil(totalWidth / rectCanvas.width);
  //   const rows = Math.ceil(totalHeight / rectCanvas.height);

  //   for (let c = 0; c < cols; c++) {
  //     for (let r = 0; r < rows; r++) {
  //       ctx.drawImage(
  //         rectCanvas,
  //         c * rectCanvas.width - 2 - xOffset,
  //         r * rectCanvas.height - 2 - yOffset
  //       );
  //     }
  //   }
  // };

  return (
    <div onClick={onClick}>
      {!mediaReady && <h1>LOOKING FOR WEBCAM... PLEASE HOLD</h1>}

      {mediaReady && (
        <div>
          <TiledKaleidoscopeCanvas srcImg={srcImg} frameNumber={frameNumber} />
          <KaleidoscopeCanvas srcImg={srcImg} frameNumber={frameNumber} />
          {/* <canvas ref={canvasRef} style={{ display: "block" }} /> */}
        </div>
      )}

      {/* HIDDEN */}
      <Webcam
        audio={false}
        style={{ position: "fixed", left: -10000 }}
        width={videoConstraints.width}
        ref={webcamRef}
        onUserMedia={() => setMediaReady(true)}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
};
