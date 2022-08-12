import os
import json
import random
import bcrypt
import requests
from flask_cors import CORS
from threading import Thread
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_mail import Mail, Message
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from enviromentVariables import MONGODB_URI, MAIL_USERNAME, MAIL_PASSWORD, EXTERNAL_API


# Imports of model
import pickle
import nltk
import math
import string
import pandas as pd

# libraries to be installed first time
# nltk.download('omw-1.4')
# nltk.download('wordnet')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('stopwords')

from nltk import pos_tag
from nltk.corpus import wordnet
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


# CORS Configuration
app = Flask(__name__)
CORS(app)

# ----------------------- Admin Routes -------------------------
import adminRoutes

# Database Configuration
app.config['MONGO_URI'] = MONGODB_URI
mongo = PyMongo(app)

# Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD
mail = Mail(app)

# Global Variables
RANDOM_NUMBER = ""
USER_EMAIL = ""

# Index Endpoint
@app.route('/')
def index():
    return "Hello from backend!"
    

# Login Endpoint
@app.route('/login', methods=['POST'])
def login():
    # Get request data
    request_data = request.get_json()
    form_email = request_data["email"]
    form_password = request_data["password"]

    # instance of collection
    users = mongo.db.users
    # Find the user
    login_user = users.find_one({'email': form_email})
    # Authenticate user and login
    if login_user:
        if bcrypt.hashpw(form_password.encode('utf-8'), login_user["password"]) == login_user["password"]:
            user_id= str(login_user['_id'])
            return jsonify({"Result": "Logged in successfully.", "UserID": user_id})
        else:
            return jsonify({"Result": 'Incorrect Password!'})
    else:
            return jsonify({"Result": 'Incorrect Username!'})


# Register Endpoint
@app.route("/register", methods=['POST'])
def register():
    # Get request data
    request_data = request.get_json()
    form_fName = request_data["fName"]
    form_lName = request_data["lName"]
    form_email = request_data["email"]
    form_password = request_data["password"]
    form_confirmPassword = request_data["confirmPassword"]

    # instance of collection
    users = mongo.db.users
    # Check the existence of email
    existing_user = users.find_one({'email': form_email})
    # registering user if not already registered 
    if existing_user is None:
        if form_password == form_confirmPassword:
            hashpass = bcrypt.hashpw(
                form_password.encode('utf-8'), bcrypt.gensalt())
            result = users.insert_one({'fName': form_fName, 'lName': form_lName, 'email': form_email,
                                        'password': hashpass, 'confirmPassword': hashpass, "imageUrl": ""})
            if result:
                return jsonify({"Result": "Record saved successfully."})
            else:
                return jsonify({"Result": "Unable to save record!"})
        else:
            return jsonify({"Result": "Passwords does not match!"})

    return jsonify({"Result": "User already registerd!"})


# User ImageUrl Endpoint
@app.route('/userImageUrl/<id>', methods=['GET'])
def userImageUrl(id):
    # instance of collection
    users = mongo.db.users
    # Find the user
    user = users.find_one({'_id': ObjectId(id)})
    if user:
        return jsonify({"Result": "User found.", "ImageUrl": user["imageUrl"]})
    else:
        return jsonify({"Result": "User not found!"})


# Feedback Endpoint
@app.route("/feedback", methods=['POST'])
def feedback():
    # Get request data
    request_data = request.get_json()
    form_name = request_data["name"]
    form_email = request_data["email"]
    form_feedback = request_data["feedback"]

    # instance of collection
    feedbacks = mongo.db.feedbacks
    # insert the feedback
    result = feedbacks.insert_one({'name': form_name, 'email': form_email, 'feedback': form_feedback})
    if result:
        return jsonify({"Result": "We're very thankful for your kind feedback."})
    else:
        return jsonify({"Result": "Sorry! Your feedback was not submitted. Try Again!"})


# About Endpoint
@app.route('/about', methods=['GET'])
def about():
    # get instance of collection
    about = mongo.db.about

    # save data in database and send response
    result = about.find_one({}, {"_id": 0})
    if result:
        return jsonify({"AboutText": result["aboutText"], "AboutImage": result["imageUrl"]})
    else:
        return jsonify({"Result": "Data not found!"})


