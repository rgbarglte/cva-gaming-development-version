import client from "./client.js";

export default {
  getAll: (page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("games", {
          page: page,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

   

  
  getAllByType: (slug, page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("games/get/all/by/type", {
          page: page,
          slug: slug,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },


  getAllByBrand: (slug, page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("games/get/all/by/brand/slug", {
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

  getEmbed: (auth = null, id) => {
    return new Promise((resolve, reject) => {
      client
        .POST("games/get/embed", {
          id: id,
          auth : auth
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

  search: (query = null) => {
    return new Promise((resolve, reject) => {
      client
        .POST("games/search/text", {
          query : query
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

};
