import mongoose from "mongoose";

export default mongoose.model(
  "games",
  new mongoose.Schema(
    {
      internal: { type: Object, required: true},
      createDate : { type : String ,  default : new Date().toLocaleDateString("en-US")}
 
    },
    { timestamps: true }
  )
);
