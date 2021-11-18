from datetime import datetime

def currentTime():
    now = datetime.now()
    date = now.strftime("%H:%M")
    date += ':00'
    return date
