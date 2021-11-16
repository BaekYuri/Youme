const express = require('express')
const axios = require('axios')
const { weatherDescription } = require('../config/weather_description')
const { aqi_description } = require('../config/air_pollution')
const { User } = require('../models/')
const { writeHistory } = require('./middlewares')
const router = express.Router()

const weekDay = {
  'Mon' : 0,
  'Tue' : 1,
  'Wed' : 2,
  'Thu' : 3,
  'Fri' : 4,
  'Sat' : 5,
  'Sun' : 6
}

// 오늘 현재 날씨 조회
router.post('/today',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const user = await User.findOne({
      where: { id: userId }
    })
    if (!user) {
      return res.status(400).json({ message: '존재하지 않는 사용자입니다.' })
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address='+encodeURI(user.main_address)+'&key='+process.env.GEOCODING_KEY);
    const location = response.data.results[0].geometry.location
    const adr = response.data.results[0].address_components
    let dong = ''
    for(let item of adr){
      if(item.types.length===3 && item.types[2]==='sublocality_level_2'){
        dong=item.short_name
        break
      }
      if(item.types.length===3 && item.types[2]==='sublocality_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='administrative_area_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='country'){
        dong=item.long_name
        break
      }
    }
    const weather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=hourly?&lat='+location.lat+'&lon='+location.lng+'&appid='+process.env.OPENWEATHER_KEY+'&lang=kr')
    
    res.status(200).send({ message : weatherDescription[weather.data.current.weather[0].id] })
  }catch (error) {
    console.error(error)
    next(error)
  }
})

// 내일 날씨 조회
router.post('/tomorrow', writeHistory,async (req, res, next) => {
  const userId = req.body.userId

  try {
    const user = await User.findOne({
      where: { id: userId }
    })
    if (!user) {
      return res.status(400).json({ message: '존재하지 않는 사용자입니다.' })
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address='+encodeURI(user.main_address)+'&key='+process.env.GEOCODING_KEY);
    const location = response.data.results[0].geometry.location
    const adr = response.data.results[0].address_components
    let dong = ''
    for(let item of adr){
      if(item.types.length===3 && item.types[2]==='sublocality_level_2'){
        dong=item.short_name
        break
      }
      if(item.types.length===3 && item.types[2]==='sublocality_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='administrative_area_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='country'){
        dong=item.long_name
        break
      }
    }
    const weather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=hourly?&lat='+location.lat+'&lon='+location.lng+'&appid='+process.env.OPENWEATHER_KEY+'&lang=kr')

    const d = new Date()
    let tomorrowDayNum = weekDay[d.toLocaleString("en-US", {weekday: 'short'})] + 1

    if (tomorrowDayNum == 7) tomorrowDayNum = 0

    res.status(200).send({ message : weatherDescription[weather.data.daily[tomorrowDayNum].weather[0].id] })
  }catch (error) {
    console.error(error)
    next(error)
  }
})

// 주말 토, 일 날씨 조회
router.post('/weekend',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const user = await User.findOne({
      where: { id: userId }
    })
    if (!user) {
      return res.status(400).json({ message: '존재하지 않는 사용자입니다.' })
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address='+encodeURI(user.main_address)+'&key='+process.env.GEOCODING_KEY);
    const location = response.data.results[0].geometry.location
    const adr = response.data.results[0].address_components
    let dong = ''
    for(let item of adr){
      if(item.types.length===3 && item.types[2]==='sublocality_level_2'){
        dong=item.short_name
        break
      }
      if(item.types.length===3 && item.types[2]==='sublocality_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='administrative_area_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='country'){
        dong=item.long_name
        break
      }
    }
    const weather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=hourly?&lat='+location.lat+'&lon='+location.lng+'&appid='+process.env.OPENWEATHER_KEY+'&lang=kr')
    
    const d = new Date()
    const todayDayNum = weekDay[d.toLocaleString("en-US", {weekday: 'short'})]
    
    let weekDayMessage = {}
    if (todayDayNum == 6) {
      weekDayMessage.first = weatherDescription[weather.data.daily[0].weather[0].id]
      weekDayMessage.second = weatherDescription[weather.data.daily[5].weather[0].id]
    } else {
      weekDayMessage.first = weatherDescription[weather.data.daily[5-todayDayNum].weather[0].id]
      weekDayMessage.second = weatherDescription[weather.data.daily[6-todayDayNum].weather[0].id]
    }

    console.log(weekDayMessage)
    res.status(200).send({ message : weekDayMessage })
  }catch (error) {
    console.error(error)
    next(error)
  }
})

// 오늘 미세먼지 조회
router.post('/airPollution',writeHistory, async (req, res, next) => {
  const userId = req.body.userId

  try {
    const user = await User.findOne({
      where: { id: userId }
    })
    if (!user) {
      return res.status(400).json({ message: '존재하지 않는 사용자입니다.' })
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address='+encodeURI(user.main_address)+'&key='+process.env.GEOCODING_KEY);
    const location = response.data.results[0].geometry.location
    const adr = response.data.results[0].address_components
    let dong = ''
    for(let item of adr){
      if(item.types.length===3 && item.types[2]==='sublocality_level_2'){
        dong=item.short_name
        break
      }
      if(item.types.length===3 && item.types[2]==='sublocality_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='administrative_area_level_1'){
        dong=item.short_name
        break
      }
      if(item.types.length===2 && item.types[0]==='country'){
        dong=item.long_name
        break
      }
    }
    const air_pollution = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution?&lat='+location.lat+'&lon='+location.lng+'&appid='+process.env.OPENWEATHER_KEY)

    const aqi = aqi_description[air_pollution.data.list[0].main.aqi]
    res.status(200).send({ message: aqi })
  }catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router