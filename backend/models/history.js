import mongoose from "mongoose";

export default mongoose.model(
  "history",
  new mongoose.Schema(
    {
        userid : { type : String , required : true},
        type : { type : String , required : true}, 
        data: { type: Object, required: true}, 
        user: { type: Object, required: true}, 
    },
    { timestamps: true }
  )
);
