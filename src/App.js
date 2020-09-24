import React, { useState } from "react";
import Controls from "./controls/Controls";
import { useDebounce } from "./hooks/useDebounce";
import "./styles.css";
import AnimatedKaleidoscope from "./kaleidoscopeCanvas/AnimatedKaleidoscope";
import styled from "styled-components";

const defaultSettings = {
  polyHeight: 500,
  numSegments: 6,
  useSplitSegments: true,
  xOffset: 681,
  yOffset: 90,
  heightFrac: 0.5,
  outHeightFrac: 0.25,
  isAnimating: false,
  xFrac: 0.5,
  yFrac: 0.5,
};

export default function App() {
  const [settings, setSettings] = useState(defaultSettings);
  const [frameNumber, setFrameNumber] = React.useState(0);
  const [srcImg, setSrcImg] = React.useState(null);

  const debouncedSettings = useDebounce(settings, 1);

  return (
    <AppHolder>
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
    </AppHolder>
  );
}

const AppHolder = styled.div`
  margin-top: 40px;
`;
