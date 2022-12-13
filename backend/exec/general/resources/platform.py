from pymongo import MongoClient
# from bson.objectid import ObjectId
from pprint import pprint
import sys
import json
# import datetime
from datetime import datetime


# idUser = sys.argv[1]
# DateStart = sys.argv[2]
# DateEnd = sys.argv[3]


uri = "mongodb://cva:43119739@127.0.0.1:27017/?authMechanism=DEFAULT"
client = MongoClient(uri)

# Access database object
db = client['test']

# Access collection object
collection = db['histories']
collectionUsers = db['users']
collectionActivities = db['activities']
ReturnGamesId = []
ReturnAmount = []
ReturnGamesNames = []


def platformDetails():
    DateStart = sys.argv[2]
    DateEnd = sys.argv[3]
    # agentId = sys.argv[4]
    dataReturn = []
    amountDebit = 0
    amountCredit = 0
    amountNetWin = 0
     
    for userChild in collectionUsers.find({}):

         

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
            amountDebit = float(amountDebit) + float(xDebit["amount"])
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
            amountCredit = float(amountCredit) + float(xCredit["amount"])
            # dataAmountCredit = float(dataAmountCredit) + float(xCredit["amount"])

        
    amountNetWin = float(amountDebit) - float(amountCredit) 


    AmountTotalBalance = 0


    totalBalanceAdd = collectionActivities.aggregate([
            {
                "$match": {
                     
                    "type": "balance",
                    "data.ref" : "add",
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
            {"$group": {"_id": "test", "amount": {"$sum": "$data.balance.target"}}}
        ])
    for xBalanceAdd in list(totalBalanceAdd):
        AmountTotalBalance = xBalanceAdd['amount']


    TotalUsers = collectionUsers.count_documents({})


    dataReturn = {
        "netwin" : amountNetWin,
        "balanceUp" : float(AmountTotalBalance),
        "users" : TotalUsers
    }



    json_dict = json.dumps(dataReturn)
    print(json_dict)

 