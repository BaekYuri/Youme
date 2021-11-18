import rclpy
from rclpy.node import Node

import socketio
import requests as rq
import json
import time
from geometry_msgs.msg import Twist, PoseWithCovarianceStamped, PoseStamped , PointStamped
from sensor_msgs.msg import LaserScan
from action_msgs.msg import GoalStatusArray
from random import uniform

#소켓 정의
global sio
sio = socketio.Client(logger=True, engineio_logger=True)

global ENDPOINT,SOCKET_ENDPOINT
ENDPOINT = "https://api.myme.today"
SOCKET_ENDPOINT ="https://k5a203.p.ssafy.io"
global turtlebotId
turtlebotId = "a203a"

global minimal_publisher
global initialPose, initialPoseStamped, bed, coffee, mirror, workspace #침대, 커피머신, 스마트미러, 작업공간 변수 선언

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')

        sio.connect(SOCKET_ENDPOINT,namespaces=['/a203a'])
        sio.emit("roomjoin",turtlebotId,namespace='/a203a')

        self.initial_pose_publisher = self.create_publisher(PoseWithCovarianceStamped ,'initialpose',10)
        self.goal_pose_publisher = self.create_publisher(PoseStamped, 'goal_pose', 10)
        self.clicked_point_subscriber = self.create_subscription(PointStamped,'clicked_point',self.clicked_point_callback,10)
        self.cmd_publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        self.scan_sub = self.create_subscription(LaserScan,'scan',self.scan_callback,10)
        self.cmd_vel_raw_sub = self.create_subscription(Twist,'cmd_vel_raw',self.cmd_vel_raw_callback,10)
        self.navigate_status_sub = self.create_subscription(GoalStatusArray,'navigate_to_pose/_action/status',self.navigate_status_callback,10)

        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.update_timer = self.create_timer(
            0.010,  # unit: s
            self.update_callback)
        self.before_mode = 0
        self.mode = 0
        self.destination = 0 #순찰모드의 목적지 0:침대 1:커피머신 2:스마트미러 3:작업공간
        self.isComplete = True #네비게이션 완료되었는지 확인하는 변수
        self.sendMsg = -1 #이동했다는 메시지를 보내야하는지 확인하는 변수. -1:보내지 않아도 됨 0:침대 1:커피머신 2:스마트미러 3:작업공간 
        self.free_count = 0
        self.gym_speed = 1.1

        self.cmd_msg = Twist()

        self.linear_velocity = 0.0  # unit: m/s
        self.angular_velocity = 0.0  # unit: m/s
        self.scan_ranges = []
        self.init_scan_state = False  # To get the initial scan data at the beginning

        self.initial_pose_publisher.publish(initialPose)

    def timer_callback(self):
        
        if(self.isComplete == False):
            return

        #모드를 바꾸기 전에 한번 속도를 없애준다!
        if(self.before_mode != self.mode):
            twist = Twist()
            twist.linear.x = 0.0
            twist.angular.z = 0.0
            self.cmd_publisher.publish(twist)

        if(self.mode==1): #순찰 모드
            self.patrol_mode()
        elif(self.mode==2): #자유 모드
            self.free_mode()
        elif(self.mode==3): #운동 모드
            self.gym_mode()
        self.before_mode = self.mode

    def patrol_mode(self):
        if(self.destination==0):
            print('침대')
            self.goal_pose_publisher.publish(bed)
        elif(self.destination==1):
            print('커피머신')
            self.goal_pose_publisher.publish(coffee)
        elif(self.destination==2):
            print('스마트미러')
            self.goal_pose_publisher.publish(mirror)
        elif(self.destination==3):
            print('작업공간')
            self.goal_pose_publisher.publish(workspace)
        self.destination = self.destination+1
        self.destination = self.destination % 4

    def free_mode(self):
        if self.isComplete is False:
            return

        if self.free_count == 0: #5초에 한번씩 속도 바꿔주기
            twist = Twist()
            twist.linear.x = uniform(-0.10,0.10)
            twist.linear.x = round(twist.linear.x,2)
            twist.angular.z = uniform(-0.05,0.05)
            twist.angular.z = round(twist.angular.z,2)

            self.cmd_publisher.publish(twist)

        self.free_count = self.free_count +1
        self.free_count = self.free_count % 10
        
    def gym_mode(self):
        if self.isComplete is False:
            return
        if self.free_count == 0: #5초에 한번씩 속도 바꿔주기
            self.gym_speed = -self.gym_speed
            twist = Twist()
            twist.linear.x = 0.0
            twist.angular.z = self.gym_speed

            self.cmd_publisher.publish(twist)

        self.free_count = self.free_count +1
        self.free_count = self.free_count % 10

    def clicked_point_callback(self, data):
        print(data)
    
    def scan_callback(self, msg):
        self.scan_ranges = msg.ranges
        self.init_scan_state = True

    def cmd_vel_raw_callback(self, msg):
        self.linear_velocity = msg.linear.x
        self.angular_velocity = msg.angular.z

    def update_callback(self):
        if self.mode == 2 and self.init_scan_state is True:
            self.detect_obstacle()

    def detect_obstacle(self):
        twist = Twist()
        obstacle_distance = min(self.scan_ranges)
        safety_distance = 0.3  # unit: m

        if obstacle_distance > safety_distance:
            twist.linear.x = self.linear_velocity
            twist.angular.z = self.angular_velocity
        else:
            twist.linear.x = 0.0
            twist.angular.z = 0.0
            print('충돌 감지!')

        self.cmd_publisher.publish(twist)
    def navigate_status_callback(self,data):
        global sio
        nowStatus = data.status_list[len(data.status_list)-1].status
        if nowStatus==2:
            self.isComplete = False
        elif nowStatus==4 :
            if self.sendMsg!=-1:
            
                sio.emit("moveResult",{"id":turtlebotId,"destination":self.sendMsg, "status":"success"},namespace='/a203a')
                self.sendMsg = -1
            time.sleep(1.5)
            self.isComplete = True
        elif nowStatus==6 :
            if self.sendMsg!=-1:
                sio.emit("moveResult",{"id":turtlebotId,"destination":self.sendMsg, "status":"failure"},namespace='/a203a')
                self.sendMsg = -1
            time.sleep(1.5)
            self.isComplete = True



