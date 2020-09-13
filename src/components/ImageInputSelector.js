import React from "react";
import SampleImageLoader from "./SampleImageLoader";
import { WebcamCapture } from "./WebcamCapture";

const ImageInputSelector = ({ setSrcImg, setFrameNumber }) => {
  const currentInput = "sample";

  return (
    <div>
      <h1>ImageInputSelector</h1>
      {currentInput === "sample" && (
        <SampleImageLoader imgName={"tizziewizie.jpg"} setSrcImg={setSrcImg} />
      )}

      {currentInput === "webcam" && (
        <WebcamCapture setSrcImg={setSrcImg} setFrameNumber={setFrameNumber} />
      )}
    </div>
  );
};

export default ImageInputSelector;
