def reverse_alphabets(input_string):
    alphabets = [char for char in input_string if char.isalpha()]
    non_alphabets = [char for char in input_string if not char.isalpha()]
    reversed_alphabets = alphabets[::-1]
    return ''.join(reversed_alphabets) + ''.join(non_alphabets)

# Test case
print(reverse_alphabets("NEGIE1"))  # Expected output: "EIGEN1"
