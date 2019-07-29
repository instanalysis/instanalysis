const router = require('express').Router()
const controller = require('../controller')


router.get('/', (req,res)=>{
    res.status(200).json('Hello World, I am Instanalysis')
})

router.get('/analysis', controller.analysis)

module.exports = router