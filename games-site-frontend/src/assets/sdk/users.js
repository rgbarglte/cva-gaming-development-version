import client from "./client.js";

export default {
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
