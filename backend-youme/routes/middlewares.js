
const { UsersYoume } = require('../models')

exports.isLoggedIn = (req, res, next) => {
  console.log(req)
  if (req.isAuthenticated()) {
    next()
  } else {
    res.send('로그인이 필요합니다.')
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  console.log(req)
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.send('로그인이 안 필요합니다.')
  }
}

exports.writeHistory = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await UsersYoume.findOne({
        attributes:['familiarity']
    },
    {
        where: {UserId: req.body.userId}
    })
    
    const familiarity = result.familiarity + 1

    await UsersYoume.update({
        familiarity: familiarity
    },
    {
        where: {UserId: req.body.userId}
    })
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}
