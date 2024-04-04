# app.py

from flask import Flask, request, jsonify
# from flask_cors import CORS
from classes.wasteItem import WasteItem
from classes.educationalFact import EducationalFact
from classes.player import Player
from classes.avatar import Avatar
import csv
import random

app = Flask(__name__)
# CORS(app)

waste_bins = [0, 1, 2]
waste_items = []
with open('game-data/waste.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        image_path = row['image_name']
        bin_type = int(row['bin_type'])
        waste_item = WasteItem(image_path, bin_type)
        waste_items.append(waste_item)

educational_facts = []
with open('game-data/facts.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        fact_number = int(row['factNumber'])
        fact_text = row['factText']
        educational_fact = EducationalFact(fact_number, fact_text)
        educational_facts.append(educational_fact)

bins_data = {}
with open('game-data/waste.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        image_name = row['image_name']
        bin_type = int(row['bin_type'])
        bins_data[image_name] = bin_type

avatars = []
with open('game-data/avatars.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        avatarID = int(row['avatarID'])
        cost = int(row['cost'])
        name = row['name']
        avatar = Avatar(avatarID, cost, name)
        avatars.append(avatar)

player = Player()

"""
Simple endpoint to confirm that  server is running
    Returns:
        str: A greeting message.
"""


@app.route('/')
def hello():
    return 'Hello, World!'


"""
Endpoint for player login.

    Parameters:
        username str: Username of the player
        password str: Password of the playe

    Returns:
        json:  object containing login status and HTTP status code
"""


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        loggedin_player = player.login(username, password)
        return jsonify({'Login Success': loggedin_player, 'Status': 200}), 200

    except Exception as e:
        return jsonify({'error': str(e), 'Status': 500}), 500


"""
Endpoint to handle player logout.

    Returns:
        json:  object containing logout status and HTTP status code.
"""


@app.route('/logout')
def logout():
    try:
        logoutStatus = player.logout()
        # player = Player()
        return jsonify({'Logout Success': logoutStatus, 'Status': 200}), 200

    except Exception as e:
        return jsonify({'error': str(e), 'Status': 500}), 500


"""
Check if the player is currently logged in

    Returns:
        json:  object indicating the logged-in status.
"""


@app.route('/logged')
def is_logged_in():
    if player._isLogged == True:
        return jsonify({'logged_in': True}), 200
    else:
        return jsonify({'logged_in': False}), 200

"""
Check if the selected waste item is placed in the correct bin.

    Parameters:
        imageName (str): Name of the image representing the waste item
        binNum (int): Bin number where the item was placed

    Returns:
        json:  object indicating whether the item was placed correctly
"""


@app.route('/waste-check', methods=['POST'])
def waste_check():
    try:
        data = request.get_json()
        image_name = data['imageName']  # Get the image name from the request
        bin_num = data['binNum']

        bin_type = int(bins_data.get(image_name))

        # Check if bin_num is equal to image_name
        if bin_num == bin_type:
            return jsonify({'success': True}), 200
        else:
            return jsonify({'success': False}), 200

    except Exception as e:
        return jsonify({'error: bad item name': str(e)}), 500


"""
Update the player's score based on game activity

    Parameters:
        score_update (int): The amount to add to the player's current score

    Returns:
        json:  object with the updated score
"""


@app.route('/update-score', methods=['POST'])
def update_score():
    try:
        data = request.get_json()
        score = data['score_update']
        current = player.get_totalScore()

        # Update the player's total score
        player.set_totalScore(current + score)
        updated = player.get_totalScore()

        return jsonify({'score': updated}), 200  # Return the updated score
    except Exception as e:
        return jsonify({'error': str(e)}), 500


"""
Retrieve the current score of the player
    Returns:
        json:  object containing the player's score or an error message
"""


@app.route('/get-score')
def get_score():
    current_score = player.get_totalScore()

    if current_score is not None:
        return jsonify({'score': current_score}), 200
    else:
        return jsonify({'error': 'Score not found'}), 404


"""
Provide a random educational fact.

    Returns:
        str: A random educational fact.
"""


@app.route('/get-fact')
def get_fact():
    fact_number = random.randint(0, len(educational_facts)-1)
    fact = educational_facts[fact_number]

    if fact is not None:
        return fact.get_text()
    else:
        return f"Fact {fact_number} not found."


"""Retrieve the top 6 players based on their scores.

    Returns:
        json:  object containing the top 6 players and their scores.
"""


@app.route('/get-top-6')
def leaderboard():
    top_players = {}
    with open('game-data/accounts.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if 'userID' not in row or not row['totalScore']:
                continue  # Skip rows without 'userID' or with empty 'totalScore'
            player_id = row['userID']
            total_score = int(row['totalScore'])  # Convert to int if not empty
            if total_score:
                if total_score not in top_players:
                    top_players[total_score] = []
                top_players[total_score].append(player_id)

    # Sort scores in reverse order (highest to lowest)
    sorted_scores = sorted(top_players.keys(), reverse=True)
    top_players_sorted = []

    # Iterate through sorted scores and get the top 6 players for each score
    for score in sorted_scores:
        top_players_sorted.extend(
            [{'player_id': player_id, 'score': score} for player_id in top_players[score]])
        if len(top_players_sorted) >= 6:
            break

    return jsonify({'top_players': top_players_sorted})


"""Sets the level of the player, if they have developer status.

    Parameters:
        level_set (int): The level to set for the player, must be between 1 and 10.

    Returns:
        json:  object indicating success or failure of level setting.
"""


@app.route('/set-level', methods=['POST'])
def set_level():
    # check if player has developer status
    data = request.get_json()

    if player.is_developer:
        # Use .get() to safely access 'level_set' without KeyError
        level = data.get('level_set')
        # Check if 'level_set' is provided in the JSON data
        if level is not None and level >= 1 and level <= 10:
            player.set_lastLevel(level)
            return jsonify({'message': 'Level set successfully', 'level': level}), 200
        else:
            return jsonify({'error': 'No in-range level provided in the request'}), 400
    else:
        return jsonify({'error': 'Not a Developer'}), 403

"""
Provides access to student information for instructors

    Returns:
        json:  object containing student information or an error message
"""


@app.route('/instructor-access')
def instructor_access():
    try:
        teacher_id = player.get_userID()
        print(teacher_id)

        students = []

        if (player.is_teacher()):  # Corrected method call

            with open('game-data/accounts.csv', newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    print(row['userID'])
                    if row.get('teacherID') == teacher_id:
                        print("add")
                        student_info = {
                            'userID': row['userID'],
                            'lastLevel': row['lastLevel'],
                            'totalScore': row['totalScore'],
                            'coins': row['coins']
                        }
                        students.append(student_info)

        if not students:
            return jsonify({'message': 'No students found for this teacher'}), 404

        return jsonify({'students': students}), 200

    except Exception as e:
        return jsonify({'error': str(e), 'Status': 500}), 500


"""
Retrieve the current number of coins for the player

    Returns:
        json:  object containing the number of coins
"""


@app.route('/get-coins')
def get_coins():
    coins = player.get_coins()
    return jsonify({'coins': coins})


"""
Check if the player has instructor status

    Returns:
        json:  object indicating whether the player is an instructor
"""


@app.route('/get-instructor')
def get_instructor():
    instr = player.is_teacher()
    return jsonify({'instr': instr})


"""
Check if the player has developer status

    Returns:
        json:  object indicating whether the player is a developer
"""


@app.route('/get-developer')
def get_developer():
    dev = player.is_developer()
    return jsonify({'dev': dev})


"""
Retrieve the current level of the player

    Returns:
        json:  object containing the current level or error message.
"""


@app.route('/get-level')
def get_level():
    current_level = player.get_lastLevel()

    if current_level is not None:
        return jsonify({'level': current_level}), 200
    else:
        return jsonify({'error': 'Level not found'}), 404


"""
Endpoint for purchasing an avatar. 

    Returns:
        json: status code indicating success or failure of the purchase.
"""
@app.route('/purchase-avatar', methods=['POST'])
def purchase():
    data = request.get_json()
    avatarID = data['avatarID']
    
    avatar_cost = avatars[avatarID].get_cost()
    player_coins = player.get_coins()
    
    if player_coins is None:
        raise ValueError("Player coins are None.")
    
    if avatar_cost > player_coins:
        return jsonify({'message': 'Insufficient coins', 'status': 'error'}), 400
    
    new_player_coins = player_coins - avatar_cost
    
    player.set_coins(new_player_coins)
    player.add_inventory(avatarID)
    
    return jsonify({'message': 'Avatar purchased successfully', 'status': 'success'}), 200
    
    
"""
Endpoint for equipped a purchased avatar. 

    Returns:
        int: 
"""
@app.route('/equip-avatar', methods=['POST'])
def equip():
    try:
        data = request.get_json()
        avatarID = data['avatarID']
        
        player.set_currentAvatar(avatarID)
        
        return jsonify({'message': 'Avatar equipped successfully', 'status': 'success'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


"""
Endpoint for equipped a purchased avatar. 

    Returns:
        int: 
"""
@app.route('/get-avatar')
def avatar():
    try:
        avatar = player.get_currentAvatar()
        
        return jsonify({'avatar': avatar}), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


"""
Show the current equipped avatar. 

    Returns:
        int: integer representing the current avatar that the player has equipped
"""
@app.route('/current-avatar')
def current_avatar():
    avatar = player.get_currentAvatar()
    return jsonify({'avatar': avatar})


"""
Show the avatars that the player has purchased

    Returns:
        json:  object listing purchased avatars
"""


@app.route('/show-purchased')
def purchased():
    inventory = player.get_inventory()
    return jsonify({'inventory': inventory})


"""
Retrieve the IDs, prices, and names of available avatars

    Returns:
        json: object containing the names, avatar IDs, and prices of avatars
"""


@app.route('/avatar-shop')
def prices():
    avatar_prices = []
    for avatar in avatars:
        avatar_prices.append({
            'avatarID': avatar.get_avatarID(),
            'name': avatar.get_name(),
            'cost': avatar.get_cost()
        })
    return jsonify(avatar_prices)


if __name__ == '__main__':
    app.run(debug=True)
