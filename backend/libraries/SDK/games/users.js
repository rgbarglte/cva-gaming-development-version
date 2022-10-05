import client from "./client.js"; 

/**
 * It creates a player with the given username, password, nickname and currency.
 * @param user_username - The username of the player.
 * @param user_password - The password of the user.
 * @param [user_nickname=null] - This is the name that will be displayed in the game.
 * @param [currency=EUR] - The currency of the player.
 * @returns The response from the API.
 */
const createPlayer = async (
  user_username,
  user_password,
  user_nickname = null,
  currency = "EUR"
) => {
  return await client.POST({
    method: "createPlayer",
    user_password: user_password,
    user_username: user_username,
    currency: currency,
    user_nickname: user_nickname,
  });
};

/**
 * It takes a username, password, and currency, and returns a promise that resolves to the result of
 * the API call
 * @param user_username - The username of the player you want to login.
 * @param user_password - The password of the user
 * @param [currency=EUR] - The currency you want to use.
 * @returns The response from the API.
 */
const loginPlayer = async (user_username, user_password, currency = "EUR") => {
  return await client.POST({
    method: "loginPlayer",
    user_password: user_password,
    user_username: user_username,
    currency: currency,
  });
};

/**
 * This function checks if a player exists in the database, and returns a boolean value.
 * @param user_username - The username of the player you want to check.
 * @param [currency=EUR] - The currency of the player.
 * @returns The response from the API.
 */
const playerExists = async (user_username, currency = "EUR") => {
  return await client.POST({
    method: "playerExists",
    currency: currency,
    user_username: user_username,
  });
};

export default {
  createPlayer: createPlayer,
  playerExists: playerExists,
  loginPlayer: loginPlayer,
};
