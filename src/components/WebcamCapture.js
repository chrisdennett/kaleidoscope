import React from "react";
import Webcam from "react-webcam";
import { useInterval } from "../hooks/useInternval";

const videoConstraints = {
  width: 1024,
  height: 768,
  facingMode: "user",
};

export const WebcamCapture = ({ setSrcImg, setFrameNumber }) => {
  const [mediaReady, setMediaReady] = React.useState(false);
  const webcamRef = React.useRef(null);

  useInterval(() => {
    setFrameNumber((prev) => prev + 1);
    if (!webcamRef || !webcamRef.current) return;
    const frameCanvas = webcamRef.current.getCanvas();
    setSrcImg(frameCanvas);
    setFrameNumber((prev) => prev + 1);
  }, 100);

  const onMediaReady = () => setMediaReady(true);

  return (
    <div>
      {!mediaReady && <h2>LOOKING FOR WEBCAM... PLEASE HOLD</h2>}

      {/* HIDDEN */}
      <Webcam
        audio={false}
        style={{ position: "fixed", left: -10000 }}
        width={videoConstraints.width}
        ref={webcamRef}
        onUserMedia={onMediaReady}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
};
