import { makeCreateLoan } from "../../../package/src/domain/usecases/loans/CreateLoan";
import { makeGetLoans } from "../../../package/src/domain/usecases/loans/GetLoans";
import { makeGetLoanById } from "../../../package/src/domain/usecases/loans/GetLoanById";
import { makeUpdateLoan } from "../../../package/src/domain/usecases/loans/UpdateLoan";
import { makeDeleteLoan } from "../../../package/src/domain/usecases/loans/DeleteLoan";

// ── helpers ──────────────────────────────────────────────────────────────

const makeMockRepo = (overrides = {}) => ({
    getLoans: jest.fn(),
    getLoanById: jest.fn(),
    createLoan: jest.fn(),
    updateLoan: jest.fn(),
    deleteLoan: jest.fn(),
    ...overrides,
});

// ── CreateLoan ───────────────────────────────────────────────────────────

describe("makeCreateLoan", () => {
    it("returns ok with the created loan on success", async () => {
        const created = { id: 1, borrower: "Alice", amount: 5000 };
        const loanRepository = makeMockRepo({
            createLoan: jest.fn().mockResolvedValue(created),
        });
        const createLoan = makeCreateLoan({ loanRepository });

        const result = await createLoan({ borrower: "Alice", amount: 5000 });

        expect(loanRepository.createLoan).toHaveBeenCalledWith({ borrower: "Alice", amount: 5000 });
        expect(result).toEqual({ ok: true, value: created, error: null });
    });

    it("returns fail when repository throws", async () => {
        const loanRepository = makeMockRepo({
            createLoan: jest.fn().mockRejectedValue(new Error("DB error")),
        });
        const createLoan = makeCreateLoan({ loanRepository });

        const result = await createLoan({ borrower: "Alice", amount: 5000 });

        expect(result.ok).toBe(false);
        expect(result.error).toEqual({
            code: "LOAN_CREATION_ERROR",
            message: "DB error",
        });
    });

    it("uses default message when error has no message", async () => {
        const loanRepository = makeMockRepo({
            createLoan: jest.fn().mockRejectedValue({}),
        });
        const createLoan = makeCreateLoan({ loanRepository });

        const result = await createLoan({});

        expect(result.ok).toBe(false);
        expect(result.error.message).toBe("Failed to create loan");
    });
});

// ── GetLoans ─────────────────────────────────────────────────────────────

describe("makeGetLoans", () => {
    it("returns ok with list of loans on success", async () => {
        const loans = [{ id: 1 }, { id: 2 }];
        const loanRepository = makeMockRepo({
            getLoans: jest.fn().mockResolvedValue(loans),
        });
        const getLoans = makeGetLoans({ loanRepository });

        const result = await getLoans();

        expect(loanRepository.getLoans).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ ok: true, value: loans, error: null });
    });

    it("returns fail when repository throws", async () => {
        const loanRepository = makeMockRepo({
            getLoans: jest.fn().mockRejectedValue(new Error("Timeout")),
        });
        const getLoans = makeGetLoans({ loanRepository });

        const result = await getLoans();

        expect(result.ok).toBe(false);
        expect(result.error).toEqual({
            code: "LOAN_GETTING_ERROR",
            message: "Timeout",
        });
    });

    it("uses default message when error has no message", async () => {
        const loanRepository = makeMockRepo({
            getLoans: jest.fn().mockRejectedValue(null),
        });
        const getLoans = makeGetLoans({ loanRepository });

        const result = await getLoans();

        expect(result.ok).toBe(false);
        expect(result.error.message).toBe("Failed to get loans");
    });
});

// ── GetLoanById ──────────────────────────────────────────────────────────

describe("makeGetLoanById", () => {
    it("returns ok with the loan on success", async () => {
        const loan = { id: 42, borrower: "Bob" };
        const loanRepository = makeMockRepo({
            getLoanById: jest.fn().mockResolvedValue(loan),
        });
        const getLoanById = makeGetLoanById({ loanRepository });

        const result = await getLoanById(42);

        expect(loanRepository.getLoanById).toHaveBeenCalledWith(42);
        expect(result).toEqual({ ok: true, value: loan, error: null });
    });

    it("returns fail when repository throws", async () => {
        const loanRepository = makeMockRepo({
            getLoanById: jest.fn().mockRejectedValue(new Error("Not found")),
        });
        const getLoanById = makeGetLoanById({ loanRepository });

        const result = await getLoanById(999);

        expect(result.ok).toBe(false);
        expect(result.error).toEqual({
            code: "LOAN_GETTING_ERROR",
            message: "Not found",
        });
    });
});

// ── UpdateLoan ───────────────────────────────────────────────────────────

describe("makeUpdateLoan", () => {
    it("returns ok with the updated loan on success", async () => {
        const updated = { id: 1, borrower: "Alice", amount: 6000 };
        const loanRepository = makeMockRepo({
            updateLoan: jest.fn().mockResolvedValue(updated),
        });
        const updateLoan = makeUpdateLoan({ loanRepository });

        const result = await updateLoan(1, { amount: 6000 });

        expect(loanRepository.updateLoan).toHaveBeenCalledWith(1, { amount: 6000 });
        expect(result).toEqual({ ok: true, value: updated, error: null });
    });

    it("returns fail when repository throws", async () => {
        const loanRepository = makeMockRepo({
            updateLoan: jest.fn().mockRejectedValue(new Error("Conflict")),
        });
        const updateLoan = makeUpdateLoan({ loanRepository });

        const result = await updateLoan(1, { amount: 6000 });

        expect(result.ok).toBe(false);
        expect(result.error).toEqual({
            code: "LOAN_UPDATE_ERROR",
            message: "Conflict",
        });
    });

    it("uses default message when error has no message", async () => {
        const loanRepository = makeMockRepo({
            updateLoan: jest.fn().mockRejectedValue(undefined),
        });
        const updateLoan = makeUpdateLoan({ loanRepository });

        const result = await updateLoan(1, {});

        expect(result.ok).toBe(false);
        expect(result.error.message).toBe("Failed to update loan");
    });
});

// ── DeleteLoan ───────────────────────────────────────────────────────────

describe("makeDeleteLoan", () => {
    it("returns ok(null) on successful deletion", async () => {
        const loanRepository = makeMockRepo({
            deleteLoan: jest.fn().mockResolvedValue(undefined),
        });
        const deleteLoan = makeDeleteLoan({ loanRepository });

        const result = await deleteLoan(1);

        expect(loanRepository.deleteLoan).toHaveBeenCalledWith(1);
        expect(result).toEqual({ ok: true, value: null, error: null });
    });

    it("returns fail when repository throws", async () => {
        const loanRepository = makeMockRepo({
            deleteLoan: jest.fn().mockRejectedValue(new Error("Forbidden")),
        });
        const deleteLoan = makeDeleteLoan({ loanRepository });

        const result = await deleteLoan(1);

        expect(result.ok).toBe(false);
        expect(result.error).toEqual({
            code: "LOAN_DELETION_ERROR",
            message: "Forbidden",
        });
    });

    it("uses default message when error has no message", async () => {
        const loanRepository = makeMockRepo({
            deleteLoan: jest.fn().mockRejectedValue(null),
        });
        const deleteLoan = makeDeleteLoan({ loanRepository });

        const result = await deleteLoan(1);

        expect(result.ok).toBe(false);
        expect(result.error.message).toBe("Failed to delete loan");
    });
});
