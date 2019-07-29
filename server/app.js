const express = require('express')
const app = require('./expressInstance')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 3000
const cors = require('cors')
const index = require('./router')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/', index)

io.on('connection', function(socket){
    console.log('a user is connected')
    io.emit('hello')
    app.on('start', function(){
        console.log("hai")
        io.emit('controller')
    });


})


http.listen(port, ()=>{
    console.log('listening to port', port)
})

//start-rubhi-123abc