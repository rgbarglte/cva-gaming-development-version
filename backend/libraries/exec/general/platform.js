import { exec } from "./../hook.js";
import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import settings from "./../../../settings.js";

export default {
  getDetails: (date, auth = null) => {
    return new Promise(async (resolve, reject) => {
      if (auth) {
        verify(auth, settings.jwtSecret, async function (err, decoded) {
          if (err) {
            return resolve({ error: 1, msg: "Token no valid" });
          }

          if (decoded.isAgent) {
            console.log("isagent", [
              "platform-details",
              date[0],
              date[1],
              decoded._id,
            ]);
            exec("agent/app.py", [
              "platform-details",
              date[0],
              date[1],
              decoded._id,
            ]).then((data) => {
              return resolve(data);
            });
          }
          if (decoded.isAdmin) {
            console.log("isAdmin", [
              "chart-best-games-credit",
              date[0],
              date[1],
            ]);
            exec("general/app.py", [
              "platform-details",
              date[0],
              date[1],
            ]).then((data) => {
              return resolve(data);
            });
          }
        });
      } else {
        return resolve({ error: 1, msg: "Token no valid" });
      }
    });
  } 
};