# Contact Endpoint
@app.route("/contact", methods=['POST'])
def contact():
    # Get request data
    request_data = request.get_json()
    form_name = request_data["name"]
    form_email = request_data["email"]
    form_subject = request_data["subject"]
    form_message = request_data["message"]

    # instance of collection
    contacts = mongo.db.contacts
    # insertion of contact
    result = contacts.insert_one({'name': form_name, 'email': form_email, 'subject': form_subject, 'message': form_message})
    if result:
        return jsonify({"Result": "Thank you for getting in touch!"})
    else:
        return jsonify({"Result": "Sorry! Your message was not sent. Try Again!"})


# Profile Endpoint
@app.route('/profile/<id>', methods=['GET', 'PUT'])
def profile(id):
    if request.method == 'GET':
        # instance of collection
        users = mongo.db.users
        # Find the user
        user = users.find_one({'_id': ObjectId(id)}, {"_id": 0, "password": 0, "confirmPassword": 0})
        if user:
            return jsonify({"User": user})
        else:
            return jsonify({"Result": "User not found!"})

    elif request.method == 'PUT':
        # Get request data
        request_data = request.get_json()
        form_fName = request_data["firstName"]
        form_lName = request_data["lastName"]
        form_email = request_data["email"]
        form_address = request_data["address"]
        form_travel_experience = int(request_data["travelExperience"])
        form_city = request_data["city"]
        form_province = request_data["province"]
        form_country = request_data["country"]
        # instance of collection
        users = mongo.db.users
        # Find the user
        user = users.find_one({'_id': ObjectId(id)})
        # get user data from database and return as response
        if user:
            updated = users.update_one({ "_id": ObjectId(id)}, { "$set" : { "fName" : form_fName, "lName" : form_lName, "email" : form_email, "travelExperience": form_travel_experience, "address": form_address, "city": form_city, "province": form_province, "country": form_country } })
            if updated:
                return jsonify({"Result": "Your profile has been updated successfully."})
            else:
                return jsonify({"Result": "Unable to update the profile!"})
        else:
            return jsonify({"Result": "User not found!"})


# Profile Image Endpoint
@app.route('/profileImage/<id>', methods=['PUT'])
def profileImage(id):
    allowedImageTypes = ["image/jpg", "image/jpeg", "image/png"]
    # path to save profile images
    upload_folder = './static/users'
    # create folder if not present
    if not os.path.isdir(upload_folder):
        os.mkdir(upload_folder)

    # get request data
    file = request.files['file']
    # check the file type
    file_type = file.content_type
    if file_type not in allowedImageTypes:
        return jsonify({"Result": "File type is incorrect. Only jpg, jpeg, and png are allowed."})

    # get name of uploaded file
    filename = secure_filename(file.filename)
    # specify destination to save image
    destination="/".join([upload_folder, filename])
    image_path = destination.replace('.', '', 1)
    # save the image
    file.save(destination)
    # save imageurl in database
    users = mongo.db.users
    updated = users.update_one({ "_id": ObjectId(id)}, { "$set" : { "imageUrl" : image_path } })
    if updated:
        return jsonify({"Result": "Image uploaded successfully.", "ImageUrl": image_path})
    else:
        return jsonify({"Result": "Unable to save image!", "ImageUrl": image_path})


# HomePage Endpoint
@app.route('/homepageData', methods=['GET'])
def homepageData():
    # instances of collections
    destinations = mongo.db.destinations
    featuredHotels = mongo.db.featuredHotels
    videos = mongo.db.videos
    # Find the data from DB
    allDestinations = destinations.find({})
    allFeaturedHotels = featuredHotels.find({})
    allVideos = videos.find({})

    destinationsList = []
    featuredHotelsList = []
    videosList = []

    for destination in allDestinations:
        destination['_id'] = str(destination['_id'])
        destinationsList.append(destination)

    for hotel in allFeaturedHotels:
        hotel['_id'] = str(hotel['_id'])
        featuredHotelsList.append(hotel)

    for video in allVideos:
        video['_id'] = str(video['_id'])
        videosList.append(video)

    if destinationsList and videosList or featuredHotelsList:
        return jsonify({"Destinations": destinationsList, "FeaturedHotels": featuredHotelsList, "Videos": videosList})
    else:
        return jsonify({"Result": "Unable to find data!"})


# Trending Hotels Endpoint
@app.route('/trendingHotels', methods=['GET'])
def trendingHotels():
    # instance of collection
    trendings = mongo.db.trendings
    # Find the hotels data
    trending_hotels = trendings.find({})
    hotels = []
    for hotel in trending_hotels:
        hotel['_id'] = str(hotel['_id'])
        hotels.append(hotel)

    if trending_hotels:
        return jsonify({"Result": "Trending Hotels found.", "Hotels": hotels})
    else:
        return jsonify({"Result": "Trending Hotels not found!"})


