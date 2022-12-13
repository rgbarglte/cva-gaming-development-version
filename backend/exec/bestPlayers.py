from pymongo import MongoClient
# from bson.objectid import ObjectId
from pprint import pprint
import sys
import json
# import datetime
from datetime import datetime


idUser = sys.argv[1]
DateStart = sys.argv[2]
DateEnd = object( sys.argv[3])


uri = "mongodb://cva:43119739@127.0.0.1:27017/?authMechanism=DEFAULT"
client = MongoClient(uri)

# Access database object
db = client['test']

# Access collection object
collection = db['histories']
collectionUsers = db['users']
dataReturn = []


print(DateEnd['test'])