from __main__ import app
from app import mongo
import os
import time
import json
import requests
from bson.objectid import ObjectId
from flask import request, jsonify
from werkzeug.utils import secure_filename
from enviromentVariables import EXTERNAL_API

# Imports of model
import nltk
import string
import pickle
import pandas as pd
from nltk import pos_tag
from nltk.corpus import wordnet
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


# Admin Login Endpoint
@app.route('/adminLogin', methods=['POST'])
def adminLogin():
    # Get request data
    request_data = request.get_json()
    form_username = request_data["username"]
    form_password = request_data["password"]

    # instance of collection
    admins = mongo.db.admins
    # Find the admin
    login_admin = admins.find_one({'adminName': form_username})
    # Authenticate admin and login
    if login_admin:
        if form_password == login_admin["adminPassword"]:
            admin_id= str(login_admin['_id'])
            return jsonify({"Result": "Logged in successfully.", "AdminID": admin_id})
        else:
            return jsonify({"Result": 'Incorrect Password!'})
    else:
            return jsonify({"Result": 'Admin Not Found!'})


# Admin Header Endpoint
@app.route('/adminHeader/<id>', methods=['GET'])
def adminHeader(id):
    # instance of collection
    admins = mongo.db.admins
    # Find the admin
    admin = admins.find_one({'_id': ObjectId(id)})
    # get admin data from database and return as response
    if admin:
        if 'adminImageUrl' in admin.keys():
            return jsonify({"Result": "Admin found.", "AdminName": admin['adminName'], "ImageUrl": admin["adminImageUrl"]})
        else:
            return jsonify({"Result": "Admin found.", "AdminName": admin['adminName']})
    else:
        return jsonify({"Result": "Admin not found!"})


# Admin Profile Endpoint
@app.route('/adminProfile/<id>', methods=['GET', 'PUT'])
def adminProfile(id):
    if request.method == 'GET':
        # instance of collection
        admins = mongo.db.admins
        # Find the admin
        admin = admins.find_one({'_id': ObjectId(id)})
        # get admin data from database and return as response
        if admin:
            if 'adminImageUrl' not in admin.keys():
                return jsonify({"AdminName": admin["adminName"], "AdminEmail": admin['adminEmail'], "AdminPassword": admin['adminPassword']})
            else:
                return jsonify({"AdminName": admin["adminName"], "AdminEmail": admin['adminEmail'], "AdminPassword": admin['adminPassword'], "AdminImageUrl": admin['adminImageUrl']})
        else:
            return jsonify({"Result": "Admin not found!"})

    elif request.method == 'PUT':
        # Get request data
        request_data = request.get_json()
        form_name = request_data["adminName"]
        form_email = request_data["adminEmail"]
        form_password = request_data["adminPassword"]
        # instance of collection
        admins = mongo.db.admins
        # Find the admin
        admin = admins.find_one({'_id': ObjectId(id)})
        # get user data from database and return as response
        if admin:
            updated = admins.update_one({ "_id": ObjectId(id)}, { "$set" : { "adminName" : form_name, "adminEmail" : form_email, "adminPassword" : form_password } })
            if updated:
                return jsonify({"Result": "Admin updated successfully."})
            else:
                return jsonify({"Result": "Unable to update the record!"})
        else:
            return jsonify({"Result": "Admin not found!"})


# Admin Profile Image Endpoint
@app.route('/adminProfileImage', methods=['POST'])
def adminProfileImage():
    allowedImageTypes = ["image/jpg", "image/jpeg", "image/png"]
    # path to save profile images
    upload_folder = './static/admins'
    # create folder if not present
    if not os.path.isdir(upload_folder):
        os.mkdir(upload_folder)

    # get request data
    file = request.files['file']
    # check the file type
    file_type = file.content_type
    if file_type not in allowedImageTypes:
        return jsonify({"Result": "File type is incorrect. Only jpg, jpeg, and png are allowed."})

    adminId = request.form["adminID"]
    # get name of uploaded file
    filename = secure_filename(file.filename)
    # specify destination to save image
    destination="/".join([upload_folder, filename])
    image_path = destination.replace('.', '', 1)
    # save the image
    file.save(destination)
    # save imageurl in database
    admins = mongo.db.admins
    updated = admins.update_one({ "_id": ObjectId(adminId)}, { "$set" : { "adminImageUrl" : image_path } })
    if updated:
        return jsonify({"Result": "Image uploaded successfully.", "AdminImageUrl": image_path})
    else:
        return jsonify({"Result": "Unable to save image!", "AdminImageUrl": image_path})


