import express from "express";
import games from "./../libraries/games.js";

const router = express.Router();

 

router.post("/", async (req, res) => {
  res.json(await games.getAll(req.body.page));
});

router.post("/get", async (req, res) => {
  res.send(await games.get(req.body.id));
});


router.post("/get/embed", async (req, res) => {
  res.send(await games.getEmbed(req.body.auth,req.body.id));
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

router.post("/get/all/by/collection", async (req, res) => {
  res.send(await games.getAllByIdCollection(req.body.id));
});

router.post("/get/all/by/collection/slug", async (req, res) => {
  res.send(await games.getByStatus(req.body.slug));
});

router.post("/get/all/by/brand", async (req, res) => {
  res.send(await games.getAllByIdBrand(req.body.id));
});

router.post("/get/all/by/brand/slug", async (req, res) => {
  res.send(await games.getAllBySlugBrand(req.body.slug));
});

export default {
    endpoint : '/api/games',
    router : router
}