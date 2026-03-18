import { useState } from "react";
import { C, inputStyle } from "../../constants/theme";

export function Select({ id, value, onChange, options }) {
  const [focused, setFocused] = useState(false);

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, borderColor: focused ? C.accent : C.border, cursor: "pointer" }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