# Admin Dashboard Endpoint
@app.route('/adminDashboard', methods=['GET'])
def adminDashboard():
    # instances of collections
    users = mongo.db.users
    contacts = mongo.db.contacts
    feedbacks = mongo.db.feedbacks

    # count the number of documents from collections
    num_of_users = users.count_documents({})
    num_of_contacts = contacts.count_documents({})
    num_of_feedbacks = feedbacks.count_documents({})

    # get data province wise
    punjab = users.count_documents({"province": "Punjab"})
    sindh = users.count_documents({"province": "Sindh"})
    kpk = users.count_documents({"province": "KPK"})
    balochistan = users.count_documents({"province": "Balochistan"})

    provinces = {"Punjab": punjab, "Sindh": sindh, "KPK": kpk, "Balochistan": balochistan}

    # get data travel experience wise
    years_eq_1 = users.count_documents({"travelExperience": {"$eq": 1}})
    years_lt_5 = users.count_documents({"travelExperience": {"$gt": 1, "$lte": 5}})
    years_lt_10 = users.count_documents({"travelExperience": {"$gt": 5, "$lte": 10}})
    years_lt_15 = users.count_documents({"travelExperience": {"$gt": 10, "$lte": 15}})
    years_lt_20 = users.count_documents({"travelExperience": {"$gt": 15, "$lte": 20}})
    year_gt_20 = users.count_documents({"travelExperience": {"$gt": 20}})

    travel_experiences = {"1 year": years_eq_1, "Lt 5 years": years_lt_5, "Lt 10 years": years_lt_10, "Lt 15 years": years_lt_15, "Lt 20 years": years_lt_20, "Gt 20 years": year_gt_20}

    if num_of_users and num_of_contacts and num_of_feedbacks and provinces and travel_experiences:
        return jsonify({"Users": num_of_users, "Contacts": num_of_contacts, "Feedbacks": num_of_feedbacks, "Provinces": provinces, "TravelExperiences": travel_experiences})
    else:
        return jsonify({"Result": "Unable to find collections!"})


# Admin Users Endpoint
@app.route('/adminUsers', methods=['GET'])
def adminUsers():
    # instances of collections
    users = mongo.db.users

    # get data from database and send as response
    allUsers = users.find({}, {"password": 0, "confirmPassword": 0} )
    usersList = []
    for user in allUsers:
        user['_id'] = str(user['_id'])
        usersList.append(user)

    if usersList:
        return jsonify({"Users": usersList})
    else:
        return jsonify({"Result": "Unable to find users!"})


# Admin User Endpoint
@app.route('/adminUser/<id>', methods=['GET', 'PUT', 'DELETE'])
def adminUser(id):
    if request.method == 'GET':
        # instance of collection
        users = mongo.db.users
        # Find the user
        user = users.find_one({'_id': ObjectId(id)}, {"_id": 0, "password": 0, "confirmPassword": 0})
        # get user data from database and return as response
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
                return jsonify({"Result": "User updated successfully."})
            else:
                return jsonify({"Result": "Unable to update the record!"})
        else:
            return jsonify({"Result": "User not found!"})


    elif request.method == 'DELETE':
        # instance of collection
        users = mongo.db.users
        # Find the user
        user = users.delete_one({'_id': ObjectId(id)})
        
        if user:
            return jsonify({"Result": "User deleted successfully."})
        else:
            return jsonify({"Result": "User not found!"})


# Admin Contacts Endpoint
@app.route('/adminContacts', methods=['GET'])
def adminContacts():
    # instances of collection
    contacts = mongo.db.contacts

    # get data from database and send as response
    allContacts = contacts.find({})
    contactsList = []
    for contact in allContacts:
        contact['_id'] = str(contact['_id'])
        contactsList.append(contact)

    if contactsList:
        return jsonify({"Contacts": contactsList})
    else:
        return jsonify({"Result": "Unable to find contacts!"})

# Admin Delete Contact Endpoint
@app.route('/adminDeleteContact/<id>', methods=['DELETE'])
def adminDeleteContact(id):
    # instance of collection
    contacts = mongo.db.contacts
    # Find the user
    contact = contacts.delete_one({'_id': ObjectId(id)})
    
    if contact:
        return jsonify({"Result": "Contact deleted successfully."})
    else:
        return jsonify({"Result": "Contact not found!"})


