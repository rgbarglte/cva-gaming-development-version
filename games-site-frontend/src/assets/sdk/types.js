import client from "./client.js";

export default {
  getAll: (page = 0) => {
    return new Promise((resolve, reject) => {
      client
        .POST("types/frontend", {
          page: page,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

  getAllBySlug: (slug, page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("types/get/all/games", {
          page: page,
          slug: slug,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  getBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      client
        .POST("types/get/all/by/slug", {
          slug: slug,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
};
