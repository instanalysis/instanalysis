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
app.use(function(req, res, next) {
    // console.log(io, '--------- io')

  req.io = io;
  next();
});
app.use('/', index)

io.on('connection', function(socket){
    console.log('a user is connected')
    io.emit('hello')

    // app.on('start', function(payload){
    //     let {username, key} = payload[0]
    //     io.emit(`start-${username}-${key}`, payload[1])
    // });
    // app.on('ibm', function(payload){
    //     let {username, key} = payload[0]
    //     io.emit(`ibm-${username}-${key}`, payload[1])
    // })
    // app.on('rekog', function(payload){
    //     let {username, key} = payload[0]
    //     io.emit(`rekog-${username}-${key}`, payload[1])
    // })
    // app.on('disconnect', function(){
    //     io.disconnect()
    // })

})


http.listen(port, ()=>{
    console.log('listening to port', port)
})

//start-rubhi-123abc
