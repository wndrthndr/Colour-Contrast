// ================================
// HEX → HSL CONVERTER
// ================================
export function hexToHsl(hex) {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map(c => c + c).join("");
  }

  const r = parseInt(clean.substr(0, 2), 16) / 255;
  const g = parseInt(clean.substr(2, 2), 16) / 255;
  const b = parseInt(clean.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h, s, l };
}


// ================================
// CONFIDENCE SCALER
// ================================
function confidenceLabel(value) {
  if (value >= 85) return "Extreme";
  if (value >= 70) return "Very high";
  if (value >= 55) return "High";
  if (value >= 40) return "Moderate";
  if (value >= 25) return "Low";
  return "Weak";
}


// ================================
// MOOD DETECTOR
// ================================
export function detectMood({ fg, bg, contrastRatio }) {
  const { h, s, l } = hexToHsl(bg);

  // Mood scoring model
  const moods = {
    calm: 0,
    aggressive: 0,
    luxury: 0,
    sterile: 0,
  };

  // Hue classification
  const hue = {
    warm: h < 50 || h > 330,
    cool: h > 140 && h < 260,
    gold: h > 40 && h < 70,
    purple: h > 260 && h < 310,
    neutral: s < 0.15,
  };

  // ================= CALM =================
  moods.calm += hue.cool ? 2 : 0;
  moods.calm += s < 0.45 ? 1.4 : 0;
  moods.calm += l > 0.45 && l < 0.8 ? 1.4 : 0;
  moods.calm += contrastRatio < 7 ? 0.8 : 0;

  // ================= AGGRESSIVE =================
  moods.aggressive += hue.warm ? 2 : 0;
  moods.aggressive += s > 0.6 ? 2 : 0;
  moods.aggressive += contrastRatio > 6 ? 1.2 : 0;

  // ================= LUXURY =================
  moods.luxury += l < 0.28 ? 2 : 0;
  moods.luxury += hue.gold ? 2 : 0;
  moods.luxury += hue.purple ? 2 : 0;
  moods.luxury += s > 0.45 && s < 0.75 ? 1 : 0;
  moods.luxury += contrastRatio >= 7 ? 1.8 : 0;

  // ================= STERILE =================
  moods.sterile += l > 0.85 ? 2 : 0;
  moods.sterile += s < 0.18 ? 2 : 0;
  moods.sterile += hue.cool ? 1 : 0;
  moods.sterile += contrastRatio > 8 ? 1 : 0;

  // ================= NORMALIZE =================
  const maxScore = Math.max(...Object.values(moods));

  const normalized = {};
  for (const key in moods) {
    normalized[key] = Math.round((moods[key] / maxScore) * 100);
  }

  const ranked = Object.entries(normalized)
    .sort((a, b) => b[1] - a[1]);

  const main = ranked[0];
  const secondary = ranked[1];

  const labels = {
    calm: "Calm",
    aggressive: "Aggressive",
    luxury: "Luxury",
    sterile: "Sterile",
  };

  const reasons = {
    calm: "Cool hues and soft saturation create a relaxed mood.",
    aggressive: "Warm colors with strong contrast feel energetic.",
    luxury: "Dark, rich tones with high contrast feel premium.",
    sterile: "Very bright and desaturated colors feel clinical.",
  };

  // ================= RETURN =================
  return {
    label: labels[main[0]],
    confidence: main[1],
    strength: confidenceLabel(main[1]),
    oneLine: `${labels[main[0]]} · ${confidenceLabel(main[1])} confidence`,
    reason: reasons[main[0]],
    debug: {
      hue: Math.round(h),
      saturation: +(s.toFixed(2)),
      lightness: +(l.toFixed(2)),
      contrast: +(contrastRatio.toFixed(2)),
    }
  };
}
