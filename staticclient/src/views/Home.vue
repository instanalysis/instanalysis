<template>
  <div class="home">
    <div class="stripes">
    </div>
    <div class="container">
      <profile-info
        :user="userData"
        :totalLikes="startData.totalLikes"
        :gender="gender"
        :age="age"
        :personality="personality"
        v-if="startData.totalLikes"/>
      <text-data
        :wordStr="startData.wordCloud"
        :wordCount="ibmData.word_count"
        :personality="personality"
        :needs="needs"
        :values="values"
        :consumptionPreferences="consumptionPreferences"
        v-show="startData.totalLikes"
      />
      <image-data
        :perPost="perPost"
        :emotions="emotions"
        :interests="interests"
        v-show="startData.totalLikes"
      />
    </div>
    <div style="margin: 3rem 1rem; text-align: center;" v-if="message">
      {{message}}
    </div>
  </div>
</template>

<script>
import ProfileInfo from '@/components/ProfileInfo.vue';
import TextData from '@/components/TextData.vue';
import ImageData from '@/components/ImageData.vue';
import io from 'socket.io-client';
// mock
// import startData from './mockResponse/start';
// import ibmData from './mockResponse/ibm';
// import rekogData from './mockResponse/rekog';

export default {
  name: 'home',
  components: {
    ProfileInfo, TextData, ImageData,
  },
  data() {
    return {
      username: '',
      profilePicture: '',
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
    const mock = false;
    if(mock) {
      // setTimeout(() => { this.startData = startData;
      // }, 2000)
      // setTimeout(() => { this.ibmData = ibmData.personalityAnalysisResult;
      // }, 4000)
      // setTimeout(() => { this.rekogData = rekogData
      // }, 6000);
    } else {
      const socket = io("http://server.instanalysis.online/");
      socket.on(`start-${this.username}-${this.key}`, data => this.startData = data);
      socket.on(`ibm-${this.username}-${this.key}`, data => this.ibmData = data.personalityAnalysisResult);
      socket.on(`rekog-${this.username}-${this.key}`, data => this.rekogData = data);
      setTimeout(() => {
        if(!this.startData.totalLikes) {
          this.message = 'Welcome to InstAnalysis. Open our extension on an Instagram profile to get results.'
        }
      }, 5500)
      
    }
  },
  computed: {
    userData() {
      return {
        username: this.username,
        profilePicture: this.startData.profilePicture,
      }
    },
    personality() {
      if(this.ibmData.personality) {
        return this.ibmData.personality.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    needs() {
      if(this.ibmData.needs) {
        return this.ibmData.needs.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    values() {
      if(this.ibmData.values) {
        return this.ibmData.values.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    consumptionPreferences() {
      if(this.ibmData.consumption_preferences) {
        let combined = {}
        this.ibmData.consumption_preferences.forEach(ob => {
          ob.consumption_preferences.forEach(ob2 => {
            combined[ob2.consumption_preference_id] = ob2.score
          })
        })
        return combined;
      } else return null;
    },
    perPost() {
      if(this.rekogData.perPost) {
        return this.rekogData.perPost
      } else return null;
    },
    emotions() {
      if(this.rekogData.summary) {
        return this.rekogData.summary.emotionFromPosts
      } else return null;
    },
    interests() {
      if(this.rekogData.summary) {
        return this.rekogData.summary.interestFromPosts
      } else return null;
    },
    age() {
      if(this.rekogData.summary) {
        return this.rekogData.summary.age
      } else return null;
    },
    gender() {
      if (this.rekogData.summary) {
        return this.rekogData.summary.gender
      } else return null;
    },
  },
  watch: {
    ibmData() {
      if(this.personality) {
        const extid = 'njalbdhpniekifijjefichllkdjeecll'
        let currentUser = {
          username: this.username,
          startData: this.startData,
          ibmData: this.ibmData,
        }
        
        let arr = JSON.parse(localStorage.get('savedUsers')) || []
        console.log(arr)
        if(!arr.find(user => user === this.username) || arr.length === 0) {
          arr.push(currentUser)
          localStorage.setItem('savedUsers', JSON.stringify(arr))
          chrome.runtime.sendMessage(extid, {saveUser: {
            username: this.username
          }});
        }
      }
    },
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
	box-shadow: 0.1rem 0.2rem 1.1rem -0.4rem #777;
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
.stripes {
  height: 10rem;
  display: none;
  background: linear-gradient(150deg,#53f 15%,#05d5ff 70%,#a6ffcb 94%);
}
.container {
  padding: 0rem 1.5rem;
}
</style>
