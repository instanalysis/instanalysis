const app = require('../expressInstance')

let emitter = function(type, {username, key}, payload){
    app.emit(type, {username, key}, payload)
}