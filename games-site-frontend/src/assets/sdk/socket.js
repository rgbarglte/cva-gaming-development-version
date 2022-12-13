// ES6 import or TypeScript
import { io } from "socket.io-client";
var  socket;


import settings from "./settings";


export default {
    getIo : () => {
      return socket;
    },
    connect : (auth) => {
        return new Promise(async (resolve, reject) => {
          socket = io(settings.socketHost);
          socket.on('connect', () => { 
             console.log('Successfully connected!');  
             socket.emit('teste' , {
              auth : auth
             })  
             resolve(socket)
          });
       })
    }
}

