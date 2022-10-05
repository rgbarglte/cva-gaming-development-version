import mongoose from "mongoose";
import app from "./start.js";

mongoose
  .connect(
    "mongodb://app:43119739Ramiro@75.102.23.162:27017/?authMechanism=DEFAULT"
  )
  .then((data) => {
    console.log("DB Connection Successfull!");
    app.start();
  })
  .catch((err) => {
    console.log(err);
  });
