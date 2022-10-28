// ES6 import or TypeScript
import { io } from "socket.io-client";
var  socket;



export default {
    getIo : () => {
      return socket;
    },
    connect : (auth) => {
        return new Promise(async (resolve, reject) => {
        socket = io('https://cvagaming.com');
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

