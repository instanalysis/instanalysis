<template>
  <div class="match">
    <div id="header-compare" class="active">
      <div style="display: flex; justify-content: space-evenly;">
        <div style="display: flex">
          <div class="circle purple"></div>
          <div>{{$route.query.user}}</div>
        </div>
        <div v-if="matchTotalScore">
          {{matchTotalScore}}
        </div>
        <div style="display: flex">
          <div class="circle orange"></div>
          <div>{{$route.query.match}}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="userprofile" style="display: flex; justify-content: space-evenly;" v-if="startData">
        <div style="display: flex; justify-content: space-evenly;">
          <div style="width:80px; height: 80px;">
            <div class="circle__background bg-soft-purple">
              <img class="pp" :src="startData.profilePicture" alt="Profile picture" style="width:80px; height:80px; border-radius: 50%; border: solid 2px #fff">
            </div>
          </div>
          <div class="username">{{$route.query.user}}</div>
        </div>
        <div v-if="match.totalScore" style="color: #616161;">
          <p style="font-size: 2.6rem; margin-bottom: -9px;">{{matchTotalScore}}</p>
          <p style="font-size: .9rem;">Compability</p>
        </div>
        <div style="align-self: center;" v-else>
          <p style="font-size: .9rem;">Matching in progress...</p>
        </div>
        <div style="display: flex; justify-content: space-evenly;">
          <div style="width:80px; height: 80px;">
            <div class="circle__background bg-soft-orange">
              <img class="pp" :src="startDataCompare.profilePicture" alt="Profile picture" style="width:80px; height:80px; border-radius: 50%; border: solid 2px #fff">
            </div>
          </div>
          <div class="username">{{$route.query.match}}</div>
        </div>
      </div>

      <section v-if="needs && values && personality">
        <compare-profile 
          :personalities="personality" 
          :personalitiesCompare="personalityCompare"
          :matchScore="match.personalityScore"
          style="margin-top: 3rem"
        ></compare-profile>
        <compare-needs
          :needs="needs" 
          :needsCompare="needsCompare"
          :matchScore="match.needsScore"
          style="margin-top: 2rem"
        ></compare-needs>
        <compare-values 
          :values="values"
          :valuesCompare="valuesCompare"
          :matchScore="match.valuesScore"
          style="margin-top: 2rem"
        ></compare-values>
      </section>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic';
import io from 'socket.io-client';
import axios from 'axios';

import CompareProfile from '@/components/Compare/Profile'
import CompareNeeds from '@/components/Compare/Needs'
import CompareValues from '@/components/Compare/Values'

// import startData from './mockResponse/start';
// import ibmData from './mockResponse/ibm';

// import startDataCompare from './mockResponse/startCompare';
// import ibmDataCompare from './mockResponse/ibmCompare';

export default {
  name: 'match',
  components: {
    CompareProfile,
    CompareNeeds,
    CompareValues
  },
  data() {
    return {
      username: '',
      profilePicture: '',
      key: '',
      message: '',
      startData: {},
      ibmData: {},
      usernameCompare: '',
      startDataCompare: {},
      ibmDataCompare: {},
      match: {
        personalityScore: 0,
        needsScore: 0,
        valuesScore: 0,
        totalScore: 0
      }
    }
  },
  methods: {
    async getSavedUser() {
      //compare | match | left side
      const getSavedUsers = JSON.parse(localStorage.getItem('savedUsers'))
      const user1 = getSavedUsers.find(user=>user.username === this.$route.query.match)
      this.usernameCompare = user1.username
      this.startDataCompare=user1.startData
      this.ibmDataCompare=user1.ibmData

      // user1.ibmData = ibmData.personalityAnalysisResult

      const socket = io("http://server.instanalysis.online/");
      let user2IbmData = {}
      let user2StartData = {}

      socket.on(`start-${this.$route.query.user}-${this.$route.query.key}`, (data) => {
        user2StartData = data
        this.startData=data
      });
      socket.on(`ibm-${this.$route.query.user}-${this.$route.query.key}`, (data) => {
        user2IbmData = data.personalityAnalysisResult
        this.ibmData=data.personalityAnalysisResult

        axios.post('http://34.87.39.190/match', 
        {
          user1: user1.ibmData,
          user2: user2IbmData
        })
        .then(({data}) => {
          this.match.personalityScore = data.personalityScore ? data.personalityScore : 0
          this.match.needsScore = data.needsScore ? data.needsScore : 0
          this.match.valuesScore = data.valuesScore ? data.valuesScore : 0
          this.match.totalScore = data.totalScore ? data.totalScore : 0        
        })
        .catch(err => {
          console.log('err', err);
        })
      });      
     

      // setTimeout(() => {
      //   this.startDataCompare = startDataCompare;
      //   this.ibmDataCompare = ibmDataCompare.personalityAnalysisResult;
      // }, 1500)

      // setTimeout(() => {
      //   this.startData = startData;
      //   this.ibmData = ibmData.personalityAnalysisResult;
      // }, 1500)
    },
    initScrollMagic() {
      const controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 100}});

      new ScrollMagic.Scene({})
        .setClassToggle("#header-compare", "hide")
        .addTo(controller);
    }
  },
  created() {
    // const savedUsers = JSON.stringify({"savedUsers": [ {"username": "harry", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "ron", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "max", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "yonathan", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}]})
    // localStorage.setItem('savedUsers', savedUsers)

    this.getSavedUser()
  },
  mounted() {
    this.initScrollMagic();
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
    },
    personality() {
      return this.ibmData.personality
    },
    personalityCompare() {
      return this.ibmDataCompare.personality
    },
    needs() {
      if(this.ibmData && this.ibmData.needs) {
        return this.ibmData.needs.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    needsCompare() {
      if(this.ibmDataCompare && this.ibmDataCompare.needs) {
        return this.ibmDataCompare.needs.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    values() {
      if(this.ibmData && this.ibmData.values) {
        return this.ibmData.values.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    valuesCompare() {
      if(this.ibmDataCompare && this.ibmDataCompare.values) {
        return this.ibmDataCompare.values.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    matchTotalScore() {
      return Math.round(100 - (this.match.totalScore * 100)) + '%'
    },
    matchNeedsScore() {
      return Math.round(100 - (this.match.needsScore * 100)) + '%'
    },
    matchValuesScore() {
      return Math.round(100 - (this.match.valuesScore * 100)) + '%'
    },
    matchPersonalityScore() {
      return Math.round(100 - (this.match.personalityScore * 100)) + '%'
    },
  }
}
</script>

<style>
#header-compare {
  position: fixed;
  left: -1%;
  width: 100%;
  background-color: rgba(255,255,255, 0.96);
  box-shadow: 0.1rem 0.3rem 0.3rem -0.5rem #777;
  margin-left: 0rem;
  padding: 1rem 3rem;
  margin-top: -3rem;
  z-index: 999;
}
.active { display: block; }
.hide { display: none  !important; }
.circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  align-self: center;
  margin-right: .7rem;
}
.purple { background-color: rgb(108, 63, 182); }
.orange { background-color: #ff8f56; }
.username {
  font-size: 25px;
  -ms-flex-item-align: center;
  align-self: center;
  margin-left: 1.3rem;
  color: #616161;
}
.bg-soft-purple {background-color: rgb(183, 139, 255);}
.bg-soft-orange {background-color: #f0b190;}
.circle__background {
  border-radius: 50%;
  width: 85px;
  height: 85px;
  padding: 2px;
}
</style>