def main(args=None):
    rclpy.init(args=args)
    global minimal_publisher, initialPose,initialPoseStamped, bed, coffee, mirror, workspace, ENDPOINT
    
    rs = rq.get(ENDPOINT+"/turtlebotPoint/"+turtlebotId)
    
    initialPose = PoseWithCovarianceStamped()
    initialPoseStamped = PoseStamped()
    bed = PoseStamped()
    coffee = PoseStamped()
    mirror = PoseStamped()
    workspace = PoseStamped()
    if rs.status_code!=200:
        print("좌표를 확인할 수 없습니다.")
    else : 
        pointInfo = json.loads(rs.content)

        initialPose.header.stamp.sec = 0
        initialPose.header.stamp.nanosec = 0
        initialPose.header.frame_id = "map"
        initialPose.pose.pose.position.x = pointInfo["initPosePositionX"]
        initialPose.pose.pose.position.y = pointInfo["initPosePositionY"]
        initialPose.pose.pose.orientation.z = float(pointInfo["initPosePositionZ"])
        initialPose.pose.pose.orientation.w = float(pointInfo["initPoseOrientationW"])
        
        initialPoseStamped.header.stamp.sec = 0
        initialPoseStamped.header.stamp.nanosec = 0
        initialPoseStamped.header.frame_id = "map"
        initialPoseStamped.pose.position.x = pointInfo["initPosePositionX"]
        initialPoseStamped.pose.position.y = pointInfo["initPosePositionY"]
        initialPoseStamped.pose.orientation.z = float(pointInfo["initPosePositionZ"])
        initialPoseStamped.pose.orientation.w = float(pointInfo["initPoseOrientationW"])

        bed.header.stamp.sec = 0
        bed.header.stamp.nanosec = 0
        bed.header.frame_id = "map"
        bed.pose.position.x = pointInfo["BedPositionX"]
        bed.pose.position.y = pointInfo["BedPositionY"]
        bed.pose.orientation.z = float(pointInfo["BedPositionZ"])
        bed.pose.orientation.w = float(pointInfo["BedOrientationW"])

        coffee.header.stamp.sec = 0
        coffee.header.stamp.nanosec = 0
        coffee.header.frame_id = "map"
        coffee.pose.position.x = pointInfo["CoffeePositionX"]
        coffee.pose.position.y = pointInfo["CoffeePositionY"]
        coffee.pose.orientation.z = float(pointInfo["CoffeePositionZ"])
        coffee.pose.orientation.w = float(pointInfo["CoffeeOrientationW"])

        mirror.header.stamp.sec = 0
        mirror.header.stamp.nanosec = 0
        mirror.header.frame_id = "map"
        mirror.pose.position.x = pointInfo["MirrorPositionX"]
        mirror.pose.position.y = pointInfo["MirrorPositionY"]
        mirror.pose.orientation.z = float(pointInfo["MirrorPositionZ"])
        mirror.pose.orientation.w = float(pointInfo["MirrorOrientationW"])

        workspace.header.stamp.sec = 0
        workspace.header.stamp.nanosec = 0
        workspace.header.frame_id = "map"
        workspace.pose.position.x = pointInfo["WorkspacePositionX"]
        workspace.pose.position.y = pointInfo["WorkspacePositionY"]
        workspace.pose.orientation.z = float(pointInfo["WorkspacePositionZ"])
        workspace.pose.orientation.w = float(pointInfo["WorkspaceOrientationW"])
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

@sio.event
def connect():
    print('connection established')

@sio.event
def disconnect():
    print('disconnected from server')

@sio.on("turtlebotMode",namespace='/a203a')
def turtlebot(data):
    global minimal_publisher
    minimal_publisher.mode = data
    sendNowMode()

@sio.on("sendNowMode",namespace='/a203a')
def sendNowMode():
    mode = {"id": turtlebotId, "data": minimal_publisher.mode}
    sio.emit("getNowMode",json.dumps(mode),namespace='/a203a')

@sio.on("goSomewhere",namespace='/a203a')
def turtlebot(data):
    global minimal_publisher
    global bed, coffee, mirror, workspace, initialPoseStamped
    minimal_publisher.mode = 4
    print("socket come")
    if(minimal_publisher.isComplete is False):
        msg = {"id": turtlebotId, "msg": "아직 이동중입니다. 잠시 후 선택해주세요."}
        sio.emit("turtlebotMsg",json.dumps(msg),namespace='/a203a')
        return
    if(data==0):
        print('침대')
        minimal_publisher.goal_pose_publisher.publish(bed)
    elif(data==1):
        print('커피머신')
        minimal_publisher.goal_pose_publisher.publish(coffee)
    elif(data==2):
        print('스마트미러')
        minimal_publisher.goal_pose_publisher.publish(mirror)
    elif(data==3):
        print('작업공간')
        minimal_publisher.goal_pose_publisher.publish(workspace)
    elif(data==4):
        print('초기위치')
        minimal_publisher.goal_pose_publisher.publish(initialPoseStamped)
    minimal_publisher.sendMsg = data
    sendNowMode()

if __name__ == '__main__':
    main()
