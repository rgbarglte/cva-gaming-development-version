import platform from "./platform/details.js";

const getAllDetailsByDate = (date , auth = null) => {
  return new Promise(async (resolve, reject) => {
    platform.getAllDetailsByDate(date[0], date[1]).then((data) => {
      return resolve(data);
    });
  });
};

export default {
  getAllDetailsByDate: getAllDetailsByDate,
};
