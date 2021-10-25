# YOUME\_자율PJT

## **👪Member**

<table>
  <tr>
  <td align="center"><a href="https://lab.ssafy.com/gjskarb1492"><img alt="namgyu" src="https://user-images.githubusercontent.com/48434764/130107068-7840228e-b8e2-419f-a352-77259bc2674a.png" width="150px;"/><br /><sub><b>팀장_허남규</b></sub></a><br /></td>
    <td align="center"><a href="https://lab.ssafy.com/minjoo0112"><img alt="minjoo" src="https://user-images.githubusercontent.com/48434764/130104515-3ea67786-79e7-4e8b-824b-e553a0f3ec8b.png" width="150px;"/><br /><sub><b>김민주</b></sub></a><br /></td>
  <td align="center"><a href="https://lab.ssafy.com/kimminji0527"><img alt="minji" src="https://user-images.githubusercontent.com/48434764/130106965-62d4e73d-f3dc-4899-a331-0a1e549089f8.png" width="150px;" /><br /><sub><b>김민지</b></sub></a><br /></td>
   <td align="center"><a href="https://lab.ssafy.com/oogab"><img alt="sankwook" src="https://user-images.githubusercontent.com/48434764/130107140-fbbb49a0-3004-441c-b9d0-98ee32dc17bd.png" width="150px;" /><br /><sub><b>백상욱</b></sub></a><br /></td>
    <td align="center"><a href="https://lab.ssafy.com/chsem145"><img alt="yuri" src="https://user-images.githubusercontent.com/48434764/130107209-358a270f-d2dc-4462-a056-5ac90d3fef20.png" width="150px;" /><br /><sub><b>백유리</b></sub></a><br /></td>
  </tr>
</table>
<br/>

## **🎞History**

- **10-12 ~ 10-15** : 주제 기획, 교보재 신청, 개별 학습 진행
- **10-18 ~ 10-22** : stt 설정 및 사용, Jenkins 서버 배포, 웹 추가작업(이메일 인증), 하드웨어 분석 및 구상, 중간발표

  <br/>

## **📝Today's Meeting**

### 10월 25일

- Daily Scrum

  | member | content                                                                   |
  | ------ | ------------------------------------------------------------------------- |
  | 김민주 | 따로 진행된것 없다.                                                       |
  | 김민지 | 따로 진행된것 없다, 오늘 하드웨어 받아서 진행할 것이다.                   |
  | 백상욱 | 주말동안 개발보다는 구조를 잡았다. (로봇과의 통신 등)                     |
  | 백유리 | 병원ㅠ 아프지 맙시다.                                                     |
  | 허남규 | 따로 진행된것 없다, IoT 제품들 하드웨어 테스트 하고 펌웨어 진행할 것이다. |

<br>

- 회의내용

  - 상단 개발 업무 분담 내용 참고

  <br/>

## **🌝개발 업무 분담**

### **웹, 미러**

1. 이전의 기능 복구하기
   - 박수 소리 감지 후 화면 전환과 같은 기존 스마트 미러 기능을 복구합니다.
   - 담당 : 김민지, 허남규

<!-- <br/> -->

2. 미러에 온, 습도 센서 부착
   - 미러 자체에 온, 습도 측정이 가능한 IoT 센서들을 부착하여 데이터를 수집합니다.
   - 담당 : 김민지, 허남규

<!-- <br/> -->

3. 로봇의 정보를 웹과 미러에 표시

### **로봇**

#### **로봇 제어**

1. 로봇 디스플레이 QT 작업
   - 로봇의 디스플레이 부분을 QT로 GUI 프로그래밍을 진행합니다.
   - 표정 부분과 기능 부분의 전환을 중점으로 개발합니다.
   - 담당 : 백상욱

<!-- <br/> -->

