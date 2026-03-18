import { C } from "./constants/theme";
import { useForm }      from "./hooks/useForm";
import { useStepper } from "./hooks/useStepper";
import { Stepper } from "./components/Stepper";
import { StepIdentity, StepInfo, StepLoan } from "./components/steps";
import { StepResult } from "./components/steps/StepResult";

function App() {
  const { form, setField } = useForm();
  const { step, result, goNext, goBack } = useStepper(form);

  // const applicantName = [form.name, form.last_name].filter(Boolean).join(" ");

  return (
    <div style={{
      minHeight:  "100vh",
      background: C.bg,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding:    "2rem 1rem",
      color:      C.text,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #4a4860; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        select option { background: #16161a; }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }} />
            <span style={{
              fontSize:      11,
              fontWeight:    500,
              color:         C.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Banca.me
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: C.text, letterSpacing: "-0.02em", margin: 0 }}>
            Solicitud de credito
          </h1>
        </div>

        <Stepper current={step} />

        {/* Step card */}
        <div style={{
          background:   C.surface,
          borderRadius: 14,
          border:       `1px solid ${C.border}`,
          padding:      "1.75rem",
        }}>
          {step === 0 && (
            <StepIdentity data={form} onChange={setField} onNext={goNext} />
          )}
          {step === 1 && (
            <StepInfo data={form} onChange={setField} onNext={goNext} onBack={goBack} />
          )}
          {step === 2 && (
            <StepLoan data={form} onChange={setField} onNext={goNext} onBack={goBack} />
          )}
          {step === 3 && (
            <StepResult result={result} onChange={setField} onBack={goBack} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
