import { defineStore } from "pinia";
import users from "@/assets/sdk/users.js";
export const usersAuthStore = defineStore({
  id: "usersAuthStore",
  state: () => ({
    login: false,
    auth: false,
  }),
  getters: {},
  actions: {
    start() {
      users.auth(localStorage.getItem("auth")).then((data) => {
        if (data.error) {
          this.login = false;
          return  this.login;
        }
        this.login = true;
        this.auth = localStorage.getItem("auth");
        return this.login;
      });
    },
    getAuth() {
      alert(this.auth);
      console.log(this.auth, this.login);
      return this.auth;
    },
    async authCheck() {
      return new Promise((resolve, reject) => {
        users.auth(localStorage.getItem("auth")).then((data) => {
          if (data.error) {
            this.login = false;
            return resolve({
              status : this.login,
              data : data
            });
          }
          this.login = true;
          return resolve({
            status : this.login,
            data : data[0]
          });
        });
      });
    },

    async loginSubmit(email, password) {
      return new Promise((resolve, reject) => {
        users.login(email, password).then((data) => {
          if (data.error) {
            this.login = false;
            this.auth = false;
            localStorage.setItem("auth", false);
            return reject(data.error);
          }
          console.log("login ");
          this.login = true;
          this.auth = data.authToken;
          localStorage.setItem("auth", data.authToken);
          return resolve(data);
        });
      });
    },
    // async auth(auth) {
    //   await users.auth(auth).then((data) => {
    //     if (data.error) {
    //       this.login = false;
    //       this.auth = false;
    //       localStorage.setItem("auth", false);
    //       return data.error;
    //     }
    //     this.login = true;
    //     this.auth = data[0].authToken;
    //     localStorage.setItem("auth", data[0].authToken);
    //     return data;
    //   });
    // },
    async authLocal() {
      await users.auth(localStorage.getItem("auth")).then((data) => {
        if (data.error) {
          this.login = false;
          this.auth = false;
          localStorage.setItem("auth", false);
          return data.error;
        }
        this.login = true;
        this.auth = data[0].authToken;
        localStorage.setItem("auth", data[0].authToken);
        return data;
      });
    },
  },
});
