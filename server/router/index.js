const router = require('express').Router()
const controller = require('../controller')
const translateToEnglish = require('../middleware/translateToEnglish')

router.get('/', (req,res)=>{
    res.status(200).json('Hello World, I am Instanalysiss')
})

router.post('/analysis', translateToEnglish, controller.analysis)
// router.post('/analysis', translateToEnglish, controller.analysis)

module.exports = router