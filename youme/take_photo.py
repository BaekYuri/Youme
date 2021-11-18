import os
import datetime

def take_photo():
    date_time = str(datetime.datetime.now()).replace(" ", "_")
    cmd = 'fswebcam -r 1280x720 --no-banner /home/pi/youme/S05P31A203/youme/photo/' + str(date_time) + '.jpg'
    os.system(cmd)
    return date_time

if __name__=="__main__":
    take_photo()
