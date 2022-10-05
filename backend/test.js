import test from './libraries/SDK/games/games.js';


import games from './libraries/games.js';







import mongoose from "mongoose"; 

mongoose
  .connect(
    "mongodb://app:43119739Ramiro@75.102.23.162:27017/test?authMechanism=DEFAULT"
  )
  .then((data) => {
    console.log("DB Connection Successfull!");
    games.createDbInternal();
  })
  .catch((err) => {
    console.log(err);
  });



 
