import { fail, ok } from "package/src/domain/shared/result";

export const makeDeleteLoan = ({ loanRepository }) => {
    return async (id) => {
        try {
            await loanRepository.deleteLoan(id);
            return ok(null);
        } catch (error) {
            return fail("LOAN_DELETION_ERROR", error?.message || "Failed to delete loan");
        }
    }
}