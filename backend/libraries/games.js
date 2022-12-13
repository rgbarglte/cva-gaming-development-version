import model from "./../models/games.js";
import games from "./../libraries/SDK/games/games.js";
import users from "./users.js";
import usersModel from "./../models/users.js";
import historyModel from "./../models/history.js";

import history from "./history.js";
import socket from "../services/socket.js";

import brands from "../libraries/brands.js";
import lodash from "lodash";
import { shaValidation } from "./SDK/games/tools.js";

var rollbackSucess = [];

const create = async (data) => {
  const temp = new model(data);
  try {
    const save = await temp.save();
    //console.log("insert", save);
    return save;
  } catch (err) {
    return err;
  }
};

const createDbInternal = () => {
  games.getGameList("PKR").then((data) => {
    data.response.forEach((element) => {
      create({
        internal: element,
      });
    });
  });
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

const getAll = async (pageNumber = 1) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await query(
    {},
    {},
    limit,
    {
      "internal.position": 1,
    },
    skip
  );
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};
const get = async (id) => {
  const tmp = await query({
    _id: id,
  });
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const getEmbed = async (auth = null, id) => {
  const tmp = await get({
    _id: id,
  });
  

  return new Promise((resolve, reject) => {
    try {
      users.getByAuth(auth).then(async (data) => {
        // //console.log('getauth test',data)
        if (data.error) {
          await games.getGame(tmp[0].internal.id).then((data) => {
            return resolve(data);
          });
          // //console.log('ERROR')
          return;
        }
        // //console.log('NO ERROR')

        if (lodash.isEmpty(data)) {
          await games.getGame(tmp[0].internal.id).then((data) => {
            return resolve(data);
          });
          // //console.log('ERROR')
          return;
        } else {
          await games
            .getGame(
              tmp[0].internal.id,
              null,
              data[0].currency,
              0,
              data[0].username,
              data[0].passwordConstant
            )
            .then((data) => {
              return resolve(data);
            });
        }
      });
    } catch (err) {
      return err;
    }
  });
};

const getByStatus = async (status = true) => {
  const tmp = await query({
    active: status,
  });
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const getBySlug = async (slug) => {
  const tmp = await query({
    "internal.id_hash": slug,
  });
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const update = () => {};

const remove = () => {};

/* 
   get all the products of a collection using its id
  */
const getAllByIdCollection = async (id, pagination) => {
  const tmp = await query({
    "collections.id": id,
  });
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};
/* 
   get all the products of a collection using its slug
  */
const getAllBySlugCollection = async (slug, pagination) => {
  const tmp = await query({
    "collections.slug": slug,
  });
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const getAllByType = async (slug, pageNumber = 0, mobile = true) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await query(
    {
      "internal.type": slug,
      "internal.mobile": mobile,
    },
    {},
    limit,
    {},
    skip
  );
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const getAllSportBooks = async () => {
  const tmp = await query({ "internal.type": "sportsbook" }, {}, 100);
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

/* 
   get the latest products created
  */
const getAllLast = async (pageNumber = 1) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await query({}, {}, limit, { _id: -1 }, skip);
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};
/*
   get featured products
  */
const getAllFeatured = async (limit) => {
  const tmp = await query(
    {
      featured: true,
    },
    {},
    limit,
    { _id: -1 }
  );
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};
/*
   Search product
  */
const search = async (target, pagination = 0) => {
  const tmp = await query(
    {
      $text: {
        $search: target,
      },
    },
    [],
    1000
  );
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};
/* 
   get all the products of a brand using its id
  */
const getAllByIdBrand = async (id, pageNumber = 1) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await query(
    {
      "brands.id": id,
    },
    {},
    limit,
    {},
    skip
  );
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};
/* 
   get all the products of a brand using its slug
  */
const getAllBySlugBrand = async (slug, pageNumber = 0, mobile = true) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;
  return new Promise((resolve, reject) => {
    brands.query({ slug: slug }).then(async (data) => {
      if (lodash.isEmpty(data)) {
        return resolve([]);
      }
       

      const tmp = await query(
        {
          "internal.category": data[0].internal,
          "internal.mobile": mobile,
        },
        {},
        10000
        // {},
        // skip
      );

      //console.log(tmp);
      resolve(tmp);
    });
  });
};

const rollbackCallback = async (req = null) => {
  const tmp = await history.query(
    {
      "data.transaction_id": req.transaction_id,
    },
    {},
    3
  );

  return new Promise(async (resolve, reject) => {
    try {
      if (tmp.length == 0) {
        return resolve({ status: "404", msg: "TRANSACTION_NOT_FOUND" });
      }
      var result, balancePrev, BalanceUpdate;

      BalanceUpdate = await usersModel.findById(tmp[0].userid).exec();
      balancePrev = parseFloat(BalanceUpdate.balance);

      if (tmp[0].data.action == "debit") {
        BalanceUpdate.balance =
          parseFloat(BalanceUpdate.balance) + parseFloat(tmp[0].data.amount);

        result =
          parseFloat(BalanceUpdate.balance) + parseFloat(tmp[0].data.amount);

        await BalanceUpdate.save();
      }
      if (tmp[0].data.action == "credit") {
        const tmp2 = await history.query(
          {
            "data.transaction_id": req.transaction_id,
            "data.round_id": req.round_id,
            "data.action": "rollback",
          },
          {},
          1,
          { _id: -1 }
        );

        if (tmp2.length == 0) {
          BalanceUpdate.balance =
            parseFloat(BalanceUpdate.balance) - parseFloat(tmp[0].data.amount);

          result =
            parseFloat(BalanceUpdate.balance) - parseFloat(tmp[0].data.amount);

          // await BalanceUpdate.save();
        } else {
          // BalanceUpdate.balance = parseFloat(BalanceUpdate.balance)
          result = parseFloat(BalanceUpdate.balance);
        }

        await BalanceUpdate.save();
      }

      if (req) {
        req.rollback = {
          balance: balancePrev,
          amount: tmp[0].data.amount,
          success: true,
          success_balance: result,
        };
        history.crateGame(BalanceUpdate._id, req, {
          email: BalanceUpdate.email,
          username: BalanceUpdate.username,
        });
      }

      return resolve({
        status: "200",
        balance: result,
      });
    } catch (err) {
      return reject({ status: "500", msg: "internal error", err: err });
    }
  });
};

const getBalanceCallback = async (username, sessionId, req = null) => {
  const tmp = await users.query({
    username: username,
    // "internal.sessionid": sessionId,
  });
  return new Promise((resolve, reject) => {
    try {
      if (tmp.length == 0) {
        return reject({ status: "500", msg: "internal error" });
      }

      if (req) {
        req.rollback = {
          balance: tmp[0].balance,
        };
        history.crateGame(tmp[0]._id, req, {
          email: tmp[0].email,
          username: tmp[0].username,
          agent_id: tmp[0].agent_id,
        });
      }

      return resolve({ status: "200", balance: tmp[0].balance });
    } catch (err) {
      return reject({ status: "500", msg: "internal error" });
    }
  });
};
const isNegativeNumber = (num) => {
  if (Math.sign(num) === -1) {
    return true;
  }

  return false;
};

const debitValidationRoundId = (round_id) => {
  var validationRoundId = history.query({
    "data.round_id": round_id,
  });

  return new Promise(async (resolve, reject) => {
    try {
      if (validationRoundId.length >= 2) {
        return resolve(true);
      }
    } catch (err) {
      return reject(false);
    }
  });
};

const debitBalanceCallback = async (
  username = null,
  sessionId = null,
  amount,
  req = null
) => {
  // //console.log('start -1');
  var tmp = await users.query({
    username: username,
  });

  return new Promise(async (resolve, reject) => {
    try {
      if (!shaValidation(req)) {
        return reject({ status: "500", msg: "internal error" });
      }

      if (isNegativeNumber(amount)) {
        return reject({ status: "500", msg: "internal error" });
      }

      if (tmp.length == 0) {
        return reject({ status: "500", msg: "internal error" });
      }

      var validationRoundId = await history.query({
        "data.transaction_id": req.transaction_id,
        "data.round_id": req.round_id,
        "data.username": req.username,
      });

      if (validationRoundId.length == 1) {
        return reject({
          status: "200",
          balance: validationRoundId[0].data.rollback.new,
        });
      }

      // var validationRoundId = await history.query({
      //   "data.transaction_id": req.transaction_id,
      //   "data.round_id": req.round_id,
      //   "data.username": req.username,
      // });

      // if (validationRoundId.length == 1) {
      //   return reject({ status: "500", msg: "internal error" });
      // }

      tmp = await usersModel.findById(tmp[0]._id).exec();

      var balance_prev = parseFloat(tmp.balance);

      var response;

      const socketClient = socket.getIo();

      if (balance_prev >= parseFloat(amount)) {
        tmp.balance = parseFloat(tmp.balance) - parseFloat(amount);

        socketClient.to("webclient-" + tmp._id).emit("balance", {
          balance: tmp.balance,
        });

        socketClient.to("activity-" + tmp._id).emit("debit-game", {
          balance_prev: balance_prev,
          balance_result: tmp.balance,
          amount: parseFloat(amount),
        });

        var test = await tmp.save();

        response = { status: "200", balance: tmp.balance };

        req.rollback = {
          amount: parseFloat(amount),
          new: tmp.balance,
          old: balance_prev,
          success: false,
          success_balance: 0,
        };
      } else {
        req.rollback = {
          amount: parseFloat(amount),
          new: tmp.balance,
          old: balance_prev,
        };

        response = { status: "403", balance: balance_prev, err: "no balance" };
      }

      if (req) {
        history.crateGame(tmp._id, req, {
          email: tmp.email,
          username: tmp.username,
          agent_id: tmp.agent_id,
        });
      }

      return resolve(response);
    } catch (err) {
      return reject({ status: "500", msg: "internal error", err: err });
    }
  });
};

const creditBalanceCallback = async (
  username,
  sessionId,
  amount,
  req = null
) => {
  // //console.log("start -1");
  var tmp = await users.query({
    username: username,
    // "internal.sessionid": sessionId,
  });

  return new Promise(async (resolve, reject) => {
    try {
      if (!shaValidation(req)) {
        return reject({ status: "500", msg: "internal error" });
      }

      // //console.log("-1");

      if (tmp.length == 0) {
        return reject({ status: "500", msg: "internal error" });
      }

      if (isNegativeNumber(amount)) {
        return reject({ status: "500", msg: "internal error" });
      }

      // var validationRoundId = await history.query({
      //   $or: [
      //     { "data.transaction_id": req.transaction_id },
      //     { "data.round_id": req.round_id },
      //   ],
      // });

      var validationRoundId = await history.query({
        "data.transaction_id": req.transaction_id,
        "data.round_id": req.round_id,
      });

      if (validationRoundId.length == 1) {
        return reject({ status: "500", msg: "internal error" });
      }

      // //console.log("-2");

      tmp = await usersModel.findById(tmp[0]._id).exec();

      // //console.log("-3");

      var balance_prev = parseFloat(tmp.balance);

      tmp.balance = parseFloat(tmp.balance) + parseFloat(amount);

      const socketClient = socket.getIo();

      socketClient.to("webclient-" + tmp._id).emit("balance", {
        balance: tmp.balance,
      });

      socketClient.to("activity-" + tmp._id).emit("credit-game", {
        balance_prev: balance_prev,
        balance_result: tmp.balance,
        amount: parseFloat(amount),
      });

      // //console.log("-4");
      var test = await tmp.save();
      // //console.log("update user", test);

      if (req) {
        req.rollback = {
          amount: parseFloat(amount),
          new: tmp.balance,
          old: balance_prev,
          success: false,
          success_balance: 0,
        };
        history.crateGame(tmp._id, req, {
          email: tmp.email,
          username: tmp.username,
          agent_id: tmp.agent_id,
        });
      }

      return resolve({ status: "200", balance: tmp.balance });
    } catch (err) {
      // //console.log("error -1 credit", tmp);
      return reject({ status: "500", msg: "internal error" });
    }
  });
};

export default {
  getAllSportBooks: getAllSportBooks,
  getAllByType: getAllByType,
  rollbackCallback: rollbackCallback,
  creditBalanceCallback: creditBalanceCallback,
  debitBalanceCallback: debitBalanceCallback,
  getBalanceCallback: getBalanceCallback,
  create: create,
  createDbInternal: createDbInternal,
  getByStatus: getByStatus,
  getAll: getAll,
  get: get,
  getEmbed: getEmbed,
  getAllByIdCollection: getAllByIdCollection,
  getAllBySlugCollection: getAllBySlugCollection,
  getAllLast: getAllLast,
  getAllFeatured: getAllFeatured,
  search: search,
  getAllByIdBrand: getAllByIdBrand,
  getAllBySlugBrand: getAllBySlugBrand,
  getBySlug: getBySlug,
  query: query,
};
