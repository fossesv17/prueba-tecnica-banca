import { NavRow, SectionTitle, QuotaSlider } from "../ui";

export function StepLoan({ data, onChange, onNext, onBack }) {
  return (
    <>
      <SectionTitle>Credito</SectionTitle>
        <QuotaSlider defaultAmount={data.loan_amount} term={data.loan_term} onTermChange={(val) => onChange("loan_term", String(val))} onAmountChange={(val) => onChange("loan_amount", String(val))}></QuotaSlider>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Evaluar →"/>
    </>
  );
}