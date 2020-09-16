import React from "react";
import ImageInputSelector from "../components/ImageInputSelector";

const Controls = ({
  settings,
  setSettings,
  srcImg,
  setSrcImg,
  setFrameNumber,
}) => {
  const onControlUpdate = (key, newValue) => {
    setSettings({ ...settings, [key]: newValue });
  };

  const toggleUseSplitSegments = () => {
    onControlUpdate("useSplitSegments", !settings.useSplitSegments);
  };

  return (
    <div>
      <div style={{ position: "fixed" }}>
        <ImageInputSelector
          srcImg={srcImg}
          setSrcImg={setSrcImg}
          setFrameNumber={setFrameNumber}
        />

        <div>
          <button onClick={toggleUseSplitSegments}>
            Toggle split segments
          </button>
        </div>

        <Slider
          label={"Sides: "}
          min={6}
          max={50}
          step={2}
          propertyName={"numSegments"}
          setSettings={setSettings}
          settings={settings}
        />

        <Slider
          label={"Height: "}
          min={0.2}
          max={1}
          step={0.01}
          propertyName={"heightFrac"}
          setSettings={setSettings}
          settings={settings}
        />

        <Slider
          label={"X Pos: "}
          min={0}
          max={1}
          step={0.01}
          propertyName={"xFrac"}
          setSettings={setSettings}
          settings={settings}
        />

        <Slider
          label={"Y Pos: "}
          min={0}
          max={1}
          step={0.01}
          propertyName={"yFrac"}
          setSettings={setSettings}
          settings={settings}
        />
      </div>
    </div>
  );
};

export default Controls;

const Slider = ({
  min,
  max,
  step,
  propertyName,
  label,
  setSettings,
  settings,
}) => {
  const value = settings[propertyName];

  const onSliderChange = (e) => {
    setSettings({ ...settings, [propertyName]: e.target.value });
  };

  return (
    <div>
      {label}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onSliderChange}
      />
      {value}
    </div>
  );
};
