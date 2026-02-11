import { createEmail } from "./Email";

export const createUser = (input) => {
  const id = typeof input?.id === "string" ? input.id.trim() : "";
  const email = createEmail(input?.email);
  const first_name = typeof input?.first_name === "string" ? input.first_name.trim() : "";
  const last_name = typeof input?.last_name === "string" ? input.last_name.trim() : "";
  const rawUserMetaData = {
    ...(input?.raw_user_meta_data || {}),
    first_name,
    last_name,
  };

  if (!id) {
    throw new Error("User id is required");
  }

  return Object.freeze({
    id,
    email,
    first_name,
    last_name,
    raw_user_meta_data: rawUserMetaData,
  });
};
