def longest_word(sentence):
    words = sentence.split()
    longest = max(words, key=len)
    return longest, len(longest)

# Test case
sentence = "Saya sangat senang mengerjakan soal algoritma"
print(longest_word(sentence))  # Expected output: ('mengerjakan', 11)
