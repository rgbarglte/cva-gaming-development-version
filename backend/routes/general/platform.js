import express from "express";
import platform from "./../../libraries/exec/general/platform.js";
 
const router = express.Router();

router.post("/details", async (req, res) => {
  platform.getDetails(req.body.date,req.body.auth).then((data) => res.json(data));
});
 
 
export default {
    endpoint: "/api/platform",
    router: router,
  };
  