import React, { useState } from "react";
import Controls from "./controls/Controls";
import { useDebounce } from "./hooks/useDebounce";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";

const defaultSettings = {
  polyHeight: 500,
  numSegments: 6,
  inTileMode: false,
  useSplitSegments: false,
  xOffset: 0,
  yOffset: 0,
};

export default function App() {
  const [showControls, setShowControls] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);

  const debouncedSettings = useDebounce(settings, 1);

  const onCanvasClick = () => {
    setShowControls(!showControls);
  };

  return (
    <div>
      {showControls && (
        <Controls settings={settings} setSettings={setSettings} />
      )}

      <WebcamCapture onClick={onCanvasClick} {...debouncedSettings} />
    </div>
  );
}
