# # example script.py
# def add_numbers(a, b):
#     return a + b

# print(add_numbers(2, 3))

import requests

# Make a GET request to the API endpoint
response = requests.get('https://api.example.com/data')

# Check if the response was successful
if response.status_code == 200:
    # Get the data from the response
    data = response.json()
    # Process the data
    print(data)

    #send processed data to api endpoint
    url = 'https://example.com/api/v1/resource'
    data = {'key1': 'value1', 'key2': 'value2'}
    headers = {'Content-type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

else:
    print('Error: Could not retrieve data')
