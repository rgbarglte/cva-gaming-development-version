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
collectionGames = db['games']
dataReturn = []

# dataAmountDebit = 0
# dataAmountCredit = 0
gamesData = collectionGames.find({})


def getGame(ref):  # game_id input
    game = collectionGames.find_one({
        "internal.id":  str(ref)
    })
    if game == None:
        return 'error'

    return game["internal"]


# print(getGame("104233"))


xHistoryAgg = collection.aggregate([
    { 
        "$match": {
            "userid": str(idUser), 
            "data.amount": {
                "$gt": 0
            },
            "data.action": {
                "$in": ['debit', 'credit']
            }, 
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
        },
    },
    {
         "$sort": {
                "_id": -1
            },
    }
])

for xHistory in list(xHistoryAgg):
    game = getGame(xHistory['data']['game_id'])
    dataReturn.append({
        "game": {
            "thumb": str(game['image_preview']),
            "name": str(game['gamename']),
            "type": str(game['gamename']),
            "brand": str(game['category']),
            "internalId": str(game['id'])
        },
        "action": str(xHistory['data']['action']),
        "amount": float(xHistory['data']['amount']),
        "dateShort": str(xHistory['createDate']),
        "date":  str(xHistory['createdAt'])
    })


json_dict = json.dumps(dataReturn)
print(json_dict)
