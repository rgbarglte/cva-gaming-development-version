import model from "./../models/activity.js";
import lodash from "lodash";

const createLogin = async (userid, req, userdata = null) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const useragent = req.useragent;
  const data = {
    userid: userid,
    type: "login",
    data: {
      ip: ip,
      agent: useragent,
    },
    user: userdata,
  };
  const temp = new model(data);
  try {
    const save = await temp.save();
    return save;
  } catch (err) {
    return err;
  }
};

const createBalanceUpdate = async (
  userid,
  req,
  userdata = null,
  ownerdata = {},
  ref = "add",
  balancedata
) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const useragent = req.useragent;
  const data = {
    userid: userid,
    type: "balance",
    data: {
      owner: ownerdata,
      ref: ref,
      balance: balancedata,
      ip: ip,
      agent: useragent,
    },
    user: userdata,
  };
  const temp = new model(data);
  try {
    const save = await temp.save();
    return save;
  } catch (err) {
    return err;
  }
};

const query = async (
  filters = {},
  fields = [],
  limit = 1,
  sort = {},
  skip = {}
) => {
  try {
    return await model
      .find(filters)
      .select(fields)
      .limit(limit)
      .sort(sort)
      .skip(skip)
      .exec();
  } catch (err) {
    return err;
  }
};

const getAllLogin = async (pageNumber = 0, filter = {}) => {
  var pageSize = 30;
  var limit = pageSize;
  var skip = pageSize * pageNumber;
  var search = {
    type: "login",
  };

  if (lodash.isArray(filter.date)) {
    search.createdAt = {
      $gte: new Date(filter.date[0]),
      $lt: new Date(filter.date[1]),
    };
  }

  if (lodash.isString(filter.user)) {
    search["$text"] = {
      $search: filter.user,
    };
  }

  const tmp = await query(search, {}, limit, {}, skip);
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const balanceTotalPages = () => {
  return new Promise((resolve, reject) => {
    model.countDocuments(
      {
        type: "balance",
      },
      function (err, count) {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      }
    );
  });
};

const getAllBalance = async (pageNumber = 0, filter = {}) => {
  var pageSize = 30;
  var limit = pageSize;
  var skip = pageSize * pageNumber;
  var search = {
    type: "balance",
  };

  if (lodash.isArray(filter.date)) {
    search.createDate = {
      $gte: new Date(filter.date[0]).toLocaleDateString("en-US"),
      $lt: new Date(filter.date[1]).toLocaleDateString("en-US"),
    };
  }

  if (
    lodash.isString(filter.user) &&
    filter.user &&
    filter.user !== "" &&
    filter.user !== " "
  ) {
    search["$text"] = {
      $search: filter.user,
    };
  }

  if (
    lodash.isString(filter.type) &&
    filter.type &&
    filter.type !== "" &&
    filter.type !== " "
  ) {
    search["data.ref"] = filter.type;
  }

  const tmp = await query(search, {}, limit, { _id : -1}, skip);

  console.log(search);
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

export default {
  getAllLogin: getAllLogin,
  createLogin: createLogin,
  getAllBalance: getAllBalance,
  createBalanceUpdate: createBalanceUpdate,
  balanceTotalPages : balanceTotalPages,
};
