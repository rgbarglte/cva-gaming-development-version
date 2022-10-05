import games from "./routes/games.js";
import brands from "./routes/brands.js";
import users from "./routes/users.js";
import history from "./routes/history.js";
import express from "express";

import cors from "cors";

import { readFile , readFileSync } from "fs";

import { createServer } from "https";
import { createServer as createServerHttp } from "http";
import useragent from 'express-useragent';




const app = express();

app.use(useragent.express())
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);



import gamesLib from "./libraries/games.js";
 

app.get("/platform/internal/callback",  async (req, res) => {
  console.log("get", req.query);

  if(req.query.action == 'balance') {
    gamesLib.getBalanceCallback(req.query.username,req.query.session_id,req.query).then(data => {
      console.log('endpoint',data)
      res.json(data);
    }).catch(err => {
      res.json(err);
    });
  }


  
  if(req.query.action == 'debit') {
    gamesLib.debitBalanceCallback(req.query.username,req.query.session_id,req.query.amount,req.query).then(data => {
      console.log('endpoint',data)
      res.json(data);
    }).catch(err => {
      res.json(err);
    });
  }



  if(req.query.action == 'credit') {
    gamesLib.creditBalanceCallback(req.query.username,req.query.session_id,req.query.amount,req.query).then(data => {
      console.log('endpoint',data)
      res.json(data);
    }).catch(err => {
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

  app.get("/", function (req, res) {
    res.send("working");
  });

  app.get("/platform/internal/callback", function (req, res) {
    console.log("get", req.query);
    res.json({"status":"200","balance":"300.00"});
   
  });
  // app.post("/platform/internal", function (req, res) {
  //   console.log("post", req.body);
  //   res.json({"status":"200","balance":"300.00"});
  // });

  app.use(games.endpoint, games.router);
  app.use(brands.endpoint, brands.router);
  app.use(users.endpoint, users.router);
  app.use(history.endpoint, history.router);

  createServer(
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

  // app.listen(process.env.PORT || 80, () => {
  //   console.log("Backend server is running! 80");
  // });
};

export default {
  start: start,
};