# Destination Hotels Endpoint
@app.route('/destinationHotels/<cityname>', methods=['GET'])
def destinationHotels(cityname):
    # instance of collection
    countryData = mongo.db.countryData
    # Find the hotels data
    country_hotels = countryData.find({'city': { "$regex" : cityname , "$options" : "i"}})
    hotels = []
    for hotel in country_hotels:
        hotel['_id'] = str(hotel['_id'])
        hotels.append(hotel)

    if country_hotels:
        return jsonify({"Result": "Destination Hotels found.", "Hotels": hotels})
    else:
        return jsonify({"Result": "Destination Hotels not found!"})

# Account Recovery Endpoints
@app.route('/accountRecovery', methods=['POST'])
def accountRecovery():
    # send email
    def send_email(app, msg):
        with app.app_context():
            mail.send(msg)

    # generate random number
    def generate_random():
        random_num = ""
        for i in range(0,5):
            random_num += str(random.randint(1,9))
        global RANDOM_NUMBER
        RANDOM_NUMBER = random_num
        return random_num

    # compose and send email
    def compose_and_send():
        msg = Message()
        msg.subject = "PakiTours Password Reset"
        msg.recipients = [user["email"]]
        msg.sender = 'faddict55@gmail.com'
        random_num = generate_random()
        msg.html = """\
            <html>
            <head></head>
            <body>
                <h4>Kindly enter the following code to reset the password:
                <br><h1>{random_num}</h1>
                </h4>
            </body>
            </html>
            """.format(random_num=random_num)

        Thread(target=send_email, args=(app, msg)).start()
    
    # Get request data
    request_data = request.get_json()
    form_email = request_data["email"]
    global USER_EMAIL
    USER_EMAIL = form_email
    # instance of collection
    users = mongo.db.users
    # Find the user
    user = users.find_one({'email': form_email})
    # Authenticate user and login
    if user:
        compose_and_send()
        return jsonify({"Result": "User found."})
    else:
        return jsonify({"Result": 'Incorrect Email!'})


# Account Recovery Endpoints - validate pin
@app.route('/validatePin', methods=['POST'])
def validatePin():
    # Get request data
    request_data = request.get_json()
    form_pin = request_data["pin"]
    if RANDOM_NUMBER == form_pin:
        return jsonify({"Result": "Pin matched."})
    else:
        return jsonify({"Result": 'Incorrect Pin!'})


# Account Recovery Endpoints - reset password
@app.route('/resetPassword', methods=['POST'])
def resetPassword():
    # Get request data
    request_data = request.get_json()
    form_password = request_data["password"]
    form_confirmPassword = request_data["confirmPassword"]

    # instance of collection
    users = mongo.db.users
    # match the passwords
    if form_password == form_confirmPassword:
        hashpass = bcrypt.hashpw(form_password.encode('utf-8'), bcrypt.gensalt())
        updated_user = users.update_one({"email" : USER_EMAIL}, { "$set": {'password': hashpass, 'confirmPassword': hashpass} })
        if updated_user:
            return jsonify({"Result": "Password has been reset successfully."})
        else:
            return jsonify({"Result": "Unable to reset the password!"})
    else:
        return jsonify({"Result": "Passwords does not match!"})


# Favorite Hotel Endpoints - get hotels
@app.route('/favoriteHotels/<id>', methods=['GET'])
def favoriteHotels(id):
    # instance of collection
    favorites = mongo.db.favorites
    hotels = favorites.aggregate([{
        "$lookup": {
            "from": "countryData",
            "localField": "hotelId",
            "foreignField": "_id",
            "as": "CountryDataLiked"
        }
    }, 
    {
        "$lookup": {
            "from": "trendings",
            "localField": "hotelId",
            "foreignField": "_id",
            "as": "TrendingLiked"
        }
    },
    {
        "$lookup": {
            "from": "featuredHotels",
            "localField": "hotelId",
            "foreignField": "_id",
            "as": "FeaturedLiked"
        }
    },

    { "$unwind": { 
        "path": "$CountryDataLiked", 
        "preserveNullAndEmptyArrays": True }
    }, 
    { "$unwind": { 
        "path": "$TrendingLiked", 
        "preserveNullAndEmptyArrays": True }
    },
    { "$unwind": { 
        "path": "$FeaturedLiked", 
        "preserveNullAndEmptyArrays": True }
    }
    ])
    
    hotelsList = []
    for hotel in hotels:
        if hotel['userId'] == ObjectId(id):
            if 'CountryDataLiked' in hotel.keys():
                hotel['CountryDataLiked']['_id'] = str(hotel['CountryDataLiked']['_id'])
                hotelsList.append(hotel['CountryDataLiked'])
            elif 'TrendingLiked' in hotel.keys():
                hotel['TrendingLiked']['_id'] = str(hotel['TrendingLiked']['_id'])
                hotelsList.append(hotel['TrendingLiked'])
            elif 'FeaturedLiked' in hotel.keys():
                hotel['FeaturedLiked']['_id'] = str(hotel['FeaturedLiked']['_id'])
                hotelsList.append(hotel['FeaturedLiked'])
    
    if hotelsList:
        return jsonify({"Result": "Hotels found!", "Hotels": hotelsList})
    else:
        return jsonify({"Result": "Unable to find hotels!"})


