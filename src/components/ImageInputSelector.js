import React, { useState } from "react";
import { useEffect } from "react";
import PhotoSelector from "./PhotoSelector";

import { WebcamCapture } from "./WebcamCapture";

const ImageInputSelector = ({ setSrcImg, setFrameNumber }) => {
  const [currentInput, setCurrentInput] = useState("sample");

  const imgName = "tizziewizie.jpg";

  useEffect(() => {
    console.log("currentInput: ", currentInput);
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

  const onPhotoSelected = (photo) => {
    setCurrentInput("userPhoto");
    setSrcImg(photo);
  };
  const onSelectWebcam = () => setCurrentInput("webcam");
  const onSelectSample = () => setCurrentInput("sample");

  return (
    <div>
      <button onClick={onSelectWebcam}>webcam</button>
      <button onClick={onSelectSample}>sample</button>
      <PhotoSelector onPhotoSelected={onPhotoSelected}>
        <button>ADD PICTURE</button>
      </PhotoSelector>
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
