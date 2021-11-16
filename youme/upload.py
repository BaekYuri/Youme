import os
import requests
import json

url = 'http://112.169.87.3:8005/challenge/image'

def upload_photo(photo_name):
    photo_path = '/home/pi/youme/S05P31A203/youme/photo/' + photo_name + '.jpg'
    
    with open(photo_path, 'rb') as img:
        name_img = os.path.basename(photo_path)
        files = {'image': (name_img, img, 'multipart/form-data', {'Expires': '0'})}
        with requests.Session() as s:
            r = s.post(url, files=files)
            photo_address = r.json()
            return photo_address

if __name__=="__main__":
    photo_name = 'example'
    upload_photo(photo_name)
