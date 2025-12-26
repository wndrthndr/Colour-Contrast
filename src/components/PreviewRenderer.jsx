import HoverPreviewButton from "./HoverPreviewButton";

/**
 * PreviewRenderer
 * Renders different UI contexts using the current color palette.
 *
 * Modes:
 * - button  (default) - uses your existing HoverPreviewButton
 * - cards   - 3-card layout
 * - forms   - auth / settings style form
 * - blog    - article + meta + link
 * - alerts  - stacked alerts
 * - navbar  - top navigation bar with CTA
 */
export default function PreviewRenderer({
  mode,
  fg,
  bg,
  fgHover,
  bgHover,
}) {
  switch (mode) {
    case "cards":
      return <CardsPreview fg={fg} bg={bg} fgHover={fgHover} />;
    case "forms":
      return (
        <FormsPreview
          fg={fg}
          bg={bg}
          fgHover={fgHover}
          bgHover={bgHover}
        />
      );
    case "blog":
      return <BlogPreview fg={fg} bg={bg} />;
    case "alerts":
      return <AlertsPreview fg={fg} bg={bg} />;
    case "navbar":
      return <NavbarPreview fg={fg} bg={bg} fgHover={fgHover} />;
    default:
      return (
        <HoverPreviewButton
          fg={fg}
          bg={bg}
          fgHover={fgHover}
          bgHover={bgHover}
        />
      );
  }
}

/* ===================== HELPERS ===================== */

const clamp = (v, min = 0, max = 255) => Math.max(min, Math.min(max, v));

function hexToRgb(hex) {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean =
      clean[0] +
      clean[0] +
      clean[1] +
      clean[1] +
      clean[2] +
      clean[2];
  }
  const num = parseInt(clean || "000000", 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgba(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function lighten(hex, amount = 0.12) {
  const { r, g, b } = hexToRgb(hex);
  const nr = clamp(r + (255 - r) * amount);
  const ng = clamp(g + (255 - g) * amount);
  const nb = clamp(b + (255 - b) * amount);
  return rgbToHex(nr, ng, nb);
}

function darken(hex, amount = 0.15) {
  const { r, g, b } = hexToRgb(hex);
  const nr = clamp(r * (1 - amount));
  const ng = clamp(g * (1 - amount));
  const nb = clamp(b * (1 - amount));
  return rgbToHex(nr, ng, nb);
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.round(clamp(x)).toString(16).padStart(2, "0"))
      .join("")
  );
}

/* ===================== PREVIEWS ===================== */

/* ---------- CARDS PREVIEW ---------- */
function CardsPreview({ fg, bg, fgHover }) {
  const cardBorder = rgba(fg, 0.18);
  const subtleBg = lighten(bg, 0.04);
  const badgeBg = rgba(fg, 0.1);
  const badgeText = darken(fg, 0.1);
  const accent = fgHover || fg;

  const cards = [
    {
      title: "Primary Action Card",
      body: "Use this to preview primary CTAs and important content blocks.",
      meta: "Critical interaction",
    },
    {
      title: "Secondary Card",
      body: "Good for supporting content, settings, or secondary flows.",
      meta: "Secondary surfaces",
    },
    {
      title: "Muted / Info Card",
      body: "Subtle information blocks, empty states or helper content.",
      meta: "Low emphasis",
    },
  ];

  return (
    <div
      style={{
        background: subtleBg,
        padding: 16,
        borderRadius: 18,
        display: "grid",
        gap: 12,
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          opacity: 0.7,
          marginBottom: 4,
          color: darken(fg, 0.1),
        }}
      >
        Card Layout Preview
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: 16,
              border: `1px solid ${cardBorder}`,
              padding: 14,
              background: bg,
              boxShadow:
                "0 10px 30px rgba(15, 23, 42, 0.10)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 999,
                background: badgeBg,
                color: badgeText,
                alignSelf: "flex-start",
              }}
            >
              {card.meta}
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                opacity: 0.8,
              }}
            >
              {card.body}
            </div>
            <button
              type="button"
              style={{
                marginTop: 8,
                alignSelf: "flex-start",
                padding: "6px 12px",
                borderRadius: 999,
                border: "none",
                background: accent,
                color: bg,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            >
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- FORMS PREVIEW ---------- */
function FormsPreview({ fg, bg, fgHover, bgHover }) {
  const border = rgba(fg, 0.2);
  const label = rgba(fg, 0.7);
  const inputBg = bgHover || lighten(bg, 0.04);
  const primary = fg;
  const primaryText = bg;
  const subtleText = rgba(fg, 0.6);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        borderRadius: 18,
        padding: 18,
        background: lighten(bg, 0.02),
        boxShadow:
          "0 18px 45px rgba(15, 23, 42, 0.16)",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        Sign in to your workspace
      </div>
      <div
        style={{
          fontSize: 13,
          opacity: 0.7,
          marginBottom: 16,
        }}
      >
        Preview how forms, labels and helper text behave with your colors.
      </div>

      <form
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        <div style={{ display: "grid", gap: 4 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: label,
            }}
          >
            Email
          </label>
          <input
            placeholder="you@example.com"
            style={{
              padding: "9px 10px",
              borderRadius: 10,
              border: `1px solid ${border}`,
              background: inputBg,
              color: fg,
              fontSize: 13,
              outline: "none",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 0 2px ${rgba(
                fgHover || fg,
                0.45
              )}`)
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: label,
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              padding: "9px 10px",
              borderRadius: 10,
              border: `1px solid ${border}`,
              background: inputBg,
              color: fg,
              fontSize: 13,
              outline: "none",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 0 2px ${rgba(
                fgHover || fg,
                0.45
              )}`)
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: subtleText,
            }}
          >
            <input type="checkbox" />
            Remember me
          </label>
          <button
            type="button"
            style={{
              border: "none",
              background: "transparent",
              color: fgHover || fg,
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="button"
          style={{
            marginTop: 8,
            padding: "10px 12px",
            borderRadius: 999,
            border: "none",
            background: primary,
            color: primaryText,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          Continue
        </button>

        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            textAlign: "center",
            color: subtleText,
          }}
        >
          This form uses your palette to test label, input and helper contrast.
        </div>
      </form>
    </div>
  );
}

/* ---------- BLOG PREVIEW ---------- */
function BlogPreview({ fg, bg }) {
  const meta = rgba(fg, 0.6);
  const divider = rgba(fg, 0.12);
  const link = darken(fg, 0.1);

  return (
    <article
      style={{
        width: "100%",
        maxWidth: 540,
        background: lighten(bg, 0.02),
        color: fg,
        padding: 18,
        borderRadius: 18,
        boxShadow:
          "0 18px 40px rgba(15, 23, 42, 0.12)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: meta,
          marginBottom: 6,
        }}
      >
        Blog preview
      </div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 650,
          marginBottom: 6,
        }}
      >
        Designing for comfortable reading contrast
      </h2>
      <div
        style={{
          fontSize: 12,
          color: meta,
          marginBottom: 12,
        }}
      >
        5 min read · UI Accessibility
      </div>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 10,
        }}
      >
        This preview helps you judge how long-form content feels with your
        current palette. Pay attention to body text, muted meta information
        and inline links.
      </p>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 12,
          opacity: 0.9,
        }}
      >
        Good contrast is not just about passing WCAG — it&apos;s also about
        perceived comfort over time, especially for dense content like docs,
        dashboards or documentation pages.
      </p>

      <hr
        style={{
          border: "none",
          borderTop: `1px solid ${divider}`,
          margin: "12px 0",
        }}
      />

      <a
        href="#"
        style={{
          fontSize: 13,
          color: link,
          textDecoration: "underline",
          fontWeight: 500,
        }}
      >
        View full article →
      </a>
    </article>
  );
}

