import mongoose from "mongoose";

export default mongoose.model(
  "brands",
  new mongoose.Schema(
    {
      active: { type: Boolean, required: false, default: true },
      isDelete: { type: Boolean, required: false, default: false }, 
      activeLoginOnly: { type: Boolean, required: false, default: false }, 
      activeGroupOnly: { type: Boolean, required: false, default: false }, 
      name : { type : String , default : null , required : true},
      slug : { type : String , default : null , required : true},
      internal: { type: Object, required: true}, 
    },
    { timestamps: true }
  )
);
