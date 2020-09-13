import React from "react";
import { WebcamCapture } from "./WebcamCapture";

const ImageInputSelector = ({ setSrcImg, setFrameNumber }) => {
  return (
    <div>
      <h1>ImageInputSelector</h1>
      <WebcamCapture setSrcImg={setSrcImg} setFrameNumber={setFrameNumber} />
    </div>
  );
};

export default ImageInputSelector;
