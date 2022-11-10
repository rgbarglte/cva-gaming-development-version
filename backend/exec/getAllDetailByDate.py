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
collectionActivities = db['activities']

 
dataReturn = []

AmountTotalDebit = 0
AmountTotalCredit = 0
AmountTotalBalance = 0

for xuser in collectionUsers.find({
    "isAgent": bool("true")
}):
    xuser['amountDebit'] = 0
    xuser['amountCredit'] = 0

    # dataAmountDebit = 0
    # dataAmountCredit = 0

    for userChild in collectionUsers.find({
        "agent_id": str(xuser["_id"])
    }):

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
            xuser['amountDebit'] = float(xuser['amountDebit']) + float(xDebit["amount"])
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
            xuser['amountCredit'] = float(xuser['amountCredit']) + float(xCredit["amount"])
            # dataAmountCredit = float(dataAmountCredit) + float(xCredit["amount"])

        
    dataReturn.append({"agent": {
        "_id" : str(xuser["_id"]),
        "email" : str(xuser["email"]),
        "username" : str(xuser["username"]),
        # "profile" : xuser['profile'],
    }, 
    "debit": xuser['amountDebit'], 
    "credit": xuser['amountCredit'],
    "neto": float(xuser['amountDebit']) - float(xuser['amountCredit'])})
     
     


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




AmountTotalNeto = 0

for xAgents in list(dataReturn): 
    AmountTotalNeto = float(AmountTotalNeto) + float(xAgents['neto'])

 

TotalUsers = collectionUsers.count_documents({})


dataReturn = {
    "netwin" : AmountTotalNeto,
    "balanceUp" : float(AmountTotalBalance),
    "users" : TotalUsers
}



# pprint(dataReturn)
json_dict = json.dumps(dataReturn)
print(json_dict)
