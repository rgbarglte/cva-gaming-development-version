import client from "./client.js";
import settings from "./../../../settings.js";

const getGameList = async (currency = "EUR") => {
  return await client.POST({
    method: "getGameList",
    show_additional: true,
    show_systems: 1,
    currency: currency,
  });
};
 

const getGameDemo = async (
  id_game,
  lang = "en",
  currency = "EUR",
  play_for_fun = 1, 
) => {
  return await client.POST({
    method: "getGameDemo",
    lang: lang, 
    gameid: id_game,
    play_for_fun: play_for_fun,
    currency: currency,
    homeurl: settings.sdk.games.homeurl,
  });
};

const getGame = async (
  id_game,
  lang = "en",
  currency = "EUR",
  play_for_fun = 1,
  username = null,
  password = null
) => {

  return new Promise((resolve, reject) => {

  return   resolve(client.POST({
    method: "getGame",
    lang: lang,
    user_username: username,
    user_password: password,
    gameid: id_game,
    play_for_fun: play_for_fun,
    currency: currency,
    homeurl: settings.sdk.games.homeurl,
  }));

  })
};

const getGameDirect = async (
    id_game,
    lang = "en",
    currency = "EUR",
    username = null,
    password = null
  ) => {
    return await client.POST({
      method: "getGameDirect",
      lang: lang,
      user_username: username,
      user_password: password,
      gameid: id_game,
      play_for_fun: 0,
      currency: currency,
      homeurl: settings.sdk.games.homeurl,
    });
  };

 
export default {
  getGameList: getGameList,
  getGame : getGame,
  getGameDirect : getGameDirect,
  getGameDemo: getGameDemo,

};
