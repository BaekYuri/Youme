const express = require('express')
const multer = require('multer')
const path = require('path')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const { Challenge, User, ChallengeParticipation, ChallengeCertificationTime, ChallengeCertificationDay, Sequelize } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

const Op = Sequelize.Op

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
})

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'ssafymyme',
    key (req, file, cb) {
      const ext = path.extname(file.originalname)
      // ${path.basename(file.originalname).replace(/ /g, "_")}
      // 파일명 한글처리 귀찮다!
      cb(null, `original/${Date.now()}${ext}`)
    },
  }),
  limits: { fileSize: 20*1024*1024 } // 20MB
})

/**
 * @swagger
 *  /challenge:
 *    get:
 *      tags:
 *        - challenge
 *      description: 전체 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
router.get('/', async (req, res, next) => { // GET /challenge
  try {
    const d = new Date()
    const where = {
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/new:
 *    get:
 *      tags:
 *        - challenge
 *      description: 신규 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/new', async (req, res, next) => { // GET /challenge/new
  try {
    const d = new Date()
    console.log(d.getDate())
    const where = { createdAt: { [Op.gt]: d.getDate() - 7 }, end_date:{[Op.gt]:d} }
    const challenges = await Challenge.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }],
      where : where
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/recommended:
 *    get:
 *      tags:
 *        - challenge
 *      description: 추천 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/recommended', async (req, res, next) => { // GET /challenge/recommended
  try {
    const d = new Date()
    const where = {
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/workout:
 *    get:
 *      tags:
 *        - challenge
 *      description: 운동 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/workout', async (req, res, next) => { // GET /challenge/workout
  try {
    const d = new Date()
    const where = {
      Category: 1,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/study:
 *    get:
 *      tags:
 *        - challenge
 *      description: 공부 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/study', async (req, res, next) => { // GET /challenge/study
  try {
    const d = new Date()
    const where = {
      Category: 2,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/life:
 *    get:
 *      tags:
 *        - challenge
 *      description: 생활 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/life', async (req, res, next) => { // GET /challenge/life
  try {
    const d = new Date()
    const where = {
      Category: 3,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/meal:
 *    get:
 *      tags:
 *        - challenge
 *      description: 식사 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/meal', async (req, res, next) => { // GET /challenge/meal
  try {
    const d = new Date()
    const where = {
      Category: 4,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/ability:
 *    get:
 *      tags:
 *        - challenge
 *      description: 역량 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/ability', async (req, res, next) => { // GET /challenge/ability
  try {
    const d = new Date()
    const where = {
      Category: 5,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/hobby:
 *    get:
 *      tags:
 *        - challenge
 *      description: 취미 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/hobby', async (req, res, next) => { // GET /challenge/hobby
  try {
    const d = new Date()
    const where = {
      Category: 6,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/asset:
 *    get:
 *      tags:
 *        - challenge
 *      description: 자산 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/asset', async (req, res, next) => { // GET /challenge/asset
  try {
    const d = new Date()
    const where = {
      Category: 7,
      end_date: {
        [Op.gt]: d
      }
    }
    const challenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/search/:searchWord:
 *    post:
 *      tags:
 *        - challenge
 *      description: 챌린지 제목 검색
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.post('/search/:searchWord', isLoggedIn, async (req, res, next) => { // GET /challenge/search/{searchWord}
  const searchWord = req.params.searchWord
  const d = new Date()

  try {
    const user = await User.findOne({
      where: { name: searchWord },
      attributes: ['id']
    })
    const challenges = await Challenge.findAll({
      where: {
        name: {
          [Op.like]: '%'+searchWord+'%'
        },
        end_date: {
          [Op.gt]: d
        }
      },
      limit: 10,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }, ]
    })
    res.status(200).json(challenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /mychallenge:
 *    get:
 *      tags:
 *        - challenge
 *      description: 내가 생성한 챌린지 목록 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 */
