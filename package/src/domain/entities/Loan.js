export const createLoan = (loan) => {
    return Object.freeze({
        id: loan.id,
        amount: loan.amount,
        status: loan.status,
        date_start: loan.date_start,
        date_end: loan.date_end
    })
}
