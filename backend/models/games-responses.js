import mongoose from "mongoose";

export default mongoose.model(
  "games-responses",
  new mongoose.Schema(
    {
      internal: { type: Object, required: true}, 
      createDate : { type : String ,  default : new Date().toLocaleDateString("en-US")}

    },
    { timestamps: true }
  )
);
