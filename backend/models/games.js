import mongoose from "mongoose";

export default mongoose.model(
  "games",
  new mongoose.Schema(
    {
      internal: { type: Object, required: true}, 
    },
    { timestamps: true }
  )
);
