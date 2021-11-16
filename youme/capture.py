import cv2

cam = cv2.VideoCapture(0)
cam.set(3,1280)
cam.set(4,720)

while True:
    ret_val, img = cam.read()

    cv2.imshow("Cam Viewer", img)
    if cv2.waitKey(1) == 27:
        break
