const express = require('express')
let moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { sequelize, Routine, User, RoutinizedHabit, RoutineActiveDay, Habit, DailyAchieveHabit, DailyAchieveRoutine } = require('../models')
const { writeHistory } = require('./middlewares')

const router = express.Router()

router.post('/',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const routines = await Routine.findAll({
      where: { UserId: userId }
    })
    if (!routines) {
      return res.status(400).json({ message: '루틴이 없습니다!' })
    }
    res.status(200).json(routines)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/today', writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  const d = new Date()
  const td = new Date(d)

  const yesterday = td.setDate(d.getDate() - 1)
  const today = td.setDate(d.getDate() + 1)

  let day = d.getDay()-1
  if (day === -1) {
    day = 6
  }


  try {
    const routines = await Routine.findAll({
      where: { UserId: userId },
      include: [{
        model: RoutineActiveDay,
        where: { day_of_week: day }
      }, {
        model: RoutinizedHabit,
        include: [{
          model: Habit,
        }]
      }]
    })
    if (!routines) {
      return res.status(400).json({ message: '루틴이 없습니다! '})
    }
    console.log(routines)
    res.status(200).json(routines)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/morning',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const routines = await Routine.findAll({
      where: { UserId: userId },
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router