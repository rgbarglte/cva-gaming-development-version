import express from "express";
import types from "./../libraries/types.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const active = req.body.active ? req.body.active : true;
  const page = req.body.page ? req.body.page : 1;
  res.json(await types.getAll(req.body.page,active));
});


router.post("/frontend", async (req, res) => {
  const active = req.body.active ? req.body.active : true;
  const page = req.body.page ? req.body.page : 1;
  res.json(await types.getAllFrontend(req.body.page,active));
});


 
router.post("/get/all/last", async (req, res) => {
  res.send(await types.getAllLast(req.body.page));
});

router.post("/get/all/by/status", async (req, res) => {
  res.send(await types.getByStatus(req.body.status));
});

router.post("/get/all/by/slug", async (req, res) => {
  res.send(await types.getBySlug(req.body.slug));
});

router.post("/get/all/games", async (req, res) => {
  res.send(await types.getAllBySlugBrand(req.body.slug, req.body.page));
});

// router.post("/update", async (req, res) => {
//   res.send(
//     await types.update(req.body.id, {
//       name: req.body.name,
//       active: req.body.active,
//       activeLoginOnly: req.body.activeLoginOnly,
//       activeGroupOnly: req.body.activeGroupOnly,
//     })
//   );
// });



router.post("/update/field", async (req, res) => {
  types.updateSingle(req.body.id,req.body.field,req.body.value).then(data => {
    res.json(data);
  })
  
});




router.post("/update", async (req, res) => {
  types.update(req.body.id,req.body.data).then(data => {
    res.json(data);
  })
  
});



router.post("/upload", async (req, res) => {
  types
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
  endpoint: "/api/types",
  router: router,
};
