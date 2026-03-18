import { C } from "../../constants/theme";

export function MetricCard({ label, value, sub }) {
  return (
    <div style={{
      background: C.surface, borderRadius: 8, padding: "12px 14px",
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, color: C.text }}>{value}</div>
      <div style={{ fontSize: 11, color: C.subtle, marginTop: 2 }}>{sub}</div>
    </div>
  );
}