# Admin Feedbacks Endpoint
@app.route('/adminFeedbacks', methods=['GET'])
def adminFeedbacks():
    # instances of collection
    feedbacks = mongo.db.feedbacks

    # get data from database and send as response
    allFeedbacks = feedbacks.find({})
    feedbacksList = []
    for feedback in allFeedbacks:
        feedback['_id'] = str(feedback['_id'])
        feedbacksList.append(feedback)

    if feedbacksList:
        return jsonify({"Feedbacks": feedbacksList})
    else:
        return jsonify({"Result": "Unable to find feedbacks!"})

# Admin Delete Feedback Endpoint
@app.route('/adminDeleteFeedback/<id>', methods=['DELETE'])
def adminDeleteFeedback(id):
    # instance of collection
    feedbacks = mongo.db.feedbacks
    # Find the user
    feedback = feedbacks.delete_one({'_id': ObjectId(id)})
    
    if feedback:
        return jsonify({"Result": "Feedback deleted successfully."})
    else:
        return jsonify({"Result": "Feedback not found!"})
        

# Admin Home Section Endpoints
@app.route('/adminHomeSection', methods=['GET'])
def adminHomeSection():
    # instances of collections
    cities = mongo.db.destinations
    featuredHotels = mongo.db.featuredHotels
    videos = mongo.db.videos

    # get data from database and send as response
    allCities = cities.find({})
    allFeaturedHotels = featuredHotels.find({})
    allVideos = videos.find({})

    citiesList = []
    featuredHotelsList = []
    videosList = []

    for city in allCities:
        city['_id'] = str(city['_id'])
        citiesList.append(city)

    for hotel in allFeaturedHotels:
        hotel['_id'] = str(hotel['_id'])
        featuredHotelsList.append(hotel)

    for video in allVideos:
        video['_id'] = str(video['_id'])
        videosList.append(video)

    if citiesList and videosList or featuredHotelsList:
        return jsonify({"CitiesData": citiesList, "FeaturedHotelsData": featuredHotelsList, "VideosData": videosList})
    else:
        return jsonify({"Result": "Unable to find collections!"})


# Admin Home Section - Destintation Endpoint
@app.route('/adminHomeSection/addNewDestination', methods=['POST'])
def addNewDestination():
    # path to save destination images
    upload_folder = './static/destinations'
    # create folder if not present
    if not os.path.isdir(upload_folder):
        os.mkdir(upload_folder)

    # get request data
    file = request.files["file"]
    cityname = request.form["cityname"]
    # get name of uploaded file
    filename = secure_filename(file.filename)
    # specify destination to save image
    destination="/".join([upload_folder, filename])
    image_path = destination.replace('.', '', 1)
    # save the image
    file.save(destination)
    # save data in database
    destinations = mongo.db.destinations
    result = destinations.insert_one({'imageUrl': image_path, 'cityName': cityname})
    if result:
        return jsonify({"Result": "New Destination added successfully."})
    else:
        return jsonify({"Result": "Unable to add new destination!"})

# Admin Home Section - Featured Hotel Endpoint
@app.route('/adminHomeSection/addNewHotel', methods=['POST'])
def addNewHotel():
    # path to save destination images
    upload_folder = './static/featured hotels'
    # create folder if not present
    if not os.path.isdir(upload_folder):
        os.mkdir(upload_folder)

    # get request data
    file = request.files["file"]
    name = request.form["name"]
    location = request.form["location"]
    rating = float(request.form["rating"])
    facilities = request.form["facilities"]
    facilities_list = list(facilities.split(","))
    price = int(request.form["price"])
    discount = int(request.form["discount"])
    latitude = float(request.form["latitude"])
    longitude = float(request.form["longitude"])
    link = request.form["link"]
    
    # get name of uploaded file
    filename = secure_filename(file.filename)
    # specify destination to save image
    destination="/".join([upload_folder, filename])
    image_path = destination.replace('.', '', 1)
    # save the image
    file.save(destination)

    # save data in database
    featured_hotels = mongo.db.featuredHotels
    result = featured_hotels.insert_one({'name': name, 'location': location, 'rating': rating, 'facilities': facilities_list, 'price': price, 'discount': discount, 'latitude': latitude, 'longitude': longitude, 'link': link, 'image': image_path})
    if result:
        return jsonify({"Result": "Featured Hotel added successfully."})
    else:
        return jsonify({"Result": "Unable to save hotel data!"})


