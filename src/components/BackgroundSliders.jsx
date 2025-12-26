import { useEffect, useState, useRef } from "react";
import { hexToRgb, rgbToHex, normalize, contrast } from "../lib/wcag";

export default function BackgroundSliders({ bg, setBg, uiColor, ratio, fg }) {
  const { r, g, b } = hexToRgb(bg);
  const [copied, setCopied] = useState(false);

  const [R, setR] = useState(r);
  const [G, setG] = useState(g);
  const [B, setB] = useState(b);
  const [hex, setHex] = useState(bg);
  const [invalid, setInvalid] = useState(false);
  const typingTimer = useRef(null);
  const [active, setActive] = useState(null);

  // ✅ GOOD CONTRAST CHECK
  const isGood = ratio > 3;

  // ✅ SAFE FALLBACK COLOR
  const safeColor =
    contrast("#fff", normalize(bg)) > contrast("#000", normalize(bg))
      ? "#fff"
      : "#000";

  // ✅ FINAL BORDER / SLIDER COLOR
  const liveColor = isGood ? fg : safeColor;

  // Slider → HEX
  useEffect(() => {
    const newHex = rgbToHex(R, G, B);
    setHex(newHex);
    setBg(newHex);
    setInvalid(false);
  }, [R, G, B]);

  // Parent update
  useEffect(() => {
    const rgb = hexToRgb(bg);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    setHex(bg);
    setInvalid(false);
  }, [bg]);

  const applyColor = (val) => {
    const normalized = normalize(val.trim());

    if (!normalized || !normalized.startsWith("#")) {
      setInvalid(true);
      return;
    }

    const rgb = hexToRgb(normalized);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    setBg(normalized);
    setHex(normalized);
    setInvalid(false);
  };

  const copyColor = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      console.error("Copy failed");
    }
  };

  const slider = (label, val, setVal) => (
    <div
      className="mb-5 p-2 rounded-lg transition-all"
      style={{
        border: active === label ? `2px solid ${liveColor}` : "2px solid transparent",
      }}
    >
      <div
        className="font-semibold tracking-wide mb-1"
        style={{
          color: liveColor,
          fontSize: "15px",
          textTransform: "uppercase",
        }}
      >
        {label} {val}
      </div>

      <input
        type="range"
        min="0"
        max="255"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        onMouseDown={() => setActive(label)}
        onMouseUp={() => setActive(null)}
        className="w-full"
        style={{ accentColor: liveColor }}
      />
    </div>
  );

  return (
    <div className="panel-thick" style={{ borderColor: liveColor }}>

      <div className="font-bold text-2xl mb-3" style={{ color: liveColor }}>
        Background Colour
      </div>

      <div style={{ position: "relative", marginBottom: "8px" }}>
        <input
          value={hex}
          onChange={(e) => {
            const val = e.target.value;
            setHex(val);
            setInvalid(false);

            clearTimeout(typingTimer.current);
            typingTimer.current = setTimeout(() => {

              if (!val || val.length < 3) return;
              if (val === "#") return;

              const looksLikeHex =
                /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val);

              const looksLikeName =
                /^[a-zA-Z\s]+$/.test(val) && val.length > 2;

              if (!looksLikeHex && !looksLikeName) return;

              applyColor(val);
            }, 500);
          }}

          // ✅ APPLY ON ENTER
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyColor(hex);
            }
          }}

          placeholder="hex or color name"
          className="hex-input"
          style={{
            borderColor: invalid ? "red" : liveColor,
            color: liveColor,
            paddingRight: "48px",
          }}
        />

        <button
          type="button"
          onClick={copyColor}
          title="Copy color"
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: liveColor,
            padding: 2,
            opacity: copied ? 1 : 0.65,
          }}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill={liveColor}>
              <path d="M20.285 6.709l-11.06 11.06-5.51-5.51 1.414-1.415 4.096 4.096 9.646-9.646z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={liveColor} strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>

      </div>

      {invalid && (
        <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
          Unknown color name
        </div>
      )}

      {slider("Red", R, setR)}
      {slider("Green", G, setG)}
      {slider("Blue", B, setB)}

    </div>
  );
}
