import { C } from "../../constants/theme";
import { Btn } from "./Btn";

export function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize:      15,
      fontWeight:    600,
      color:         C.text,
      marginBottom:  "1.25rem",
      paddingBottom: 12,
      borderBottom:  `1px solid ${C.border}`,
      letterSpacing: "-0.01em",
    }}>
      {children}
    </h2>
  );
}

export function FormGrid({ children }) {
  return (
    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap:                 16,
    }}>
      {children}
    </div>
  );
}

export function NavRow({ onBack, onNext, nextLabel = "Continue →" }) {
  return (
    <div style={{
      display:        "flex",
      justifyContent: onBack ? "space-between" : "flex-end",
      marginTop:      "1.75rem",
      gap:            12,
    }}>
      {onBack && <Btn secondary onClick={onBack}>← Back</Btn>}
      {onNext && <Btn onClick={onNext}>{nextLabel}</Btn>}
    </div>
  );
}
