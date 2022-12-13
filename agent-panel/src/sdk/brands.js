import client from "./client.js";

export default {
  getAll: (page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("brands", {
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

  updateField: (id,field,value) => {
    return new Promise((resolve, reject) => {
      client
        .POST("brands/update/field", {
          id:id,
          field:field,
          value: value,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  update: (id,data) => {
    return new Promise((resolve, reject) => {
      client
        .POST("brands/update", {
          id:id,
          data:data, 
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

};

 