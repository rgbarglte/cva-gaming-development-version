import express from "express";
import cors from "cors";
import { readFile, readFileSync } from "fs";
import { createServer } from "https";
import { createServer as createServerHttp } from "http";
import useragent from "express-useragent";
import path from "path";
const __dirname = path.resolve();

const app = express();
import fileUpload from "express-fileupload";
import history from "connect-history-api-fallback";
app.use(history());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(useragent.express());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", function (req, res) {
  console.log("/", path.join(__dirname, "agent") + "/index.html");
  res.sendFile(path.join(__dirname, "agent") + "/index.html");
});

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "agent")));

// app.all("*", function (req, res, next) {
//   if (!req.secure && req.get("x-forwarded-proto") !== "https") {
//     return res.redirect(`https://${req.get("host")}${req.url}`);
//   }
//   next();
// });

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/*  serverHttps = createServer(
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
  ).listen(443, () => console.log("HTTPS Server Started")); */

createServerHttp(app).listen(5858, () =>
  console.log("HTTP Server Agent Started port : 5858")
);
 