2. 로봇 하드웨어 만들기 (3D 모델링 및 하드웨어 구조 설계)
   - 로봇의 모양 및 들어가는 부품들의 구성을 설계합니다.
   - 3D 프린팅 작업이 있을거라 난이도가 어렵습니다.
   - 담당 : 허남규

<!-- <br/> -->

3. 로봇 주행관련 ROS 개발
   - ROS를 이용하여 내부 패키징된 라이브러리를 통해 자율주행 기능을 구현합니다.
   - 담당 : 김민지, 백상욱

#### **로봇 백엔드**

1. 로봇 음성인식과 텍스트 변환
   - 로봇이 사용자의 음성을 인식하고 해당 음성을 문자열 텍스트화 시킵니다.
   - Google speech to text API를 사용합니다.
   - 담당 : 백상욱

  <!-- <br/> -->

2. 로봇 텍스트를 음성으로 변환
   - 텍스트가 주어졌을 경우 그것을 음성으로 바꾸고 로봇이 재생할 수 있게 합니다.
   - Google text to speech API를 사용합니다.
   - 담당 : 백상욱

  <!-- <br/> -->

3. 로봇 음성 사용자 구분 딥러닝
   - 로봇이 음성을 딥러닝 학습하여 사용자를 인식합니다.
   - 로봇의 주인일 때와 게스트일 경우를 구분하여 기능 제한을 둘 예정입니다.
   - 담당 : 백유리

  <!-- <br/> -->

4. 로봇 서버 구축
   - 다수의 로봇 클라이언트와 통신하며 Database에 접근 할 수 있는 로봇 서버를 구축합니다.
   - 로봇과 통신은 Socket.io를 통해 실시간 통신을 합니다.
   - 서버는 우선 Node의 Express로 구성합니다.
   - 담당 : 백상욱, 백유리

  <!-- <br/> -->

5. 로봇 사용자 얼굴 인식
   - 위의 로봇 음성 사용자 구분과 같은 맥락입니다.
   - 사용자 얼굴을 인식하고 분류하여 기능 제한을 두고자 합니다.

#### **IoT 제어**

1. IoT 라즈베리파이 + 블루투스 모듈 통신
   - 라즈베리파이와 블루투스 모듈이 적절하게 연결되는지 테스트합니다.
   - 담당 : 김민주, 김민지, 허남규

  <!-- <br/> -->

2. IoT 기능 회로도 제작
   - IoT 기기와 로봇과의 기능 관계를 확인하는 회로도를 만듭니다.
   - 담당 : 김민지

  <!-- <br/> -->

3. IoT 펌웨어 제작
   - 스마트 미러, 전등, 커피 머신 등등의 IoT 기기 펌웨어를 제작합니다.
   - 담당 : 김민지

  <!-- <br/> -->

4. IoT 하드웨어 제작 (하드웨어 구조 설계)
   - IoT 기기들의 하드웨어 구성이나 금형을 제작하고 패키징합니다.
   - 담당 : 허남규

<br/>

## **📌Ground Rule**

1. **Daily Scrum**
   - Mattermost 공유 (컨설턴트님과 코치님이 진행과정 확인 용이)

<br/>

2. **JIRA 체크하기**
   - 매일 오전 9시나 오후 5시에 조례 혹은 종례 끝나고 확인 체크하기!

<br/>

3. **1일 1커밋**

   - 하드웨어 영역도 소스나 자료를 폴더로 만들어서 커밋하면 좋겠습니다.
   - Git Convention

     | type     | 설명                                 |
     | -------- | ------------------------------------ |
     | feat     | 새로운 기능에 대한 커밋              |
     | fix      | 버그 수정에 대한 커밋                |
     | build    | 빌드 관련 파일 수정에 대한 커밋      |
     | chore    | 그 외 자잘한 수정에 대한 커밋        |
     | ci       | CI 관련 설정 수정에 대한 커밋        |
     | docs     | 문서 수정에 대한 커밋                |
     | style    | 코드 스타일 혹은 포맷 등에 관한 커밋 |
     | refactor | 코드 리팩토링에 대한 커밋            |
     | test     | 테스트 코드 수정에 대한 커밋         |
     | design   | CSS 등 UI 수정에 대한 커밋           |
     | comment  | 주석 추가 및 수정에 대한 커밋        |

