import sys
import os
import re
import time
import datetime
import requests
import random
import json
import pygame
from dateutil import parser

# user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
# data = {'userId': user_id}
url = 'http://112.169.87.3:8005'

allSchedule = []
todaySchedule = []
tomorrowSchedule = []
monthlySchedule = []

# 일정 관련 쿼리 처리 허브
def schedule_query(transcript, user_id):
    data = {'userId': user_id}

    if len(allSchedule) == 0:
        get_schedule(data)
    
    if re.search(r'\b(오늘 일정)\b', transcript, re.I):
        script = today_schedule()
        return script

    elif re.search(r'\b(내일 일정)\b', transcript, re.I):
        script = tomorrow_schedule()
        return script

    script = '응답 무슨 말인지 모르겠어요.'
    return script


def get_schedule(data):
    res = requests.post(url+'/schedule', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 일정 정보가 없습니다!'

    schedules = res.json()
    tmpAllSchedules = [s for s in schedules]
    
    current_datetime = str(datetime.datetime.today()).split()
    today_date = parser.parse(current_datetime[0])
    tomorrow_date = today_date + datetime.timedelta(days=1)
    current_time = current_datetime[1].split('.')[0]

    for schedule in tmpAllSchedules:
        allSchedule.append(schedule)
        start_date = parser.parse(schedule['start'])
        end_date = parser.parse(schedule['end'])

        # print(start_date.date())
        # print(today_date.date())
        # print(end_date.date())

        if start_date.date() <= today_date.date() <= end_date.date():
            todaySchedule.append(schedule)
        
        if start_date.date() <= tomorrow_date.date() <= end_date.date():
            tomorrowSchedule.append(schedule)

    # print(todaySchedule)
    # print(tomorrowSchedule)

def today_schedule():
    if len(todaySchedule) == 0:
        script = '응답 오늘 일정이 없습니다.'
        return script
    tmp_schedule = [s['title'] for s in todaySchedule]
    # print(tmp_schedule)
    script = '응답 오늘 일정은 ' + str(tmp_schedule) + '입니다.'
    return script

def tomorrow_schedule():
    if len(tomorrowSchedule) == 0:
        script = '응답 내일 일정이 없습니다.'
        return script
    tmp_schedule = [s['title'] for s in tomorrowSchedule]
    # print(tmp_schedule)
    script = '응답 내일 일정은 ' + str(tmp_schedule) + '입니다.'
    return script
