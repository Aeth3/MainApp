export const ok = (value) => ({
  ok: true,
  value,
  error: null,
});

export const fail = (code, message) => ({
  ok: false,
  value: null,
  error: {
    code,
    message,
  },
});

