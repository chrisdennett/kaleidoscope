import React from "react";
import styled from "styled-components";
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
    <Holder>
      <Inner>
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
      </Inner>
    </Holder>
  );
};

export default Controls;

const Inner = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const Holder = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
`;

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
    <SliderHolder>
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
    </SliderHolder>
  );
};

const SliderHolder = styled.div`
  margin: 5px 0;
`;
