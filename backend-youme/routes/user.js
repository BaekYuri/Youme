const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { User } = require('../models/index')

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    // console.log(req.body.email, req.body.password)
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('등록되지 않은 이메일입니다!')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('입력하신 정보가 올바르지 않습니다.')
    req.session.userid = user.id
    return res.send('success!')
  } catch (error) {
    console.error(error)
    next(error)
  }
  // passport.authenticate('local', (authError, user, info) => {
  //   if (authError) {
  //     console.error(authError)
  //     return next(authError)
  //   }
  //   if (!user) {
  //     return res.status(400).send(info.message)
  //   }
  //   return req.login(user, (loginError) => {
  //     if (loginError) {
  //       console.error(loginError)
  //       return next(loginError)
  //     }
  //     return res.status(200).send(info.message)
  //   })
  // })(req, res, next)
})

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  req.session.destroy()
  res.send('logout')
})

module.exports = router