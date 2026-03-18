import { C } from "../../constants/theme";

export function ToggleGroup({ options, value, onChange }) {
  return (
    <div style={{
      display:      "flex",
      border:       `1px solid ${C.border}`,
      borderRadius: 8,
      overflow:     "hidden",
    }}>
      {options.map((o, i) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              flex:        1,
              padding:     "9px 6px",
              fontSize:    13,
              cursor:      "pointer",
              border:      "none",
              borderLeft:  i > 0 ? `1px solid ${C.border}` : "none",
              background:  active ? C.accentBg : "transparent",
              color:       active ? C.infoText : C.muted,
              fontWeight:  active ? 500 : 400,
              fontFamily:  "inherit",
              transition:  "all 0.15s",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
