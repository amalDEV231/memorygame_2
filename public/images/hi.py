import os
import requests
import random

# Function to download an image and save it with a given name
def download_image(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded {save_path}")
    else:
        print(f"Failed to download image from {url}")

# Directory to save images
save_directory = os.getcwd()

# Ensure the directory exists
os.makedirs(save_directory, exist_ok=True)

# Download 50 unique images
for i in range(50):
    # Create a unique query parameter to attempt to get different images
    url = f"https://cataas.com/cat/cute?{random.random()}"
    save_path = os.path.join(save_directory, f"{i}.png")
    download_image(url, save_path)
