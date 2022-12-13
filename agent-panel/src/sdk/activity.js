import client from "./client.js";

export default {
  getAllBalance: (page = 0 , dateFilter = {}) => {
    return new Promise((resolve, reject) => {
      client
        .POST("activity/balance", {
          page: page,
          filter : {
            date : dateFilter.date,
            user : dateFilter.target
          }
        })
        .then((data) => {
          resolve(data);
        });
    });
  },


  getAllBalanceByUser: (user,page = 0 , dateFilter = {}) => {
    return new Promise((resolve, reject) => {
      client
        .POST("activity/balance/user", {
          page: page,
          user : user,
          filter : {
            date : dateFilter.date, 
          }
        })
        .then((data) => {
          resolve(data);
        });
    });
  },


  balanceTotalPages: () => {
    return new Promise((resolve, reject) => {
      client
        .POST("activity/balance/details/page", {
          
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
 
};


 