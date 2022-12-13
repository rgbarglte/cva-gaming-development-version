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
ReturnGamesId = []
ReturnAmount = []
ReturnGamesNames = []


def chartBestGamesCredit():
    DateStart = sys.argv[2]
    DateEnd = sys.argv[3]
    xtest = collection.aggregate([
        {
            "$match": {
                "data.action": {
                    "$in": ['credit'],
                },
                "data.amount": {"$not": {"$eq": 0}},
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
        {"$group": {"_id": "$data.game_id", "game_id": {
            "$addToSet": "$data.game_id"}, "name": {"$addToSet": "$data.game_id_hash"}}}
    ])

    for tmp in list(xtest):
        nameGame = tmp["name"][0]
        gameId = tmp["game_id"][0]
        xCreditAgg = collection.aggregate([
            {
                "$match": {
                    "data.game_id": gameId,
                    "data.action": "credit",
                    "data.amount": {"$not": {"$eq": 0}},
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
    # print(list(xCreditAgg))
        if xCreditAgg:
            ReturnGamesId.append(gameId)
            ReturnGamesNames.append(nameGame)
            for tmp in list(xCreditAgg):
                ReturnAmount.append(tmp["amount"])

    json_dict = json.dumps({
        "names": ReturnGamesNames,
        "ids": ReturnGamesId,
        "amounts": ReturnAmount,
    })
    print(json_dict)


def chartBestBrandsCredit():
    DateStart = sys.argv[2]
    DateEnd = sys.argv[3]
    # Access collection object
    collection = db['histories']
    collectionUsers = db['users']

    collectionGames = db['games']

    ReturnGamesId = []
    ReturnAmount = []
    ReturnGamesNames = []
    xtest = collection.aggregate([
        {
            "$match": {
                "data.action": {
                    "$in": ['credit'],
                },
                "data.amount": {"$not": {"$eq": 0}},
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
        {"$group": {"_id": "$data.game_id", "game_id": {
            "$addToSet": "$data.game_id"}, "name": {"$addToSet": "$data.game_id_hash"}}}
    ])

    for tmp in list(xtest):
        nameGame = tmp["name"][0]
        gameId = tmp["game_id"][0]
        xCreditAgg = collection.aggregate([
            {
                "$match": {
                    "data.game_id": gameId,
                    "data.action": "credit",
                    "data.amount": {"$not": {"$eq": 0}},
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

        if xCreditAgg:
            ReturnGamesId.append(gameId)
            ReturnGamesNames.append(nameGame)
            for tmp in list(xCreditAgg):
                ReturnAmount.append(
                    {'amount': tmp["amount"], "game": gameId, "name": nameGame})

    BrandsTemp = []
    BrandsClear = []
    for tmp in list(ReturnGamesId):
        xBrandTemp = collectionGames.aggregate([
            {
                "$match": {
                    "internal.id": tmp,
                }
            },
        ])
        if xBrandTemp:
            for tmp2 in list(xBrandTemp):
                BrandsTemp.append(
                    {"brand": tmp2['internal']['provider_name'], "game": tmp})
                BrandsClear.append(
                    {"brand": tmp2['internal']['provider_name'], "credit": 0})

    BrandsClear = {each['brand']: each for each in BrandsClear}.values()

    def getAmount(game):
        for tmp in list(ReturnAmount):
            if tmp["game"] == game:
                return tmp["amount"]

    def setAmount(brand, game):
        amount = getAmount(game)
        for tmp in list(BrandsClear):
            if tmp["brand"] == brand:
                tmp["credit"] = int(tmp["credit"]) + int(amount)

    for tmp in list(BrandsTemp):
        setAmount(tmp['brand'], tmp['game'])

    json_dict = json.dumps(list(BrandsClear))
    print(json_dict)
