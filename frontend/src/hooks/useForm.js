import { useState, useCallback } from "react";
import { INITIAL_FORM } from "../constants/initialForm";

/**
 * Manages the flat form state for the screening wizard.
 * Returns the current values, a field setter, and a reset function.
 */
export function useForm() {
  const [form, setForm] = useState(INITIAL_FORM);

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setForm(INITIAL_FORM), []);

  return { form, setField, reset };
}