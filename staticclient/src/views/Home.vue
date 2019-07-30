<template>
  <div class="home">
    <div class="stripes">
    </div>
    <div class="container">
      <div class="userprofile">
        <div class="ppc">
          <img class="pp" src="https://scontent-sin2-2.cdninstagram.com/vp/6f793dacb0901845be55c3624ca6bed0/5DD5956B/t51.2885-19/s320x320/59440893_336666376926221_276408968295743488_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com" alt="">
        </div>
        <div class="username">zachlavine8</div>
      </div>
      <text-data/>
      <image-data/>
    </div>
    <p style="display: inline-block; margin: 0.5rem; background-color: #ddd;">
      User: {{user}}<br>Key: {{key}}<br>
      {{message}}
    </p>
  </div>
</template>

<script>
import ProfileInfo from '@/components/ProfileInfo.vue';
import TextData from '@/components/TextData.vue';
import ImageData from '@/components/ImageData.vue';
import io from 'socket.io-client';

export default {
  name: 'home',
  components: {
    ProfileInfo, TextData, ImageData
  },
  data() {
    return {
      user: '',
      key: '',
      message: '',
    }
  },
  created() {
    if((!this.$route.query.user) || (!this.$route.query.key) ) {
      this.message = 'Welcome to InstAnalysis'
    } else {
      this.user = this.$route.query.user
      this.key = this.$route.query.key
    }
  },
  mounted() {
    const mockData ={
      username: "viryse",
      key: 'arst1234',
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
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
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
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
            "likes": 2369,
            "date": 2017
        },
        {
            "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "caption": "Iceland is petrifying.",
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
    // axios.post('http://34.87.39.190/analysis', mockData)
    //   .then(({data})=>{
    //     console.log(data)
    //   })
    //   .catch(console.log)
    // socket
    const socket = io("http://34.87.39.190/");

    socket.on(`start-${this.user}-123abc`, function(data){
        console.log('started', data)
    });
    socket.on(`ibm-${this.user}-123abc`, function(data){
        console.log('IBM ANALYSIS', data)
    });
    socket.on(`rekog-${this.user}-123abc`, function(data){
        console.log('AMAZON rekogniton', data)
    });

    // socket.on('hello', function(){
    //     console.log('haiiii lame')
    // });
  },
}
</script>

<style lang="scss">
$purp1: #592ba1;
$purp2: #6c3fb6;
.sectionhead {
	margin: 0rem 0 0.8rem 0.5rem;
	.heading {
		font-size: 1.2rem;
		font-weight: bold;
		color: $purp1;
	}
}
.wordcount {
	display: inline-flex;
	margin-right: 0.2rem;
	font-size: 0.9rem;
	border-radius: 0.4rem;
	overflow: hidden;
}
.wcn {
	padding: 0.4rem 0.8rem;
	background-color: #eee;
}
.prp {
	background-color: $purp2;
	color: white;
}
.box {
	padding: 0.8rem;
	margin-bottom: 1.2rem;
	border-radius: 0.5rem;
	box-shadow: 0.1rem 0.2rem 1.1rem -0.5rem #777;
	line-height: 1.6rem;
	font-size: 0.9rem;
}
.boxheading {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.1rem 0.5rem;
  background-color: #eee;
  border-radius: 0.3rem;
	font-size: 1rem;
	font-weight: 700;
}
.offset-l {
	margin-left: 1rem;
}
.userprofile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.5rem;
}
.username {
  font-size: 2rem;
  padding: 0 1rem 1rem 2rem;
}
.ppc {
  width: 150px;
  height: 150px;
  border-radius: 100px;
  overflow: hidden;
}
.pp {
  max-width: 100%
}
.stripes {
  height: 10rem;
  display: none;
  background: linear-gradient(150deg,#53f 15%,#05d5ff 70%,#a6ffcb 94%);
}
.container {
  padding: 0rem 1.5rem;
}
</style>

