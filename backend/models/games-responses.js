import mongoose from "mongoose";

export default mongoose.model(
  "games-responses",
  new mongoose.Schema(
    {
      internal: { type: Object, required: true}, 
    },
    { timestamps: true }
  )
);