/* ---------- ALERTS PREVIEW ---------- */
function AlertsPreview({ fg, bg }) {
  const surface = lighten(bg, 0.02);
  const subtle = rgba(fg, 0.65);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 540,
        background: surface,
        padding: 16,
        borderRadius: 18,
        boxShadow:
          "0 16px 38px rgba(15, 23, 42, 0.12)",
        display: "grid",
        gap: 10,
      }}
    >
      <div
        style={{
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: subtle,
        }}
      >
        Alert stack preview
      </div>

      <AlertRow
        tone="success"
        title="Success state"
        body="Everything looks good. This is how success and confirmation messages look."
      />
      <AlertRow
        tone="warning"
        title="Warning state"
        body="This is a low-risk warning. Check how readable this is at a glance."
      />
      <AlertRow
        tone="error"
        title="Error state"
        body="High-priority messages should remain readable even in noisy layouts."
      />
    </div>
  );
}

function AlertRow({ tone, title, body }) {
  const palette = {
    success: {
      bg: "rgba(34, 197, 94, 0.10)",
      border: "rgba(34, 197, 94, 0.7)",
      chip: "rgba(34, 197, 94, 0.9)",
      label: "Success",
    },
    warning: {
      bg: "rgba(250, 204, 21, 0.10)",
      border: "rgba(250, 204, 21, 0.7)",
      chip: "rgba(250, 204, 21, 0.85)",
      label: "Warning",
    },
    error: {
      bg: "rgba(239, 68, 68, 0.10)",
      border: "rgba(239, 68, 68, 0.7)",
      chip: "rgba(239, 68, 68, 0.9)",
      label: "Error",
    },
  }[tone];

  return (
    <div
      style={{
        borderRadius: 14,
        padding: 10,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        display: "grid",
        gap: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "999px",
            background: palette.chip,
          }}
        />
        {title}
      </div>
      <div style={{ fontSize: 12, opacity: 0.85 }}>{body}</div>
    </div>
  );
}

/* ---------- NAVBAR PREVIEW ---------- */
function NavbarPreview({ fg, bg, fgHover }) {
  const navBg = fg; // invert: dark nav on light bg, or vice versa
  const navText = bg;
  const pillBg = fgHover || bg;
  const pillText = fgHover ? bg : fg;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 999,
        overflow: "hidden",
        boxShadow:
          "0 18px 40px rgba(15, 23, 42, 0.15)",
      }}
    >
      <div
        style={{
          background: navBg,
          color: navText,
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: navText,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            PaletteLab
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 13,
          }}
        >
          <span style={{ opacity: 0.9 }}>Dashboard</span>
          <span style={{ opacity: 0.7 }}>Tokens</span>
          <span style={{ opacity: 0.7 }}>Docs</span>
          <span style={{ opacity: 0.7 }}>Changelog</span>
        </div>

        <button
          type="button"
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            border: "none",
            background: pillBg,
            color: pillText,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          New project
        </button>
      </div>
    </div>
  );
}
