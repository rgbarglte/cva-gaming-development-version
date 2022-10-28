import express from "express";
import games from "./../libraries/brands.js";

const router = express.Router();

router.post("/", async (req, res) => {
  res.json(await games.getAll(req.body.page));
});

router.post("/get/all/last", async (req, res) => {
  res.send(await games.getAllLast(req.body.page));
});

router.post("/get/all/by/status", async (req, res) => {
  res.send(await games.getByStatus(req.body.status));
});

router.post("/get/all/by/slug", async (req, res) => {
  res.send(await games.getBySlug(req.body.slug));
});

router.post("/get/all/games", async (req, res) => {
  res.send(await games.getAllBySlugBrand(req.body.slug, req.body.page));
});



router.post("/update/field", async (req, res) => {
  games.updateSingle(req.body.id,req.body.field,req.body.value).then(data => {
    res.json(data);
  })
  
});




router.post("/update", async (req, res) => {
  games.update(req.body.id,req.body.data).then(data => {
    res.json(data);
  })
  
});



 
export default {
  endpoint: "/api/brands",
  router: router,
};
