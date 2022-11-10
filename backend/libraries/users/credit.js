import history from "../history.js";
import lodash from "lodash";

export default {
  getByUserId: (id, date_start, date_end) => {
    return new Promise((resolve, reject) => {
      var count = 0;
      history
        .query(
          {
            userid: id,
            "data.action": "credit",
            createDate: {
              $gte: new Date(date_start).toLocaleDateString("en-US"),
              $lt: new Date(date_end).toLocaleDateString("en-US"),
            },
          },
          {},
          50000
        )
        .then((data) => {
          if (lodash.isEmpty(data)) {
            return resolve(count);
          } else {
            data.forEach((element) => {
              count = parseFloat(count) + parseFloat(element.data.amount);
            });
            return resolve(count);
          }
        });
    });
  },
};
