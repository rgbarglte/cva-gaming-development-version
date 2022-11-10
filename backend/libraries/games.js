import model from "./../models/games.js";
import games from "./../libraries/SDK/games/games.js";
import users from "./users.js";
import usersModel from "./../models/users.js";

import history from "./history.js";
import socket from "../services/socket.js";


import brands from "../libraries/brands.js";
import lodash from "lodash";


const create = async (data) => {
  const temp = new model(data);
  try {
    const save = await temp.save();
    console.log("insert", save);
    return save;
  } catch (err) {
    return err;
  }
};

const createDbInternal = () => {
  games.getGameList().then((data) => {
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
        // console.log('getauth test',data)
        if (data.error) {
          await games.getGame(tmp[0].internal.id).then((data) => {
            return resolve(data);
          });
          // console.log('ERROR')
          return;
        }
        // console.log('NO ERROR')

        if(lodash.isEmpty(data)) {
          await games.getGame(tmp[0].internal.id).then((data) => {
            return resolve(data);
          });
          // console.log('ERROR')
          return; 
        } else {
          await games
          .getGame(
            tmp[0].internal.id,
            null,
            "EUR",
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

const getAllByType = async (slug, pageNumber = 0) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await query(
    {
      "internal.type": slug,
    },
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
const getAllBySlugBrand = async (slug, pageNumber = 1) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;
  return new Promise((resolve, reject) => {
  brands.query({slug:slug}).then(async (data) => {

    if(lodash.isEmpty( data )) {
      return resolve([]);
    }
     
      const tmp = await query(
        {
          "internal.category": data[0].internal,
        },
        {},
        limit,
        {},
        skip
      ); 
      resolve(tmp)
  })
})
};

const getBalanceCallback = async (username, sessionId, req = null) => {
  const tmp = await users.query({
    username: username,
    "internal.sessionid": sessionId,
  });
  return new Promise((resolve, reject) => {
    try {
      if (tmp.length == 0) {
        return reject({ status: "500", msg: "internal error" });
      }

      if (req) {
        history.crateGame(tmp[0]._id, req, {
          email: tmp[0].email,
          username: tmp[0].username,
        });
      }

      return resolve({ status: "200", balance: tmp[0].balance });
    } catch (err) {
      return reject({ status: "500", msg: "internal error" });
    }
  });
};

const debitBalanceCallback = async (
  username,
  sessionId,
  amount,
  req = null
) => {
  // console.log('start -1');
  var tmp = await users.query({
    username: username,
    "internal.sessionid": sessionId,
  });

  return new Promise(async (resolve, reject) => {
    try {
      // console.log('-1');

      if (tmp.length == 0) {
        return reject({ status: "500", msg: "internal error" });
      }

      // console.log('-2');

      tmp = await usersModel.findById(tmp[0]._id).exec();

      // console.log('-3');
      
     var  balance_prev = parseFloat(tmp.balance);
      tmp.balance = parseFloat(tmp.balance) - parseFloat(amount);
       
      const socketClient = socket.getIo();

      socketClient.to("webclient-" + tmp._id).emit("balance", {
        balance: tmp.balance,
      });

      console.log({
        balance_prev : balance_prev,
        balance_result: tmp.balance,
        amount : parseFloat(amount)
      })

      socketClient.to("activity-" + tmp._id).emit("debit-game", {
        balance_prev : balance_prev,
        balance_result: tmp.balance,
        amount : parseFloat(amount)
      });

      // console.log('-4');
      var test = await tmp.save();
      // console.log('update user', test);

      if (req) {
        history.crateGame(tmp._id, req, {
          email: tmp.email,
          username: tmp.username,
        });
      }

      return resolve({ status: "200", balance: tmp.balance });
    } catch (err) {
      console.log("error -1 debit", tmp);
      return reject({ status: "500", msg: "internal error" });
    }
  });
};

const creditBalanceCallback = async (
  username,
  sessionId,
  amount,
  req = null
) => {
  console.log("start -1");
  var tmp = await users.query({
    username: username,
    "internal.sessionid": sessionId,
  });

  return new Promise(async (resolve, reject) => {
    try {
      console.log("-1");

      if (tmp.length == 0) {
        return reject({ status: "500", msg: "internal error" });
      }

      console.log("-2");

      tmp = await usersModel.findById(tmp[0]._id).exec();

      console.log("-3");

      var  balance_prev = parseFloat(tmp.balance);

      tmp.balance = parseFloat(tmp.balance) + parseFloat(amount);

      const socketClient = socket.getIo();

      socketClient.to("webclient-" + tmp._id).emit("balance", {
        balance: tmp.balance,
      });

      socketClient.to("activity-" + tmp._id).emit("credit-game", {
        balance_prev : balance_prev,
        balance_result: tmp.balance,
        amount : parseFloat(amount)
      });

      console.log("-4");
      var test = await tmp.save();
      console.log("update user", test);

      if (req) {
        history.crateGame(tmp._id, req, {
          email: tmp.email,
          username: tmp.username,
        });
      }

      return resolve({ status: "200", balance: tmp.balance });
    } catch (err) {
      console.log("error -1 credit", tmp);
      return reject({ status: "500", msg: "internal error" });
    }
  });
};

export default {
  getAllByType: getAllByType,
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
