import React, { useState } from "react";
import ImageInputSelector from "./components/ImageInputSelector";
import Controls from "./controls/Controls";
import { useDebounce } from "./hooks/useDebounce";
import "./styles.css";
import TiledKaleidoscopeCanvas from "./kaleidoscopeCanvas/TiledKaleidoscopeCanvas";
import AnimatedKaleidoscope from "./kaleidoscopeCanvas/AnimatedKaleidoscope";

const defaultSettings = {
  polyHeight: 500,
  numSegments: 6,
  inTileMode: false,
  useSplitSegments: false,
  xOffset: 681,
  yOffset: 90,
  heightFrac: 0.5,
};

export default function App() {
  // const [showControls, setShowControls] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [frameNumber, setFrameNumber] = React.useState(0);
  const [srcImg, setSrcImg] = React.useState(null);

  const debouncedSettings = useDebounce(settings, 1);

  const { inTileMode } = settings;

  return (
    <div>
      <ImageInputSelector
        srcImg={srcImg}
        setSrcImg={setSrcImg}
        setFrameNumber={setFrameNumber}
      />

      {/* {showControls && ( */}
      <Controls settings={settings} setSettings={setSettings} />
      {/* )} */}

      {inTileMode && (
        <TiledKaleidoscopeCanvas
          srcImg={srcImg}
          frameNumber={frameNumber}
          settings={debouncedSettings}
        />
      )}
      {!inTileMode && (
        <AnimatedKaleidoscope
          srcImg={srcImg}
          frameNumber={frameNumber}
          settings={debouncedSettings}
        />
      )}
    </div>
  );
}
