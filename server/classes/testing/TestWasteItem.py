from gc import garbage
import unittest
import wasteItem  

class TestWasteItem(unittest.TestCase):
    def test_waste_item_initialization(self):
    
        image_path = garbage.png
        waste_bin = 0
        item = wasteItem(image_path, waste_bin)

       
        self.assertEqual(item.imagePath, image_path)
        self.assertEqual(item.wasteBin, waste_bin)

    def test_waste_bin_type(self):
        
        image_path =  garbage.png
        waste_bin = 0  
        item = wasteItem(image_path, waste_bin)

       
        self.assertIsInstance(item.wasteBin, int)
        self.assertEqual(item.wasteBin, int(waste_bin))


if __name__ == '__main__':
    unittest.main()