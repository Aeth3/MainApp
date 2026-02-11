import { requestOfflineFirst } from "../src/infra/http/offlineHttp";

export const HouseholdAPI = {
  getAll: (payload = {}) =>
    requestOfflineFirst({
      method: "POST",
      url: "/api/sample-endpoint",
      data: payload,
    }, {
      treatAsRead: true,
      queueOfflineWrites: false,
    }),

  getById: (id) =>
    requestOfflineFirst({
      method: "GET",
      url: `/households/${id}`,
    }),

  create: (payload) =>
    requestOfflineFirst({
      method: "POST",
      url: "/households",
      data: payload,
    }),

  update: (id, payload) =>
    requestOfflineFirst({
      method: "PUT",
      url: `/households/${id}`,
      data: payload,
    }),

  remove: (id) =>
    requestOfflineFirst({
      method: "DELETE",
      url: `/households/${id}`,
    }),
};
