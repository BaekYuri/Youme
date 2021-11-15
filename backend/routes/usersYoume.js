const express = require('express')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()
const { UsersYoume } = require('../models')
const axios = require('axios')
const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, 'hello2.wav') // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})
const fs = require('fs')
const upload = multer({ storage: storage }).single('file')
var XMLHttpRequest = require('xhr2');

const customAxios = axios.create({
    baseURL: process.env.AZURE_ENDPOINT,
    headers:{'Ocp-Apim-Subscription-Key':process.env.AZURE_KEY}
  })
// GET / 라우터
router.get('/',isLoggedIn,  async (req, res, next) => {
    try {
        const youmeInfo = await UsersYoume.findOne({
            where: { UserId: req.user.id,},
        })
        res.status(200).send(youmeInfo)
    }catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/profile', isLoggedIn, async (req, res, next)=>{
    try{
        const result = await customAxios({
            method:'post',
            url:'/speaker/identification/v2.0/text-independent/profiles',
            headers:{'Content-Type':'application/json'},
            data:{locale:'en-US'}
        })

        const youmeInfo = await UsersYoume.update({
            connectedSpeaker: true,
            SpeakerId : result.data.profileId,
        },
        {
            where: {UserId: req.user.id}
        })
        res.status(200).send(result.data.profileId)
    }catch (error) {
        console.error(error)
        next(error)
    }
})
router.delete('/profile', isLoggedIn, async(req,res,next)=>{
    try{
        const speakerId = await UsersYoume.findOne({
            attributes:['SpeakerId']
        },{
            where:{
                UserId : req.user.UserId
            }
        })

        await UsersYoume.update({
            connectedSpeaker: false,
            SpeakerId : null,
        },{
            where: {UserId: req.user.id}
        })

        await customAxios({
            method:'delete',
            url:'/speaker/identification/v2.0/text-independent/profiles/'+speakerId.SpeakerId,
        })

        res.status(200).send('success')
    }catch (error) {
        console.error(error)
        next(error)
    }
})
router.post('/entroll',isLoggedIn, upload,  async (req, res, next)=>{
    try{
        let audio = fs.readFileSync('uploads/hello2.wav')
        const speakerId = await UsersYoume.findOne({
            attributes:['SpeakerId']
        },{
            where:{
                UserId : req.user.UserId
            }
        })
        enrollProfileAudio(audio, speakerId.SpeakerId)
        res.status(200).send('success')
    }catch (error) {
        console.log(error)
        next(error)
    }
})
const enrollIdentificationProfileEndpoint = (profileId) => `${process.env.AZURE_ENDPOINT}/speaker/identification/v2.0/text-independent/profiles/${profileId}/enrollments?ignoreMinLength=true`;

function enrollProfileAudio(blob, profileId){
  
    var request = new XMLHttpRequest();
    var json = null
    request.open("POST", enrollIdentificationProfileEndpoint(profileId), true);
    request.setRequestHeader('Ocp-Apim-Subscription-Key', process.env.AZURE_KEY);
    request.onload = function () {
        console.log('enrolling');
        
      if (request.status==200 || request.status==201) {
          json = JSON.parse(request.responseText);
          console.log(json);
      } else {
          console.log(`Failed to submit for enrollment: got a ${request.status} response code.`);
          json = JSON.parse(request.responseText);
          console.log(`${json.error.code}: ${json.error.message}`);
      }
    };  
    request.send(blob);

    
  }

router.put('/connect', isLoggedIn, async (req, res, next)=>{
    try{
        await UsersYoume.update({
            connectedYoume: true,
            YoumeId : req.body.id,
        },
        {
            where: {UserId: req.user.id}
        })
        res.status(200).send('success')
    }catch (error) {
        console.error(error)
        next(error)
    }
})

router.put('/disconnect', isLoggedIn, async (req, res, next)=>{
    try{
        await UsersYoume.update({
            connectedYoume: false,
            YoumeId : null,
        },
        {
            where: {UserId: req.user.id}
        })
        res.status(200).send('success')
    }catch (error) {
        console.error(error)
        next(error)
    }
})
module.exports = router