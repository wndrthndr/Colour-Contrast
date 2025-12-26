import { useEffect, useState } from "react";
import { contrast, normalize } from "./lib/wcag";

import AaBox from "./components/AaBox";
import Badges from "./components/Badges";

import BackgroundSliders from "./components/BackgroundSliders";
import ForegroundSliders from "./components/ForegroundSliders";

import BackgroundHoverSliders from "./components/BackgroundHoverSliders";
import ForegroundHoverSliders from "./components/ForegroundHoverSliders";

import HoverPreviewButton from "./components/HoverPreviewButton";
import GradientContrastChecker from "./components/GradientContrastChecker";
import { detectMood } from "./utils/colorMood";

export default function App() {
  const [fg, setFg] = useState("#d81e00");
  const [bg, setBg] = useState("#111827");

  const [fgHover, setFgHover] = useState("#000000");
  const [bgHover, setBgHover] = useState("#e6e6e6");

  const [ratio, setRatio] = useState(21);
  const [hoverRatio, setHoverRatio] = useState(8);

  const [textHover, setTextHover] = useState(null);


  useEffect(() => {
    setRatio(contrast(normalize(fg), normalize(bg)));
  }, [fg, bg]);

  useEffect(() => {
    setHoverRatio(contrast(normalize(fgHover), normalize(bgHover)));
  }, [fgHover, bgHover]);

  const onReverse = () => {
    setFg(bg);
    setBg(fg);
  };

  const onSave = () => {
    const entry = {
      fg,
      bg,
      fgHover,
      bgHover,
      ratio,
      hoverRatio,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("savedColourPair", JSON.stringify(entry));
    alert("Color pair saved successfully ✅");
  };

  // Dynamic UI readable color
  const uiColor = (() => {
    const cWhite = contrast("#fff", normalize(bg));
    const cBlack = contrast("#000", normalize(bg));
    return cWhite > cBlack ? "#fff" : "#000";
  })();

  const buttonStyle = {
    background: "transparent",
    color: uiColor,
    border: `2px solid ${uiColor}`,
    padding: "14px 22px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: "0.4px",
    transition: "all 0.2s ease",
    cursor: "pointer",
  };
  

  // ✅ Color Mood Intelligence
  const mood = detectMood({ fg, bg, contrastRatio: ratio });

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: bg,
        color: uiColor,
        "--ui-border": uiColor,
      }}
    >
      

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* =================== HEADER =================== */}
        {/* =================== HEADER =================== */}
<div
  className="mb-12 flex flex-col gap-4 pb-6 border-b border-dashed"
  style={{ borderColor: uiColor }}
>

  {/* TITLE */}
  <div className="flex items-center justify-between flex-wrap gap-6 mb-3">

    <div>
      <h1
        style={{
          fontSize: "34px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: "1.1",
          color: uiColor,
        }}
      >
        Smart Color Contrast Lab
      </h1>

      <div
        style={{
          fontSize: "13px",
          marginTop: "4px",
          opacity: 0.75,
          letterSpacing: "0.4px",
        }}
      >
        Design colors that feel right and test them before shipping.
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex gap-3">
      <button
        onClick={onReverse}
        style={buttonStyle}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
      >
        Reverse Colors
      </button>

      
    </div>

  </div>

  {/* STATUS ROW */}
  <div className="flex items-center justify-between flex-wrap gap-6">

    {/* LEFT SIDE */}
    <div className="flex items-center gap-4">

      <AaBox fg={fg} />

      <div>
      <div
  style={{
    fontSize: "60px",
    fontWeight: 900,
    letterSpacing: "-1px",
    lineHeight: "1",
    padding: "6px 14px",
    borderRadius: "10px",

    /* ✅ CONDITIONAL COLOR LOGIC */
    background: ratio > 3 ? bg : "transparent",
    color: ratio > 3 ? fg : uiColor,

    transition: "all 0.3s ease",
  }}
>
  {ratio.toFixed(2)}
</div>


        
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div>

      <Badges ratio={ratio} bg={fg} fg={bg}/>

      

    </div>

  </div>
</div>


        {/* =================== PANELS =================== */}
        <div className="grid grid-cols-12 gap-14">

          {/* TOP */}
          <div className="col-span-12 grid grid-cols-2 gap-10 p-6 rounded-2xl border border-dashed"
     style={{ borderColor: uiColor }}>
<BackgroundSliders bg={bg} setBg={setBg} uiColor={uiColor} ratio={ratio} fg={fg} />
<ForegroundSliders fg={fg} setFg={setFg} uiColor={uiColor} ratio={ratio} bg={bg} />

          </div>
          
          {/* ================= TEXT SCALE PREVIEW ================= */}
          <div className="col-span-12 grid grid-cols-2 gap-8 mt-4 p-6 rounded-2xl border border-dashed"
     style={{ borderColor: uiColor }}>
      <h2
  className="col-span-2 text-center font-bold tracking-widest mb-2"
  style={{
    fontSize: "14px",
    letterSpacing: "1.2px",
    opacity: 0.7
  }}
