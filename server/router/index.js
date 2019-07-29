const router = require('express').Router()
const controller = require('../controller')
const translateToEnglish = require('../middleware/translateToEnglish').translateToEnglish

router.get('/', (req,res)=>{
    res.status(200).json('Hello World, I am Instanalysiss')
})

router.get('/analysis', translateToEnglish, controller.analysis)

module.exports = router