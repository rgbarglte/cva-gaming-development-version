import mongoose from "mongoose";

export default mongoose.model(
  "types",
  new mongoose.Schema(
    {
      active: { type: Boolean, required: false, default: true },
      isDelete: { type: Boolean, required: false, default: false }, 
      activeLoginOnly: { type: Boolean, required: false, default: false }, 
      activeGroupOnly: { type: Boolean, required: false, default: false }, 
      name : { type : String , default : null , required : true},
      slug : { type : String , default : null , required : true},
      internal: { type: Object, required: true}, 
      createDate : { type : String ,  default : new Date().toLocaleDateString("en-US")},
      thumb : { type : String , default : null , required : false},

    },
    { timestamps: true }
  )
);
