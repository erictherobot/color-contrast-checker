import { useState } from "react";
import { getContrast, getLuminance } from "polished";
import tinycolor from "tinycolor2";

type Color = {
  name: string;
  value: string;
};

type Contrast = {
  aa: boolean;
  aaa: boolean;
  ratio: number;
};

const ColorContrastChecker = () => {
  const [foreground, setForeground] = useState<Color>({
    name: "Foreground",
    value: "#000000",
  });
  const [background, setBackground] = useState<Color>({
    name: "Background",
    value: "#FFFFFF",
  });

  const [fontSize, setFontSize] = useState<number>(14);
  const [fontWeight, setFontWeight] = useState<"normal" | "bold">("normal");

  const contrast = getContrast(foreground.value, background.value);
  const luminance1 = getLuminance(tinycolor(foreground.value).toRgbString());
  const luminance2 = getLuminance(tinycolor(background.value).toRgbString());

  const ratio = (luminance1 + 0.05) / (luminance2 + 0.05);

  const isLargeText =
    fontSize >= 18 || (fontSize >= 14 && fontWeight === "bold");
  const contrastAA =
    foreground.value === background.value
      ? false
      : isLargeText
      ? ratio >= 3
      : ratio >= 4.5;
  const contrastAAA =
    foreground.value === background.value
      ? false
      : isLargeText
      ? ratio >= 4.5
      : ratio >= 7;

  const handleForegroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForeground({
      ...foreground,
      value: event.target.value,
    });
  };

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackground({
      ...background,
      value: event.target.value,
    });
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(event.target.value));
  };

  const handleFontWeightChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontWeight(event.target.value as "normal" | "bold");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="text-4xl font-bold mb-4">Color Contrast Checker</h1>
      <div className="flex justify-center items-center space-x-4">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="fontSize">Font Size:</label>
          <input
            type="number"
            id="fontSize"
            name="fontSize"
            value={fontSize}
            min="1"
            max="100"
            onChange={handleFontSizeChange}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="fontWeight">Font Weight:</label>
          <select
            id="fontWeight"
            name="fontWeight"
            value={fontWeight}
            onChange={handleFontWeightChange}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-screen-md mb-4">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="foreground">{foreground.name}:</label>
          <input
            type="color"
            id="foreground"
            name="foreground"
            value={foreground.value}
            onChange={handleForegroundChange}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="background">{background.name}:</label>
          <input
            type="color"
            id="background"
            name="background"
            value={background.value}
            onChange={handleBackgroundChange}
          />
        </div>
      </div>
      <div
        className="w-64 h-64 bg-white border border-gray-400 rounded-lg flex justify-center items-center"
        style={{ backgroundColor: background.value }}
      >
        <span
          className="text-4xl font-bold text-center"
          style={{ color: foreground.value, fontSize, fontWeight }}
        >
          {contrast.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between w-full max-w-screen-md mt-4">
        <div className="flex flex-col justify-center items-center">
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: foreground.value }}
          ></div>
          <span className="text-center">{foreground.name}</span>
          <span className="text-center">{foreground.value}</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: background.value }}
          ></div>
          <span className="text-center">{background.name}</span>
          <span className="text-center">{background.value}</span>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-screen-md mt-4">
        <div className="flex flex-col justify-center items-center">
          <span className="text-center">
            AA:{" "}
            {contrastAA ? (
              <span className="text-green-600 font-bold">Pass</span>
            ) : (
              <span className="text-red-600 font-bold">Fail</span>
            )}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-center">
            AAA:{" "}
            {contrastAAA ? (
              <span className="text-green-600 font-bold">Pass</span>
            ) : (
              <span className="text-red-600 font-bold">Fail</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorContrastChecker;
