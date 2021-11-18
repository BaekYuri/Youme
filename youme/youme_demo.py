import sys
import threading
import time
import schedule
from PyQt5 import QtCore
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5 import uic
from datetime import datetime
import requests
import json
import qdarkstyle
# from qt_material import apply_stylesheet

expression_index = 0

class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()
        # self.setWindowFlags(Qt.FramelessWindowHint) # 상단 바 제거
        self.initLoginWindow()

    def initLoginWindow(self):
        self.loginLayout = QVBoxLayout(self)

        self.loginEmailInput = QLineEdit(self)
        self.loginLayout.addWidget(self.loginEmailInput)

        self.loginPasswordInput = QLineEdit(self)
        self.loginLayout.addWidget(self.loginPasswordInput)

        loginButton = QPushButton('로그인', self)
        loginButton.setFixedSize(500, 30)
        loginButton.clicked.connect(self.login)
        self.loginLayout.addWidget(loginButton)

        exitButton = QPushButton('프로그램 종료', self)
        exitButton.setFixedSize(500, 30)
        exitButton.clicked.connect(self.close)
        self.loginLayout.addWidget(exitButton)

        self.setLayout(self.loginLayout)
        self.setGeometry(400, 400, 500, 500)

        self.show()

    def login(self):
        print('login!')
        headers = {'Content-Type': 'application/json; charset=utf-8'}
        data = {'email': str(self.loginEmailInput.text()), 'password': str(self.loginPasswordInput.text())}
        res = requests.post('http://112.169.87.3:8005/user/login', data=json.dumps(data), headers=headers)
        print(str(res.status_code) + " | " + res.text)
        if res.status_code == 200:
            screenWidget.setCurrentIndex(screenWidget.currentIndex()+1)
        else:
            print('입력한 정보가 올바르지 않습니다!')

    def close(self):
        return QCoreApplication.instance().quit()

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.timer = QTimer(self)
        self.timer.setInterval(2000)
        self.timer.timeout.connect(self.timeout)

        self.initMainWindow()

    def initMainWindow(self):
        self.timer.start()

        # 0 : Normal
        # 1 : Talk
        # 2 : Smile
        self.expressionList = [
            self.drawNormalExpression,
            self.drawTalkExpression,
            self.drawSmileExpression
        ]

        expression_index = 0
        self.mainLayout = QVBoxLayout()

        self.logoutButton = QPushButton('로그아웃')
        self.logoutButton.clicked.connect(self.logout)

        # self.mainLayout.addWidget(self.logoutButton)
        self.setLayout(self.mainLayout)
        self.show()

    def paintEvent(self, event):
        paint = QPainter()
        paint.begin(self)
        # index만 바꿔가며 실행하면 된다.
        self.expressionList[expression_index](paint)
        paint.end()

    def drawNormalExpression(self, paint):
        paint.setBrush(QColor(Qt.white))
        paint.drawEllipse(100, 100, 80, 120)
        paint.drawEllipse(340, 100, 80, 120)
        paint.setPen(QPen(Qt.white, 5))
        paint.drawArc(160, 200, 200, 160, 180 * 16, 180 * 16)

    def drawTalkExpression(self, paint):
        paint.setBrush(QColor(Qt.white))
        paint.drawEllipse(100, 100, 80, 120)
        paint.drawEllipse(340, 100, 80, 120)
        paint.setPen(QPen(Qt.white, 5))
        paint.drawChord(160, 200, 200, 160, 180 * 16, 180 * 16)

    def drawSmileExpression(self, paint):
        # paint.setBrush(QColor(Qt.white))
        paint.setPen(QPen(Qt.white, 5))
        paint.drawArc(100, 150, 100, 100, 0 * 16, 180 * 16)
        paint.drawArc(320, 150, 100, 100, 0 * 16, 180 * 16)
        paint.drawArc(160, 200, 200, 160, 180 * 16, 180 * 16)

    def timeout(self):
        global expression_index
        print(expression_index)
        expression_index += 1
        if expression_index % 3 == 0:
            expression_index = 0
        # PyQt5는 QTimer를 구현하기만 하면 타이머가 트리거 될 때마다
        # self.update()를 사용하며 드로잉을 업데이트하고 원하는 위치로 업데이트 할 수 있다.
        self.update()

    def logout(self):
        screenWidget.setCurrentIndex(screenWidget.currentIndex()-1)


if __name__ == "__main__":
    # QApplication : 프로그램을 실행시켜주는 클래스
    app = QApplication(sys.argv)

    # PyQt5
    dark_stylesheet = qdarkstyle.load_stylesheet_pyqt5()

    # 화면 전환용 Widget 설정
    screenWidget = QStackedWidget()

    # 레이아웃 인스턴스 생성
    loginWindow = LoginWindow()
    mainWindow = MainWindow()

    # Widget 추가
    screenWidget.addWidget(loginWindow)
    screenWidget.addWidget(mainWindow)

    # 프로그램 화면을 보여주는 코드
    screenWidget.setFixedSize(520, 500)
    screenWidget.show()
    app.setStyleSheet(dark_stylesheet)



    # 프로그램을 이벤트루프로 진입시키는(프로그램을 작동시키는) 코드
    app.exec_()




