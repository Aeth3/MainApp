export const makeSaveSession = ({ sessionRepository }) => {
  return (session) => {
    if (!session || typeof session !== "object") {
      throw new Error("Session payload is required");
    }

    return sessionRepository.saveSession(session);
  };
};
