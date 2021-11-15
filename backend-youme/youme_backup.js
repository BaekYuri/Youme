const WebSocket = require('ws')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { sequelize, Routine, User, RoutinizedHabit, RoutineActiveDay, Habit, DailyAchieveHabit, DailyAchieveRoutine } = require('./models')


module.exports = (server) => {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws, req) => { // 웹 소켓 연결 시
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('새로운 클라이언트 접속', ip)

    ws.on('message', async (message) => { // 클라이언트로부터 메시지
      command = message.toString().trim()
      console.log(command)

      if (command === "오늘 루틴 알려 줘") {
        try {
          const routines = await Routine.findAll({
            where: { UserId: 1 }
          })
          console.log(routines[0].dataValues)
        } catch (error) {
          console.error(error)
        }
      }
    })
    ws.on('error', (error) => { // 에러 시
      console.log(error)
    })
    ws.on('close', () => { // 연결 종료 시
      console.log('클라이언트 접속 해제', ip)
      // clearInterval(ws.interval)
    })

    // ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
    //   if (ws.readyState === ws.OPEN) {
    //     ws.send('서버에서 클라이언트로 메시지를 보냅니다.')
    //   }
    // }, 3000)
  })
}