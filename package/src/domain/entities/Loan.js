import { ok, fail } from "../shared/result";

export const LOAN_STATUSES = Object.freeze({
  PENDING: "pending",
  ACTIVE: "active",
  COMPLETED: "completed",
  DEFAULTED: "defaulted",
  CANCELLED: "cancelled",
});

const VALID_STATUS_VALUES = Object.values(LOAN_STATUSES);

export class Loan {
  constructor({ id, amount, term, borrower, dueDate, status, createdAt, updatedAt, pending = false } = {}) {
    this.id = id;
    this.amount = amount;
    this.term = term;
    this.borrower = borrower;
    this.dueDate = dueDate;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.pending = pending;
  }

  /**
   * Validate and normalize raw input (e.g. from a form).
   * Returns ok({ borrower, amount, dueDate, status, term? }) or fail(...).
   */
  static validateInput(raw = {}) {
    const borrower = typeof raw.borrower === "string" ? raw.borrower.trim() : "";
    const amountRaw = raw.amount;
    const amount = typeof amountRaw === "string" ? Number(amountRaw) : Number(amountRaw);
    const dueDate = typeof raw.dueDate === "string" ? raw.dueDate.trim() : "";
    const status = (typeof raw.status === "string" ? raw.status.trim() : "") || "pending";
    const termRaw = raw.term;
    const term = termRaw != null && termRaw !== "" ? Number(termRaw) : null;

    if (!borrower) return fail("VALIDATION_ERROR", "Borrower is required.");
    if (!Number.isFinite(amount)) return fail("VALIDATION_ERROR", "Amount is required.");
    if (!dueDate) return fail("VALIDATION_ERROR", "Due date is required.");
    if (!VALID_STATUS_VALUES.includes(status))
      return fail("VALIDATION_ERROR", `Invalid status "${status}". Must be one of: ${VALID_STATUS_VALUES.join(", ")}.`);

    const payload = { borrower, amount, dueDate, status };
    if (term != null && Number.isFinite(term)) payload.term = term;

    return ok(payload);
  }

  static fromDTO(raw = {}) {
    return new Loan({
      id: raw.id ?? raw._id,
      amount: raw.amount,
      term: raw.term,
      borrower: raw.borrower,
      dueDate: raw.due_date || raw.dueDate,
      status: raw.status,
      createdAt: raw.created_at || raw.createdAt,
      updatedAt: raw.updated_at || raw.updatedAt,
      pending: raw.pending || false,
    });
  }

  toDTO() {
    return {
      id: this.id,
      amount: this.amount,
      term: this.term,
      borrower: this.borrower,
      due_date: this.dueDate,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  isPending() { return !!this.pending; }
}