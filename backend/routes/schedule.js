const express = require('express')
const moment = require('moment')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Schedule, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

// 월별 일정 목록 가져오기
/**
 * @swagger
 *  /schedule:
 *    get:
 *      tags:
 *        - schedule
 *      description: 내 월별 일정 가져오기
 *
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                   type: integer
 *                  title:
 *                   type: string
 *                  color:
 *                   type: string
 *                  start:
 *                   type: string
 *                  end:
 *                   type: string
 *                  allDay:
 *                   type: boolean
 *                  UserId:
 *                   type: integer
 */
router.get('/', isLoggedIn, async (req, res, next) => { // GET /routine
  try {
    const schedule = await Schedule.findAll({
      where: { UserId: req.user.id,},
      order: [['start']]
    })
    res.status(200).json(schedule)
  } catch (error) {
    console.error(error)
    next(error)
  }
})


/**
 * @swagger
 *  /schedule:
 *    post:
 *      tags:
 *        - schedule
 *      description: 새로운 일정 추가하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *        properties:
 *          title:
 *            type: string
 *          color:
 *            type: string
 *          start:
 *            type: string
 *          end:
 *            type: string
 *          allDay:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        properties:
 *          id:
 *            type: integer
 *          title:
 *            type: string
 *          color:
 *            type: string
 *          start:
 *            type: string
 *          end:
 *            type: string
 *          allDay:
 *            type: integer
 *          UserId:
 *            type: integer
 */
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

/**
 * @swagger
 *  /schedule/{scheduleId}:
 *    put:
 *      tags:
 *        - schedule
 *      description: 일정 수정하기
 *      parameters:
 *        - in: path
 *          name: scheduleId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
    *        properties:
    *          title:
    *            type: string
    *          color:
    *            type: string
    *          start:
    *            type: string
    *          end:
    *            type: string
    *          allDay:
    *            type: integer
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        properties:
 *          id:
 *            type: integer
 *          title:
 *            type: string
 *          color:
 *            type: string
 *          start:
 *            type: string
 *          end:
 *            type: string
 *          allDay:
 *            type: integer
 *          UserId:
 *            type: integer
 */
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