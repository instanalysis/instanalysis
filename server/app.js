const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const index = require('/router')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/', index)



express.listen(port, ()=>{
    console.log('listening to port', port)
})


