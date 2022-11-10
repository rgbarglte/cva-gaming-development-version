import express from "express";
import platform from "./../libraries/platform.js";

const router = express.Router();

 
router.post("/details", async (req, res) => {
  res.send(await platform.getAllDetailsByDate(req.body.date));
});
 

export default {
  endpoint: "/api/platform",
  router: router,
};
