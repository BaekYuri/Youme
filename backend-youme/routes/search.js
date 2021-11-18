const express = require('express')
const request = require('request')

const router = express.Router()
const { writeHistory } = require('./middlewares')
// 뉴스 검색
router.post('/news',writeHistory, async (req, res, next) => {
  const search_thing = req.body.query
  const api_url = 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(search_thing) + '&display=5&sort=sim'
  const options = {
    url: api_url,
    headers: {'X-Naver-Client-Id' : process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret' : process.env.NAVER_SECRET}
  }
  
  try {
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'})
        res.end(body)
      } else {
        res.status(response.statusCode).end()
        console.log('error = ' + response.statusCode)
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// 사전 검색
router.post('/encyc',writeHistory, async (req, res, next) => {
  const search_thing = req.body.query
  const api_url = 'https://openapi.naver.com/v1/search/encyc.json?query=' + encodeURI(search_thing) + '&display=1'
  const options = {
    url: api_url,
    headers: {'X-Naver-Client-Id' : process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret' : process.env.NAVER_SECRET}
  }
  
  try {
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'})
        res.end(body)
      } else {
        res.status(response.statusCode).end()
        console.log('error = ' + response.statusCode)
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router