<template>
  <div class="match">
    <div id="header-compare" class="active">
      <div style="display: flex; justify-content: space-evenly;">
        <div style="display: flex">
          <div class="circle purple"></div>
          <div>{{$route.query.match}}</div>
        </div>
        <div style="display: flex">
          <div class="circle orange"></div>
          <div>{{$route.query.user}}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="userprofile" style="display: flex; justify-content: space-evenly;">
        <div style="display: flex; justify-content: space-evenly;">
          <div style="width:75px; height: 75px;">
            <img class="pp" :src="startData.profilePicture" alt="" style="width:100%; height:100%; border-radius: 50%;">
          </div>
          <div class="username">{{$route.query.match}}</div>
        </div>

        <div style="display: flex; justify-content: space-evenly;">
          <div style="width:75px; height: 75px;">
            <img class="pp" :src="startDataCompare.profilePicture" alt="" style="width:100%; height:100%; border-radius: 50%;">
          </div>
          <div class="username">{{$route.query.user}}</div>
        </div>
      </div>
      <compare-profile 
        :personalities="personality" 
        :personalitiesCompare="personalityCompare" 
        style="margin-top: 3rem"
      ></compare-profile>
      <compare-needs  
        :needs="needs" 
        :needsCompare="needsCompare"
        style="margin-top: 2rem"
      ></compare-needs>
      <compare-values 
        :values="values"
        :valuesCompare="valuesCompare"
        style="margin-top: 2rem"
      ></compare-values>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic';
import io from 'socket.io-client';

import CompareProfile from '@/components/Compare/Profile'
import CompareNeeds from '@/components/Compare/Needs'
import CompareValues from '@/components/Compare/Values'

import startData from './mockResponse/start';
import ibmData from './mockResponse/ibm';

import startDataCompare from './mockResponse/startCompare';
import ibmDataCompare from './mockResponse/ibmCompare';

export default {
  name: 'match',
  components: {
    CompareProfile,
    CompareNeeds,
    CompareValues
  },
  data() {
    return {
      username: 'yonathanloekito',
      profilePicture: 'https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com',
      key: '',
      message: '',
      startData: {},
      ibmData: {},
      usernameCompare: 'harrypotter',
      startDataCompare: {},
      ibmDataCompare: {}
    }
  },
  methods: {
    getSavedUser() {
      const getSavedUsers = JSON.parse(localStorage.getItem('savedUsers'))
      const user1 = getSavedUsers.savedUsers.find(user=>user.username === this.$route.query.match)
      // this.savedUser = user1

      // localstorage mock ?match
      this.startData = startData;
      setTimeout(() => {
        this.ibmData = ibmData.personalityAnalysisResult;
      }, 1500)

      // localStorage moch ?user
      this.startDataCompare = startDataCompare;
      setTimeout(() => {
        this.ibmDataCompare = ibmDataCompare.personalityAnalysisResult;
      }, 1500)

      setTimeout(() => {
        const extid = 'njalbdhpniekifijjefichllkdjeecll'
        // chrome.runtime.sendMessage(extid, {saveUser: {test: 'sartoien'}});
      }, 500)
    },
    initScrollMagic() {
      const controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 100}});

      new ScrollMagic.Scene({})
        .setClassToggle("#header-compare", "hide")
        .addIndicators()
        .addTo(controller);
    }
  },
  created() {
    const savedUsers = JSON.stringify({"savedUsers": [ {"username": "stef", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "lutfi", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "max", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "yonathan", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}]})
    localStorage.setItem('savedUsers', savedUsers)

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
    }
  }
}
</script>

<style>
#header-compare {
  position: fixed;
  left: -1%;
  width: 100%;
  background-color: rgba(255,255,255, 0.9);
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
</style>
