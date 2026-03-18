import { C } from "../constants/theme";
import { STEP_LABELS } from "../constants/options";

export function Stepper({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "2rem" }}>
      {STEP_LABELS.map((label, i) => {
        const done   = i < current;
        const active = i === current;

        return (
          <div
            key={i}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
          >
            {i < STEP_LABELS.length - 1 && (
              <div style={{
                position:   "absolute",
                top:        15,
                left:       "55%",
                width:      "90%",
                height:     1,
                background: done ? C.accent : C.border,
                zIndex:     0,
                transition: "background 0.3s",
              }} />
            )}

            <div style={{
              width:      30,
              height:     30,
              borderRadius: "50%",
              zIndex:     1,
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize:   12,
              fontWeight: 600,
              transition: "all 0.2s",
              border:     `1.5px solid ${done || active ? C.accent : C.border}`,
              background: done ? C.accent : active ? C.accentBg : C.surface,
              color:      done ? "#fff"   : active ? C.infoText  : C.muted,
            }}>
              {done ? "✓" : i + 1}
            </div>

            <span style={{
              fontSize:   11,
              marginTop:  6,
              color:      active ? C.infoText : done ? C.muted : C.subtle,
              fontWeight: active ? 500 : 400,
            }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
