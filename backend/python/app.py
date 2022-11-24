from flask import Flask, request, jsonify
from OpenSSL import SSL
from pymongo import MongoClient
import os
import sys
import json
from flask_cors import CORS

# Init app
app = Flask(__name__)

cors = CORS(app, resources={r"/v2/*": {"origins": "*"}})
 
uri = "mongodb://app:43119739Ramiro@127.0.0.1:27017/?authMechanism=DEFAULT"
client = MongoClient(uri)

# Access database object
db = client['test']

# Access collection object
collectionHistory = db['histories']
collectionUsers = db['users']


@app.route("/v2/blueoceangaming/callback")
def callbackGamesBlueOcean():

    
     
    
    query_parameters = request.values

    # ****************************************************
    # Callback credit
    # ****************************************************

    if query_parameters.get('action') == 'credit':
        xUsers = collectionUsers.find_one({
            "username": query_parameters.get('username')
        })
        if len(xUsers) == 0:
            print({"status": "500",  "msg": "INTERNAL_ERROR"})
            return json.dumps({"status": "500",  "msg": "INTERNAL_ERROR"})
        if int(xUsers['balance']) <= 0:
            print({"status": "403",  "msg": "NO_BALANCE"})
            return json.dumps({"status": "403",  "msg": "NO_BALANCE"})

        result = int(xUsers['balance']) + \
            int(query_parameters.get('amount'))
        queryUpdateTarget = {"username": xUsers['username']}
        queryValues = {"$set": {"balance": result}}
        x = collectionUsers.update_one(queryUpdateTarget, queryValues)
        print({"status": "200", "balance": result})
        return json.dumps({"status": "200", "balance": result})

    # ****************************************************
    # Callback Debit
    # ****************************************************

    if query_parameters.get('action') == 'debit':
        xUsers = collectionUsers.find_one({
            "username": query_parameters.get('username')
        })
        if len(xUsers) == 0:
            print({"status": "500",  "msg": "INTERNAL_ERROR"})
            return json.dumps({"status": "500",  "msg": "INTERNAL_ERROR"})
        if int(xUsers['balance']) < int(query_parameters.get('amount')):
            print({"status": "403",  "msg": "NO_BALANCE"})
            return json.dumps({"status": "403",  "msg": "NO_BALANCE"})

        result = int(xUsers['balance']) - \
            int(query_parameters.get('amount'))
        queryUpdateTarget = {"username": xUsers['username']}
        queryValues = {"$set": {"balance": result}}
        x = collectionUsers.update_one(queryUpdateTarget, queryValues)
        print({"status": "200", "balance": result})
        return json.dumps({"status": "200", "balance": result})

    # ****************************************************
    # Callback balance
    # ****************************************************

    if query_parameters.get('action') == 'balance':

        uUserBalance = collectionUsers.find_one({
            "username": query_parameters.get('username')
        })
        # if len(uUserBalance) == 0:
        #     return json.dumps({"status": "500",  "msg": "INTERNAL_ERROR"})
        print({"status": "200", "balance": uUserBalance['balance']}) 
        return jsonify({"status": "200", "balance": uUserBalance['balance']}) 
     


if __name__ == "__main__":

    app.run(
        # host='0.0.0.0', 
        debug=True,
        threaded=True,
        port=8787,
        # ssl_context=(
        #     "/etc/letsencrypt/live/cvagaming.com/cert.pem",
        #     "/etc/letsencrypt/live/cvagaming.com/privkey.pem"
        # )
    )


 