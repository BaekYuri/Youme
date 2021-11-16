# pyqt5

import youme_main as ym

from PyQt5 import QtCore
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5 import uic

def drawLoadingExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(100, 100, 100, 100, 180 * 16, 180 * 16)
    paint.drawArc(340, 100, 100, 100, 180 * 16, 180 * 16)
    paint.drawArc(160, 200, 200, 160, 180 * 16, 180 * 16)

def drawNormalExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawTalkExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawChord(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawSmileExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(250, 150, 100, 100, 0 * 16, 180 * 16)
    paint.drawArc(450, 150, 100, 100, 0 * 16, 180 * 16)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawHeartOneExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawChord(250, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(300, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(250, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(250, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawChord(450, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(500, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(450, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(450, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawLine(400, 250, 300, 350)
    paint.drawLine(400, 250, 500, 350)
    paint.drawLine(300, 350, 500, 350)

def drawHeartTwoExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawChord(250, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(300, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(250, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(250, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawChord(450, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(500, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(450, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(450, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawLine(300, 350, 500, 350)

def drawSmileTeethExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawLine(300, 280, 500, 280)
    paint.drawLine(366, 280, 366, 355)
    paint.drawLine(434, 280, 434, 355)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawDissapointedExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawLine(400, 250, 300, 350)
    paint.drawLine(400, 250, 500, 350)

def drawBlankExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawLine(300, 350, 500, 350)

def drawSurpriseExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawArc(300, 230, 200, 180, 0 * 16, 360 * 16)

def drawScaredExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(250, 100, 80, 120, 0 * 16, 360 * 16)
    paint.drawArc(470, 100, 80, 120, 0 * 16, 360 * 16)
    paint.drawArc(360, 250, 80, 120, 0 * 16, 360 * 16)
    paint.drawArc(230, 250, 80, 120, 270 * 16, 180 * 16)
    paint.drawArc(490, 250, 80, 120, 90 * 16, 180 * 16)

def drawSadExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawLine(250, 100, 300, 150)
    paint.drawLine(300, 150, 350, 100)
    paint.drawLine(450, 100, 500, 150)
    paint.drawLine(500, 150, 550, 100)
    paint.drawEllipse(475, 150, 50, 50)
    paint.drawEllipse(475, 225, 50, 50)
    paint.drawEllipse(475, 300, 50, 50)
    paint.drawEllipse(475, 375, 50, 50)

def drawExitedTeethExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawLine(300, 100, 350, 150)
    paint.drawLine(350, 150, 300, 200)
    paint.drawLine(500, 100, 450, 150)
    paint.drawLine(450, 150, 500, 200)
    paint.drawLine(300, 280, 500, 280)
    paint.drawLine(366, 280, 366, 355)
    paint.drawLine(434, 280, 434, 355)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawExitedExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawLine(300, 100, 350, 150)
    paint.drawLine(350, 150, 300, 200)
    paint.drawLine(500, 100, 450, 150)
    paint.drawLine(450, 150, 500, 200)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawOkExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawLine(500, 100, 450, 150)
    paint.drawLine(450, 150, 500, 200)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawPigExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawArc(250, 250, 300, 150, 0 * 16, 360 * 16)
    paint.drawEllipse(330, 275, 30, 50)
    paint.drawEllipse(440, 275, 30, 50)

def drawAngry1Expression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5)) 
    paint.drawLine(300, 130, 350, 180)
    paint.drawLine(500, 130, 450, 180)
    paint.drawArc(270, 250, 260, 200, 0 * 16, 180 * 16)
    paint.drawLine(270, 350, 530, 350)

def drawAngry2Expression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5)) 
    paint.drawLine(300, 130, 350, 180)
    paint.drawLine(500, 130, 450, 180)
    paint.drawArc(270, 250, 260, 200, 0 * 16, 180 * 16)

def drawWeakenExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawLine(500, 100, 450, 150)
    paint.drawLine(450, 150, 500, 200)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)
    paint.drawArc(400, 310, 100, 100, 180 * 16, 225 * 16)

def drawDieExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawLine(300, 100, 350, 200)
    paint.drawLine(350, 100, 300, 200)
    paint.drawLine(500, 100, 450, 200)
    paint.drawLine(450, 100, 500, 200)
    paint.drawArc(320, 230, 160, 160, 0 * 16, 360 * 16)

def drawLazyExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawLine(270, 150, 350, 150)
    paint.drawLine(450, 150, 530, 150)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

if __name__=="__main__":
    pass
