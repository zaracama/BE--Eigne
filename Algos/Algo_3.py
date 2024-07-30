def count_occurrences(input_array, query_array):
    return [input_array.count(query) for query in query_array]

# Test case
INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']
print(count_occurrences(INPUT, QUERY))  # Expected output: [1, 0, 2]
