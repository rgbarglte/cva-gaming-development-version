import mongoose from "mongoose";
import gamesLib from "./libraries/games.js";
import typesLib from "./libraries/types.js"; 
import brandsLib from "./libraries/brands.js"; 
 
mongoose
  .connect(
    "mongodb://cva:43119739@127.0.0.1:27017/?authMechanism=DEFAULT"
  )
  .then((data) => {
    console.log("DB Connection Successfull!");
      // gamesLib.createDbInternal();
    brandsLib.createDbInternal();
    typesLib.createDbInternal();
     
  })
  .catch((err) => {
    console.log(err);
  });
