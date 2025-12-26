import { contrast, normalize } from "../lib/wcag";

export default function ContrastCenter({ ratio, fg, bg }) {
  const r = Number(ratio).toFixed(2);
  const fgNorm = normalize(fg);
  const bgNorm = normalize(bg);
  const c = contrast(fgNorm, bgNorm);

  const readable = (against) => {
    const cb = contrast("#000", against);
    const cw = contrast("#fff", against);
    return cw > cb ? "#fff" : "#000";
  };

  const ratioColor = c < 2 ? readable(bgNorm) : fgNorm;

  return (
    <div className="flex flex-col items-center">
      <div className="ratio-num" style={{ color: ratioColor }}>{r}</div>
    </div>
  );
}
