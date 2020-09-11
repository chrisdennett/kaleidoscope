import React, { useState } from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";
// import { useLocalStorage } from "./hooks/useLocalStorage";
// import { useKeyPress } from "./hooks/useKeyPress";

const maxPolyHeight = 960;
const minPolyHeight = 50;

export default function App() {
  const [showControls, setShowControls] = useState(false);
  const [polyHeight, setPolyHeight] = useState(960);
  const [yOffset, setYOffset] = useState(0);
  const [xOffset, setXOffset] = useState(0);

  const onCanvasClick = () => {
    setShowControls(!showControls);
  };

  const onPolyHeightSliderChange = (e) => {
    setPolyHeight(e.target.value);
  };

  const onYOffsetSliderChange = (e) => {
    setYOffset(parseInt(e.target.value));
  };

  const onXOffsetSliderChange = (e) => {
    setXOffset(parseInt(e.target.value));
  };

  return (
    <div>
      {showControls && (
        <div style={{ position: "fixed" }}>
          <div>
            <input
              type="range"
              min={minPolyHeight}
              max={maxPolyHeight}
              step="2"
              value={polyHeight}
              onChange={onPolyHeightSliderChange}
            />
            {polyHeight}
          </div>
          <div>
            <input
              type="range"
              min="0"
              max={polyHeight * 2}
              step="1"
              value={yOffset}
              onChange={onYOffsetSliderChange}
            />
            {yOffset}
          </div>
          <div>
            <input
              type="range"
              min="0"
              max={polyHeight * 2}
              step="1"
              value={xOffset}
              onChange={onXOffsetSliderChange}
            />
            {xOffset}
          </div>
        </div>
      )}

      <WebcamCapture
        onClick={onCanvasClick}
        numSegments={6}
        useSplitSegments={true}
        polyHeight={polyHeight}
        yOffset={yOffset}
        xOffset={xOffset}
      />
    </div>
  );
}
