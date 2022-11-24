from pymongo import MongoClient
# from bson.objectid import ObjectId
from pprint import pprint
import sys
import json
# import datetime
from datetime import datetime
import ast

# params =  list(ast.literal_eval(json.dumps(sys.argv[1])))

action = sys.argv[1]


uri = "mongodb://app:43119739Ramiro@75.102.23.162:27017/?authMechanism=DEFAULT"
client = MongoClient(uri,fsync=True)

# Access database object
db = client['test']

# Access collection object
collection = db['histories']
collectionUsers = db['users']
dataReturn = []


# action = sys.argv[1];
# transid = sys.argv[2];
# roundid = sys.argv[3];
# username = sys.argv[4];
# amount = sys.argv[5];


# ****************************************************
# Callback balance
# ****************************************************

if action == 'balance':
    username = sys.argv[2]
    uUserBalance = collectionUsers.find_one({
        "username": username
    })
    # if len(uUserBalance) == 0:
    #     return json.dumps({"status": "500",  "msg": "INTERNAL_ERROR"})
    print(json.dumps({"status": "200", "balance": uUserBalance['balance']}))


# # # ****************************************************
# # # Callback credit
# # # ****************************************************

# # if params['action'] == 'credit':
# #     xUsers = collectionUsers.find_one({
# #         "username": params['username']
# #     })
# #     if len(xUsers) == 0:
# #         print(json.dumps({"status": "500",  "msg": "INTERNAL_ERROR"}))
# #     if int(xUsers['balance']) <= 0:
# #         print(json.dumps({"status": "403",  "msg": "NO_BALANCE"}))

# #     result = int(xUsers['balance']) + \
# #         int(params['amount'])
# #     queryUpdateTarget = {"username": xUsers['username']}
# #     queryValues = {"$set": {"balance": result}}
# #     x = collectionUsers.update_one(queryUpdateTarget, queryValues)
# #     print(json.dumps({"status": "200", "balance": result}))

    # ****************************************************
    # Callback Debit
    # ****************************************************

if action == 'debit':
    username = sys.argv[2]; 
    transid = sys.argv[3]; 
    roundid = sys.argv[4]; 
    amount = sys.argv[5]; 
    xUsers = collectionUsers.find_one({
        "username": username
    })
    if len(xUsers) == 0: 
        print(json.dumps({"status": "500", "msg": "INTERNAL_ERROR"}))
    if int(xUsers['balance']) < int(amount):
        print(json.dumps({"status": "403", "msg":"NO_BALANCE"}))

    result = int(xUsers['balance']) - \
        int(amount)
    queryUpdateTarget = {"username": xUsers['username']}
    queryValues = {"$set": {"balance": result}}
    x = collectionUsers.update_one(queryUpdateTarget, queryValues)
    print(json.dumps({"status": "200", "balance": result}))

client.close()
quit()