const socket = io("http://localhost:3000/");
// import axios from 'axios'

axios.get('http://localhost:3000/analysis')
.then(response=>{
    console.log(response)
})
.catch(console.log)

console.log("client")
socket.on('controller', function(){
    console.log('haiiii trigger dari controller')
});
socket.on('hello', function(){
    console.log('haiiii lame')
});