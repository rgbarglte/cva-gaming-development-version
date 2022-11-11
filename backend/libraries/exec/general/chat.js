import { exec } from './../hook.js';

export default {
    users : () => {
        return new Promise(async (resolve, reject) => { 
        exec('general/app.py',['users']).then(data => {
           return resolve(data)
        })
    })
    },
    messages : (users) => {
        return new Promise(async (resolve, reject) => { 
            exec('general/app.py',['messages',users[0],users[1]]).then(data => {
               return resolve(data)
            })
        })
    },
}