router.get('/mychallenge', isLoggedIn, async (req, res, next) => { // GET /mychallenge
  try {
    const d = new Date()
    const where = {
      UserId: req.user.id,
      end_date: {
        [Op.gt]: d
      }
    }
    const myChallenges = await Challenge.findAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }, ]
    })
    res.status(200).json(myChallenges)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge:
 *    post:
 *      tags:
 *        - challenge
 *      description: 챌린지 생성하기
 *      responses:
 *        '200':
 *          description: Success
 */
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /challenge
  try {
    // 챌린지 생성
    const challenge = await Challenge.create({
      name: req.body.name,
      img_addr: req.body.img_addr,
      content: req.body.content,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      period: req.body.period,
      certification_cycle: req.body.certification_cycle,
      total_number_of_certification: req.body.total_number_of_certification,
      UserId: req.user.id,
      category: req.body.CategoryId
    })
    // 챌린지 인증 가능 시간 생성
    await ChallengeCertificationTime.create({
      certification_available_start_time: req.body.cert_available.cert_available_start_time,
      certification_available_end_time: req.body.cert_available.cert_available_end_time,
      ChallengeId: challenge.id
    })
    // 챌린지 인증 가능 요일 생성 thanks to yuri
    for(let i = 0; i < req.body.cert_day.length; i++) {
      let v = req.body.cert_day[i]
      await ChallengeCertificationDay.create({
        active_day_of_week: i,
        certification_available: v.data,
        ChallengeId: challenge.id
      })
    }
    // 내가 생성한 챌린지는 자동으로 참여하기! 챌린지 참여 생성
    await ChallengeParticipation.create({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      period: req.body.period,
      certification_count: 0,
      total_number_of_certification: req.body.total_number_of_certification,
      UserId: req.user.id,
      ChallengeId: challenge.id
    })
    // 챌린지의 모든 정보 제공
    const fullChallenge = await Challenge.findOne({
      where: { id: challenge.id },
      include: [{
        model: User, // 챌린지 개설자 아이디
        attributes: ['id', 'email', 'nickname']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    res.status(200).json(fullChallenge)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/image:
 *    post:
 *      tags:
 *        - challenge
 *      description: 챌린지 대표 이미지 생성하기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: string
 *                    description: S3에 저장된 사진의 주소
 */
router.post('/image', isLoggedIn, upload.single('image'), async (req, res, next) => { // POST /challenge/image
  // console.log(req.file)
  res.json(req.file.location)
})

/**
 * @swagger
 *  /challenge/:challengeId:
 *    get:
 *      tags:
 *        - challenge
 *      description: 하나의 챌린지 정보 불러오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img_addr:
 *                    type: string
 *                  content:
 *                    type: text
 *                  start_date:
 *                    type: date
 *                  period:
 *                    type: integer
 *                  repeat_cycle:
 *                    type: integer
 *                  auth_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                  User:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 *                  Comments:
 *                    type: array
 *                    description: 어떤 형태로 들어올지 모르겠다.
 * 
 */
 router.get('/:challengeId', async (req, res, next) => { // GET /challenge/{challengeID}
  try {
    const challenge = await Challenge.findOne({
      where: { id : req.params.challengeId },
      include: [{
        model: User,
        attributes: ['id', 'email', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: ChallengeCertificationTime
      }, {
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      },]
    })
    res.status(200).json(challenge)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/:challengeId:
 *    put:
 *      tags:
 *        - challenge
 *      description: 챌린지 좋아요
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  UserId:
 *                    type: integer
 *                  ChallengeId:
 *                    type: integer
 * 
 */
 router.put('/:challengeId/like', async (req, res, next) => { // PUT /challenge/{challengeID}/like
  try {
    const challenge = await Challenge.findOne({
      where: { id : req.params.challengeId },
    })
    if (!challenge) {
      return res.status(403).send('해당 챌린지가 존재하지 않습니다.')
    }
    await challenge.addLikers(req.user.id)
    res.status(200).json({ UserId: req.user.id, ChallengeId: challenge.id})
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challenge/:challengeId:
 *    delete:
 *      tags:
 *        - challenge
 *      description: 챌린지 좋아요 취소
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  UserId:
 *                    type: integer
 *                  ChallengeId:
 *                    type: integer
 */
 router.delete('/:challengeId/like', async (req, res, next) => { // DELETE /challenge/{challengeID}/like
  try {
    const challenge = await Challenge.findOne({
      where: { id : req.params.challengeId },
    })
    if (!challenge) {
      return res.status(403).send('해당 챌린지가 존재하지 않습니다.')
    }
    await challenge.removeLikers(req.user.id)
    res.status(200).json({ UserId: req.user.id, ChallengeId: challenge.id})
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router