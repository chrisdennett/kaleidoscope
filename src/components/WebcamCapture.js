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
  const webcamRef = React.useRef(null);

  useAnimationFrame(() => {
    if (!webcamRef || !webcamRef.current) return;
    const frameCanvas = webcamRef.current.getCanvas();
    setSrcImg(frameCanvas);
    setFrameNumber((prev) => prev + 1);
  });

  return (
    <div>
      <h1>Webcam</h1>
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
