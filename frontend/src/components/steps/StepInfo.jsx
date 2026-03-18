import { Field, Input, FormGrid, NavRow, SectionTitle } from "../ui";

export function StepInfo({ data, onChange, onNext, onBack }) {
  const f = (key) => (e) => onChange(key, e.target.value);

  return (
    <>
      <SectionTitle>Situacion Economica</SectionTitle>

      <FormGrid>
        <Field label="Empleo">
          <Input placeholder="Ingeniero Electrico" value={data.job} onChange={f("job")} />
        </Field>

        <Field label="Sueldo (CLP)">
          <Input type="number" placeholder="1500000" value={data.income} onChange={f("income")} />
        </Field>

        <Field label="Otros ingresos">
          <Input type="number" placeholder="500000" value={data.added} onChange={f("added")} />
        </Field>

        <Field label="Gastos (CLP)">
          <Input type="number" placeholder="500000" value={data.expenses} onChange={f("expenses")} />
        </Field>

        <Field label="Deuda">
          <Input type="number" placeholder="100000" value={data.debt} onChange={f("debt")} />
        </Field>
      </FormGrid>

      <NavRow onBack={onBack} onNext={onNext} />
    </>
  );
}