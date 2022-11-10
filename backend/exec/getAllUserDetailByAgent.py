from pymongo import MongoClient
# from bson.objectid import ObjectId
from pprint import pprint
import sys
import json
# import datetime
from datetime import datetime


idUser = sys.argv[1]
DateStart = sys.argv[2]
DateEnd = sys.argv[3]


uri = "mongodb://app:43119739Ramiro@75.102.23.162:27017/?authMechanism=DEFAULT"
client = MongoClient(uri)

# Access database object
db = client['test']

# Access collection object
collection = db['histories']
collectionUsers = db['users']
dataReturn = []

 

    # dataAmountDebit = 0
    # dataAmountCredit = 0

for userChild in collectionUsers.find({
        "agent_id": str(idUser)
    }):
    userChild['amountDebit'] = 0
    userChild['amountCredit'] = 0

    xDebitAgg = collection.aggregate([
            {
                "$match": {
                    "userid": str(userChild["_id"]),
                    "data.action": "debit",
                    "$expr": {
                        "$and": [
                             {
                                 "$gte": [
                                     "$createdAt",
                                     {
                                         "$dateFromString": {
                                             "dateString": DateStart
                                         }
                                     }
                                 ]
                             },
                            {
                                 "$lt": [
                                     "$createdAt",
                                     {
                                         "$dateFromString": {
                                             "dateString": DateEnd
                                         }
                                     }
                                 ]
                             }
                        ]
                    }
                }
            },
            {"$group": {"_id": "test", "amount": {"$sum": "$data.amount"}}}
        ])
    for xDebit in list(xDebitAgg):
        userChild['amountDebit'] = float(userChild['amountDebit']) + float(xDebit["amount"])
            # dataAmountDebit = float(dataAmountDebit) + float(xDebit["amount"])

    xCreditAgg = collection.aggregate([
            {
                "$match": {
                    "userid": str(userChild["_id"]),
                    "data.action": "credit",
                    "$expr": {
                        "$and": [
                             {
                                 "$gte": [
                                     "$createdAt",
                                     {
                                         "$dateFromString": {
                                             "dateString": DateStart
                                         }
                                     }
                                 ]
                             },
                            {
                                 "$lt": [
                                     "$createdAt",
                                     {
                                         "$dateFromString": {
                                             "dateString": DateEnd
                                         }
                                     }
                                 ]
                             }
                        ]
                    }
                }
            },
            {"$group": {"_id": "test", "amount": {"$sum": "$data.amount"}}}
        ])
    for xCredit in list(xCreditAgg):
        userChild['amountCredit'] = float(userChild['amountCredit']) + float(xCredit["amount"])
            # dataAmountCredit = float(dataAmountCredit) + float(xCredit["amount"])

        


    dataReturn.append({"user": {
        "_id" : str(userChild["_id"]),
        "email" : str(userChild["email"]),
        "username" : str(userChild["username"]),
        # "profile" : xuser['profile'],
    }, 
    "debit": userChild['amountDebit'], 
    "credit": userChild['amountCredit'],
    "neto": float(userChild['amountDebit']) - float(userChild['amountCredit'])})


# pprint(dataReturn)
json_dict = json.dumps(dataReturn)
print(json_dict)
