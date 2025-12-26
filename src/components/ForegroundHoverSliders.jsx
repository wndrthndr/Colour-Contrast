import { useEffect, useState } from "react";
import { hexToRgb, rgbToHex } from "../lib/wcag";

export default function ForegroundHoverSliders({ fgHover, setFgHover }) {
  const { r, g, b } = hexToRgb(fgHover);

  const [R, setR] = useState(r);
  const [G, setG] = useState(g);
  const [B, setB] = useState(b);
  const [hex, setHex] = useState(fgHover);

  useEffect(() => {
    const newHex = rgbToHex(R, G, B);
    setHex(newHex);
    setFgHover(newHex);
  }, [R, G, B]);

  useEffect(() => {
    const rgb = hexToRgb(hex);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
  }, [hex]);

  const slider = (label, val, setVal) => (
    <div className="mb-4">
<div className="text-sm mb-1" style={{ color: "inherit" }}>
  {label} {val}
</div>
      <input
        type="range"
        min="0"
        max="255"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="panel-thick">
      <div className="font-bold text-sm mb-3">Foreground Hover</div>

      <input
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        className="hex-input mb-5"
      />

      {slider("Red", R, setR)}
      {slider("Green", G, setG)}
      {slider("Blue", B, setB)}
    </div>
  );
}
