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
  const [settingsShowing, setSettingsShowing] = React.useState(true);

  const onControlUpdate = (key, newValue) => {
    setSettings({ ...settings, [key]: newValue });
  };

  const toggleUseSplitSegments = () => {
    onControlUpdate("useSplitSegments", !settings.useSplitSegments);
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
            label={"Size: "}
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
`;