<br/>

4. **문제가 있으면 빨리 말해주기**

<br/>

5. **무슨일이 있어도 포기하지 말기**

<br/>

## 📂Tech-log

<details>
  <summary>회의록</summary>
  <details>
    <summary>2주차(2021년 10월 18일 ~ 2021년 10월 22일)</summary>

### 10월 18일

- Daily Scrum

  | member | content                                                                         |
  | ------ | ------------------------------------------------------------------------------- |
  | 김민주 | myme Backend 구조 파악, node.js 공부, 이메일 인증 진행 예정                     |
  | 김민지 | 하드웨어 모델링, 하드웨어 스펙에 맞게 펌웨어 짤 계획                            |
  | 백상욱 | 라즈베리파이 모듈 설치, 녹음 진행, cloud stt 환경설정 진행 중, 이어서 개발 예정 |
  | 백유리 | Jenkins 개발 공부                                                               |
  | 허남규 | 하드웨어 모델링, 하드웨어 스펙에 맞게 펌웨어 짤 계획                            |

<br/>

- 회의내용

  - 10/22 기획발표
  - 계획서 작성한대로 개발 들어갔으면 좋겠다
  - JIRA에 해야할 내용 작성하기
  - 간단한 목업 제작하기
  - 로봇 사용자 설정한걸 웹엑서 간략하게 볼수있게 할것인가? 에 대해 고민중
  - 한다면 로봇 관련 페이지가 필요할것이지만 할 필요성에 대해 고민중. 하지만 아마 생길듯 하다.
  - 대체로 구글 어시스턴스를 쓰지만 안해보고 싶다. 만약 안된다면 차선으로 사용 예정
  - 가능하면 빠르게 가지고있는 라파를 이용해서 STT 진행 예정
  - 하드웨어 구상도 만들자!!
  - 지금 터틀봇은 주행에 관련되어있는데 기타 기능을 주로 하는 라파 보드를 터틀봇에 올리자
  - 라파가 가진 블루투스 갯수 파악하자
  - 발표 PPT 미리 제작 예정

<br/>

- 우울증 감소가 초점
- 자택근무 X
- 그래서 기능에 아침에 일어나면 연동해주는 기능들을 추가 보완
- 커피 내려주는 버튼 누르는 기계, IoT 스탠드

<br/>
<br/>

### 10월 19일

- Daily Scrum

  | member | content                                                                                                                                                                             |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 오늘 안에 이메일 인증 기능 완료 가능.                                                                                                                                               |
  | 김민지 | 하드웨어 구성도 만들고 있고 좀더 할거다.                                                                                                                                            |
  | 백상욱 | - 음성인식 완료 했고 언어만 바꿔주면 될것 같다. 소스 보니까 가능할것 같더라. <br/> - 오늘은 라파에서 서버랑 통신을 해서 api가지고 어떤 명령에 대해서 어떤 동작을 하도록 해볼것이다. |
  | 백유리 | 어제 Jenkins로 push하면 로컬에다가 배포하는걸 테스트 해봤다. 서버에 오늘은 해보고 싶다.                                                                                             |
  | 허남규 | 기획 발표준비 하면서                                                                                                                                                                |

<br>

- 회의 내용

  - 로봇이여야만 하는 이유!!
  - 블루투스 스피커로 처리될 기능들이지만 반려로봇을 생각해봤다.
  - 그래서 친밀도적 기능을 우선시 해야한다.
  - 미러에서 특정 방/공간을 누르면 로봇이 오는 호출기능 추가했으면 좋겠다.

