const socket = io("http://localhost:3000/");
// import axios from 'axios'
const mockData ={
	"username": "viryse",
	"userimage": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
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
        },
        {
	        "imageURL": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
	        "caption": "Unplug and unwind",
	        "likes": 2842,
	        "date": 2017
        },
        {
            "imageURL": "https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg",
            "caption": "If monday can be fun, Wae Rebo? #kenapaya?",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "caption": "Clubstyle ✌️ #fxdc #clubstyle #dyna",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "One of those places where you’d feel so young 👨🏻👵🏻",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        }
        ]
    } 
axios.post('http://localhost:3000/analysis', mockData)
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