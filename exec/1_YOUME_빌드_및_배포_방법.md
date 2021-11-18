# YOUME 빌드 및 배포 방법

## 사용 기술

- Frontend(web) : React.js
- Backend(web) : Node.js
- Backend(YOUME) : Node.js
- Client(YOUME) : Python
- Turtlebot Drive : ROS2 (Python)
- HW : Rasberry pi, Arduino etc ...

## 사전 설치

- Visual Studio Code
- node.js LTS 버전
- Ubuntu 20.04
- ROS2 FOXY Version

## Backend

#### - 폴더 : 

#### 1. backend

#### 2. backend-mirror

### 3. backend-youme

- 각 폴더 최상단에 .env 파일 추가 (2_외부 서비스 정보.md 참조)

- 터미널에서 아래의 코드를 차례대로 실행한다.
```
cd backend-web (또는 cd backend-mirror)
npm install
npm start
```

※ pm2가 없을 경우에는 "npm i pm2" 명령어를 실행하고 진행한다.

## Frontend

#### - 폴더 : 

#### 1. frontend/web

#### 2. frontend/Mirror

- 터미널에서 아래의 코드를 차례대로 실행한다.

```
cd frontend/web (또는 cd frontend/Mirror)
npm install
npm run build
npm install -g serve
serve -s build
```

- 로컬에서 백엔드와 통신이 불가한 경우, frontend/web/src/config/config.js 파일과 frontend/Mirror/src/config/config.js 파일에서 backUrl을 확인해본다.

```javascript
export const backUrl = 'http://localhost:3065'; //정상
```

## Client(YOUME)

#### 1. youme

- 라즈베리파이 터미널에서 youme/youme_main.py를 실행한다.

## Turtlebot(YOUME)

- https://emanual.robotis.com/docs/en/platform/turtlebot3/quick-start/#pc-setup
- 위의 링크를 통해 터틀봇 셋팅을 한다.
- 터틀봇 서버에 접속하고 아래 코드를 실행한다.
```
export TURTLEBOT3_MODEL=burger && ros2 launch turtlebot3_bringup robot.launch.py
```
- Ubuntu 20.04에 접속한다. 이 때, 터틀봇과 같은 인터넷을 사용하고 있어야 한다.
- https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/#run-slam-node
- 위의 링크를 참조하여 주행할 공간의 맵을 만들어 놓는다.

#### 1. youme_ros

- 터미널에서 아래 명령어를 실행한다.
```
export TURTLEBOT3_MODEL=burger && ros2 launch turtlebot3_navigation2 navigation2.launch.py map:=$HOME/map.yaml
```

- 터미널을 youme_ros로 이동하고 아래 명령어를 실행한다.

```
colcon build
. install/setup.bash
ros2 run py_pubsub talker
ros2 run py_pubsub listener
```

- 웹에서 터틀봇을 작동시키거나, 클라이언트에서 음성으로 대화할 수 있다.

## DB 접속 정보

#### - 사용 DB : MySQL

- Hostname : ssafy-pjt1-dbserver.cotmr33tcon0.ap-northeast-2.rds.amazonaws.com
- Username : admin
- Password : mechanic

