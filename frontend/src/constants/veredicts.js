import { C } from "./theme";

export const VERDICT_CONFIG = {
  approved: {
    bg:         C.successBg,
    border:     C.successBorder,
    titleColor: C.success,
    icon:       "✓",
    label:      "Aprobado",
    sub:        "Cliente cumple con los requisitos para acceder a credito",
  },
  review: {
    bg:         C.warningBg,
    border:     C.warningBorder,
    titleColor: C.warning,
    icon:       "◎",
    label:      "Revision",
    sub:        "Requiere de revisión con ejecutivo",
  },
  declined: {
    bg:         C.dangerBg,
    border:     C.dangerBorder,
    titleColor: C.danger,
    icon:       "✕",
    label:      "Rechazado",
    sub:        "Cliente no cumple  con requisitos para acceder a credito",
  },
};

export const STATUS_COLORS = {
  pass: { icon: "✓", bg: "#0d2218", text: C.success },
  warn: { icon: "!", bg: "#261b0b", text: C.warning },
  fail: { icon: "✕", bg: "#230d0d", text: C.danger },
};

/** Maps a numeric score to a semantic status key */
export function scoreToStatus(score) {
  if (score >= 70) return "good";
  if (score >= 45) return "warn";
  return "bad";
}

/** Maps a semantic status to a color from C */
export const STATUS_VALUE_COLORS = {
  good: C.success,
  warn: C.warning,
  bad:  C.danger,
};
