import { useState } from "react";
import { C } from "../../constants/theme";

export function Btn({ onClick, children, secondary = false, disabled = false }) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    padding:      "11px 28px",
    borderRadius: 8,
    fontSize:     14,
    fontWeight:   500,
    cursor:       disabled ? "not-allowed" : "pointer",
    fontFamily:   "inherit",
    transition:   "all 0.15s",
    opacity:      disabled ? 0.4 : 1,
  };

  const primaryStyle = {
    background: hovered ? C.accent : C.accentBg,
    color:      hovered ? "#fff"   : C.infoText,
    border:     `1px solid ${hovered ? C.accent : C.accentBorder}`,
  };

  const secondaryStyle = {
    background: hovered ? C.surface : "transparent",
    color:      hovered ? C.text    : C.muted,
    border:     `1px solid ${C.border}`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...(secondary ? secondaryStyle : primaryStyle) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
