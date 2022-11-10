import mongoose from "mongoose";

export default mongoose.model(
  "users",
  new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true },
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      passwordConstant: { type: String, required: true },
      nickname: { type: String, required: false, default: null },
      authToken: { type: String, required: true, unique: true },
      balance: { type: Number, required: false, default: 0 },
      active: { type: Boolean, required: false, default: true },
      isDelete: { type: Boolean, required: false, default: false },
      isAgent: { type: Boolean, required: false, default: false },
      status: { type: Number, required: false, default: 1 },
      isAdmin: { type: Boolean, required: false, default: false },
      currency: { type: String, required: false, default: "EUR" },
      tokenLostPassword: { type: String, required: false, default: null },
      completeRegister: { type: Boolean, required: false, default: false },
      internal: { type: Object, required: true },
      socket: { type: String, required: false },
      isLogin: { type: Boolean, required: false, default: false },
      profile: {
        firstname: { type: String, required: false, default: null },
        lastname: { type: String, required: false, default: null },
        address: { type: String, required: false, default: null },
        city: { type: String, required: false, default: null },
        country: { type: String, required: false, default: null },
        zip: { type: String, required: false, default: null },
        about: { type: String, required: false, default: null },
      },
      automatically_settle: { type: Boolean, required: false, default: false },
      owner_id: { type: String, required: true },
      agent_id: { type: String, required: false, default: null },
      agent_data: { type: Object, required: false, default: {} },
      createDate: {
        type: String,
        default: new Date().toLocaleDateString("en-US"),
      }, 
      enabledAllBrands: { type: Boolean, default : true},
      brands: { type: Array, default : []},
      enabledAllGames: { type: Boolean, default : true},
      games:  { type: Array, default : []},  
    },
    { timestamps: true }
  )
);
