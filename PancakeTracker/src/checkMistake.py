
from datetime import datetime
import time
from pymongo import MongoClient
import certifi
import pandas as pd
import numpy as np

connection_url = "mongodb+srv://3XM:chuchupa888@cluster0.6uckc.mongodb.net/pancakes?retryWrites=true&w=majority"
myclient = MongoClient(connection_url, tlsCAFile=certifi.where())
db = myclient["pancakes"]
Collection = db["bnb/live"]


# Data = []
# for x in Collection.find():
#     Data.append(x)


# df = pd.DataFrame(Data)
# epochs = df[df.duplicated(subset=["epoch"]) == True]['epoch'].to_numpy()
card = Collection.find_one({"id": "448510476"})
if card:
    print('card')
else:
    print("NOt")
print(card)
# epochs.reset_index(drop=True, inplace=True)


# epochs = [166767, 166820, 166867, 166919, 166970, 167018, 167069, 167121,
#           167176, 167230, 167280, 167331, 167385, 167439, 167490, 167546, 167602, 167654,
#           167708, 167764, 167876, 167927, 167982, 168040, 168091, 168145, 168199, 168252,
#           168307]

# fixEpoch = []
# for i in epochs:
#     for x in Collection.find():
#         if x['epoch'] == i:
#             fixEpoch.append(x)
#     if (len(fixEpoch) > 0):
#         id = fixEpoch[-1]['_id']
#         Collection.delete_one({"_id": id})
#         print("Deleted")


# print("finish:", epochs)
