from pymongo import MongoClient
# from bson.objectid import ObjectId
from pprint import pprint
import sys
import json
# import datetime
from datetime import datetime


uri = "mongodb://cva:43119739@127.0.0.1:27017/?authMechanism=DEFAULT"
client = MongoClient(uri)

# Access database object
db = client['test']

# Access collection object
collectionMessages = db['chats']
collectionUsers = db['users']


def getListUsers():
    dataToReturn = []

    for xuser in collectionUsers.find({
        "isAgent": bool("true")
    }):
        temp = {
            "_id": str(xuser['_id']),
            "email": str(xuser['email']),
            "username": str(xuser['username']),
            "children": []
        }

        for xuserChild in collectionUsers.find({
            "agent_id": str(xuser["_id"])
        }):
            temp['children'].append({
                "_id": str(xuserChild['_id']),
                "email": str(xuserChild['email']),
                "username": str(xuserChild['username']),
            })

        dataToReturn.append(temp)
    print(json.dumps(dataToReturn))


def getMessages():
    agent = sys.argv[2]
    user = sys.argv[3]
    dataToReturn = [];
    xtest = collectionMessages.aggregate([
        {
            "$match": { 
                "userid": {
                   "$in": [agent, user]
                }, 
            }
        },
        {
            "$sort": {
                "_id": -1
            },
        },
        {
            "$limit": 25,
        }
    ])
    for temp in list(xtest):
        dataToReturn.append({
            "_id" : str(temp['_id']),
            "userid" : str(temp['userid']),
            "type" : str(temp['type']),
            "message" : str(temp['message']),
            "to" : str(temp['to']),
            "attach" : str(temp['attach']),
            "createDate" : str(temp['createDate']),
            "createdAt" : str(temp['createdAt']), 
        })
    print(json.dumps(dataToReturn))
