import React from "react";

const maxPolyHeight = 960;
const minPolyHeight = 50;

const Controls = ({ settings, setSettings }) => {
  const { numSegments, polyHeight, yOffset, xOffset } = settings;

  const onControlUpdate = (key, newValue) => {
    setSettings({ ...settings, [key]: newValue });
  };

  const onPolyHeightSliderChange = (e) => {
    onControlUpdate("polyHeight", e.target.value);
  };

  const onYOffsetSliderChange = (e) => {
    onControlUpdate("yOffset", e.target.value);
  };

  const onXOffsetSliderChange = (e) => {
    onControlUpdate("xOffset", e.target.value);
  };

  const onNumSegmentsSliderChange = (e) => {
    onControlUpdate("numSegments", e.target.value);
  };

  const toggleTileMode = () => {
    onControlUpdate("inTileMode", !settings.inTileMode);
  };

  const toggleUseSplitSegments = () => {
    onControlUpdate("useSplitSegments", !settings.useSplitSegments);
  };

  return (
    <div>
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
    </div>
  );
};

export default Controls;
