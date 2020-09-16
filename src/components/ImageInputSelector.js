import React, { useState, useEffect } from "react";
import { ImVideoCamera } from "react-icons/im";
import { MdPhotoLibrary } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
// import { VscLoading } from "react-icons/vsc";
import styled from "styled-components";
import PhotoSelector from "./PhotoSelector";

import { WebcamCapture } from "./WebcamCapture";

const ImageInputSelector = ({ setSrcImg, setFrameNumber }) => {
  const [currentInput, setCurrentInput] = useState("sample");

  const imgName = "sample.jpg";

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

  const onPhotoSelected = (photo) => {
    setCurrentInput("userPhoto");
    setSrcImg(photo);
  };
  const onSelectWebcam = () => setCurrentInput("webcam");
  const onSelectSample = () => setCurrentInput("sample");

  return (
    <div>
      <SelectorButtons>
        <SourceSelectButton
          onClick={onSelectWebcam}
          isSelected={currentInput === "webcam"}
        >
          <ImVideoCamera />
          {/* <VscLoading /> */}
        </SourceSelectButton>

        <SourceSelectButton
          onClick={onSelectSample}
          isSelected={currentInput === "sample"}
        >
          <AiOutlinePicture />
        </SourceSelectButton>

        <PhotoSelector onPhotoSelected={onPhotoSelected}>
          <SourceSelectButton isSelected={currentInput === "userPhoto"}>
            <MdPhotoLibrary />
          </SourceSelectButton>
        </PhotoSelector>
      </SelectorButtons>

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

const SelectorButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  width: 100%;
`;

const SourceSelectButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 24px;
  border-radius: 10px;
  background: ${(props) => (props.isSelected ? "black" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  border: ${(props) =>
    props.isSelected ? "solid white 2px" : "solid black 2px"};
`;
