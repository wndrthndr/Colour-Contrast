import { useState, useMemo } from "react";
import { contrast, normalize } from "../lib/wcag";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert";

export default function GradientContrastChecker({ fg = "#000000", uiColor }) {

  // --- HSVA COLORS ---
  const [color1, setColor1] = useState(hexToHsva("#ff3b30"));
  const [color2, setColor2] = useState(hexToHsva("#007aff"));
  const [angle, setAngle] = useState(90);

  // --- FORCE VALID COLOR ---
  const forceHSVA = (hsva) => ({
    h: typeof hsva.h === "number" ? hsva.h : 0,
    s: typeof hsva.s === "number" ? hsva.s : 0,
    v: hsva.v === undefined || hsva.v === 0 ? 1 : hsva.v,
    a: hsva.a === undefined ? 1 : hsva.a,
  });

  // --- COLOR HANDLERS (IMPORTANT FIX) ---
  const handleColor1Change = (color) => {
    const hsva = color.hsva || color;
    setColor1(forceHSVA(hsva));
  };

  const handleColor2Change = (color) => {
    const hsva = color.hsva || color;
    setColor2(forceHSVA(hsva));
  };

  // --- FINAL HEX ---
  const c1 = hsvaToHex(color1);
  const c2 = hsvaToHex(color2);

  // --- SAMPLE POINTS ---
  const samplePositions = [0, 0.25, 0.5, 0.75, 1];

  // --- HEX → RGB ---
  const hexToRgb = (hex) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3)
      clean = `${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`;
    const n = parseInt(clean, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };

  // --- RGB → HEX ---
  const rgbToHex = (r, g, b) =>
    "#" + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0")).join("");

  // --- GRADIENT + CONTRAST ---
  const results = useMemo(() => {
    const rgb1 = hexToRgb(c1);
    const rgb2 = hexToRgb(c2);

    return samplePositions.map((t) => {
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);
      const hex = rgbToHex(r, g, b);
      const ratio = contrast(normalize(fg), normalize(hex));
      return { hex, ratio };
    });
  }, [c1, c2, fg]);

  const min = Math.min(...results.map(r => r.ratio));
  const max = Math.max(...results.map(r => r.ratio));

  return (
<div
  className="mt-16"
  style={{
    width: "100%",
    color: uiColor,
    border: `2px dashed ${uiColor}`,
    borderRadius: "20px",
    padding: "28px",
  }}
>
  
      {/* TITLE */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 36, fontWeight: 800 }}>
          Gradient Contrast Checker
        </div>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Measure accessibility across color transitions
        </div>
      </div>
  
      {/* LAYOUT GRID */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
  
        {/* LEFT WHEEL */}
        <div style={{ flex: "0 0 auto", marginLeft: 0 }}>
          <div className="flex flex-col items-center gap-3">
            <Wheel
              color={color1}
              onChange={handleColor1Change}
              width={190}
              height={190}
              pointerSize={18}
              style={{
                borderRadius: "50%",
                border: `3px dotted ${uiColor}`,
              }}
            />
            <div style={{ fontWeight: 600 }}>{c1}</div>
          </div>
        </div>
  
        {/* CENTER */}
        <div
          style={{
            flex: "1",
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          
  
          {/* ANGLE */}
          <div className="mb-4">
            <div className="text-sm mb-1">Angle: {angle}°</div>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(+e.target.value)}
              className="w-full"
              style={{ accentColor: uiColor }}
            />
          </div>
  
          {/* GRADIENT BOX */}
          <div
            className="rounded-xl border-dotted mb-4"
            style={{
              height: 200,
              border: `2px dotted ${uiColor}`,
              background: `linear-gradient(${angle}deg, ${c1}, ${c2})`,
            }}
          />
  
          {/* SAMPLES */}
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: r.hex,
                border: `1px solid ${uiColor}`
              }} />
              <div>{r.hex}</div>
              <div className="ml-auto font-bold">{r.ratio.toFixed(2)}</div>
            </div>
          ))}
        </div>
  
        {/* RIGHT WHEEL */}
        <div style={{ flex: "0 0 auto", marginRight: 0 }}>
          <div className="flex flex-col items-center gap-3">
            <Wheel
              color={color2}
              onChange={handleColor2Change}
              width={190}
              height={190}
              pointerSize={18}
              style={{
                borderRadius: "50%",
                border: `3px dotted ${uiColor}`,
              }}
            />
            <div style={{ fontWeight: 600 }}>{c2}</div>
          </div>
        </div>
  
      </div>
    </div>
  );
  
}
