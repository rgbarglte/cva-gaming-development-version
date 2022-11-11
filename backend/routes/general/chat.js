import express from "express";
import chat from "./../../libraries/exec/general/chat.js";

const router = express.Router();

router.post("/chat/users", async (req, res) => {
   chat.users().then((data) => res.json(data));
});

router.post("/chat/messages", async (req, res) => {
   chat.messages(req.body.users).then((data) => res.json(data));
});

export default {
  endpoint: "/api/general",
  router: router,
};
