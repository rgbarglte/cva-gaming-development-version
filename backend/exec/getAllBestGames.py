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


xtest = collection.aggregate([
    {
        "$match": {
            "data.action": {
                "$in": ['debit']
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
        }
    },
    {"$group": {"_id": "$data.game_id"}}
])


 

for tmp in list(xtest):  
    TotalUsers = collection.aggregate([
    {
        "$match": {
            "data.game_id":  tmp['_id'],
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
    # {"$count": "passing_scores"}, 
    {"$group": {"_id": "$userid"}},
    {"$count": "passing_scores"}, 
    {"$addField": "$user"}, 
])

    print(list(TotalUsers))

print(list(xtest))
