import { Field, Input, Select, FormGrid, NavRow, SectionTitle } from "../ui";

export function StepLoan({ data, onChange, onNext, onBack }) {
  const f = (key) => (e) => onChange(key, e.target.value);

  return (
    <>
      <SectionTitle>Credito</SectionTitle>

      <FormGrid>
        <Field label="Sueldo (CLP)">
          <Input type="number" placeholder="1500000" value={data.income} onChange={f("income")} />
        </Field>

        <Field label="Cuotas">
          <Input type="number" placeholder="500000" value={data.added} onChange={f("added")} />
        </Field>
      </FormGrid>

      <NavRow onBack={onBack} onNext={onNext} />
    </>
  );
}