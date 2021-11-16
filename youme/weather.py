import sys
import os
import re
import threading
import time
import requests
import json
import datetime

user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
data = {'userId': user_id}
url = 'http://112.169.87.3:8005'

todayWeather = []
tomorrowWeather = []
weekendWeather = []

# 날씨 관련 쿼리 처리 허브
def weather_query(transcript):
    if re.search(r'\b((오늘|지금) 날씨)\b', transcript, re.I):
        script = today_weather()
        return script

    elif re.search(r'\b(내일 날씨)\b', transcript, re.I):
        script = tomorrow_weather()
        return script

    elif re.search(r'\b(주말 날씨)\b', transcript, re.I):
        script = weekend_weather()
        return script

    elif re.search(r'\b(미세( |)먼지([가-힣]| )*(알려|어때))\b', transcript, re.I):
        script = air_pollution()
        return script

    script = '응답 무슨 말인지 모르겠어요.'
    return script

def today_weather():
    if len(todayWeather) == 0:
        res = requests.post(url+'/weather/today', headers=headers, data=json.dumps(data))
        if res.status_code == 400:
            return '응답 날씨 정보를 찾을 수 없습니다. 인터넷 환경을 확인하세요.'

        weather = res.json()
        todayWeather.append(weather['message'])
        
    script = '응답 오늘 날씨는 ' + todayWeather[0]['description'] + '입니다.'
    return script

def tomorrow_weather():
    if len(tomorrowWeather) == 0:
        res = requests.post(url+'/weather/tomorrow', headers=headers, data=json.dumps(data))
        if res.status_code == 400:
            return '응답 날씨 정보를 찾을 수 없습니다. 인터넷 환경을 확인하세요.'

        weather = res.json()
        tomorrowWeather.append(weather['message'])

    script = '응답 내일 날씨는 ' + tomorrowWeather[0]['description'] + '입니다.'
    return script

def weekend_weather():
    if len(weekendWeather) == 0:
        res = requests.post(url+'/weather/weekend', headers=headers, data=json.dumps(data))
        if res.status_code == 400:
            return '응답 날씨 정보를 찾을 수 없습니다. 인터넷 환경을 확인하세요.'

        weather = res.json()
        weekendWeather.append(weather['message']['first'])
        weekendWeather.append(weather['message']['second'])

    script = '응답 주말 날씨는 ' + weekendWeather[0]['description'] + ' ' + weekendWeather[1]['description'] + '입니다.'
    return script
    
def air_pollution():
    res = requests.post(url+'/weather/airPollution', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 미세먼지 정보를 찾을 수 없습니다. 인터넷 환경을 확인하세요.'

    aqi = res.json()
    script = '응답 오늘 미세먼지는 ' + aqi['message'] + '입니다.'
    return script
