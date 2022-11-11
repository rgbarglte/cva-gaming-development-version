import games from "./routes/games.js";
import brands from "./routes/brands.js";
import users from "./routes/users.js";
import historyRouter from "./routes/history.js";
import activity from "./routes/activity.js";
import platform from "./routes/platform.js";
import types from "./routes/types.js";


import GeneralChat from "./routes/general/chat.js";



import express from "express";

import cors from "cors";

import { readFile, readFileSync } from "fs";

import { createServer } from "https";
import { createServer as createServerHttp } from "http";
import useragent from "express-useragent";
import path from "path";
const __dirname = path.resolve();

import history from "connect-history-api-fallback";

const app = express();

import { Server } from "socket.io";

app.use(useragent.express());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

import gamesLib from "./libraries/games.js";
import socket from "./services/socket.js";


var serverHttps;

app.get("/", function (req, res) {
  console.log("/",path.join(__dirname, "public") + "/index.html");
  res.sendFile(path.join(__dirname, "public") + "/index.html");
});



app.get("/web", function (req, res) {
  console.log("/we",path.join(__dirname, "public") + "/index.html");
  res.sendFile(path.join(__dirname, "public") + "/index.html");
});


// app.get("/socket.io", function (req, res) {
//     socket.start(serverHttps).then(socket => {
//       console.log('connected success');
//     })
// });
   

app.get("/platform/internal/callback", async (req, res) => {
  console.log("get", req.query);

  if (req.query.action == "balance") {
    gamesLib
      .getBalanceCallback(req.query.username, req.query.session_id, req.query)
      .then((data) => {
        console.log("endpoint", data);
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  if (req.query.action == "debit") {
    gamesLib
      .debitBalanceCallback(
        req.query.username,
        req.query.session_id,
        req.query.amount,
        req.query
      )
      .then((data) => {
        console.log("endpoint", data);
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  if (req.query.action == "credit") {
    gamesLib
      .creditBalanceCallback(
        req.query.username,
        req.query.session_id,
        req.query.amount,
        req.query
      )
      .then((data) => {
        console.log("endpoint", data);
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  // res.json(await gamesLib.callbackGames(req.query));
});

const start = () => {
  app.all("*", function (req, res, next) {
    if (!req.secure && req.get("x-forwarded-proto") !== "https") {
      return res.redirect(`https://${req.get("host")}${req.url}`);
    }
    next();
  });

  // Add Access Control Allow Origin headers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(history());
  app.use(express.static(path.join(__dirname, "public")));
  // app.use(express.static(path.join(__dirname, 'uploads')));
  // app.set('puerto', process.env.PORT || 80);

 
  app.get("/platform/internal/callback", function (req, res) {
    console.log("get", req.query);
    res.json({ status: "200", balance: "300.00" });
  });
  // app.post("/platform/internal", function (req, res) {
  //   console.log("post", req.body);
  //   res.json({"status":"200","balance":"300.00"});
  // });

  app.use(games.endpoint, games.router);
  app.use(brands.endpoint, brands.router);
  app.use(users.endpoint, users.router);
  app.use(historyRouter.endpoint, historyRouter.router);
  app.use(activity.endpoint, activity.router);
  app.use(types.endpoint, types.router);
  app.use(platform.endpoint, platform.router);
  
  // General endpoints
  app.use(GeneralChat.endpoint,GeneralChat.router);

 

    serverHttps = createServer(
    {
      key: readFileSync(
        "/etc/letsencrypt/live/cvagaming.com/privkey.pem",
        "utf8"
      ),
      cert: readFileSync(
        "/etc/letsencrypt/live/cvagaming.com/cert.pem",
        "utf8"
      ),
      ca: readFileSync("/etc/letsencrypt/live/cvagaming.com/chain.pem", "utf8"),
    },
    app
  ).listen(443, () => console.log("HTTPS Server Started"));
  // http server
  createServerHttp(app).listen(80, () => console.log("HTTP Server Started"));
 
   

  socket.start(serverHttps).then(socket => {
    console.log('connected success');
  })

  // io.on("connection", function (socket) {
  //   console.log("User has connected to Index");
  //   //ON Events
  //   socket.on("admin", function () {
  //     console.log("Successful Socket Test");
  //   });

  //   socket.on("teste", (data) => {
  //     socket.id = data.auth;
  //     console.log("teste", data);
  //     socket.emit("response", {
  //       test: true,
  //     });
  //   });
  // });

  // app.listen(process.env.PORT || 80, () => {
  //   console.log("Backend server is running! 80");
  // });
};

export default {
  start: start,
};