>
  FOR REFERENCE
</h2>

      

{/* LARGE TITLE */}
<div
  onMouseEnter={() => setTextHover("large")}
  onMouseLeave={() => setTextHover(null)}
  className="rounded-xl p-7 border border-dashed shadow-sm transition-all"
  style={{
    borderColor: uiColor,
    background: textHover === "large" ? bgHover : bg,
    color: textHover === "large" ? fgHover : fg
  }}
>
  <div className="text-xs uppercase tracking-widest opacity-60">
    Large Heading
  </div>
  <div style={{ fontSize: "40px", lineHeight: "1.2", fontWeight: 700 }}>
    Accessible Design Matters
  </div>
</div>


{/* MEDIUM TITLE */}
<div
  onMouseEnter={() => setTextHover("medium")}
  onMouseLeave={() => setTextHover(null)}
  className="rounded-xl p-6 border border-dashed transition-all"
  style={{
    borderColor: uiColor,
    background: textHover === "medium" ? bgHover : bg,
    color: textHover === "medium" ? fgHover : fg
  }}
>
  <div className="text-xs uppercase tracking-widest opacity-60">
    Section Header
  </div>
  <div style={{ fontSize: "26px", fontWeight: 600 }}>
    Readability & Layout Balance
  </div>
</div>


{/* NORMAL TEXT */}
<div
  onMouseEnter={() => setTextHover("normal")}
  onMouseLeave={() => setTextHover(null)}
  className="rounded-xl p-6 border border-dashed transition-all"
  style={{
    borderColor: uiColor,
    background: textHover === "normal" ? bgHover : bg,
    color: textHover === "normal" ? fgHover : fg
  }}
>
  <div className="text-xs uppercase tracking-widest opacity-60">
    Body Text
  </div>
  <div style={{ fontSize: "16px", lineHeight: 1.7 }}>
    This paragraph shows normal reading text. Spend a few seconds here and
    see if your eyes feel comfortable or strained.
  </div>
</div>


{/* SMALL TEXT */}
<div
  onMouseEnter={() => setTextHover("small")}
  onMouseLeave={() => setTextHover(null)}
  className="rounded-xl p-6 border border-dashed transition-all"
  style={{
    borderColor: uiColor,
    background: textHover === "small" ? bgHover : bg,
    color: textHover === "small" ? fgHover : fg
  }}
>
  <div className="text-xs uppercase tracking-widest opacity-60">
    Small Text / Labels
  </div>
  <div style={{ fontSize: "12.5px", opacity: 0.85 }}>
    Helper labels, captions, timestamps and metadata live here.
  </div>
</div>


</div>


          {/* =================== HOVER PREVIEW =================== */}

          <div className="col-span-12 md:col-span-4">
            <BackgroundHoverSliders
              bgHover={bgHover}
              setBgHover={setBgHover}
              uiColor={uiColor}
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <div
              className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center"
              style={{
                borderColor: uiColor,
                minHeight: "200px",
                padding: "32px",
                borderRadius: "20px"
              }}
                          >
              <HoverPreviewButton
                fg={fg}
                bg={bg}
                fgHover={fgHover}
                bgHover={bgHover}
              />
              <div
  style={{
    marginTop: "12px",
    fontSize: "12px",
    opacity: 0.7,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  }}
>
  Hover on the button
</div>


<div className="flex gap-20 mt-8 text-center">

{/* Hover */}
<div>
  <div className="text-sm uppercase tracking-widest opacity-70">
    Hover Contrast
  </div>

  <div
    className="text-5xl font-bold leading-none mt-1"
    style={{ color: uiColor }}
  >
    {hoverRatio.toFixed(2)}
  </div>
</div>

{/* Normal */}
<div>
  <div className="text-sm uppercase tracking-widest opacity-70">
    Normal Contrast
  </div>

  <div
    className="text-5xl font-bold leading-none mt-1"
    style={{ color: uiColor }}
  >
    {ratio.toFixed(2)}
  </div>
</div>

</div>

            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <ForegroundHoverSliders
              fgHover={fgHover}
              setFgHover={setFgHover}
              uiColor={uiColor}
            />
          </div>

          {/* =================== GRADIENT =================== */}

          <div className="col-span-12 mt-8">
            <GradientContrastChecker fg={fg} uiColor={uiColor} />
          </div>

        </div>
      </div>
    </div>
  );
}
