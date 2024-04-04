"""
Represents an item of waste, its image path and the type of waste bin it should be sorted into
Attributes:
    imagePath (str): The file path to the image representing the waste item.
    wasteBin (int): An identifier number representing the type of bin this waste item belongs to.
"""

class WasteItem:
    def __init__(self, imagePath: str, wasteBin: int):
        self.imagePath = imagePath
        self.wasteBin = int