# Admin Home Section - Video Endpoint
@app.route('/adminHomeSection/addNewVideo', methods=['POST'])
def addNewVideo():
    # get request data
    request_form = request.get_json()
    embedId = request_form["embedId"]

    # # save data in database
    videos = mongo.db.videos
    result = videos.insert_one({'embedId': embedId})
    if result:
        return jsonify({"Result": "Embed Id uploaded successfully."})
    else:
        return jsonify({"Result": "Unable to save data!"})


# Admin About Endpoint
@app.route('/adminAbout', methods=['GET', 'PUT'])
def adminAbout():
    if request.method == 'PUT':
        image_path = ""
        # get request data
        aboutText = request.form["aboutText"]
        if request.files:
            file = request.files['file']
            # path to save about images
            upload_folder = './static/about'
            # create folder if not present
            if not os.path.isdir(upload_folder):
                os.mkdir(upload_folder) 
            # get name of uploaded file
            filename = secure_filename(file.filename)
            # specify destination to save image
            destination="/".join([upload_folder, filename])
            image_path = destination.replace('.', '', 1)
            # save the image
            file.save(destination)
    
        # instance of collection
        about = mongo.db.about

        # save data in database and send response
        if image_path != "":
            result = about.update_one({}, { "$set": {'imageUrl': image_path, 'aboutText': aboutText} })
        else:
            result = about.update_one({}, { "$set" : { "aboutText" : aboutText } })
            
        if result:
            return jsonify({"Result": "About data updated successfully."})
        else:
            return jsonify({"Result": "Unable to update about data!"})

    if request.method == 'GET':
        # get instance of collection
        about = mongo.db.about

        # save data in database and send response
        result = about.find_one({}, {"_id": 0})
        if result:
            return jsonify({"AboutText": result["aboutText"], "AboutImage": result["imageUrl"]})
        else:
            return jsonify({"Result": "Data not found!"})


# Admin Trending Endpoint
@app.route('/adminTrending', methods=['GET'])
def adminTrending():
    def get_hotels():
        # Location Endpoint
        url = EXTERNAL_API["LOCATION_ENDPOINT_URL"]
        querystring = {"locale":"en-gb","name":"Pakistan"}
        headers = EXTERNAL_API["ENDPOINT_HEADERS"]
        # API call
        response = requests.request("GET", url, headers = headers, params = querystring)
        # Get Destination Data
        search = json.loads(response.text)
        dest_id = search[0]['dest_id']
        dest_type = search[0]['dest_type']

        # Hotel Search Endpoint
        url = EXTERNAL_API["HOTEL_SEARCH_ENDPOINT_URL"]
        # Query Criteria
        querystring = {"locale":"en-gb","name":"Pakistan"}
        querystring = {"checkout_date":"2022-08-06","room_number":"1","filter_by_currency":"PKR","dest_type":dest_type,"locale":"en-gb","checkin_date":"2022-08-05","adults_number":"1","order_by":"popularity","units":"metric","dest_id":dest_id,"page_number":"0"}

        response = requests.request("GET", url, headers = headers, params=querystring)
        hotels = json.loads(response.text)

        # Store hotels in list
        hotels_list = []
        count_hotels = len(hotels['result'])
        for i in range(0,count_hotels):
            hotels_list.append({"id":hotels['result'][i]['hotel_id'], "name" : hotels['result'][i]['hotel_name'], "longitude": hotels['result'][i]['longitude'], "latitude": hotels['result'][i]['latitude'], "location": hotels['result'][i]['address'],"strikethrough_amount": hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['all_inclusive_amount']['value'],"price":hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['net_amount']['value'], "image": hotels['result'][i]['max_photo_url'],"link": hotels['result'][i]['url'], "rating": hotels['result'][i]["review_score"], "city":hotels['result'][i]["city"] })
        return hotels_list

    def delete_favorite_hotels():
        favorites = mongo.db.favorites
        hotels = favorites.aggregate([
        {
            "$lookup": {
                "from": "trendings",
                "localField": "hotelId",
                "foreignField": "_id",
                "as": "TrendingLiked"
            }
        }, 
        { "$unwind": { 
            "path": "$TrendingLiked", 
            "preserveNullAndEmptyArrays": True }
        }
        ])

        for hotel in hotels:
            if 'TrendingLiked' in hotel.keys():
                favorites.find_one_and_delete({'_id': ObjectId(hotel['_id'])})
            
    def save_hotels(hotels_list):   
        # instance of collection
        trendings = mongo.db.trendings
        # empty the existing collection
        trendings.delete_many({ })
        # delete the matched favorite hotels from trending collection
        delete_favorite_hotels()
        # Update the hotels in database
        inserted_hotels = trendings.insert_many(hotels_list)
        if inserted_hotels:
            return True
        else:
            return False
           
    hotels_list = get_hotels()
    confirmation = save_hotels(hotels_list)
    if confirmation:
        return jsonify({"Result": "Trending Hotels Updated."})
    else:
        return jsonify({"Result": "Unable to update hotels!"})


