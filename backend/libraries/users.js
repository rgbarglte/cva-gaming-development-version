import model from "./../models/users.js";
import users from "./../libraries/SDK/games/users.js";
import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import settings from "./../settings.js";

import generator from "generate-password";
import { v4 as uuidv4 } from "uuid";

import history from "./history.js";
import activity from "./activity.js";
import agents from "./users/agents.js";
import Games from "./users/games.js";

import HistoryGames from "./users/historyGames.js";
import lodash from "lodash";

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

const searchText = async (target) => {
  const tmp = await query(
    {
      $text: {
        $search: target,
      },
    },
    {},
    10000
  );

  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const create = async (data) => {
  console.log("librarie users", data);
  return new Promise((resolve, reject) => {
    var passwordConstant = generator.generate({
      length: 12,
      numbers: true,
    });

    users
      .createPlayer(
        data.username,
        passwordConstant,
        data.nickname,
        data.currency
      )
      .then(async (dataInternal) => {
        console.log("createplater", dataInternal);
        if (dataInternal.error == 1) {
          reject(dataInternal);
        }
        const authTokenSettings = {
          time: Date(),
          email: data.email,
          username: data.username,
        };

        var serial = {
          email: data.email,
          username: data.username,
          password: data.password,
          nickname: data.username,
          profile: {
            lastname: data.lastname,
            firstname: data.firstname,
          },
          passwordConstant: passwordConstant,
          authToken: sign(authTokenSettings, settings.jwtSecret),
          internal: dataInternal.response,
        };
        console.log("serial", serial);
        const temp = new model(serial);
        console.log("model", temp);
        try {
          const save = await temp.save();
          console.log("insert", save);
          resolve(save);
        } catch (err) {
          reject(err);
        }
      });
  });
};

const createBack = async (data) => {
  return new Promise((resolve, reject) => {
    var passwordConstant = generator.generate({
      length: 12,
      numbers: true,
    });

    users
      .createPlayer(data.username, passwordConstant, data.nickname, "EUR")
      .then(async (dataInternal) => {
        if (dataInternal.error == 1) {
          return reject(dataInternal);
        }

        verify(data.auth, settings.jwtSecret, async function (err, decoded) {
          if (err) {
            return resolve({ error: 1, msg: "Token no valid" });
          }
          const authTokenSettings = {
            time: Date(),
            email: data.email,
            username: data.username,
          };

          var serial = {
            isLogin: false,
            email: data.email,
            username: data.username,
            password: data.password,
            nickname: data.password,
            passwordConstant: passwordConstant,
            authToken: sign(authTokenSettings, settings.jwtSecret),
            profile: data.profile,

            isAgent: data.isAgent,
            enabledAllBrands: data.enabledAllBrands,
            brands: data.brands,
            enabledAllGames: data.enabledAllGames,
            games: data.games,
            socket: uuidv4(),
            automatically_settle: data.automatically_settle,
            agent_data: data.agent_data,
            owner_id: decoded._id,
            agent_id: data.agent_id,
            internal: dataInternal.response,
          };
          const temp = new model(serial);

          return resolve(await temp.save());

          // try {
          //   const save = await temp.save();
          //   console.log("insert", save);
          //   resolve(save);
          // } catch (err) {
          //   reject(err);
          // }
        });
      });
  });
};

const login = async (data, req = null) => {
  return new Promise((resolve, reject) => {
    query({
      username: data.email,
      password: data.password,
    }).then((tmp) => {
      if (tmp.length == 0) {
        return resolve({
          error: true,
        });
      }
      const socket = uuidv4();

      const authTokenSettings = {
        time: Date(),
        email: tmp[0].email,
        username: tmp[0].username,
        _id: tmp[0]._id,
        owner_id: tmp[0].owner_id,
        agent_id: tmp[0].agent_id,
        socket: socket,
      };

      users
        .loginPlayer(tmp[0].username, tmp[0].passwordConstant)
        .then(async (dataLogin) => {
          if (dataLogin.error == 1) {
            return resolve(dataLogin);
          }

          if (req) {
            history.createLogin(tmp[0]._id, req, {
              email: tmp[0].email,
              username: tmp[0].username,
            });
          }

          const tmpUpdate = await model.findById(tmp[0]._id).exec();
          tmpUpdate.authToken = sign(authTokenSettings, settings.jwtSecret);
          tmpUpdate.internal = dataLogin.response;
          // tmpUpdate.balance = dataLogin.response.balance; //fix 0 balance
          tmpUpdate.socket = socket;
          console.log("login tmpUpdate", tmpUpdate);
          return resolve(await tmpUpdate.save());
        });
    });
  });
};

const loginAdmin = async (data, req = null) => {
  console.log("🚀 ~ file: users.js ~ line 201 ~ loginAdmin ~ data", data);

  return new Promise((resolve, reject) => {
    query({
      email: data.email,
      password: data.password,
      isAdmin: true,
    }).then(async (tmp) => {
      console.log(
        "🚀 ~ file: users.js ~ line 210 ~ returnnewPromise ~ tmp",
        tmp
      );
      if (tmp.length == 0) {
        return resolve({
          error: true,
        });
      }
      const socket = uuidv4();

      const authTokenSettings = {
        time: Date(),
        email: tmp[0].email,
        username: tmp[0].username,
        _id: tmp[0]._id,
        socket: socket,
      };
      console.log(
        "🚀 ~ file: users.js ~ line 225 ~ returnnewPromise ~ authTokenSettings",
        authTokenSettings
      );

      const tmpUpdate = await model.findById(tmp[0]._id).exec();
      console.log(
        "🚀 ~ file: users.js ~ line 228 ~ returnnewPromise ~ tmpUpdate",
        tmpUpdate
      );

      tmpUpdate.authToken = sign(authTokenSettings, settings.jwtSecret);
      tmpUpdate.socket = socket;
      tmpUpdate.passwordConstant = tmpUpdate.password;

      return resolve(await tmpUpdate.save());
    });
  });
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
      _id: 1,
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

const getEmbed = async (id) => {
  console.log("getembed");
  const tmp = await get({
    _id: id,
  });
  try {
    console.log("test", tmp);
    return await games.getGame(tmp[0].internal.id);
  } catch (err) {
    return err;
  }
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

const getByAuth = async (auth = null) => {
  return new Promise((resolve, reject) => {
    verify(auth, settings.jwtSecret, async function (err, decoded) {
      if (err) {
        return resolve({ error: 1, msg: "Token no valid" });
      }
      const tmp = await query({
        _id: decoded._id,
      });
      try {
        resolve(tmp);
      } catch (err) {
        reject(err);
      }
    });
  });
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

const getAllAgents = async (pageNumber = 1) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await query(
    {
      isAgent: true,
    },
    {},
    15000
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
const search = (query, pagination) => {};
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

  const tmp = await query(
    {
      "internal.category": slug,
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

const balanceAdd = (owner, userTarget, balance, req) => {
  return new Promise(async (resolve, reject) => {
    const tmpUpdate = await model.findById(userTarget).exec();
    tmpUpdate.balance = parseFloat(tmpUpdate.balance) + parseFloat(balance);

    // add activity
    activity.createBalanceUpdate(
      tmpUpdate._id,
      req,
      tmpUpdate,
      {
        userid: 123,
        email: "raates@gmail.com",
        firstname: "admin",
        lastname: "general",
      },
      "add",
      {
        target: parseFloat(balance),
        old: parseFloat(tmpUpdate.balance),
        new: parseFloat(balance) + parseFloat(tmpUpdate.balance),
      }
    );
    // ---------------------------

    return resolve(await tmpUpdate.save());
  });
};

const balanceSubtract = (owner, userTarget, balance, req) => {
  return new Promise(async (resolve, reject) => {
    const tmpUpdate = await model.findById(userTarget).exec();
    tmpUpdate.balance = parseFloat(tmpUpdate.balance) - parseFloat(balance);

    // add activity
    activity.createBalanceUpdate(
      tmpUpdate._id,
      req,
      tmpUpdate,
      {
        userid: 123,
        email: "raates@gmail.com",
        firstname: "admin",
        lastname: "general",
      },
      "subtract",
      {
        target: parseFloat(balance),
        old: parseFloat(tmpUpdate.balance),
        new: parseFloat(balance) - parseFloat(tmpUpdate.balance),
      }
    );
    // ---------------------------

    return resolve(await tmpUpdate.save());
  });
};

const getAllAgentsDetails = (date) => {
  console.log("getAllAgentsDetails", date);
  return new Promise(async (resolve, reject) => {
    agents.getAgentsDetailByData(date[0], date[1]).then((data) => {
      return resolve(data);
    });
  });
};

const getAllUsersDetailsByAgent = (agent, date) => {
  console.log("getAllUsersDetailsByAgent", agent, date);
  return new Promise(async (resolve, reject) => {
    agents.getAllUsersDetailsByAgent(agent, date[0], date[1]).then((data) => {
      return resolve(data);
    });
  });
};

const getAllHistoryGameByUser = (iduser, date) => {
  console.log("getAllHistoryGameByUser", iduser, date);
  return new Promise(async (resolve, reject) => {
    HistoryGames.getAllHistoryGameByUser(iduser, date[0], date[1]).then(
      (data) => {
        return resolve(data);
      }
    );
  });
};

const getBestPlayers = (date) => {
  return new Promise(async (resolve, reject) => {
    Games.getBestPlayers(date[0], date[1]).then((data) => {
      return resolve(data);
    });
  });
};

export default {
  getBestPlayers: getBestPlayers,
  getAllHistoryGameByUser: getAllHistoryGameByUser,
  getAllUsersDetailsByAgent: getAllUsersDetailsByAgent,
  getAllAgentsDetails: getAllAgentsDetails,
  balanceSubtract: balanceSubtract,
  balanceAdd: balanceAdd,
  searchText: searchText,
  getByAuth: getByAuth,
  login: login,
  create: create,
  createBack: createBack,
  getByStatus: getByStatus,
  getAll: getAll,
  get: get,
  getEmbed: getEmbed,
  getAllByIdCollection: getAllByIdCollection,
  getAllBySlugCollection: getAllBySlugCollection,
  getAllLast: getAllLast,
  getAllAgents: getAllAgents,
  getAllFeatured: getAllFeatured,
  search: search,
  getAllByIdBrand: getAllByIdBrand,
  getAllBySlugBrand: getAllBySlugBrand,
  getBySlug: getBySlug,
  query: query,
  loginAdmin: loginAdmin,
};
