import client from "./client.js";
import settings from "./../../../settings.js";
 
  

const createPlayer = async ( 
  user_username, 
  user_password,
  user_nickname = null,
  currency = "EUR",
) => {
return await client.POST({
  method: "createPlayer", 
  user_password: user_password,
  user_username: user_username,
  currency: currency,
  user_nickname: user_nickname,
});
};



const loginPlayer = async ( 
  user_username, 
  user_password, 
  currency = "EUR",
) => {
 
return await client.POST({
  method: "loginPlayer", 
  user_password: user_password,
  user_username: user_username,
  currency: currency, 
});
};



  
const playerExists = async ( 
    user_username,
    currency = "EUR", 
  ) => {
    return await client.POST({
      method: "playerExists", 
      currency: currency,
      user_username:user_username,
    });
  };
 
 
export default {
    createPlayer: createPlayer, 
  playerExists : playerExists,
  loginPlayer : loginPlayer,
};
