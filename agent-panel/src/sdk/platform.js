import client from "./client.js";

export default {
 
  getDetails: (params) => {
    return new Promise((resolve, reject) => {
      client
        .POST("platform/details",params)
        .then((data) => {
          resolve(data);
        });
    });
  },

};
