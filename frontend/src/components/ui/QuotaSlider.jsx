import { useState, useMemo } from "react";
import { C } from "../../constants/theme";
import { MetricCard } from "./MetricCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const QUOTA_STEPS = [1, 2, 3, 6, 12, 18, 24, 36];

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function calcMonthlyPayment(principal, annualRate, months) {
  if (months <= 0) return principal;
  const mr = annualRate / 100 / 12;
  if (mr === 0) return principal / months;
  return (principal * (mr * Math.pow(1 + mr, months))) / (Math.pow(1 + mr, months) - 1);
}

function buildSchedule(principal, annualRate, months) {
  const mr      = annualRate / 100 / 12;
  const payment = calcMonthlyPayment(principal, annualRate, months);
  const rows    = [];
  let balance   = principal;

  for (let i = 1; i <= months; i++) {
    const interest  = balance * mr;
    const principal_ = payment - interest;
    balance         = Math.max(0, balance - principal_);
    rows.push({ num: i, payment, interest, balance });
  }
  return rows;
}

function fmt(n) {
  return "$" + Math.round(n).toLocaleString();
}

function InputField({ label, value, onChange, step, min, max }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{
        fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em",
      }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: `1px solid ${focused ? C.accent : C.border}`,
          borderRadius: 8, padding: "8px 10px", fontSize: 14,
          fontFamily: "inherit", background: C.surface,
          color: C.text, outline: "none", transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}

function PipTrack({ filled, total }) {
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "1.25rem" }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            height: 6, flex: 1, minWidth: 6, borderRadius: 3,
            background: i < filled ? C.accent : C.border,
            transition: "background 0.15s",
          }}
        />
      ))}
    </div>
  );
}

function AmortizationTable({ rows }) {
  const headerStyle = {
    display: "grid", gridTemplateColumns: "36px 1fr 1fr 1fr",
    gap: 8, padding: "6px 0",
    borderBottom: `1px solid ${C.border}`,
    fontSize: 11, color: C.muted,
    textTransform: "uppercase", letterSpacing: "0.04em",
  };
  const rowStyle = {
    display: "grid", gridTemplateColumns: "36px 1fr 1fr 1fr",
    gap: 8, padding: "7px 0",
    borderBottom: `1px solid ${C.border}`,
    fontSize: 13,
  };

  return (
    <>
      <div style={headerStyle}>
        <span>#</span>
        <span>Payment</span>
        <span>Interest</span>
        <span>Balance</span>
      </div>
      <div style={{ maxHeight: 260, overflowY: "auto" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ ...rowStyle, borderBottom: i === rows.length - 1 ? "none" : rowStyle.borderBottom }}>
            <span style={{ color: C.subtle }}>{r.num}</span>
            <span style={{ color: C.text }}>{fmt(r.payment)}</span>
            <span style={{ color: C.muted }}>{fmt(r.interest)}</span>
            <span style={{ color: C.muted }}>{fmt(r.balance)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function QuotaSlider({ defaultAmount, defaultRate = 8.5, onAmountChange, onTermChange }) {
    const [stepIdx,    setStepIdx]    = useState(4); // default = 12 quotas
    const [loanAmount, setLoanAmount] = useState(defaultAmount);
    const [annualRate, setAnnualRate] = useState(defaultRate);

    const quotas = QUOTA_STEPS[stepIdx];

    function handleAmountChange(val) {
        setLoanAmount(val);
        onAmountChange?.(val);
    }

    function handleTermChange(step) {
        setStepIdx(step);
        onTermChange?.(QUOTA_STEPS[stepIdx - 1]);
    }

    const { payment, totalInterest, totalCost, schedule } = useMemo(() => {
    const payment       = calcMonthlyPayment(loanAmount, annualRate, quotas);
    const totalCost     = payment * quotas;
    const totalInterest = totalCost - loanAmount;
    const schedule      = buildSchedule(loanAmount, annualRate, quotas);
    return { payment, totalInterest, totalCost, schedule };
    }, [loanAmount, annualRate, quotas]);

    const maxTotal  = calcMonthlyPayment(loanAmount, annualRate, QUOTA_STEPS[QUOTA_STEPS.length - 1]) * QUOTA_STEPS[QUOTA_STEPS.length - 1];
    const savings   = maxTotal - totalCost;
    const interestPct = ((totalInterest / loanAmount) * 100).toFixed(1);
    const quotaLabel  = quotas === 1 ? "1 cuota" : `${quotas} cuotas`;

    const divider = <div style={{ borderTop: `1px solid ${C.border}`, margin: "1.25rem 0" }} />;

    return (
    <div>
        {/* Inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
        <InputField
            label="Monto a solicitar"
            value={loanAmount}
            onChange={handleAmountChange}
            step={500000}
            min={0}
        />
        </div>

        {divider}

        {/* Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
        <span style={{ fontSize: 13, color: C.muted, whiteSpace: "nowrap" }}>Cuotas</span>
        <input
            type="range"
            min={0}
            max={QUOTA_STEPS.length - 1}
            step={1}
            value={stepIdx}
            onChange={(e) => handleTermChange(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: C.accent }}
        />
        <div style={{
            minWidth: 80, height: 34, display: "flex", alignItems: "center",
            justifyContent: "center", padding: "0 12px",
            background: C.accentBg, color: C.infoText, borderRadius: 8,
            fontSize: 14, fontWeight: 500, border: `1px solid ${C.accentBorder}`,
            whiteSpace: "nowrap",
        }}>
            {quotaLabel}
        </div>
        </div>

        {/* Step labels */}
        {/* <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        {QUOTA_STEPS.map((s, i) => (
            <button
            key={s}
            onClick={() => setStepIdx(i)}
            style={{
                fontSize: 11, color: i === stepIdx ? C.infoText : C.subtle,
                background: "none", border: "none", cursor: "pointer",
                fontWeight: i === stepIdx ? 600 : 400, padding: "2px 4px",
                fontFamily: "inherit",
            }}
            >
            {s}
            </button>
        ))}
        </div> */}

        {/* Pip track */}
        {/* <PipTrack filled={stepIdx + 1} total={QUOTA_STEPS.length} /> */}

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginBottom: "1.25rem" }}>
        <MetricCard label="Cuota mensual" value={fmt(payment)} sub="por cuota" />
        {/* <MetricCard label="Interes total" value={fmt(totalInterest)} sub={`${interestPct}% of principal`} /> */}
        {/* <MetricCard
            label=""
            value={fmt(totalCost)}
            sub={savings > 1 ? `${fmt(savings)} less than 36mo` : "max term selected"}
        /> */}
        </div>
    </div>
    );
}
