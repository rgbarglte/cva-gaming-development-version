import client from "./client.js";

export default {
  getAllLogin: (page = 0 , dateFilter = {}) => {
    return new Promise((resolve, reject) => {
      client
        .POST("history/login", {
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
 
};
