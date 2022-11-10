import express from "express";
import activity from "./../libraries/activity.js";

const router = express.Router();

router.post("/balance", async (req, res) => {
  res.json(await activity.getAllBalance(req.body.page, req.body.filter));
});
router.post("/balance/user", async (req, res) => {
  res.json(
    await activity.getAllBalanceByUser(
      req.body.page,
      req.body.filter,
      req.body.user
    )
  );
});

router.post("/balance/details/page", async (req, res) => {
  activity.balanceTotalPages().then((data) => {
    res.json(data);
  });
});

router.post("/balance/details/page/user", async (req, res) => {
  activity.balanceTotalPagesByUser(req.body.user).then((data) => {
    res.json(data);
  });
});

export default {
  endpoint: "/api/activity",
  router: router,
};
