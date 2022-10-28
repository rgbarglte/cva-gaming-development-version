import model from "./../models/chats.js"; 
import settings from "./../settings.js";
  

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

// const searchText = async (target) => {
//   const tmp = await query(
//     {
//       $text: {
//         $search: target,
//       },
//     },
//     {},
//     10000
//   );

//   try {
//     return tmp;
//   } catch (err) {
//     return err;
//   }
// };

const create = async (data) => { 
  return new Promise(async (resolve, reject) => { 
        var serial = {
            userid : data.userid,
            type : data.type,
            message: data.message,
            to: data.to,
            attach : data.attach,
        }; 
        const temp = new model(serial); 
        try {
          const save = await temp.save(); 
          resolve(save);
        } catch (err) {
          reject(err);
        }
      }); 
};

  

// const getAll = async (pageNumber = 1) => {
//   var pageSize = 50;
//   var limit = pageSize;
//   var skip = pageSize * pageNumber;

//   const tmp = await query(
//     {},
//     {},
//     limit,
//     {
//       _id: 1,
//     },
//     skip
//   );
//   try {
//     return tmp;
//   } catch (err) {
//     return err;
//   }
// };





const getAllRoom = async (room,pageNumber = 1) => {
    var pageSize = 50;
    var limit = pageSize;
    var skip = pageSize * pageNumber;
  
    const tmp = await query(
      {
        room : room,
      },
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
  
export default {
  create : create,
  getAllRoom : getAllRoom,
  query: query,
};
