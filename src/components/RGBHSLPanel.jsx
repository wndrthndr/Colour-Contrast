import { useEffect, useState } from "react";
import { hexToRgb, rgbToHex } from "../lib/wcag";

// small HSL helpers
function rgbToHsl(r,g,b){
  r/=255;g/=255;b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h=0,s=0,l=(max+min)/2;
  if(max!==min){
    const d=max-min;
    s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h/=6;
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}

function hslToRgb(h,s,l){
  h/=360; s/=100; l/=100;
  if(s===0){ const v=Math.round(l*255); return {r:v,g:v,b:v}; }
  const q = l<0.5 ? l*(1+s) : l+s - l*s;
  const p = 2*l - q;
  const hue2rgb = (p,q,t) => {
    if(t<0) t+=1; if(t>1) t-=1;
    if(t<1/6) return p+(q-p)*6*t;
    if(t<1/2) return q;
    if(t<2/3) return p+(q-p)*(2/3-t)*6;
    return p;
  };
  const r = Math.round(hue2rgb(p,q,h+1/3)*255);
  const g = Math.round(hue2rgb(p,q,h)*255);
  const b = Math.round(hue2rgb(p,q,h-1/3)*255);
  return {r,g,b};
}

export default function RGBHSLPanel({ hex, setHex }) {
  // sync hex <-> rgb sliders
  const rgb = hexToRgb(hex);
  const [r,setR] = useState(rgb.r);
  const [g,setG] = useState(rgb.g);
  const [b,setB] = useState(rgb.b);
  const [tab,setTab] = useState("RGB");

  useEffect(()=> setHex(rgbToHex(r,g,b)), [r,g,b]);

  useEffect(()=>{
    const rgb2 = hexToRgb(hex);
    setR(rgb2.r); setG(rgb2.g); setB(rgb2.b);
  }, [hex]);

  const slider = (label, val, setVal) => (
    <div className="mb-4">
      <div className="text-sm small-muted mb-1">{label} {val}</div>
      <input type="range" min="0" max="255" value={val}
        onChange={(e)=> setVal(Number(e.target.value))}
        style={{ background: "#d9d9d9" }}
        className="w-full"/>
    </div>
  );

  const hsl = rgbToHsl(r,g,b);
  const [hh,ss,ll] = [hsl.h,hsl.s,hsl.l];

  return (
    <div>
      <div className="tab-list">
        <button className={`tab ${tab==="RGB"?"font-bold":""}`} onClick={()=>setTab("RGB")}>RGB</button>
        <button className={`tab ${tab==="HSL"?"font-bold":""}`} onClick={()=>setTab("HSL")}>HSL</button>
      </div>

      <div className="panel-thick">
        {tab==="RGB" ? (
          <>
            {slider("Red", r, setR)}
            {slider("Green", g, setG)}
            {slider("Blue", b, setB)}
          </>
        ) : (
          <>
            <div className="mb-4 small-muted">Hue {hh}</div>
            <input type="range" min="0" max="360" value={hh} disabled className="w-full mb-4" />
            <div className="mb-4 small-muted">Saturation {ss}</div>
            <input type="range" min="0" max="100" value={ss} disabled className="w-full mb-4" />
            <div className="mb-4 small-muted">Lightness {ll}</div>
            <input type="range" min="0" max="100" value={ll} disabled className="w-full" />
          </>
        )}
      </div>
    </div>
  );
}
