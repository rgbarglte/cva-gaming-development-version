import express from "express";
import brands from "./../libraries/brands.js";

const router = express.Router();

router.post("/frontend", async (req, res) => {
  const active = req.body.active ? req.body.active : true;
  const page = req.body.page ? req.body.page : 1;
  const auth = req.body.auth ? req.body.auth : null;
  res.json(await brands.getAllFrontend(page,active,auth));
});


router.post("/", async (req, res) => {
  const active = req.body.active ? req.body.active : true;
  const page = req.body.page ? req.body.page : 1;
  res.json(await brands.getAll(page,active));
});

router.post("/get/all/last", async (req, res) => {
  res.send(await brands.getAllLast(req.body.page));
});

router.post("/get/all/by/status", async (req, res) => {
  res.send(await brands.getByStatus(req.body.status));
});

router.post("/get/all/by/slug", async (req, res) => {
  res.send(await brands.getBySlug(req.body.slug));
});

router.post("/get/all/games", async (req, res) => {
  res.send(await brands.getAllBySlugBrand(req.body.slug, req.body.page));
});

router.post("/get/by/slug", async (req, res) => {
  brands.query({ slug: req.body.slug }).then(async (data) => {
    res.send(data);
  });
});

router.post("/update/field", async (req, res) => {
  brands
    .updateSingle(req.body.id, req.body.field, req.body.value)
    .then((data) => {
      res.json(data);
    });
});

router.post("/update", async (req, res) => {
  brands.update(req.body.id, req.body.data).then((data) => {
    res.json(data);
  });
});

router.post("/upload", async (req, res) => {
  brands
    .uploadImagesTemp(req, res)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

export default {
  endpoint: "/api/brands",
  router: router,
};
