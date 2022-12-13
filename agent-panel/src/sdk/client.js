import settings from './settings.js';

export default {
    POST : (method,params) => {
        if(!params.auth) {
            params.auth = localStorage.getItem('auth');
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        };
        return new Promise((resolve, reject) => {
            fetch(settings.host + method, requestOptions).then((response) => response.json()).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        }) 
    }
}