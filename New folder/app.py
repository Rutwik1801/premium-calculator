from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB setup

# ENTER YOUR MONGODB ATLAS URL HERE
client = MongoClient('')   
db = client.PremiumDB
premiums_collection = db['premiums']

@app.route('/calculate_premium', methods=['POST'])
def calculate_premium():
    data = request.json
    max_age=max(data['adultAges'])
    print(max_age)
    tenure=data['tenure']
    tier=data['tier']
    sum_insured=data['sumInsured']

    premium=0
    for age in data['adultAges']:
      result=premiums_collection.find({
        'SumInsured': sum_insured,
        'TierID': tier,
        'Age':age,
        'Tenure': tenure,
      })
      documents = list(result)
      rate=documents[0]["Rate"]
      if age==max_age:
        premium=premium+rate
      else:
        premium=premium+rate/2
    for age in data['childAges']:
      result=premiums_collection.find({
        'SumInsured': sum_insured,
        'TierID': tier,
        'Age':age,
        'Tenure': tenure,
      })
      documents = list(result)
      rate=documents[0]["Rate"]
      if age==max_age:
        premium=premium+rate
      else:
        premium=premium+rate
    return jsonify({'premium': premium})


if __name__ == '__main__':
    app.run()