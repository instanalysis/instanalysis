<template>
  <div class="home">
    <div class="stripes">
    </div>
    <div class="container">
      <profile-info :user="userData"/>
      <text-data :wordStr="startData.wordCloud" :startData="startData" :ibmData="ibmData"/>
      <image-data/>
    </div>
    <p style="display: inline-block; margin: 0.5rem; background-color: #ddd;">
      User: {{username}}<br>Key: {{key}}<br>
      {{message}}
    </p>
  </div>
</template>

<script>
import ProfileInfo from '@/components/ProfileInfo.vue';
import TextData from '@/components/TextData.vue';
import ImageData from '@/components/ImageData.vue';
import io from 'socket.io-client';
// mock
import startData from './mockResponse/start';
import ibmData from './mockResponse/ibm';
import rekogData from './mockResponse/rekog';

export default {
  name: 'home',
  components: {
    ProfileInfo, TextData, ImageData
  },
  data() {
    return {
      username: 'maximilian',
      profilePicture: 'https://scontent-sin2-2.cdninstagram.com/vp/6f793dacb0901845be55c3624ca6bed0/5DD5956B/t51.2885-19/s320x320/59440893_336666376926221_276408968295743488_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com',
      key: '',
      message: '',
      startData: {},
      ibmData: {},
      rekogData: {},
    }
  },
  created() {
    if((!this.$route.query.user) || (!this.$route.query.key) ) {
      this.message = 'Welcome to InstAnalysis'
    } else {
      this.username = this.$route.query.user
      this.key = this.$route.query.key
    }
    // mock
    this.startData = startData;
    setTimeout(() => {
      this.ibmData = ibmData;
      this.rekogData = rekogData;
    }, 2500)

  },
  mounted() {
    // const socket = io("http://34.87.39.190/");

    // socket.on(`start-${this.user}-123abc`, function(data){
    //     console.log('started', data)
    // });
    // socket.on(`ibm-${this.user}-123abc`, function(data){
    //     console.log('IBM ANALYSIS', data)
    // });
    // socket.on(`rekog-${this.user}-123abc`, function(data){
    //     console.log('AMAZON rekogniton', data)
    // });

  },
  computed: {
    userData() {
      return {
        username: this.username,
        profilePicture: this.profilePicture,
      }
    }
  }
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
	box-shadow: 0.1rem 0.2rem 1.1rem -0.3rem #777;
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
// .userprofile {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 1.5rem;
// }
// .username {
//   font-size: 2rem;
//   padding: 0 1rem 1rem 2rem;
// }
// .ppc {
//   width: 150px;
//   height: 150px;
//   border-radius: 100px;
//   overflow: hidden;
// }
// .pp {
//   max-width: 100%
// }
.stripes {
  height: 10rem;
  display: none;
  background: linear-gradient(150deg,#53f 15%,#05d5ff 70%,#a6ffcb 94%);
}
.container {
  padding: 0rem 1.5rem;
}
</style>

