const express = require('express')
const moment = require('moment')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Schedule, User } = require('../models')
const { isLoggedIn, writeHistory } = require('./middlewares')

const router = express.Router()

// 전체 일정 목록 가져오기
router.post('/',writeHistory, async (req, res, next) => { // GET /routine
  try {
    const schedule = await Schedule.findAll({
      where: { UserId: req.body.userId },
      order: [['start']]
    })
    res.status(200).json(schedule)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 일정 추가하기
router.post('/', isLoggedIn, async (req, res, next) => { // POST /routine
  try {
    const schedule = await Schedule.create({
        title: req.body.title,
        color: req.body.color,
        start: req.body.start,
        end: req.body.end,
        allDay: req.body.allDay,
        todo: req.body.todo,
        UserId: req.user.id,
    })

    res.status(200).json(schedule)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 일정 수정하기
router.put('/:scheduleId', isLoggedIn, async (req, res, next) => { // PATCH /routine/:routineId
  try {
    await Schedule.update({
      title: req.body.title,
      color: req.body.color,
      start: req.body.start,
      end : req.body.end,
      allDay: req.body.allDay,
    },{
      where: { id: req.params.scheduleId,
        UserId: req.user.id,
    },
    })

    const schedule = await Schedule.findOne({
        where: { id: req.params.scheduleId,
            UserId: req.user.id,
        },
    })
    res.status(200).json(schedule)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /schedule/{scheduleId}:
 *    delete:
 *      tags:
 *        - schedule
 *      description: 일정 삭제하기
 *      parameters:
 *        - in: path
 *          name: scheduleId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *      responses:
 *        '200':
 *          description: Success
 */
router.delete('/:scheduleId', isLoggedIn, async (req, res, next) => {
  
  try {
    await Schedule.destroy({
      where: { id: req.params.scheduleId, UserId: req.user.id, }
    })
    res.status(200).json('Success')
  } catch (error) {
    console.error(error)
    next(error)
  }
})


module.exports = router