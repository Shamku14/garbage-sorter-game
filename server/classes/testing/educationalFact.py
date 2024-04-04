import unittest
import educationalFact 

class TestEducationalFact(unittest.TestCase):
    def test_initialization(self):
        fact = educationalFact()
        self.assertIsNone(fact.factNumber)
        self.assertIsNone(fact.factText)

        fact = educationalFact(1, "Test fact")
        self.assertEqual(fact.factNumber, 1)
        self.assertEqual(fact.factText, "Test fact")

    def test_get_text(self):
        fact_text = "Waste Wizard is a fun game"
        fact = educationalFact(2, fact_text)
        self.assertEqual(fact.get_text(), fact_text)

if __name__ == '__main__':
    unittest.main()
