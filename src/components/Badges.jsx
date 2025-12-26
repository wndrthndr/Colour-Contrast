import { contrast, normalize } from "../lib/wcag";

export default function Badges({ ratio, bg, fg }) {

  const readable = (bgColor) => {
    const cWhite = contrast("#fff", bgColor);
    const cBlack = contrast("#000", bgColor);
    return cWhite > cBlack ? "#fff" : "#000";
  };

  const bgNorm = normalize(bg);
  const fgNorm = normalize(fg);
  const textColor = readable(bgNorm);

  const passesAALarge = ratio >= 3;
  const passesAAALarge = ratio >= 4.5;
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;

  const isGood = ratio > 3;

  // ✅ BASE CARD STYLE
  const badgeBase = {
    background: isGood ? fgNorm : "#ffffff",
    color: isGood ? bgNorm : "#000000",
    padding: "10px 14px",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "110px",
    gap: "2px",
    transition: "all 0.3s ease",

  };

  // ✅ LARGE STATUS TEXT
  const statusStyle = {
    fontSize: "26px",     // ✅ larger
    fontWeight: 800,     // ✅ slightly softer
    lineHeight: "1.1"
  };
  

  // ✅ SMALL LABEL
  const labelStyle = {
    fontSize: "19px",
    opacity: 0.75,
    letterSpacing: "0.4px",
  };

  return (
    <div className="flex gap-4 flex-wrap">

      <div style={badgeBase}>
        <div style={statusStyle}>
          {passesAALarge ? "PASS ✓" : "FAIL ✕"}
        </div>
        <div style={labelStyle}>AA TITLE</div>
      </div>

      <div style={badgeBase}>
        <div style={statusStyle}>
          {passesAAALarge ? "PASS ✓" : "FAIL ✕"}
        </div>
        <div style={labelStyle}>AAA Large</div>
      </div>

      <div style={badgeBase}>
        <div style={statusStyle}>
          {passesAA ? "PASS ✓" : "FAIL ✕"}
        </div>
        <div style={labelStyle}>AA Normal</div>
      </div>

      <div style={badgeBase}>
        <div style={statusStyle}>
          {passesAAA ? "PASS ✓" : "FAIL ✕"}
        </div>
        <div style={labelStyle}>AAA Small</div>
      </div>

    </div>
  );
}