<br/>
<br/>

### 10월 20일

- Daily Scrum

  | member | content                                                                                                                                                                                   |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 이메일 인증 완료 예정                                                                                                                                                                     |
  | 김민지 | 하드웨어 구상 만들었고 스마트 미러나 로봇에 들어갈 펌웨어쪽 공부할것이다.                                                                                                                 |
  | 백상욱 | - 음성받아서 텍스트로 바꾸는거 해봤고 거기에 변화를 줘야할건데 코드분석중이다. <br/> - 필요한것들 공부중인데, 멀티쓰레드나 이런것들 해보고 있다. <br/> - 마이미 웹사이트 성능 개선중이다. |
  | 백유리 | Jenkins 해보려고 했고 로컬에서는 되는데 다른데에서 하는건 좀 어렵더라, 도커 컨테이너에서 하는걸 해결해서 리눅스쪽에서 할것같다.                                                           |
  | 허남규 | 볼로봇 하드웨어 분석, 센서, 모터 스펙분석                                                                                                                                                 |

<br>

- 팀장 미팅 -> 백상욱

<br/>
<br/>

### 10월 21일

- Daily Scrum

  | member | content                                                                                                                                                           |
  | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 김민주 | 이메일 인증 기능 구현 완료, 관련 세부기능 작업 예정 예정                                                                                                          |
  | 김민지 | 백신 공가                                                                                                                                                         |
  | 백상욱 | 소켓으로 서버 만들고, 라파에서 통신을 하는데 거기서 입력된게 소켓통신으로 웹서버랑 말한거를 받아서 웹서버랑 대화하고 있다. 이제 db랑 붙여서 그 정보를 긁어올거다. |
  | 백유리 | 젠킨스 서버 4개 다 배포할 생각이다.                                                                                                                               |
  | 허남규 | ppt 제작완료 하고 내일 발표 제가 진행해서 끝내겠습니다.스펙분석                                                                                                   |

<br/>

- 회의내용

  - 6시 삼성역 보드
  - 로봇이 핵심인데 기능적으로 이성과 감성의 싸움이 있다.
  - 로봇일 필요가 없는게 있겠지만 로봇으로 감성을 챙겨간다.
  - 발표를 통해서 그 감성을 챙겨가야한다.
  - 사실 다른 기기들로 다 할수 있는데 로봇으로 하는건 일종의 갬성때문이다.
  - 그런 갬성을 통해서 발표로 우울증을 없앤다는거에 집중!! 핵심은 우울증이다.
  - 그래서 생각한게 반려로봇의 개념
  - 고양이 예시
  - 서큘러스 참고
  - 초점을 어디로 비트는가? 규칙적인 생활을 만들고 만족감을 키우자!

<br/>
<br/>

### 10월 22일

- **중간발표**
  <br/>
  <br/>

</details>
  <details>
    <summary>3주차(2021년 10월 25일 ~ 2021년 10월 29일)</summary>

### 10월 25일

- Daily Scrum

  | member | content                                                                   |
  | ------ | ------------------------------------------------------------------------- |
  | 김민주 | 따로 진행된것 없다.                                                       |
  | 김민지 | 따로 진행된것 없다, 오늘 하드웨어 받아서 진행할 것이다.                   |
  | 백상욱 | 주말동안 개발보다는 구조를 잡았다. (로봇과의 통신 등)                     |
  | 백유리 | 병원ㅠ 아프지 맙시다.                                                     |
  | 허남규 | 따로 진행된것 없다, IoT 제품들 하드웨어 테스트 하고 펌웨어 진행할 것이다. |

<br/>

- 회의내용

  - 상단 개발 업무 분담 내용 참고

<br/>
<br/>

### 10월 26일

<br/>
<br/>

### 10월 27일

<br/>
<br/>

### 10월 28일

<br/>
<br/>

### 10월 29일

<br/>
<br/>

</details>
</details>
