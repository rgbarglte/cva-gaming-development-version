import client from "./client.js";

export default {
  getAll: (page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("brands/frontend", {
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
        .POST("brands/get/all/games", {
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
        .POST("games/get/all/by/slug", {
          slug: slug,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

  getInfoBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      client
        .POST("brands/get/by/slug", { 
          slug: slug,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
 
   
};
