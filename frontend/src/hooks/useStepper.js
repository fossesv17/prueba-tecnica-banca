import { useState, useCallback } from "react";
// import { runScreening, parseFormData } from "../utils/screening";

/**
 * Manages the step flow and result state for the screening wizard.
 * Decouples navigation logic from the UI layer.
 */
export function useStepper(form) {
  const [step, setStep]     = useState(0);
  const [result, setResult] = useState(null);

  const goTo   = useCallback((n) => setStep(n), []);
  const goBack = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const goNext = useCallback(() => {
    // if (step === 3) {
    //   const parsed = parseFormData(form);
    //   setResult(runScreening(parsed));
    //   setStep(4);
    // } else {
    setStep((s) => s + 1);
    // }
  }, [step, form]);

  return { step, result, goTo, goBack, goNext };
}