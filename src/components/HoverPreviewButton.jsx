import { useState } from "react";

export default function HoverPreviewButton({ fg, bg, fgHover, bgHover }) {
  const [isHover, setIsHover] = useState(false);

  const style = {
    background: isHover ? bgHover : bg,
    color: isHover ? fgHover : fg,
    width: "100%",
    maxWidth: "340px",
    height: "120px",
    borderRadius: "16px",
    border: "2px dotted currentColor",
    fontWeight: 700,
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 220ms ease-in-out",
  };

  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={style}
    >
      {isHover ? "Hover state" : "Normal state"}
    </button>
  );
}
