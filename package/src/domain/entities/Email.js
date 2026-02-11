const EMAIL_PATTERN = /\S+@\S+\.\S+/;

export const createEmail = (value) => {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";

  if (!normalized) {
    throw new Error("Email is required");
  }

  if (!EMAIL_PATTERN.test(normalized)) {
    throw new Error("Invalid email format");
  }

  return normalized;
};

