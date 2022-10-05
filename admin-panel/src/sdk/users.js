import client from "./client.js";

export default {
   
  searchText: (target) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/search/text", {
          search : target
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

  getAll: (page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users", {
          page : page
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  get: (id) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/get", {
          id : id
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

  create: (params) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/create", params)
        .then((data) => {
          resolve(data);
        });
    });
  },

  login: (email, password) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/login", {
          email: email,
          password: password,
          currency: "EUR",
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  register: (email, password) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/register", {
          email: email,
          password: password,
          currency: "EUR",
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  auth: (auth) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/auth", {
          auth: auth,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
};