# Favorite Hotel Endpoints - add hotel
@app.route('/addFavoriteHotel', methods=['POST'])
def addFavoriteHotel():
    # Get request data
    request_data = request.get_json()
    hotel_id = request_data["hotelId"]
    user_id = request_data["userId"]

    # instance of collection
    favorites = mongo.db.favorites
    # check if hotel is already in favorites
    hotel = favorites.find_one({'hotelId': ObjectId(hotel_id)})
    if hotel:
        return jsonify({"Result": "You already favorite this hotel."})
    else:
        # insert data in database
        added_hotel = favorites.insert_one({'userId': ObjectId(user_id), 'hotelId': ObjectId(hotel_id)})
        if added_hotel:
            return jsonify({"Result": "Hotel added to favorites."})
        else:   
            return jsonify({"Result": "Unable to favorite the hotel!"})


# Favorite Hotel Endpoints - remove hotel
@app.route('/removeFavoriteHotel/<id>', methods=['DELETE'])
def removeFavoriteHotel(id):
    # instance of collection
    favorites = mongo.db.favorites
    deleted_hotel = favorites.delete_one({'hotelId': ObjectId(id)})
    if deleted_hotel:
        return jsonify({"Result": "Hotel Removed from Favorites."})
    else:
        return jsonify({"Result": "Unable to remove favorite hotel!"})


