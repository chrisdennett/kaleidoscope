import React, { useEffect } from "react";

const SampleImageLoader = ({ srcImg, setSrcImg, imgName }) => {
  useEffect(() => {
    if (!srcImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        console.log("image: ", image);
        setSrcImg(image);
      };
      image.src = imgName;
    }
    // eslint-disable-next-line
  }, [imgName]);

  return (
    <div>
      <h1>SampleImageLoader</h1>
    </div>
  );
};

export default SampleImageLoader;
