

class Avatar:
    """
    Represents an avatar, including its ID, cost, and name.

    Attributes:
        avatarID (int): The unique identifier for the avatar.
        cost (int): The cost associated with acquiring the avatar.
        name (str): The name of the avatar.
    """
    def __init__(self, avatar_id=None, cost=None, name=None):
        """
        Initializes a new instance of the Avatar class.
        """
        self._avatarID = avatar_id  # integer
        self._cost = cost  # integer
        self._name = name  # boolean

  
    def get_cost(self):
        """
        Gets the cost of the avatar

        Returns:
            int: The cost of the avatar
        """
        return self._cost

  
    def get_name(self):
        """
        Gets the name of the avatar

        Returns:
            str: The name of the avatar
        """
        return self._name

    def get_avatarID(self):
        """
        Gets the id of the avatar

        Returns:
            str: The id of the avatar
        """
        return self._avatarID
