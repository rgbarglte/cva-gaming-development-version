import { Server } from "socket.io";
import users from "../libraries/users.js";
import usersModel from "../models/users.js";

import chats from "../libraries/chats.js";

var io, socket_;

var activeSockets = {};
var activeUsers = {};


import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import settings from "./../settings.js";


export default {
  getIo: () => {
    return io;
  },
  getSocket: () => {
    return socket_;
  },
  start: (http) => {
    return new Promise(async (resolve, reject) => {
      io = new Server(http, { cors: { origin: "*" } });
      io.on("connection", async (socket) => {
        console.log("User has connected to Index");
        //ON Events
        socket_ = socket;

        socket.on("teste", async (data) => {
          var tmp = await users.query({ authToken: data.auth });
          try {
            if (tmp.length == 0) {
              return reject({ status: "500", msg: "internal error" });
            }

            const rooms = ["webclient-" + tmp[0]._id, "activity-" + tmp[0]._id];

            socket.join(rooms);

            // socket.join(tmp[0]._id);
            tmp = await usersModel.findById(tmp[0]._id).exec();

            console.log("debug 1");

            if (!activeUsers.hasOwnProperty(tmp._id)) {
              activeUsers[tmp._id] = {
                userDetails: tmp._id,
                sockets: [socket.id],
              };
            } else {
              activeUsers[tmp._id].sockets.push(socket.id);
            }

            console.log("activeUsers.", activeUsers);

            tmp.socket = socket.id;
            var test = await tmp.save();
            // console.log(test);
            socket.emit("response", {
              test: true,
            });
          } catch (error) {}
        });

        socket.on("back-activity-join-room", async (data) => {
          const rooms = ["activity-" + data.user];
          console.log(
            "🚀 ~ file: socket.js ~ line 52 ~ socket.on ~ rooms",
            rooms
          );
          socket.join(rooms);
          console.log(
            "conectado al socket de actividad : activity-" + data.user
          );
          socket.emit("back-activity-join-room", {
            response: true,
            error: false,
            connect: true,
            user: data.user,
          });
        });

        socket.on("back-chat-send-chat", async (data) => {
          const save = {
            userid: data.userid,
            type: "message",
            message: data.msg,
            to: data.to,
            attach: null,
          };

          chats.create(save).then((saveData) => {
            if (activeUsers.hasOwnProperty(data.to)) {
              activeUsers[data.to].sockets.forEach((socketId) => {
                //This will send notification to each of the socket and thus you will receive the same notifications in each tab.
                io.to(socketId).emit("chat-message", data);
                console.log("chat-message", data);
              });
            } else {
              // Exception handaling
            }
          });
        });

        socket.on("client-chat-send-chat", async (data) => {
          verify(auth, settings.jwtSecret, async function (err, decoded) {
            if (err) {
              return resolve({ error: 1, msg: "Token no valid" });
            }

            const save = {
              userid: decoded._id,
              type: "message",
              message: data.msg,
              to: data.to,
              attach: null,
            };

            chats.create(save).then((saveData) => {
              if (activeUsers.hasOwnProperty(data.to)) {
                activeUsers[data.to].sockets.forEach((socketId) => {
                  //This will send notification to each of the socket and thus you will receive the same notifications in each tab.
                  io.to(socketId).emit("chat-message-client", data);
                  console.log("chat-message", data);
                });
              } else {
                // Exception handaling
              }
            });
          });
        });

        // socket.on("client-send-msg", async (data) => {
        //   io.to(data.target).emit(data.msg);
        // });

        resolve(socket);
      });
    });
  },
};
