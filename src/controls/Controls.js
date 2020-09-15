import React from "react";

const Controls = ({ settings, setSettings }) => {
  const onControlUpdate = (key, newValue) => {
    setSettings({ ...settings, [key]: newValue });
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
          min={0.5}
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
