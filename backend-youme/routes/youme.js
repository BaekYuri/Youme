const express = require('express')

const dialogflow = require('dialogflow')
const dotenv = require('dotenv');
const { DailyAchieveRoutine, Routine, RoutineActiveDay, Challenge, ChallengeCertificationDay, ChallengeParticipation, DailyCertifyChallenge } = require('../models');
const { Op } = require('sequelize')

dotenv.config()
const projectId = process.env.GOOGLE_PROJECT_ID
const sessionId = process.env.DIALOG_FLOW_SESSION_ID
const languageCode = process.env.DIALOG_FLOW_SESSION_LANGUAGE_CODE

// Create a new dialogflow session
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

const router = express.Router()
const { writeHistory } = require('./middlewares')

router.post('/textQuery',writeHistory, async (req, res) => {
  const userId = req.body.userId

  message = req.body.message.trim()
  if (message.search(/심심|뭐|할 거/) >= 0) {
    const d = new Date()
    const td = new Date(d)

    const yesterday = td.setDate(d.getDate() - 1)
    const today = td.setDate(d.getDate() + 1)

    let day = d.getDay()-1
    if (day === -1) {
      day = 6
    }

    const routine = await Routine.findAll({
      where: {UserId: userId},
      include: {
        model: RoutineActiveDay,
        where: { day_of_week: day, active: true }
      },
      attributes: ['id'],
      raw: true,
      nest: true
    })
    if (routine) {
      const routineId = routine.map(r => r.id)
      const checkRoutineComplete = await DailyAchieveRoutine.findAll({
        where: {
          RoutineId: routineId,
          achieve_datetime: {
            [Op.between] : [yesterday, today]
          }
        },
        raw: true
      })
      if (checkRoutineComplete.length !== routineId.length) {
        return res.send('응답 아직 못 끝낸 루틴이 있습니다! 루틴을 먼저 마무리하세요!')
      }
    }

    const challenge = await Challenge.findAll({
      where: {
        UserId: userId,
        end_date: {
          [Op.gte]: yesterday
        }
      },
      include: [{
        model: ChallengeCertificationDay,
        where: {
          active_day_of_week: day,
          certification_available: true
        }
      },{
        model: ChallengeParticipation,
        attributes: ['id']
      }],
      attributes: ['id'],
      raw: true,
      nest: true
    })
    console.log(challenge)
    if (challenge) {
      const challengePId = challenge.map(c => c.ChallengeParticipations.id)
      const checkChallengeComplete = await DailyCertifyChallenge.findAll({
        where: {
          ChallengeParticipationId: challengePId,
          certification_datetime: {
            [Op.between] : [yesterday, today]
          }
        },
        raw: true
      })
      if (checkChallengeComplete.length !== challengePId.length) {
        return res.send('응답 아직 못 끝낸 챌린지가 있습니다! 챌린지를 먼저 마무리하세요!')
      }
      // console.log(checkChallengeComplete)
    }
  }

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.message.trim(),
        languageCode: languageCode
      }
    }
  }

  // Send request and log result
  const responses = await sessionClient.detectIntent(request)
  console.log(responses[0].queryResult.diagnosticInfo)
  console.log('Detected intent')
  const result = responses[0].queryResult
  console.log(`Query: ${result.queryText}`)
  console.log(`Response: ${result.fulfillmentText}`)

  res.send('응답 ' + result.fulfillmentText)
})

module.exports = router