# Admin Destination Endpoint
@app.route('/adminDestination', methods=['GET'])
def adminDestination():
    def get_hotels():
        hotels_list = []
        for i in range(0,50):
           # Hotel Search Endpoint
            url = EXTERNAL_API["HOTEL_SEARCH_ENDPOINT_URL"]
            # Query Criteria
            querystring = {"checkout_date":"2022-08-06","room_number":"1","filter_by_currency":"PKR","dest_type":"country","locale":"en-gb","checkin_date":"2022-08-05","adults_number":"1","order_by":"popularity","units":"metric","dest_id":"161","page_number":str(i)}
            headers = EXTERNAL_API["ENDPOINT_HEADERS"]

            response = requests.request("GET", url, headers = headers, params = querystring)
            hotels = json.loads(response.text)

            # Store Data in list
            for i in range(0,len(hotels['result'])):
                hotels_list.append({"id":hotels['result'][i]['hotel_id'], "name" : hotels['result'][i]['hotel_name'], "longitude": hotels['result'][i]['longitude'], "latitude": hotels['result'][i]['latitude'], "location": hotels['result'][i]['address'],"strikethrough_amount": hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['all_inclusive_amount']['value'],"price":hotels['result'][i]['composite_price_breakdown']['product_price_breakdowns'][0]['net_amount']['value'], "image": hotels['result'][i]['max_photo_url'],"link": hotels['result'][i]['url'], "rating": hotels['result'][i]["review_score"], "city":hotels['result'][i]["city"]  })
            
            # Delay of 2 seconds
            time.sleep(2)
        
        return hotels_list

    def delete_favorite_hotels():
        favorites = mongo.db.favorites
        hotels = favorites.aggregate([
        {
            "$lookup": {
                "from": "countryData",
                "localField": "hotelId",
                "foreignField": "_id",
                "as": "CountryDataLiked"
            }
        }, 
        { "$unwind": { 
            "path": "$CountryDataLiked", 
            "preserveNullAndEmptyArrays": True }
        }
        ])

        for hotel in hotels:
            if 'CountryDataLiked' in hotel.keys():
                favorites.find_one_and_delete({'_id': ObjectId(hotel['_id'])})

    def save_hotels(hotels_list):  
        # instance of collection
        countryData = mongo.db.countryData
        # empty the existing collection
        countryData.delete_many({ })
        # delete the matched favorite hotels from countryData collection
        delete_favorite_hotels()
        # Update the hotels in database
        inserted_hotels = countryData.insert_many(hotels_list)
        if inserted_hotels:
            return True
        else:
            return False
           
    hotels_list = get_hotels()
    confirmation = save_hotels(hotels_list)
    if confirmation:
        return jsonify({"Result": "Destination Hotels Updated."})
    else:
        return jsonify({"Result": "Unable to update hotels!"})


# Admin Sentimental Statistics Endpoint
@app.route('/adminSentimentAnalysis', methods=['POST'])
def adminSentimentAnalysis():
    # Get request data
    request_data = request.get_json()
    sentence = request_data["sentence"]

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

    def prepare(text):
        new_text = clean_text(text)
        features = vectorizer.transform([new_text])
        dataframes = pd.DataFrame(features.todense(), columns = vectorizer.get_feature_names_out())
        return dataframes

    # Sentimental Analysis
    output = model.predict_proba(prepare(sentence))
    neg_percent = output[0][0]
    pos_percent = output[0][1]
    overall = 'Negative' if neg_percent > pos_percent else 'Positive'

    if neg_percent and pos_percent and overall:
        return jsonify({"Result": "Sentimental Analysis done.", "Negative": round(neg_percent*100), "Postive": round(pos_percent*100), "Overall": overall})
    else:
        return jsonify({"Result": "Unable to perform sentimental analysis right now. Try again!"})
