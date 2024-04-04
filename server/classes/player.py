from classes.avatar import *
import csv

"""
The class provides methods to manage the player's login, logout, item purchase, and account updates, 
as well as getters and setters for each attribute to encapsulate the state of a player object

userID (str): A unique identifier for the player.
userPassword (str): The password for the player's account.
currentAvatar (int): The current avatar object associated with the player.
coins (int): The number of coins the player has.
isTeacher (bool): Flag indicating whether the player is a teacher.
isDeveloper (bool): Flag indicating whether the player is a developer.
inventory (Inventory): The inventory object containing items the player owns.
totalScore (int): The total score accumulated by the player.
lastLevel (int): The last level the player reached.
teacherID (str): A unique identifier for the teacher associated with the player (if applicable).

"""


class Player:
    def __init__(self):
        self._userID = None                  # String
        self._userPassword = None            # String
        self._currentAvatar = None           # Int
        self._coins = None                   # Int
        self._isTeacher = None          # Boolean
        self._isDeveloper = None        # Boolean
        self._inventory = None          # Inventory Object
        self._totalScore = 0            # Integer
        self._lastLevel = 1             # Integer
        self._teacherID = None          # String
        self._isLogged = False          # Boolean

    """
    Appends the current player's information to a CSV file.

    This method updates 'game-data/accounts.csv' by appending the current state
    of the player's attributes. Each player is represented as a row in the CSV file.
    """

    def update_accounts_csv(self):
        rows = []
        updated = False

        # Read the CSV file and locate the row to update
        with open('game-data/accounts.csv', 'r', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['userID'] == self._userID and row['userPassword'] == self._userPassword:
                    # Update the row with new data
                    row.update({'currentAvatar': self._currentAvatar, 'coins': self._coins, 'isTeacher': self._isTeacher,
                               'isDeveloper': self._isDeveloper, 'inventory': self._inventory, 'totalScore': self._totalScore, 'lastLevel': self._lastLevel, 'teacherID': self._teacherID})
                    updated = True
                rows.append(row)

        # Write the updated data back to the CSV file
        with open('game-data/accounts.csv', 'w', newline='') as csvfile:
            fieldnames = ['userID', 'userPassword', 'currentAvatar', 'coins',
                          # Update fieldnames as per your CSV
                          'isTeacher', 'isDeveloper', 'inventory', 'totalScore', 'lastLevel', 'teacherID']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    """
    Authenticates a player using a username and password.

    Args:
        username (str): The username to authenticate
        password (str): The password to authenticate

    Returns:
        bool: True if authentication is successful and player data is loaded, False otherwise.

    This method checks the game-data/accounts.csv file for the provided username and password.
    If a match is found, it initializes the Player object with the user's data.
    """

    def login(self, username, password) -> bool:
        count = 0
        with open('game-data/accounts.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['userID'] == username and row['userPassword'] == password:
                    # Initialize the current Player object with the matched credentials
                    self._userID = row['userID']
                    self._userPassword = row['userPassword']
                    self._currentAvatar = int(row['currentAvatar'])
                    self._coins = int(row['coins'])
                    self._isTeacher = row['isTeacher'].lower() == 'true'
                    self._isDeveloper = row['isDeveloper'].lower() == 'true'
                    self._inventory = row['inventory']
                    self._totalScore = int(row['totalScore'])
                    self._lastLevel = int(row['lastLevel'])
                    self._teacherID = row['teacherID']
                    self._isLogged = True
                    return True
                elif row['userID'] == username and row['userPassword'] != password:
                    return False
                else:
                    count += 1
                    continue
        with open('game-data/accounts.csv', 'a', newline='') as csvfile:
            fieldnames = ['userID', 'userPassword', 'currentAvatar', 'coins',
                          'isTeacher', 'isDeveloper', 'inventory', 'totalScore', 'lastLevel', 'teacherID']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writerow({
                'userID': username,
                'userPassword': password,
                'currentAvatar': None,
                'coins': 0,
                'isTeacher': False,
                'isDeveloper': False,
                'inventory': [0],
                'totalScore': 0,
                'lastLevel': 0,
                'teacherID': None
            })
        return False

    """
    Updates the player's information in the CSV file upon logout

    This method reads the game-data/accounts.csv file locates the player's row based on userID and userPassword
    updates the row with the current player state and writes the changes back to the file.

    Returns:
        bool: True if the update was successful, False otherwise.
    """

    def logout(self):
        rows = []
        updated = False

        # Read the CSV file and locate the row to update
        with open('game-data/accounts.csv', 'r', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['userID'] == self._userID and row['userPassword'] == self._userPassword:
                    # Update the row with new data
                    row.update({'currentAvatar': self._currentAvatar, 'coins': self._coins, 'isTeacher': self._isTeacher,
                               'isDeveloper': self._isDeveloper, 'inventory': self._inventory, 'totalScore': self._totalScore, 'lastLevel': self._lastLevel, 'teacherID': self._teacherID})
                    updated = True
                rows.append(row)

        # Write the updated data back to the CSV file
        with open('game-data/accounts.csv', 'w', newline='') as csvfile:
            fieldnames = ['userID', 'userPassword', 'currentAvatar', 'coins',
                          # Update fieldnames as per your CSV
                          'isTeacher', 'isDeveloper', 'inventory', 'totalScore', 'lastLevel', 'teacherID']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        self._isLogged = False
        return updated

    """
    Allows the player to purchase an item if they have enough coins.

    Args:
        item (str): The item to be purchased.
        price (int): The price of the item.

    Returns:
        bool: True if the purchase is successful, False otherwise.
    """

    def purchaseItem(self, item, price):
        # needs to be implemented
        # coins take away price
        # add the item to the inventory object
        return True

    """
    Determines the player's type based on their attributes

    Returns:
        str: The type of the playe which can be "Student"  "Developer" "Teacher"  or "Admin".
    """

    def get_playerType(self):
        if self._isDeveloper == False and self._isTeacher == False:
            return "Student"
        elif self._isDeveloper == True and self._isTeacher == False:
            return "Developer"
        elif self._isDeveloper == False and self._isTeacher == True:
            return "Teacher"
        else:
            return "Admin"

    "# Getter and setter for userID"

    def get_userID(self):
        return self._userID

    def set_userID(self, userID):
        self._userID = userID
        self.update_accounts_csv()

    "# Getter and setter for userPassword"

    def get_userPassword(self):
        return self._userPassword

    def set_userPassword(self, userPassword: str):
        self._userPassword = userPassword
        self.update_accounts_csv()

    "# Getter and setter for currentAvatar"

    def get_currentAvatar(self):
        return self._currentAvatar

    def set_currentAvatar(self, newAvatar):
        self._currentAvatar = newAvatar
        self.update_accounts_csv()

    "# Getter and setter for coins"

    def get_coins(self):
        return self._coins

    def set_coins(self, coins: int):
        self._coins = coins
        self.update_accounts_csv()

    "# Getter and setter for isTeacher"

    def is_teacher(self):
        return self._isTeacher

    def set_isTeacher(self, isTeacher: bool):
        self._isTeacher = isTeacher
        self.update_accounts_csv()

    "# Getter and setter for isDeveloper"

    def is_developer(self):
        return self._isDeveloper

    def set_isDeveloper(self, isDeveloper: bool):
        self._isDeveloper = isDeveloper
        self.update_accounts_csv()

    "# Getter and setter for inventory"

    def get_inventory(self):
        return self._inventory.split(',') if self._inventory else []

    def set_inventory(self, inventory):
        self._inventory = ','.join(inventory)
        self.update_accounts_csv()

    "# Adding a new avatar purchase to the inventory"

    def add_inventory(self, avatar_index):
        inventory = self.get_inventory()
        inventory.append(str(avatar_index))
        self.set_inventory(inventory)
        self.update_accounts_csv()

    "# Getter and setter for lastLevel"

    def get_lastLevel(self):
        return self._lastLevel

    def set_lastLevel(self, lastLevel):
        self._lastLevel = lastLevel
        self.update_accounts_csv()

    "# Getter and setter for totalScore"

    def get_totalScore(self):
        return self._totalScore

    def set_totalScore(self, totalScore):
        self._totalScore = totalScore
        self.update_accounts_csv()

    "# Getter and setter for teacherID"

    def get_teacherID(self):
        return self._teacherID

    def set_teacherID(self, teacherID):
        self._teacherID = teacherID
        self.update_accounts_csv()


# player = Player()
# player.login('mlekhi', 'password')
# player._totalScore = 0

# player.update_accounts_csv()
