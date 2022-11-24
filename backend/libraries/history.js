import model from "./../models/history.js";
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

  // console.log("history", data);
  const temp = new model(data);
  try {
    const save = await temp.save();
    // console.log("insert", save);
    return save;
  } catch (err) {
    return err;
  }
};
 


const crateGame = async (userid, query, userdata = null) => {
  
  if(query.amount) {
    query.amount = parseInt(query.amount);
  } 
  // else {
  //   query['amount'] = 0;
  // }
  const data = {
    userid: userid,
    type: "games",
    data: query,
    user: userdata,
  };

  // console.log("history", data);
  const temp = new model(data);
  try {
    const save = await temp.save();
    // console.log("insert", save);
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

const getAll = async (pageNumber = 0) => {
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

const getAllLogin = async (pageNumber = 0, filter = {}) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;
  var search = {
    type: "login",
  };

  if (lodash.isArray(filter.date)) {
    search.createDate = {
      $gte: new Date(filter.date[0]).toLocaleDateString("en-US"),
      $lt: new Date(filter.date[1]).toLocaleDateString("en-US"),
    };

    
  }

  if (lodash.isString(filter.user) && filter.user && filter.user !== '' && filter.user !== ' ') {
    search["$text"] = {
      $search: filter.user,
    };
  }

  console.log(search);
  const tmp = await query(search, {}, limit, {}, skip);
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

export default {
  getAllLogin: getAllLogin,
  crateGame: crateGame,
  createLogin: createLogin,
  getByStatus: getByStatus,
  getAll: getAll,
  get: get,
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
