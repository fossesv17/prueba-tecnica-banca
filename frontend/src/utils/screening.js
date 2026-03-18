export function runScreening(data) {
    const {
        income = 0,
        added = 0,
        expenses = 0,
        loan_amount = 0,
        loan_term = 0,
    } = data;

    let veredict = "";
    const total_income = income + added;
    const available_monthly = total_income - expenses;
    console.log(loan_amount, loan_term)
    const downpayment = Math.trunc(loan_amount / loan_term);
    
    if (available_monthly > downpayment) {
        veredict = "approved";
    }
    else if (available_monthly === downpayment) {
        veredict = "review";
    }
    else {
        veredict = "declined";
    }
    return veredict;
}

export function parseFormData(raw) {
    return {
        ...raw,
        income: parseFloat(raw.income) || 0,
        added: parseFloat(raw.added) || 0,
        expenses: parseFloat(raw.expenses) || 0,
        debt: parseFloat(raw.debt) || 0,
        loan_amount: parseFloat(raw.loan_amount) || 0,
        loan_term: parseFloat(raw.loan_term) || 0,
    }
}