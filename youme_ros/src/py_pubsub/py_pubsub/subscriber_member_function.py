# Copyright 2016 Open Source Robotics Foundation, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import rclpy
from rclpy.node import Node

import socketio
from sensor_msgs.msg import BatteryState

import json

#소켓 정의
global sio
sio = socketio.Client(logger=True, engineio_logger=True)


global ENDPOINT
ENDPOINT = "https://k5a203.p.ssafy.io/"

global turtlebotId
turtlebotId = "a203a"

global minimal_subscriber

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')

        sio.connect(ENDPOINT,namespaces=['/a203a'])
        sio.emit("roomjoin",turtlebotId,namespace='/a203a')

        self.subscription = self.create_subscription(
            BatteryState,
            'battery_state',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning
        
        timer_period = 60
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.battery_msg = BatteryState()
    def listener_callback(self, msg):
        self.battery_msg = msg
    def timer_callback(self):
        msg = {"id":turtlebotId, "battery":self.battery_msg.percentage}
        sio.emit("batteryState",json.dumps(msg),namespace='/a203a')


def main(args=None):
    rclpy.init(args=args)

    global minimal_subscriber
    minimal_subscriber = MinimalSubscriber()

    rclpy.spin(minimal_subscriber)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

@sio.event
def connect():
    print('connection established')

@sio.event
def disconnect():
    print('disconnected from server')

@sio.on("sendBattery")
def sendBattery():
    msg = {"id":turtlebotId, "battery":minimal_subscriber.battery_msg.percentage}
    sio.emit("batteryState",json.dumps(msg),namespace='/a203a')
    
if __name__ == '__main__':
    main()