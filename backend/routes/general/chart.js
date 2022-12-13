import express from "express";
import chart from "./../../libraries/exec/general/chart.js";

const router = express.Router();

router.post("/chart/games/best/credit", async (req, res) => {
  chart.bestGamesCredit(req.body.date,req.body.auth).then((data) => res.json(data));
});
router.post("/chart/brands/best/credit", async (req, res) => {
  chart.chartBestBrandsCredit(req.body.date,req.body.auth).then((data) => res.json(data));
});

 
export default {
  endpoint: "/api/general",
  router: router,
};
