"""
Coding Challenge Round 1: FizzBuzz and Variants

This module implements classic programming challenge problems commonly
used in Round 1 coding interviews and hackathons.
"""


def fizzbuzz(n):
    """
    Classic FizzBuzz problem.
    
    For numbers from 1 to n:
    - Print "Fizz" for multiples of 3
    - Print "Buzz" for multiples of 5
    - Print "FizzBuzz" for multiples of both 3 and 5
    - Print the number itself otherwise
    
    Args:
        n (int): The upper limit (inclusive)
        
    Returns:
        list: List of strings representing the FizzBuzz sequence
        
    Examples:
        >>> fizzbuzz(15)
        ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']
    """
    result = []
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result


def custom_fizzbuzz(n, rules):
    """
    Custom FizzBuzz with configurable rules.
    
    Args:
        n (int): The upper limit (inclusive)
        rules (dict): Dictionary mapping divisors to replacement strings
        
    Returns:
        list: List of strings based on custom rules
        
    Examples:
        >>> custom_fizzbuzz(10, {2: 'Even', 3: 'Three'})
        ['1', 'Even', 'Three', 'Even', '5', 'EvenThree', '7', 'Even', 'Three', 'Even']
    """
    result = []
    for i in range(1, n + 1):
        output = ""
        for divisor in sorted(rules.keys()):
            if i % divisor == 0:
                output += rules[divisor]
        result.append(output if output else str(i))
    return result


def reverse_string(s):
    """
    Reverse a string.
    
    Args:
        s (str): Input string
        
    Returns:
        str: Reversed string
        
    Examples:
        >>> reverse_string("hello")
        'olleh'
    """
    return s[::-1]


def is_palindrome(s):
    """
    Check if a string is a palindrome (case-insensitive, ignoring spaces).
    
    Args:
        s (str): Input string
        
    Returns:
        bool: True if palindrome, False otherwise
        
    Examples:
        >>> is_palindrome("racecar")
        True
        >>> is_palindrome("A man a plan a canal Panama")
        True
        >>> is_palindrome("hello")
        False
    """
    # Remove spaces and convert to lowercase
    cleaned = ''.join(s.split()).lower()
    return cleaned == cleaned[::-1]


def fibonacci(n):
    """
    Generate the first n Fibonacci numbers.
    
    Args:
        n (int): Number of Fibonacci numbers to generate
        
    Returns:
        list: List of first n Fibonacci numbers
        
    Examples:
        >>> fibonacci(10)
        [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    """
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib


def find_max_subarray_sum(arr):
    """
    Find the maximum sum of a contiguous subarray (Kadane's Algorithm).
    
    Args:
        arr (list): List of integers
        
    Returns:
        int: Maximum sum of contiguous subarray
        
    Examples:
        >>> find_max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])
        6
    """
    if not arr:
        return 0
    
    max_sum = current_sum = arr[0]
    for num in arr[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum


def two_sum(nums, target):
    """
    Find two numbers in an array that add up to a target sum.
    
    Args:
        nums (list): List of integers
        target (int): Target sum
        
    Returns:
        tuple: Indices of the two numbers, or None if not found
        
    Examples:
        >>> two_sum([2, 7, 11, 15], 9)
        (0, 1)
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return None


if __name__ == "__main__":
    # Demo the solutions
    print("=== FizzBuzz (1-20) ===")
    print(fizzbuzz(20))
    
    print("\n=== Custom FizzBuzz (1-15) ===")
    print(custom_fizzbuzz(15, {2: 'Even', 3: 'Three', 5: 'Five'}))
    
    print("\n=== Palindrome Check ===")
    print(f"'racecar' is palindrome: {is_palindrome('racecar')}")
    print(f"'hello' is palindrome: {is_palindrome('hello')}")
    
    print("\n=== Fibonacci (first 10) ===")
    print(fibonacci(10))
    
    print("\n=== Maximum Subarray Sum ===")
    print(f"Max sum: {find_max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])}")
    
    print("\n=== Two Sum ===")
    print(f"Indices: {two_sum([2, 7, 11, 15], 9)}")
