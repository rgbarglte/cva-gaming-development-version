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
    },
    joinActivityLive : (user) => {
        console.log("🚀 ~ file: socket.js ~ line 24 ~ user", user)
        return new Promise(async (resolve, reject) => {
            socket.emit('back-activity-join-room',{
                user : user
            }) 
            
        })
    },

    joinToRoom : (room) => {
        return new Promise(async (resolve, reject) => {
            socket.emit('back-chat-join-room',room)
            socket.on('back-chat-join-room',data => {
                if(data.response ==true) {
                    return resolve(data);
                }
            })
        })
    },

    sendChat : (data) => {
        return new Promise(async (resolve, reject) => {
            socket.emit('back-chat-send-chat',data) 
        })
    },
}



 