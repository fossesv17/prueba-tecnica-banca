import { VERDICT_CONFIG } from "../../constants/veredicts";

export function VerdictBanner({ verdict }) {
  const vc = VERDICT_CONFIG[verdict];

  return (
    <div style={{
      borderRadius: 10,
      padding:      "16px 18px",
      display:      "flex",
      alignItems:   "center",
      gap:          14,
      marginBottom: "1.5rem",
      background:   vc.bg,
      border:       `1px solid ${vc.border}`,
    }}>
      <div style={{
        fontSize:        22,
        width:           36,
        height:          36,
        borderRadius:    "50%",
        background:      "rgba(255,255,255,0.05)",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        color:           vc.titleColor,
        fontWeight:      700,
        flexShrink:      0,
      }}>
        {vc.icon}
      </div>

      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: vc.titleColor }}>{vc.label}</div>
        <div style={{ fontSize: 13, color: "#8886a0", marginTop: 2 }}>{vc.sub}</div>
      </div>
    </div>
  );
}