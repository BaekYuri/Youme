const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const schedule = require('node-schedule')

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { sequelize } = require('../models/user')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router