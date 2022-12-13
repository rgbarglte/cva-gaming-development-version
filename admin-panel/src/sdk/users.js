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
   
  getAllAgents: (page = 1) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/get/all/agents", {
          page : page
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  getAllDetailUsersByAgent: (params) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/agents/detail/users",params)
        .then((data) => {
          resolve(data);
        });
    });
  },

  getAllAgentsDetail: (params) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/agents/detail",params)
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
        .POST("users/login/admin", {
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

  balanceAdd: (auth,target,balance) => {
    console.log(auth,target,balance)
    return new Promise((resolve, reject) => {
      client
        .POST("users/balance/add", {
          token: auth,
          target : target,
          balance : balance,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

  balanceSubtract: (auth,target,balance) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/balance/subtract", {
          token: auth,
          target : target,
          balance : balance,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },


  getAllHistoryGames: (params) => { 
    return new Promise((resolve, reject) => {
      client
        .POST("users/games/history", params)
        .then((data) => {
          resolve(data);
        });
    });
  },


  gestPlayers: (params) => { 
    return new Promise((resolve, reject) => {
      client
        .POST("users/best/games", params)
        .then((data) => {
          resolve(data);
        });
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/delete", {
          id: id,
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
  edit: (id,data) => {
    return new Promise((resolve, reject) => {
      client
        .POST("users/edit", {
          id: id,
          data : data
        })
        .then((data) => {
          resolve(data);
        });
    });
  },

};
