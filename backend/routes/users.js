import express from "express";
import users from "./../libraries/users.js";

const router = express.Router();

router.post("/auth", async (req, res) => {
  users.getByAuth(req.body.auth).then((data) => res.json(data));
});

router.post("/search/text", async (req, res) => {
  users.searchText(req.body.search).then((data) => res.json(data));
});

router.post("/register", async (req, res) => {
  console.log("endpoint register", req.body);
  users
    .create({
      username: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      currency: "EUR",
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", async (req, res) => {
  console.log("endpoint login", req.body);
  users
    .login(
      {
        email: req.body.email,
        password: req.body.password,
        currency: req.body.currency,
      },
      req
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login/admin", async (req, res) => {
  console.log("endpoint login", req.body);
  users
    .loginAdmin(
      {
        email: req.body.email,
        password: req.body.password,
      },
      req
    )
    .then((data) => {
      console.log("🚀 ~ file: users.js ~ line 75 ~ .then ~ data", data);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login/agent", async (req, res) => {
  console.log("endpoint login agent", req.body);
  users
    .loginAgent(
      {
        email: req.body.email,
        password: req.body.password,
      },
      req
    )
    .then((data) => { 
      console.log(data)
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/create", async (req, res) => {
  users
    .createBack(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", async (req, res) => {
  users.getAll(req.body.page,req.body.auth).then(data => {
    res.json(data);
  }) 
});

router.post("/get", async (req, res) => {
  res.send(await users.get(req.body.id));
});

router.post("/get/embed", async (req, res) => {
  res.send(await users.getEmbed(req.body.id));
});
router.post("/get/all/agents", async (req, res) => {
  res.send(await users.getAllAgents(req.body.page));
});
router.post("/get/all/last", async (req, res) => {
  res.send(await users.getAllLast(req.body.page));
});

router.post("/get/all/by/status", async (req, res) => {
  res.send(await users.getByStatus(req.body.status));
});

router.post("/get/all/by/slug", async (req, res) => {
  res.send(await users.getBySlug(req.body.slug));
});

router.post("/get/all/by/collection", async (req, res) => {
  res.send(await users.getAllByIdCollection(req.body.id));
});

router.post("/get/all/by/collection/slug", async (req, res) => {
  res.send(await users.getByStatus(req.body.slug));
});

router.post("/get/all/by/brand", async (req, res) => {
  res.send(await users.getAllByIdBrand(req.body.id));
});

router.post("/get/all/by/brand/slug", async (req, res) => {
  res.send(await users.getAllBySlugBrand(req.body.slug));
});

router.post("/balance/subtract", async (req, res) => {
  res.send(
    await users.balanceSubtract(
      req.body.auth,
      req.body.target,
      req.body.balance,
      req
    )
  );
});

router.post("/balance/add", async (req, res) => {
  res.send(
    await users.balanceAdd(
      req.body.auth,
      req.body.target,
      req.body.balance,
      req
    )
  );
});

router.post("/betwin/add", async (req, res) => {
  res.send(
    await users.balanceAdd(
      req.body.token,
      req.body.target,
      req.body.balance,
      req
    )
  );
});

router.post("/agents/detail", async (req, res) => {
  res.send(await users.getAllAgentsDetails(req.body.date));
});
router.post("/agents/detail/users", async (req, res) => {
  res.send(await users.getAllUsersDetailsByAgent(req.body.agent, req.body.date));
});

router.post("/games/history", async (req, res) => {
  res.send(await users.getAllHistoryGameByUser(req.body.user, req.body.date));
});
 


router.post("/best/games", async (req, res) => {
  res.send(await users.getBestPlayers(req.body.date));
});



router.post("/delete", async (req, res) => {
  res.send(await users.deleteUser(req.body.id));
});


router.post("/edit", async (req, res) => {
  res.send(await users.editUser(req.body.id,req.body.data));
});
 
 
export default {
  endpoint: "/api/users",
  router: router,
};
