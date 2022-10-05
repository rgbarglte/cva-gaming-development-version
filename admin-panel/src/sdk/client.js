import settings from './settings.js';

export default {
    POST : (method,params) => {
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