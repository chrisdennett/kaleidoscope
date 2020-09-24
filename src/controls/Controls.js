import React, { useState } from "react";
import styled from "styled-components";
import { TiWarningOutline } from "react-icons/ti";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import ImageInputSelector from "../components/ImageInputSelector";

const incX = 0.0005;
const incY = 0.0007;

const Controls = ({
  settings,
  setSettings,
  srcImg,
  setSrcImg,
  setFrameNumber,
}) => {
  // const [animAxis, setAnimAxis] = useState("x");
  // const [animTargetFrac, setAnimTargetFrac] = useState({ targX: 1, targY: 1 });
  const [xIncrement, setXIncrement] = useState(incX);
  const [yIncrement, setYIncrement] = useState(incY);
  const [settingsShowing, setSettingsShowing] = React.useState(true);

  useAnimationFrame(() => {
    if (!settings.isAnimating) return;

    const { xFrac, yFrac } = settings;

    if (xFrac >= 1) setXIncrement(-incX);
    if (xFrac <= 0) setXIncrement(incX);
    if (yFrac >= 1) setYIncrement(-incY);
    if (yFrac <= 0) setYIncrement(incY);

    setSettings((prev) => {
      return {
        ...prev,
        xFrac: limitDecimals(prev.xFrac + xIncrement, 4),
        yFrac: limitDecimals(prev.yFrac + yIncrement, 4),
      };
    });
  });

  const onControlUpdate = (key, newValue) => {
    setSettings({ ...settings, [key]: newValue });
  };

  const toggleUseSplitSegments = () => {
    onControlUpdate("useSplitSegments", !settings.useSplitSegments);
  };

  const toggleIsAnimating = () => {
    onControlUpdate("isAnimating", !settings.isAnimating);
  };

  const onShowSettingsClick = () => setSettingsShowing(true);
  const onHideSettingsClick = () => setSettingsShowing(false);

  return (
    <div>
      {!settingsShowing && (
        <SettingsOnButton onClick={onShowSettingsClick}>
          SHOW SETTINGS
        </SettingsOnButton>
      )}

      <Inner settingsShowing={settingsShowing}>
        {settingsShowing && (
          <SettingsOffButton onClick={onHideSettingsClick}>
            HIDE SETTINGS
          </SettingsOffButton>
        )}

        <ImageInputSelector
          srcImg={srcImg}
          setSrcImg={setSrcImg}
          setFrameNumber={setFrameNumber}
        />

        <SettingsControls>
          <ControlHolder>
            <span>Split Triangle: </span>
            <ToggleButton onClick={toggleUseSplitSegments}>
              {settings.useSplitSegments ? "TURN OFF" : "TURN ON"}
            </ToggleButton>
          </ControlHolder>

          <Slider
            label={"IN Size: "}
            min={0.1}
            max={1}
            step={0.01}
            propertyName={"heightFrac"}
            setSettings={setSettings}
            settings={settings}
          />

          <Slider
            label={"X: "}
            min={0}
            max={1}
            step={0.01}
            propertyName={"xFrac"}
            setSettings={setSettings}
            settings={settings}
          />

          <Slider
            label={"Y: "}
            min={0}
            max={1}
            step={0.01}
            propertyName={"yFrac"}
            setSettings={setSettings}
            settings={settings}
          />

          <Slider
            label={"OUT Size: "}
            min={0.1}
            max={1}
            step={0.01}
            propertyName={"outHeightFrac"}
            setSettings={setSettings}
            settings={settings}
          />

          <ControlHolder>
            <span>Animation: </span>
            <ToggleButton onClick={toggleIsAnimating}>
              {settings.isAnimating ? "TURN OFF" : "TURN ON"}
            </ToggleButton>
            <div>
              <small>
                <TiWarningOutline /> Can cause flashing images!
              </small>
            </div>
          </ControlHolder>
        </SettingsControls>
      </Inner>
    </div>
  );
};

export default Controls;

const SettingsOffButton = styled.button`
  background: black;
  color: white;
  padding: 10px;
  border: none;
  margin-bottom: 20px;
  font-weight: bold;
`;

const SettingsOnButton = styled.button`
  position: fixed;
  top: 5px;
  right: 5px;
  padding: 10px 80px;
  background: white;
  border: none;
  font-weight: bold;
`;

const Inner = styled.div`
  position: fixed;
  left: ${(props) => (props.settingsShowing ? "" : "-1000px")};
  right: ${(props) => (props.settingsShowing ? "0px" : "")};
  top: 0;
  padding: 5px 20px 20px 20px;
  border-radius: 0 0 10px 10px;
  background: rgba(255, 255, 255, 0.9);
  font-weight: bold;
  color: black;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  background: white;
  border: solid black 2px;
  font-weight: bold;
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
    <ControlHolder>
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
    </ControlHolder>
  );
};

const SettingsControls = styled.div`
  margin-top: 15px;
`;

const ControlHolder = styled.div`
  margin: 8px 0;
  text-transform: uppercase;
  font-family: "Courier New", Courier, monospace;

  small {
    color: red;
  }
`;

const limitDecimals = (num, totDecimals) => {
  const numAsNum = parseFloat(num);
  return (
    Math.round(numAsNum * Math.pow(10, totDecimals)) / Math.pow(10, totDecimals)
  );
};
