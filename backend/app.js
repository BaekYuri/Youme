const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
const passportConfig = require('./passport')
const helmet = require('helmet')
const hpp = require('hpp')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const { swaggerUI, specs } = require('./modules/swagger')
const socketIO = require('socket.io')

dotenv.config()
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
})
const app = express()
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const userRouter = require('./routes/user')
const challengeRouter = require('./routes/challenge')
const challengeParticipationRouter = require('./routes/challengeParticipation')
const routineRouter = require('./routes/routine')
const routinizedHabitRouter = require('./routes/routinizedHabit')
const habitRouter = require('./routes/habit')
const scheduleRouter = require('./routes/schedule')
const weatherRouter = require('./routes/weather')
const UsersYoumeRouter = require('./routes/usersYoume')
const TurtlebotPointRouter = require('./routes/turtlebotPoint')


app.set('port', process.env.PORT || 3065)
passportConfig()
sequelize.sync()
.then(() => {
  console.log('데이터베이스 연결 성공')
})
.catch((error) => {
  console.error(error)
})

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(hpp())
  app.use(helmet())
} else {
  app.use(morgan('dev'))
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
}

// 아래의 미들웨어들은 내부적으로 next를 실행 해준다!
// 미들웨어간 순서도 매우 중요하다! 왜?
// 요청에 따라서 어디까지 실행되는지 결정된다. 중간에 실행 되면 => 거기서 멈춤, 서버 부하 줄어든다!
// app.set('trust proxy', 1)
// app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  name: 'connect.sid',
  store: new RedisStore({ client: redisClient })
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // true면 qs, false면 querystring
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  origin: ['http://localhost:3000', 'https://myme.today'],
  credentials: true,
}))


app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/challenge', challengeRouter)
app.use('/challengeParticipation', challengeParticipationRouter)
app.use('/routine', routineRouter)
app.use('/routinizedHabit', routinizedHabitRouter)
app.use('/habit', habitRouter)
app.use('/schedule',scheduleRouter)
app.use('/weather',weatherRouter)
app.use('/usersYoume',UsersYoumeRouter)
app.use('/turtlebotPoint',TurtlebotPointRouter)

app.use((req, res, next) => {
  // req.data = 'wook비번' // middleware간 data 전송
  next()
})

app.get('/', (req, res) => {  
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
  res.send('hello MYME')
})

app.use((req, res, next) => {
  res.status(404).send('404')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('에러 발생!')
})

const server = app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행')
})
const io = socketIO(server, {
    cors: {
    origin: ['http://localhost:3000', 'https://myme.today'],
    credentials: true,
  },
  allowEIO3: true,
  allowEI04: true,  
});

io.on("connection", function (socket) {
  console.log("소켓 접속 완료");

  socket.on("roomjoin", (userid) => {  //roomjoin 이벤트명으로 데이터받기 //socket.on
    console.log(userid);
    socket.join(userid);               //userid로 방 만들기
  });

  socket.on("turtlebot", (data) => {   
    io.to(data.id).emit("turtlebotMode",data.data);  //turtlebot 에게 turtlebot 이라는 토픽으로 data를 보낸다.
  });
  
  socket.on("goSomewhere", (data) => {   
    io.to(data.id).emit("goSomewhere",data.data);  
  });

  socket.on("sendNowMode", (id) => {   
    io.to(id).emit("sendNowMode");  
  });

  socket.on("getNowMode", (data) => {   
    data = JSON.parse(data)
    io.to(data.id).emit("getNowMode", data.data);  
  });

  socket.on("turtlebotMsg", (data) => {   
    data = JSON.parse(data)
    io.to(data.id).emit("getTurtlebotMsg", data.msg);  
  });
});