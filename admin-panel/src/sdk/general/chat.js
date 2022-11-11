import client from "./../client.js";

export default {
  users: () => {
    return new Promise((resolve, reject) => {
      client.POST("general/chat/users",{}).then((data) => {
        resolve(data);
      });
    });
  },

  messages: (target) => {
    return new Promise((resolve, reject) => {
      client.POST("general/chat/messages", target).then((data) => {
        resolve(data);
      });
    });
  },
};
