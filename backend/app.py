from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient('mongodb+srv://rutwik18012001:Ruts1234@cluster0.zmv1exc.mongodb.net/')
db = client.PremiumDB
premiums_collection = db['premiums']

@app.route('/calculate_premium', methods=['POST'])
def calculate_premium():
    data = request.json
    print(data)
    age=data['adultAges'][0]
    tenure=data['tenure']
    tier=data['tier']
    # # Calculate premium based on user input (implement your logic here)
    # age = data['age']
    # sum_insured = data['sum_insured']
    # city_tier = data['city_tier']
    # tenure = data['tenure']

    # # Example premium calculation logic
    # premium = 0
    # if age < 30:
    #     premium = sum_insured * 0.05
    # elif age >= 30 and age <= 50:
    #     premium = sum_insured * 0.07
    # else:
    #     premium = sum_insured * 0.1

    # # Store the data in MongoDB
    # premiums_collection.insert_one({
    #     'age': age,
    #     'sum_insured': sum_insured,
    #     'city_tier': city_tier,
    #     'tenure': tenure,
    #     'premium': premium
    # })
    # doc=premiums_collection.find({
    #     'Age': data['adultAges'][0],
    #     'SumInsured': data['sumInsured'],
    #     'TierId': data['tier'],
    #     # 'Tenure': data['tenure'],
    #     # 'premium': data.premium
    # })
    # print(doc[0])
    result=premiums_collection.find({
        # 'Age': data['adultAges'][0],
        'SumInsured': data['sumInsured'],
        'TierID': tier,
        'Age':age,
        'Tenure': tenure,
        # 'premium': data.premium
    })
    documents = list(result)
    print(documents)
    return jsonify({'premium': 3})
# from flask import Flask

# app = Flask(__name__)

# @app.route('/')
# def hello():
#     return "Hello, World!"

if __name__ == '__main__':
    app.run()