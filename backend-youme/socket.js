const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
    },
    allowEIO3: true,
    allowEIO4: true
  });
  app.set('io', io)

  io.on('connection', async (socket) => { // 웹소켓 연결 시
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

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