# Recommendations Endpoints - Save hotels to DB
@app.route('/recommendations', methods=['POST'])
def recommendations():
    # Get request data
    request_data = request.get_json()
    user_id = request_data["userId"]
    location = request_data["location"]
    check_in_date = request_data["checkinDate"]
    check_out_date = request_data["checkoutDate"]
    travelers = request_data["counter"]
    no_of_adults = travelers[0]
    no_of_child = travelers[1]
    no_of_rooms = travelers[2]

    # import model and vectorizer files
    with open('./saved model/Saved_Model', 'rb') as model_file:
        model = pickle.load(model_file)
        
    with open('./saved model/tfidf_vectorizer', 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)

    # pre-processing
    def get_wordnet_pos(pos_tag):
        if pos_tag.startswith('J'):
            return wordnet.ADJ
        elif pos_tag.startswith('V'):
            return wordnet.VERB
        elif pos_tag.startswith('N'):
            return wordnet.NOUN
        elif pos_tag.startswith('R'):
            return wordnet.ADV
        else:
            return wordnet.NOUN

    def clean_text(text):
        # lower text
        text = str(text).lower()
        # tokenize text and remove puncutation
        text = [word.strip(string.punctuation) for word in text.split(" ")]
        # remove words that contain numbers
        text = [word for word in text if not any(c.isdigit() for c in word)]
        # remove stop words
        stop = stopwords.words('english')
        stop.remove("no")
        stop.remove("not")
        text = [x for x in text if x not in stop]
        # remove empty tokens
        text = [t for t in text if len(t) > 0]
        # pos tag text
        pos_tags = pos_tag(text)
        # lemmatize text (transform every word into their root form (e.g. rooms -> room, slept -> sleep))
        text = [WordNetLemmatizer().lemmatize(t[0], get_wordnet_pos(t[1])) for t in pos_tags]
        # remove words with only one letter
        text = [t for t in text if len(t) > 1]
        # join all
        text = " ".join(text)
        return(text)

    def prepare(review):
        new_review = clean_text(review)
        features = vectorizer.transform([new_review])
        dataframes = pd.DataFrame(features.todense(), columns = vectorizer.get_feature_names_out())
        return dataframes

    # External API Calls and prepare list of hotel ids
    headers = EXTERNAL_API["ENDPOINT_HEADERS"]
    # Location API
    location_url = EXTERNAL_API["LOCATION_ENDPOINT_URL"]
    querystring = {"locale":"en-gb","name":location}
   
    response = requests.request("GET", location_url, headers = headers, params = querystring)
    search = json.loads(response.text)

    dest_id = search[0]['dest_id']
    dest_type = search[0]['dest_type']

    # Hotel Search API
    hotel_search_url = "https://booking-com.p.rapidapi.com/v1/hotels/search"

    if no_of_child == 0:
        querystring = {"checkout_date": check_out_date,"units":"metric","dest_id": dest_id,"dest_type": dest_type,"locale":"en-gb","adults_number": no_of_adults,"order_by":"popularity","filter_by_currency":"PKR","checkin_date": check_in_date,"room_number": no_of_rooms ,"page_number":"0","include_adjacency":"true"}
    elif no_of_child > 0:
        querystring = {"checkout_date": check_out_date,"units":"metric","dest_id": dest_id,"dest_type": dest_type,"locale":"en-gb","adults_number": no_of_adults,"order_by":"popularity","filter_by_currency":"PKR","checkin_date": check_in_date,"room_number": no_of_rooms ,"children_number":no_of_child,"page_number":"0","include_adjacency":"true"}

    response = requests.request("GET", hotel_search_url, headers = headers, params = querystring)
    hotels = json.loads(response.text)

    # List of hotel id's
    hotel_ids = []
    hotels_list = []
    count_hotels = len(hotels['result'])
    for i in range(0, count_hotels):
        hotels_list.append({"id":hotels['result'][i]['hotel_id'], "name" : hotels['result'][i]['hotel_name'], "longitude": hotels['result'][i]['longitude'], "latitude": hotels['result'][i]['latitude'], "location": hotels['result'][i]['address'],"strikethrough_amount": hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['all_inclusive_amount']['value'],"price":hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['net_amount']['value'], "image": hotels['result'][i]['max_photo_url'],"link": hotels['result'][i]['url'], "rating": hotels['result'][i]["review_score"], "city":hotels['result'][i]["city"] })
        hotel_ids.append(hotels['result'][i]['hotel_id'])

    # ----------- hotels > 20 ------------------
    # hotel_search_url = EXTERNAL_API["HOTEL_SEARCH_ENDPOINT_URL"]
    # if no_of_child == 0:
    #     querystring = {"checkout_date": check_out_date,"units":"metric","dest_id": dest_id,"dest_type": dest_type,"locale":"en-gb","adults_number": no_of_adults,"order_by":"popularity","filter_by_currency":"PKR","checkin_date": check_in_date,"room_number": no_of_rooms ,"page_number":"0","include_adjacency":"true"}
    # elif no_of_child > 0:
    #     querystring = {"checkout_date": check_out_date,"units":"metric","dest_id": dest_id,"dest_type": dest_type,"locale":"en-gb","adults_number": no_of_adults,"order_by":"popularity","filter_by_currency":"PKR","checkin_date": check_in_date,"room_number": no_of_rooms ,"children_number":no_of_child,"page_number":"0","include_adjacency":"true"}

    # response = requests.request("GET", hotel_search_url, headers = headers, params = querystring)
    # hotels = json.loads(response.text)

    # # List of hotel id's
    # hotel_ids = []
    # hotels_list = []
    # for i in range(0, math.ceil(hotels['count'] / 20)):             # for next pages
    #     # check if children present or not
    #     if no_of_child == 0:
    #         querystring = {"checkout_date": check_out_date,"units":"metric","dest_id": dest_id,"dest_type": dest_type,"locale":"en-gb","adults_number": no_of_adults,"order_by":"popularity","filter_by_currency":"PKR","checkin_date": check_in_date,"room_number": no_of_rooms ,"page_number":str(i),"include_adjacency":"true"}
    #     elif no_of_child > 0:
    #         querystring = {"checkout_date": check_out_date,"units":"metric","dest_id": dest_id,"dest_type": dest_type,"locale":"en-gb","adults_number": no_of_adults,"order_by":"popularity","filter_by_currency":"PKR","checkin_date": check_in_date,"room_number": no_of_rooms ,"children_number":no_of_child,"page_number":str(i),"include_adjacency":"true"}

    #     response = requests.request("GET", hotel_search_url, headers=headers, params=querystring)
    #     hotels = json.loads(response.text)
    #     count_hotels = len(hotels['result'])
    #     for i in range(0, count_hotels):
    #         hotels_list.append({"id":hotels['result'][i]['hotel_id'], "name" : hotels['result'][i]['hotel_name'], "longitude": hotels['result'][i]['longitude'], "latitude": hotels['result'][i]['latitude'], "location": hotels['result'][i]['address'],"strikethrough_amount": hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['all_inclusive_amount']['value'],"price":hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['net_amount']['value'], "image": hotels['result'][i]['max_photo_url'],"link": hotels['result'][i]['url'], "rating": hotels['result'][i]["review_score"], "city":hotels['result'][i]["city"] })
    #         hotel_ids.append(hotels['result'][i]['hotel_id'])

    # generate recommendations
    reviews_url = EXTERNAL_API["REVIEWS_ENDPOINT_URL"]
    for i in range(0, len(hotel_ids)):
        querystring = {"sort_type":"SORT_MOST_RELEVANT","locale":"en-gb","hotel_id":hotel_ids[i],"language_filter":"en-gb"}
        response = requests.request("GET", reviews_url, headers = headers, params = querystring)
        hotel_info = json.loads(response.text)
        # number of reviews
        reviews_count = hotel_info['count']
        # filtered Reviews have no empty('') space
        filtered_reviews_count = 0              
        # initial score of each hotel
        score = 0.0
        # select hotels having reviews > 0
        if reviews_count > 0:
            pos = 0
            neg = 0
            total_reviews = 0

            # sentimental analysis on each review
            for j in range(0, reviews_count):
                # If both pros and cons are not empty
                if hotel_info['result'][j]['pros'] != '' and hotel_info['result'][j]['cons'] != '':
                    filtered_reviews_count = filtered_reviews_count + 1
                    total_reviews = total_reviews + 1
                    if model.predict_proba(prepare([hotel_info['result'][j]['pros']]))[0][1] > model.predict_proba(prepare([hotel_info['result'][j]['cons']]))[0][0]:
                        pos = pos + 1
                    else:
                        neg = neg + 1

                # If pros is empty and cons is not empty
                elif hotel_info['result'][j]['pros'] == '' and hotel_info['result'][j]['cons'] != '':
                    filtered_reviews_count = filtered_reviews_count + 1
                    total_reviews = total_reviews + 1
                    if model.predict_proba(prepare([hotel_info['result'][j]['cons']]))[0][1] > model.predict_proba(prepare([hotel_info['result'][j]['cons']]))[0][0]:
                        pos = pos + 1
                    else:
                        neg = neg + 1

                # If cons is empty and pros is not empty
                elif hotel_info['result'][j]['pros'] != '' and hotel_info['result'][j]['cons'] == '':
                    filtered_reviews_count = filtered_reviews_count + 1
                    total_reviews = total_reviews + 1
                    if model.predict_proba(prepare([hotel_info['result'][j]['pros']]))[0][1] > model.predict_proba(prepare([hotel_info['result'][j]['pros']]))[0][0]:
                        pos = pos + 1
                    else:
                        neg = neg + 1

            if(filtered_reviews_count!=0):  
                # calculate score of each hotel
                score = pos / filtered_reviews_count

        # add filtered hotels with 'SCORE' in hotels list
        hotels_list[i]['score'] = score

    sorted_hotel_list = sorted(hotels_list, key=lambda d: d['score'], reverse=True) 

    # save recommendations in database
    # instance of collection
    recommendations = mongo.db.recommendations
    # Update the hotels in database
    inserted_hotels = recommendations.replace_one({"userId": ObjectId(user_id)}, {"userId": ObjectId(user_id), "recommendedHotels": sorted_hotel_list}, True)
    if inserted_hotels:
        return jsonify({"Result": "Recommendations saved."})
    else:
        return jsonify({"Result": "Unable to save recommendations!"})        


# Recommendations Endpoints - Get recommended hotels
@app.route('/getRecommendations/<id>', methods=['GET'])
def getRecommendations(id):
    # instance of collection
    recommendations = mongo.db.recommendations
    # get data from database and send as response
    result = recommendations.find({"userId": ObjectId(id)})
    hotels_list = [key["recommendedHotels"] for key in result]

    if hotels_list:
        return jsonify({"Result": "Hotels found.", "Hotels": hotels_list})
    else:
        return jsonify({"Result": "Unable to find hotels!"})


# Start of execution
if __name__ == "__main__":
    app.secret_key = 'mysecret'
    app.run(debug=True)

