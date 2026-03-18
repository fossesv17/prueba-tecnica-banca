import { useState, useCallback } from "react";
import { runScreening, parseFormData } from "../utils/screening";

export function useStepper(form) {
  const [step, setStep]     = useState(0);
  const [result, setResult] = useState(null);

  const goTo   = useCallback((n) => setStep(n), []);
  const goBack = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const goNext = useCallback(() => {
    if (step === 2) {
      const parsed = parseFormData(form);
      setResult(runScreening(parsed));
      setStep(3);
    } else {
      setStep((s) => s + 1);
    }
  }, [step, form]);

  return { step, result, goTo, goBack, goNext };
}