import sys
import os
import re
import threading
import time
import random
import requests
import json
import datetime

from connection import url

# user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
# data = {'userId': user_id}
# url = 'http://112.169.87.3:8005'

allRoutines = []
todayRoutines = []
todayRoutinesStartTime = []
tomorrowRoutines = []

# 루틴 관련 쿼리 처리 허브
def routine_query(transcript, user_id):
    data = {'userId': user_id}
    if re.search(r'\b((전체|모든|내) 루틴 알려 줘)\b', transcript, re.I):
        script = all_routine(transcript, data)
        return script
    
    elif re.search(r'\b(오늘 루틴 알려 줘)\b', transcript, re.I):
        script = today_routine(transcript, data)
        return script

    elif re.search(r'\b(오늘 오전 루틴 알려 줘)\b', transcript, re.I):
        script = today_morning_routine(transcript, data)
        return script

    elif re.search(r'\b(루틴 ([1-9]|[일이삼사오육칠팔구])번 습관 알려 줘)\b', transcript, re.I):
        routine_num = transcript.split()[1][0]
        if routine_num == '이':
            routine_num = '2'
            
        routine_num = int(routine_num)
        if routine_num <= 0:
            script = '응답 루틴 번호를 확인해 주세요.'
        else:
            script = check_routinized_habit(routine_num-1, transcript, data)
        return script
    
    script = '응답 무슨 말인지 모르겠어요.'
    return script

def all_routine(transcript, data):
    data['transcript'] = transcript
    res = requests.post(url+'/routine', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 루틴이 없습니다!'

    routines = res.json()
    allRoutines = [routine['name'] for routine in routines]
    tmp_routines = ''
    for i, r in enumerate(allRoutines):
        tmp_routines += str(i+1)+'번 '
        tmp_routines += r
        tmp_routines += ', '

    script = '응답 전체 루틴은' + tmp_routines + '입니다.'
    return script 

# 오늘 전체 루틴 목록 확인
def today_routine(transcript, data):
    global todayRoutines

    data['transcript'] = transcript
    if len(todayRoutines) == 0:
        # print('first time to load today routine')
        res = requests.post(url+'/routine/today', headers=headers, data=json.dumps(data))
        if res.status_code == 400:
            return '응답 오늘 진행할 루틴이 없습니다!'

        routines = res.json()
        print(routines)
        for routine in routines:
            if routine['RoutineActiveDays'][0]['active'] == True:
                todayRoutines.append(routine)
                todayRoutinesStartTime.append(routine['RoutineActiveDays'][0]['start_time'])
    
    todayRoutineNames = [todayRoutine['name'] for todayRoutine in todayRoutines]
    tmp_routines = '' 
    for i, r in enumerate(todayRoutineNames):
        tmp_routines += str(i+1)+'번 '
        tmp_routines += r
        tmp_routines += ', '

    script = '응답 오늘 루틴은' + tmp_routines + '입니다.'
    return script

# 오늘 오전 루틴 목록 확인
def today_morning_routine(transcript, data):
    res = requests.post(url+'/routine/morning', headers=headers, data=json.dumps(data))
    return res.text

# 오늘 오후 루틴 목록 확인

# 내일 전체 루틴 목록 확인

# 루틴 내 습관 확인
def check_routinized_habit(routine_num, transcript, data):
    global todayRoutines

    if len(todayRoutines) == 0:
        return '응답 오늘 루틴 목록을 먼저 확인해주세요!'

    routinized_habit = [habit['Habit']['name'] for habit in todayRoutines[routine_num]['RoutinizedHabits']]
    tmp_habits = ''
    for i, h in enumerate(routinized_habit):
        tmp_habits += h
        tmp_habits += ', '

    script = '응답 ' + str(routine_num+1) + '번 루틴 습관은, ' + tmp_habits + '입니다.'
    return script
