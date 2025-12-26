export function hexToRgb(hex){
  if(!hex) return {r:0,g:0,b:0};
  hex = hex.replace('#','').trim();
  if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const n = parseInt(hex,16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
export function linearize(c){ c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
export function luminance(hex){ const {r,g,b}=hexToRgb(hex); return 0.2126*linearize(r)+0.7152*linearize(g)+0.0722*linearize(b); }
export function contrast(a,b){ try{const L1=luminance(a),L2=luminance(b);return Number(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)).toFixed(2));}catch(e){return 1;} }

export function rgbToHex(r,g,b){ return '#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''); }
export function cssColorToRgb(color) {
  const ctx = document.createElement("canvas").getContext("2d");

  ctx.fillStyle = "#000";
  ctx.fillStyle = color;

  // Invalid color names are ignored by browser
  if (ctx.fillStyle === "#000" && color.toLowerCase() !== "black") {
    return null;
  }

  const value = ctx.fillStyle; // always rgb(...) or hex

  // If browser returned hex
  if (value.startsWith("#")) {
    return hexToRgb(value);
  }

  // Parse rgb(x,y,z)
  const match = value.match(/\d+/g);
  if (!match) return null;

  return {
    r: Number(match[0]),
    g: Number(match[1]),
    b: Number(match[2]),
  };
}
// Custom human color names → actual colors
const CUSTOM_COLORS = {
  "navy blue": "#000080",
  "olive green": "#556b2f",
  "marigold": "#eaa221",
  "mustard yellow": "#ffdb58",
  "forest green": "#228b22",
  "sky blue": "#87ceeb",
  "royal blue": "#4169e1",
  "blood red": "#8a0303",
  "dark violet": "#9400d3",
  "peach": "#ffdab9",
  "mint green": "#98ff98",
  "sea green": "#2e8b57",
  "wine": "#722f37",
  "turquoise blue": "#00ced1",
  "charcoal": "#36454f",
  "ash grey": "#b2beb5",
  "ice blue": "#afeeee",
  "sand": "#c2b280",
  "coffee": "#6f4e37",
  "cream": "#fffdd0"
};


// Convert CSS names, hex, rgb and custom names → hex
export function normalize(input) {
  if (!input) return "#000000";
  input = input.toLowerCase().trim();

  // ✅ Custom names (marigold, navy blue, etc)
  if (CUSTOM_COLORS[input]) {
    return CUSTOM_COLORS[input];
  }

  // ✅ Standard CSS names, rgb(), etc
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillStyle = input;

  if (ctx.fillStyle !== "#000" || input === "black") {
    return ctx.fillStyle.startsWith("#")
      ? ctx.fillStyle
      : rgbToHex(...ctx.fillStyle.match(/\d+/g).map(Number));
  }

  // ✅ HEX normalization (#f00 → #ff0000)
  if (/^#?[0-9a-f]{3}$/.test(input) || /^#?[0-9a-f]{6}$/.test(input)) {
    return input.startsWith("#") ? input : `#${input}`;
  }

  // ❌ Unknown name
  return "#000000";
}
