const express = require('express')
const router = express.Router()
const { UsersYoume, TurtlebotPoint } = require('../models')
// GET / 라우터
router.get('/:id', async (req, res, next) => {
    try {
        const id = await UsersYoume.findOne({
            where:{
                YoumeId : req.params.id
            }
        })
        const turtlebotPoint = await TurtlebotPoint.findOne({
            where: { UsersYoumeId: id.dataValues.id},
        })
        res.status(200).send(JSON.stringify(turtlebotPoint.dataValues))
    }catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router