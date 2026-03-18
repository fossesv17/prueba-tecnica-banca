import { C } from "../../constants/theme";

export function Field({ label, children, fullWidth = false }) {
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           6,
      gridColumn:    fullWidth ? "1 / -1" : undefined,
    }}>
      <label style={{
        fontSize:      12,
        fontWeight:    500,
        color:         C.muted,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}
