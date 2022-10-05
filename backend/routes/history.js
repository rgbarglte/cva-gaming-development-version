import express from "express";
import history from "./../libraries/history.js";

const router = express.Router();

 

router.post("/login", async (req, res) => {
  res.json(await history.getAllLogin(req.body.page,req.body.filter));
});
 

export default {
    endpoint : '/api/history',
    router : router
}