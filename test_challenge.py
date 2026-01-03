"""
Unit tests for Coding Challenge Round 1 solutions.
"""

import unittest
from challenge import (
    fizzbuzz,
    custom_fizzbuzz,
    reverse_string,
    is_palindrome,
    fibonacci,
    find_max_subarray_sum,
    two_sum
)


class TestFizzBuzz(unittest.TestCase):
    """Tests for the fizzbuzz function."""
    
    def test_basic_fizzbuzz(self):
        """Test basic FizzBuzz with n=15."""
        expected = ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 
                    'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']
        self.assertEqual(fizzbuzz(15), expected)
    
    def test_fizzbuzz_single(self):
        """Test FizzBuzz with n=1."""
        self.assertEqual(fizzbuzz(1), ['1'])
    
    def test_fizzbuzz_divisible_by_3(self):
        """Test that multiples of 3 return Fizz."""
        result = fizzbuzz(9)
        self.assertEqual(result[2], 'Fizz')  # 3
        self.assertEqual(result[5], 'Fizz')  # 6
        self.assertEqual(result[8], 'Fizz')  # 9
    
    def test_fizzbuzz_divisible_by_5(self):
        """Test that multiples of 5 return Buzz."""
        result = fizzbuzz(10)
        self.assertEqual(result[4], 'Buzz')  # 5
        self.assertEqual(result[9], 'Buzz')  # 10
    
    def test_fizzbuzz_divisible_by_both(self):
        """Test that multiples of both 3 and 5 return FizzBuzz."""
        result = fizzbuzz(30)
        self.assertEqual(result[14], 'FizzBuzz')  # 15
        self.assertEqual(result[29], 'FizzBuzz')  # 30


class TestCustomFizzBuzz(unittest.TestCase):
    """Tests for the custom_fizzbuzz function."""
    
    def test_custom_two_rules(self):
        """Test custom FizzBuzz with 2 rules."""
        result = custom_fizzbuzz(10, {2: 'Even', 5: 'Five'})
        self.assertEqual(result[0], '1')
        self.assertEqual(result[1], 'Even')  # 2
        self.assertEqual(result[4], 'Five')  # 5
        self.assertEqual(result[9], 'EvenFive')  # 10
    
    def test_custom_three_rules(self):
        """Test custom FizzBuzz with 3 rules."""
        result = custom_fizzbuzz(30, {3: 'Fizz', 5: 'Buzz', 7: 'Bazz'})
        self.assertEqual(result[2], 'Fizz')  # 3
        self.assertEqual(result[4], 'Buzz')  # 5
        self.assertEqual(result[6], 'Bazz')  # 7
        self.assertEqual(result[14], 'FizzBuzz')  # 15


class TestReverseString(unittest.TestCase):
    """Tests for the reverse_string function."""
    
    def test_simple_string(self):
        """Test reversing a simple string."""
        self.assertEqual(reverse_string("hello"), "olleh")
    
    def test_single_character(self):
        """Test reversing a single character."""
        self.assertEqual(reverse_string("a"), "a")
    
    def test_empty_string(self):
        """Test reversing an empty string."""
        self.assertEqual(reverse_string(""), "")
    
    def test_palindrome(self):
        """Test reversing a palindrome."""
        self.assertEqual(reverse_string("racecar"), "racecar")


class TestIsPalindrome(unittest.TestCase):
    """Tests for the is_palindrome function."""
    
    def test_simple_palindrome(self):
        """Test a simple palindrome."""
        self.assertTrue(is_palindrome("racecar"))
    
    def test_palindrome_with_spaces(self):
        """Test palindrome with spaces."""
        self.assertTrue(is_palindrome("a man a plan a canal panama"))
    
    def test_palindrome_case_insensitive(self):
        """Test palindrome is case insensitive."""
        self.assertTrue(is_palindrome("RaceCar"))
    
    def test_not_palindrome(self):
        """Test a non-palindrome."""
        self.assertFalse(is_palindrome("hello"))
    
    def test_empty_string(self):
        """Test empty string is a palindrome."""
        self.assertTrue(is_palindrome(""))
    
    def test_single_character(self):
        """Test single character is a palindrome."""
        self.assertTrue(is_palindrome("a"))


class TestFibonacci(unittest.TestCase):
    """Tests for the fibonacci function."""
    
    def test_fibonacci_10(self):
        """Test first 10 Fibonacci numbers."""
        expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
        self.assertEqual(fibonacci(10), expected)
    
    def test_fibonacci_1(self):
        """Test first Fibonacci number."""
        self.assertEqual(fibonacci(1), [0])
    
    def test_fibonacci_2(self):
        """Test first 2 Fibonacci numbers."""
        self.assertEqual(fibonacci(2), [0, 1])
    
    def test_fibonacci_0(self):
        """Test 0 Fibonacci numbers."""
        self.assertEqual(fibonacci(0), [])
    
    def test_fibonacci_negative(self):
        """Test negative input."""
        self.assertEqual(fibonacci(-5), [])


class TestMaxSubarraySum(unittest.TestCase):
    """Tests for the find_max_subarray_sum function."""
    
    def test_mixed_numbers(self):
        """Test with mixed positive and negative numbers."""
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        self.assertEqual(find_max_subarray_sum(arr), 6)  # [4, -1, 2, 1]
    
    def test_all_positive(self):
        """Test with all positive numbers."""
        arr = [1, 2, 3, 4, 5]
        self.assertEqual(find_max_subarray_sum(arr), 15)
    
    def test_all_negative(self):
        """Test with all negative numbers."""
        arr = [-5, -2, -8, -1]
        self.assertEqual(find_max_subarray_sum(arr), -1)
    
    def test_single_element(self):
        """Test with single element."""
        self.assertEqual(find_max_subarray_sum([5]), 5)
        self.assertEqual(find_max_subarray_sum([-3]), -3)
    
    def test_empty_array(self):
        """Test with empty array."""
        self.assertEqual(find_max_subarray_sum([]), 0)


class TestTwoSum(unittest.TestCase):
    """Tests for the two_sum function."""
    
    def test_basic_two_sum(self):
        """Test basic two sum case."""
        nums = [2, 7, 11, 15]
        target = 9
        self.assertEqual(two_sum(nums, target), (0, 1))
    
    def test_two_sum_later_indices(self):
        """Test two sum with solution at later indices."""
        nums = [3, 2, 4]
        target = 6
        self.assertEqual(two_sum(nums, target), (1, 2))
    
    def test_two_sum_same_number_twice(self):
        """Test two sum with same number twice."""
        nums = [3, 3]
        target = 6
        self.assertEqual(two_sum(nums, target), (0, 1))
    
    def test_two_sum_not_found(self):
        """Test two sum when no solution exists."""
        nums = [1, 2, 3]
        target = 10
        self.assertIsNone(two_sum(nums, target))
    
    def test_two_sum_negative_numbers(self):
        """Test two sum with negative numbers."""
        nums = [-1, -2, -3, -4, -5]
        target = -8
        self.assertEqual(two_sum(nums, target), (2, 4))


if __name__ == '__main__':
    unittest.main()
