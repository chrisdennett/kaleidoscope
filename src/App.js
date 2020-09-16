import React, { useState } from "react";
import Controls from "./controls/Controls";
import { useDebounce } from "./hooks/useDebounce";
import "./styles.css";
import AnimatedKaleidoscope from "./kaleidoscopeCanvas/AnimatedKaleidoscope";

const defaultSettings = {
  polyHeight: 500,
  numSegments: 6,
  useSplitSegments: true,
  xOffset: 681,
  yOffset: 90,
  heightFrac: 1,
  xFrac: 0.5,
  yFrac: 1,
};

export default function App() {
  const [settings, setSettings] = useState(defaultSettings);
  const [frameNumber, setFrameNumber] = React.useState(0);
  const [srcImg, setSrcImg] = React.useState(null);

  const debouncedSettings = useDebounce(settings, 1);

  return (
    <div>
      <Controls
        settings={settings}
        setSettings={setSettings}
        setSrcImg={setSrcImg}
        setFrameNumber={setFrameNumber}
      />

      <AnimatedKaleidoscope
        srcImg={srcImg}
        frameNumber={frameNumber}
        settings={debouncedSettings}
      />
    </div>
  );
}
