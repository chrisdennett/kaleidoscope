import React, { useState } from "react";
import { useEffect } from "react";
import PhotoSelector from "./PhotoSelector";

import { WebcamCapture } from "./WebcamCapture";

const ImageInputSelector = ({ setSrcImg, setFrameNumber }) => {
  const [currentInput, setCurrentInput] = useState("sample");

  const imgName = "tizziewizie.jpg";

  useEffect(() => {
    if (currentInput === "sample") {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        if (currentInput === "sample") {
          setSrcImg(image);
        }
      };
      image.src = imgName;
    }
    // eslint-disable-next-line
  }, [imgName, currentInput]);

  const onPhotoSelected = (photo) => setSrcImg(photo);

  return (
    <div>
      <button onClick={() => setCurrentInput("webcam")}>webcam</button>
      <button onClick={() => setCurrentInput("sample")}>sample</button>
      <PhotoSelector onPhotoSelected={onPhotoSelected} />
      {currentInput === "webcam" && (
        <WebcamCapture
          setSrcImg={setSrcImg}
          setFrameNumber={setFrameNumber}
          isLive={currentInput === "webcam"}
        />
      )}
    </div>
  );
};

export default ImageInputSelector;
