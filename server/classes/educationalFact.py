"""
Represents an educational fact, containing a numeric identifier and the text of the fact.
"""

class EducationalFact:
    """
    Initializes a new instance of the EducationalFact class.

    Args:
        fact_number (int, optional): The numeric identifier or sequence number of the fact. Defaults to None.
        fact_text (str, optional): The textual content of the educational fact. Defaults to None.
    """
    def __init__(self, fact_number=None, fact_text=None):
        self.factNumber = fact_number
        self.factText = fact_text

    """
    Retrieves the text of the educational fact.

    Returns:
        str: The text of the educational fact.
    """
    def get_text(self):
        return self.factText