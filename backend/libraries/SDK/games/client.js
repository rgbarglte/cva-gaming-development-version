import fetch from "node-fetch";
import settings from "./../../../settings.js";

export default {
  POST: async (params = {}) => {
    params.api_password = settings.sdk.games.password;
    params.api_login = settings.sdk.games.username;
    const response = await fetch(settings.sdk.games.host, {
      method: "post",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  },
};
