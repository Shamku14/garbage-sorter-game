import unittest
import player

class TestPlayer(unittest.TestCase):

    def setUp(self):
        self.player = player()
       
        self.player.set_name("TestPlayer")
        self.player.set_userID("Marianna Speranza")
        self.player.set_userPassword("password")
      

    def test_update_accounts_csv(self):

        with patch('builtins.open', unittest.mock.mock_open()) as mocked_file:
            self.player.update_accounts_csv()
            mocked_file.assert_called_with('game-data/accounts.csv', 'a', newline='')

    def test_login(self):
        # Mock the CSV file content for testing login (ASK SOMONE ABOUT THIS PART)
        csv_content = """userID,userPassword,name,AvatarPath,coins,isTeacher,isDeveloper,inventory,totalScore,lastLevel,teacherID
12345,password,TestPlayer,None,100,False,False,None,0,1,None"""
        with patch('builtins.open', unittest.mock.mock_open(read_data=csv_content)) as mocked_file:
            self.assertTrue(self.player.login("12345", "password"))
            self.assertFalse(self.player.login("wrong", "credentials"))

    def test_logout(self):
 
        pass 

    def test_purchaseItem(self):
        
        self.assertTrue(self.player.purchaseItem("item", 1))

    def test_get_playerType(self):
        self.player.set_isDeveloper(False)
        self.player.set_isTeacher(False)
        self.assertEqual(self.player.get_playerType(), "Student")

        self.player.set_isDeveloper(True)
        self.player.set_isTeacher(False)
        self.assertEqual(self.player.get_playerType(), "Developer")

    def test_getter_setter_name(self):
        self.player.set_name("Matt Toldo")
        self.assertEqual(self.player.get_name(), "Matt Toldo")

if __name__ == '__main__':
    unittest.main()