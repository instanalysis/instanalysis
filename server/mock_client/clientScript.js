const socket = io("http://localhost:3000/");
// import axios from 'axios'

axios.get('http://localhost:3000/analysis')
.then(response=>{
    console.log(response)
})
.catch(console.log)

console.log("client")
socket.on('start-viryse-123abc', function(data){
    console.log('haii trigger dari controller', data)
});
socket.on('ibm-viryse-123abc', function(data){
    console.log('IBM ANALYSIS', data)
});
socket.on('rekog-viryse-123abc', function(data){
    console.log('amazon rekogniton', data)
});

socket.on('hello', function(){
    console.log('haiiii lame')
});