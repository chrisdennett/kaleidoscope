import React, { useState } from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";

const maxPolyHeight = 960;
const minPolyHeight = 50;

export default function App() {
  const [showControls, setShowControls] = useState(true);
  const [polyHeight, setPolyHeight] = useState(960);
  const [numSegments, setNumSegments] = useState(6);
  const [inTileMode, setInTileMode] = useState(false);
  const [useSplitSegments, setUseSplitSegments] = useState(false);
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

  const onNumSegmentsSliderChange = (e) => {
    setNumSegments(parseInt(e.target.value));
  };

  const settings = {
    inTileMode,
    numSegments,
    useSplitSegments,
    polyHeight,
    yOffset,
    xOffset,
  };

  const toggleTileMode = () => setInTileMode((prev) => !prev);
  const toggleUseSplitSegments = () => setUseSplitSegments((prev) => !prev);

  return (
    <div>
      {showControls && (
        <div style={{ position: "fixed" }}>
          <div>
            <button onClick={toggleTileMode}>Toggle tile mode</button>
          </div>
          <div>
            <button onClick={toggleUseSplitSegments}>
              Toggle split segments
            </button>
          </div>
          <div>
            <input
              type="range"
              min={4}
              max={100}
              step="2"
              value={numSegments}
              onChange={onNumSegmentsSliderChange}
            />
            {numSegments}
          </div>
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

      <WebcamCapture onClick={onCanvasClick} {...settings} />
    </div>
  );
}
