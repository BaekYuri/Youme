const SocketIO = require('socket.io');
const { loginID } = require('./config/mapping_id')

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: true,
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
    },
    allowEIO3: true,
    allowEIO4: true
  });

  app.set('io', io)

  const youme = io.of('/a203a')
  youme.on('connection', async (socket) => {
    const req = socket.request
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id);

    socket.on('sendNowMode', () => {
      console.log('send')
      youme.emit('sendNowMode', 'send')
      // socket.emit('sendNowMode', 'send')
    })

    socket.on("roomjoin", (userid) => {  //roomjoin 이벤트명으로 데이터받기 //socket.on
      console.log(userid);
      socket.join(userid);               //userid로 방 만들기
    });
  
    socket.on("turtlebot", (data) => {   
      youme.to(data.id).emit("turtlebotMode",data.data);  //내가 있는 방에 turtlebotMode 이라는 토픽으로 data를 보낸다.
    });
    
    socket.on("goSomewhere", (data) => {  
      console.log(data.id, data.data) 
      youme.to(data.id).emit("goSomewhere",data.data);  
    });
  
    socket.on("sendNowMode", (id) => {   
      youme.to(id).emit("sendNowMode");  
    });
  
    socket.on("getNowMode", (data) => {   
      data = JSON.parse(data)
      youme.to(data.id).emit("getNowMode", data.data);  
    });
  
    socket.on("turtlebotMsg", (data) => {   
      data = JSON.parse(data)
      youme.to(data.id).emit("getTurtlebotMsg", data.msg);  
    });
  
    socket.on("sendBattery", (id) =>{
      youme.to(id).emit("sendBattery")
    })

    socket.on("batteryState", (data) =>{
      data = JSON.parse(data)
      youme.to(data.id).emit("battery",data.battery)
    })

    socket.on("moveResult", (data) => {
      youme.to(data.id).emit("moveResult", {'destination':data.destination, 'status':data.status})
    })

    socket.on('disconnect', () => { // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    // socket.on('error', (error) => { // 에러 시
    //   console.error(error);
    // });
    // socket.on('message', async (data) => {
    //   console.log(data)
    // })
    // socket.on('reply', async (data) => { // 클라이언트로부터 메시지
    //   console.log(data.toString().trim());
    // });
  })

  io.on('connection', async (socket) => { // 웹소켓 연결 시
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id);
    console.log(req.header)
    // socket.join()

    socket.on('disconnect', () => { // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => { // 에러 시
      console.error(error);
    });
    socket.on('message', async (data) => {
      console.log(data)
    })
    socket.on('reply', async (data) => { // 클라이언트로부터 메시지
      console.log(data.toString().trim());
    });
    // socket.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
    //   socket.emit('news', 'Hello Socket.IO');
    // }, 3000);
  });
};