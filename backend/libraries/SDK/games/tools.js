import { sha1, verifyHash } from "sha1-hash-and-verify";
import httpBuildQuery from "http-build-query";

const shaValidation = (data) => {
  // var data = {"callerId":"cvagaming_mc_s","callerPassword":"4fee91a416743cccaf1002b11ab22d4c4f0621de","callerPrefix":"4qkm","action":"debit","remote_id":"1056991","username":"intitest001","session_id":"","currency":"EUR","amount":5,"provider":"ha","game_id":"9985","game_id_hash":"ha_ha-sir-blingalot-mobile","transaction_id":"ha-c3e4f91cc81db69ba2134501f85123e5","round_id":"d802d4be1dd81913a9a0f0f1340a2f2f","gameplay_final":1,"is_freeround_bet":0,"jackpot_contribution_in_amount":false,"key":"09049e19a48be165e77346181ba8968fa776dc5d"}
  var compareKey = data["key"];
  delete data["key"];

  var string = httpBuildQuery(data);

  var pw = "r5M2e28MLe";

  const hashedData = sha1(pw + string);

  if (hashedData == compareKey) {
    return true;
  }
  return false;
};

export { shaValidation }