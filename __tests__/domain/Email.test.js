import { createEmail } from "../../package/src/domain/entities/Email";

describe("createEmail", () => {
  it("normalizes email to trimmed lowercase", () => {
    expect(createEmail("  USER@Example.COM ")).toBe("user@example.com");
  });

  it("throws when email is missing", () => {
    expect(() => createEmail("")).toThrow("Email is required");
    expect(() => createEmail(null)).toThrow("Email is required");
  });

  it("throws when email format is invalid", () => {
    expect(() => createEmail("invalid-email")).toThrow("Invalid email format");
    expect(() => createEmail("user@localhost")).toThrow("Invalid email format");
  });
});
