# Odoo Hackathon - Coding Challenge Round 1

This repository contains solutions to classic programming challenges commonly used in Round 1 coding interviews and hackathons.

## 🎯 Challenges Implemented

### 1. FizzBuzz
The classic FizzBuzz problem with both standard and customizable variants.

**Standard FizzBuzz:**
- For numbers 1 to n:
  - Print "Fizz" for multiples of 3
  - Print "Buzz" for multiples of 5
  - Print "FizzBuzz" for multiples of both 3 and 5
  - Print the number itself otherwise

**Custom FizzBuzz:**
- Configurable rules with custom divisors and replacement strings

### 2. String Manipulation
- **Reverse String**: Reverse any input string
- **Palindrome Check**: Check if a string is a palindrome (case-insensitive, ignoring spaces)

### 3. Fibonacci Sequence
Generate the first n numbers in the Fibonacci sequence.

### 4. Maximum Subarray Sum (Kadane's Algorithm)
Find the maximum sum of a contiguous subarray using dynamic programming.

### 5. Two Sum Problem
Find two numbers in an array that add up to a specific target sum.

## 🚀 Getting Started

### Prerequisites
- Python 3.6 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/MathiyazhaganNTL/odoo_hackathon.git
cd odoo_hackathon
```

### Running the Solutions
```bash
# Run the demo
python challenge.py
```

### Running Tests
```bash
# Run all tests
python -m unittest test_challenge.py -v

# Run specific test class
python -m unittest test_challenge.TestFizzBuzz -v

# Run a specific test
python -m unittest test_challenge.TestFizzBuzz.test_basic_fizzbuzz -v
```

## 📝 Usage Examples

### FizzBuzz
```python
from challenge import fizzbuzz

# Generate FizzBuzz sequence for 1 to 15
result = fizzbuzz(15)
print(result)
# Output: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']
```

### Custom FizzBuzz
```python
from challenge import custom_fizzbuzz

# Custom rules: 2 -> 'Even', 3 -> 'Three', 5 -> 'Five'
result = custom_fizzbuzz(15, {2: 'Even', 3: 'Three', 5: 'Five'})
print(result)
```

### Palindrome Check
```python
from challenge import is_palindrome

print(is_palindrome("racecar"))  # True
print(is_palindrome("A man a plan a canal Panama"))  # True
print(is_palindrome("hello"))  # False
```

### Fibonacci
```python
from challenge import fibonacci

# First 10 Fibonacci numbers
result = fibonacci(10)
print(result)
# Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Maximum Subarray Sum
```python
from challenge import find_max_subarray_sum

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
max_sum = find_max_subarray_sum(arr)
print(max_sum)
# Output: 6 (subarray: [4, -1, 2, 1])
```

### Two Sum
```python
from challenge import two_sum

nums = [2, 7, 11, 15]
indices = two_sum(nums, 9)
print(indices)
# Output: (0, 1) - nums[0] + nums[1] = 2 + 7 = 9
```

## 🧪 Test Coverage

The project includes comprehensive unit tests covering:
- ✅ Standard and edge cases
- ✅ Empty inputs
- ✅ Single element inputs
- ✅ Negative numbers
- ✅ Large inputs
- ✅ Boundary conditions

Run tests to verify all solutions:
```bash
python -m unittest test_challenge.py -v
```

## 📊 Complexity Analysis

| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| FizzBuzz | O(n) | O(n) |
| Custom FizzBuzz | O(n × k) where k = number of rules | O(n) |
| Reverse String | O(n) | O(n) |
| Palindrome Check | O(n) | O(n) |
| Fibonacci | O(n) | O(n) |
| Max Subarray Sum | O(n) | O(1) |
| Two Sum | O(n) | O(n) |

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for improvements.

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

MathiyazhaganNTL

---

**Happy Coding! 🎉**