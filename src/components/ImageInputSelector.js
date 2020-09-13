import React from "react";
import { useEffect } from "react";

import { WebcamCapture } from "./WebcamCapture";

const ImageInputSelector = ({ srcImg, setSrcImg, setFrameNumber }) => {
  const currentInput = "sample";
  const imgName = "tizziewizie.jpg";

  useEffect(() => {
    if (!srcImg && currentInput === "sample") {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSrcImg(image);
      };
      image.src = imgName;
    }
    // eslint-disable-next-line
  }, [imgName]);

  return (
    <div>
      <h1>ImageInputSelector</h1>
      {currentInput === "webcam" && (
        <WebcamCapture setSrcImg={setSrcImg} setFrameNumber={setFrameNumber} />
      )}
    </div>
  );
};

export default ImageInputSelector;
