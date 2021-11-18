const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const path = require('path')
let moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
const Sequelize = require('sequelize')
const { writeHistory } = require('./middlewares')
const { Challenge, ChallengeCertificationDay, DailyCertifyChallenge, ChallengeParticipation } = require('../models')

const router = express.Router()
const Op = Sequelize.Op

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
})

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'ssafymyme',
    key (req, file, cb) {
      console.log(file.originalname)
      console.log(file.mimetype)
      cb(null, `original/${Date.now()}_${path.basename(file.originalname).replace(/ /g, "_")}`)
    }
  }),
  limits: { fileSize: 20*1024*1024 } // 20MB
})

router.post('/',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const challenges = await Challenge.findAll({
      where: { UserId: userId }
    })
    if (!challenges) {
      return res.status(400).json({ message: '챌린지가 없습니다!' })
    }
    res.status(200).json(challenges)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/today',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  const d = new Date()
  const td = new Date(d)
  const yesterday = td.setDate(d.getDate() - 1)

  try {
    const challenges = await Challenge.findAll({
      where: {
        UserId: userId,
        end_date: {
          [Op.gte]: yesterday
        }
      },
      include: [{
        model: ChallengeCertificationDay
      }, {
        model: ChallengeParticipation
      }]
    })
    if (!challenges) {
      return res.status(400).json({ message: '챌린지가 없습니다! '})
    }
    res.status(200).json(challenges) 
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/morning',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const challenges = await Challenge.findAll({
      where: { UserId: userId },
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/image',writeHistory, upload.single('image'), async (req, res, next) => {
  // console.log(req.file)
  res.status(200).json(req.file.location)
})

router.post('/certify', async (req, res, next) => {
  
  const d = new Date()
  const td = new Date(d)
  const yesterday = td.setDate(d.getDate() - 1)

  try {
    const challengeParticipation = await ChallengeParticipation.findOne({
      where: { ChallengeId: req.body.challengeId, UserId: req.body.userId }
    })
    console.log(challengeParticipation.id)
    const exDailyCertifyChallenge = await DailyCertifyChallenge.findOne({
      where: {
        ChallengeParticipationId: challengeParticipation.id,
        certification_datetime: {
          [Op.gte]: yesterday
        } 
      }
    })

    if (exDailyCertifyChallenge) {
      return res.status(403).send('응답 이미 인증했습니다!')
    }
    const dailyCertifyChallenge = await DailyCertifyChallenge.create({
      img_addr: req.body.img_addr,
      content: req.body.content,
      certification_datetime: req.body.certification_datetime,
      ChallengeParticipationId: challengeParticipation.id
    })
    await ChallengeParticipation.update({
        certification_count: challengeParticipation.certification_count + 1
      },
      { where: { id: challengeParticipation.id } }
    )
    res.status(200).send('응답 인증되었습니다!')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router