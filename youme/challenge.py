import sys
import os
import re
import time
import datetime
import requests
import random
import json
import pygame

from connection import url
import take_photo
import upload

# user_id = 3
headers = {'Content-Type': 'application/json; charset=utf-8'}
# data = {'userId': user_id}
# url = 'http://112.169.87.3:8005'

pygame.mixer.init()
pygame.mixer.music.set_volume(0.3)

todayChallenges = []
tomorrowChallenges = []

# 챌린지 관련 쿼리 처리 허브
def challenge_query(transcript, user_id):
    data = {'userId': user_id}
    if re.search(r'\b((전체|모든|내) 챌린지)\b', transcript, re.I):
        script = all_challenge(data)
        return script

    elif re.search(r'\b(오늘 챌린지)\b', transcript, re.I):
        script = today_challenge(data)
        return script

    elif re.search(r'\b(오늘 오전 챌린지)\b', transcript, re.I):
        script = today_morning_challenge(data)
        return script

    elif re.search(r'\b((챌|첼)린지 [0-9]번 인증)\b', transcript, re.I):
        challenge_num = int(transcript.split()[1][0])
        if challenge_num <= 0:
            script = '응답 챌린지 번호를 확인해 주세요.'
        else:
            script = certify_challenge(challenge_num-1, data)
        return script

    script = '응답 무슨 말인지 모르겠어요.'
    return script

# 전체 챌린지 목록 확인
def all_challenge(data):
    res = requests.post(url+'/challenge', headers=headers, data=json.dumps(data))
    if res.status_code == 400:
        return '응답 챌린지가 없습니다!'
    
    challenges = res.json()
    allChallenges = [challenge['name'] for challenge in challenges]

    tmp_challenges = ''
    for c in allchallenges:
        tmp_challenges += c
        tmp_challenges += ', '

    script = '응답 전체 챌린지는,' + tmp_challenges + '입니다.'
    return script

# 오늘 전체 챌린지 목록 확인
def today_challenge(data):
    global todayChallenges

    if len(todayChallenges) == 0:
        print('first time to load today challenge')
        res = requests.post(url+'/challenge/today', headers=headers, data=json.dumps(data))
        if res.status_code == 400:
            return '응답 오늘 인증 가능한 챌린지가 없습니다!'
        
        challenges = res.json()
        for challenge in challenges:
            if challenge['ChallengeCertificationDays'][datetime.datetime.today().weekday()]['certification_available'] == True:
                todayChallenges.append(challenge)

    todayChallengeNames = [todayChallenge['name'] for todayChallenge in todayChallenges]
    tmp_challenges = ''
    for i, c in enumerate(todayChallengeNames):
        tmp_challenges += str(i+1)+'번 '
        tmp_challenges += c
        tmp_challenges += ', '

    script = '응답 오늘 챌린지는,' + tmp_challenges + '입니다.'
    return script

def certify_challenge(challenge_num, data):
    global todayChallenges

    if len(todayChallenges) == 0:
        return '응답 오늘 챌린지 목록을 먼저 확인하세요.'

    pygame.mixer.music.load("./replyMP3/capture.mp3")
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy() == True:
        continue

    photo = take_photo.take_photo()
    s3_address = upload.upload_photo(photo)
    print(s3_address)
    
    challenge_id = todayChallenges[challenge_num]['id']
    certify_date = str(datetime.date.today())
    # print(certify_date)

    certify_data = {
        'userId' : data['userId'],
        'challengeId' : challenge_id,
        'img_addr' : s3_address,
        'content' : '인증합니다.',
        'certification_datetime' : certify_date,
    }
    res = requests.post(url+'/challenge/certify', headers=headers, data=json.dumps(certify_data))
    if res.status_code == 200:
        todayChallenges[challenge_num]['ChallengeParticipations'][0]['certification_count'] += 1

    script = res.text
    return script
