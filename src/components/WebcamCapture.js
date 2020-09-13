import React from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "../hooks/useAnimationFrame";

const videoConstraints = {
  width: 1024,
  height: 768,
  facingMode: "user",
};

export const WebcamCapture = ({ setSrcImg, setFrameNumber }) => {
  const [mediaReady, setMediaReady] = React.useState(false);
  // const [frameNumber, setFrameNumber] = React.useState(0);
  // const [srcImg, setSrcImg] = React.useState(null);
  const webcamRef = React.useRef(null);

  useAnimationFrame(() => {
    if (!webcamRef || !webcamRef.current) return;
    const frameCanvas = webcamRef.current.getCanvas();
    setSrcImg(frameCanvas);
    setFrameNumber((prev) => prev + 1);
  });

  return (
    <div>
      {!mediaReady && <h1>LOOKING FOR WEBCAM... PLEASE HOLD</h1>}

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
