import { Field, Input, FormGrid, NavRow, SectionTitle } from "../ui";

export function StepIdentity({ data, onChange, onNext }) {
  const f = (key) => (e) => onChange(key, e.target.value);

  return (
    <>
      <SectionTitle>Datos del Cliente</SectionTitle>

      <FormGrid>
        <Field label="Nombre">
          <Input placeholder="Jorge" value={data.name} onChange={f("name")} />
        </Field>

        <Field label="Apellidos">
          <Input placeholder="Perez Gonzalez" value={data.last_name} onChange={f("last_name")} />
        </Field>

        <Field label="Fecha de nacimiento">
          <Input type="date" value={data.date_of_birth} onChange={f("date_of_birth")} />
        </Field>

        <Field label="RUT">
          <Input placeholder="12.345.678-9" value={data.rut_or_id} onChange={f("rut_or_id")} />
        </Field>

        <Field label="Numero Telefonico">
          <Input type="number" placeholder="+56 9 12345678" value={data.phone_number} onChange={f("phone_number")} />
        </Field>

        <Field label="Correo Electronico">
          <Input type="mail" placeholder="example@mail.com" value={data.email} onChange={f("email")} />
        </Field>
      </FormGrid>

      <NavRow onNext={onNext} />
    </>
  );
}