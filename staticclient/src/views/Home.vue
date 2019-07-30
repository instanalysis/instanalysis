<template>
  <div class="home">
    <div class="stripes">
    </div>
    <div class="container">
      <profile-info :user="userData"/>
      <text-data
        :wordStr="startData.wordCloud"
        :wordCount="ibmData.word_count"
        :personality="personality"
        :needs="needs"
        :values="values"
        :consumptionPreferences="consumptionPreferences"
        v-if="personality"
      />
      <image-data
        :perPost="perPost"
        :emotions="emotions"
        :interests="interests"
        v-if="perPost"
      />
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
    this.startData = startData;
    setTimeout(() => {
      this.ibmData = ibmData.personalityAnalysisResult;
      this.rekogData = rekogData;
    }, 1000)

    setTimeout(() => {
      const extid = 'njalbdhpniekifijjefichllkdjeecll'
      chrome.runtime.sendMessage(extid, {saveUser: {test: 'sartoien'}});
    }, 500)
    
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
      return this.rekogData.perPost
    },
    emotions() {
      return this.rekogData.summary.emotionFromPosts
    },
    interests() {
      return this.rekogData.summary.interestFromPosts
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

