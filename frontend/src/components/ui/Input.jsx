import { useState } from "react";
import { C, inputStyle } from "../../constants/theme";

export function Input({ id, type = "text", placeholder, value, onChange, min, max }) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      style={{ ...inputStyle, borderColor: focused ? C.accent : C.border }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
