import model from "./../models/games.js";
import modelBrand from "./../models/brands.js";
import modelGames from "./../models/games.js";

import products from "./../libraries/SDK/games/games.js";
import slug from "limax";
import { uuid } from "uuidv4";

import path, { resolve } from "path";
import fs from "fs";

import { fileURLToPath } from "url";

import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import settings from "./../settings.js";

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

const createDBTEST = async (data) => {
  const temp = new modelBrand(data);
  try {
    const save = await temp.save();
    //console.log("insert", save);
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
    return await modelBrand
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

const querydistinct = async (
  filters = {},
  fields = [],
  limit = 1,
  sort = {},
  skip = {},
  distinct
) => {
  try {
    return await modelGames
      .find(filters)
      .select(fields)
      .limit(limit)
      .sort(sort)
      .skip(skip)
      .distinct(distinct)
      .exec();
  } catch (err) {
    return err;
  }
};

const getAllOld = async (pageNumber = 1) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  const tmp = await querydistinct({}, {}, 5000, {}, {}, "internal.category");
  try {
    return tmp;
  } catch (err) {
    return err;
  }
};

const getAllFrontend = async (pageNumber = 1, active = true, auth = null) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;

  return new Promise((resolve, reject) => {
    if (auth) {
      verify(auth, settings.jwtSecret, async function (err, decoded) {
        if (err) {
          return resolve({ error: 1, msg: "Token no valid" });
        }

        if (decoded.enabledAllBrands == false) {
          var tmpBrands = [];
          decoded.brands.forEach((element) => {
            tmpBrands.push(mongoose.Types.ObjectId(element));
          });
          query(
            {
              active: active,
              _id: {
                $in: tmpBrands,
              },
            },
            {},
            1000,
            {}
          ).then((data) => resolve(data));
        } else {
          query(
            {
              active: active,
            },
            {},
            1000,
            {}
          ).then((data) => resolve(data));
        }
      });
    } else {
      query(
        {
          active: active,
        },
        {},
        1000,
        {}
      ).then((data) => resolve(data));
    }
  });
};

const getAll = async (pageNumber = 1, active = true) => {
  var pageSize = 50;
  var limit = pageSize;
  var skip = pageSize * pageNumber;
  // const tmp = await query({}, {}, limit, {
  const tmp = await query(
    {
      // active: active,
    },
    {},
    1000,
    {}
  );
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

const updateSingle = (id, field, value) => {
  return new Promise(async (resolve, reject) => {
    const tmpUpdate = await modelBrand.findById(id).exec();
    tmpUpdate[field] = value;
    return resolve(await tmpUpdate.save());
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const tmpUpdate = await modelBrand.findById(id).exec();
    tmpUpdate["active"] = data["active"];
    tmpUpdate["isDelete"] = data["isDelete"];
    tmpUpdate["activeLoginOnly"] = data["activeLoginOnly"];
    tmpUpdate["activeGroupOnly"] = data["activeGroupOnly"];
    tmpUpdate["name"] = data["name"];
    tmpUpdate["slug"] = data["slug"];
    tmpUpdate["internal"] = data["internal"];
    tmpUpdate["thumb"] = data["thumb"];

    return resolve(await tmpUpdate.save());
  });
};

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

const createDbInternal = () => {
  //console.log("createDbInternal");
  getAllOld().then((data) => {
    //console.log("test", data);
    data.forEach((element) => {
      //console.log("forEach", element);
      createDBTEST({
        name: element.replace("-", " "),
        slug: slug(element),
        internal: element,
      });
    });
  });
};

const uploadImagesTemp = (req, res) => {
  if (!fs.existsSync(path.join(__dirname, "../uploads/brands"))) {
    fs.mkdirSync(path.join(__dirname, "../uploads/brands"));
  }
  return new Promise((resolve, reject) => {
    if (!req.files) {
      reject({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;
      const nameRandom = uuid() + path.extname(file.name);
      file.mv(path.join(__dirname, "../uploads/brands") + "/" + nameRandom);
      //send response
      resolve({
        success: "ok",
        name: nameRandom,
      });
    }
  });
};

export default {
  createDbInternal: createDbInternal,
  uploadImagesTemp: uploadImagesTemp,
  create: create,
  getByStatus: getByStatus,
  getAll: getAll,
  getAllByIdCollection: getAllByIdCollection,
  getAllBySlugCollection: getAllBySlugCollection,
  getAllLast: getAllLast,
  getAllFeatured: getAllFeatured,
  search: search,
  getAllByIdBrand: getAllByIdBrand,
  getAllBySlugBrand: getAllBySlugBrand,
  getBySlug: getBySlug,
  query: query,
  updateSingle: updateSingle,
  update: update,
  getAllFrontend: getAllFrontend,
};
