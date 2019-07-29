const socket = io("http://localhost:3000/");
// import axios from 'axios'
const mockData ={
	"username": "viryse",
    "posts": [
       {
                "imageURL": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
                "caption": "Unplug and unwind",
                "likes": 2842,
                "date": 2017
            },
            {
                "imageURL": "https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg",
                "caption": "Kalau senen bisa seru, kenapa nggak? #kenapaya?",
                "likes": 2369,
                "date":"2017"
            },
            {
                "imageURL": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "caption": "Clubstyle ✌️ #fxdc #clubstyle #dyna",
                "likes": 2369,
                "date":"2017"
            }
        ]
    } 
axios.post('http://localhost:3000/analysis', {
	data: mockData
})
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