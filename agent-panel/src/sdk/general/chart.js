import client from "./../client.js";

export default { 
  bestGamesCredit: (date) => {
    return new Promise((resolve, reject) => {
      client.POST("general/chart/games/best/credit", {
        date : date
      }).then((data) => {
        resolve(data);
      });
    });
  },
  bestBrandsCredit: (date) => {
    return new Promise((resolve, reject) => {
      client.POST("general/chart/brands/best/credit", {
        date : date
      }).then((data) => {
        resolve(data);
      });
    });
  },
   
};
