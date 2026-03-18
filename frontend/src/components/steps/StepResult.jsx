import { SectionTitle, NavRow, Btn } from "../ui";
import { VerdictBanner } from "../ui/VeredictBanner";

export function StepResult({ result, onBack }) {
    return (
        <>
            <SectionTitle>Evaluación</SectionTitle>
            <VerdictBanner verdict={result}/>
            { result === "approved" && <Btn>Enviar Contrato</Btn>}
            { result === "review" && <Btn>Contactar ejecutivo</Btn>}
            <NavRow onBack={onBack}/>
        </>
    )
}