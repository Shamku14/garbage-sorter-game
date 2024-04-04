import unittest
import avatar 

class TestAvatar(unittest.TestCase):
    def test_initialization(self):
        avatar = avatar()
        self.assertIsNone(avatar._avatarID)
        self.assertIsNone(avatar._cost)
        self.assertIsNone(avatar._name)

        # Test initialization with explicit arguments
        avatar = avatar(1, 300, "Strong Wizard")
        self.assertEqual(avatar._avatarID, 1)
        self.assertEqual(avatar._cost, 300)
        self.assertEqual(avatar._name, "Warrior")

    def test_get_cost(self):
        # Test the get_cost method
        cost = 500
        avatar = avatar(cost=cost)
        self.assertEqual(avatar.get_cost(), cost)

    def test_get_name(self):
        # Test the get_name method
        name = "Fat Wizard"
        avatar = avatar(name=name)
        self.assertEqual(avatar.get_name(), name)

if __name__ == '__main__':
    unittest.main()
