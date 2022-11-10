import mongoose from "mongoose";

export default mongoose.model(
  "chat",
  new mongoose.Schema(
    {
        userid : { type : String , required : true},
        type : { type : String , required : false, default : 'message'}, 
        message: { type: String, required: false , default : null},  
        to: { type: String, required: true}, 
        attach : { type: Object, required: false}, 
        createDate : { type : String ,  default : new Date().toLocaleDateString("en-US")}
    },
    { timestamps: true }
  )
);
