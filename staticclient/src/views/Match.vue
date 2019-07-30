<template>
  <div class="match">
    <div class="container">
      <div class="userprofile" style="justify-content: space-evenly;">
        <div style="display: flex; justify-content: space-evenly;">
          <div style="width:150px">
            <img class="pp" src="https://scontent-sin2-2.cdninstagram.com/vp/6f793dacb0901845be55c3624ca6bed0/5DD5956B/t51.2885-19/s320x320/59440893_336666376926221_276408968295743488_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com" alt="" style="width:100%; border-radius: 50%;">
          </div>
          <div class="username">zachlavine8</div>
        </div>

        <div style="display: flex; justify-content: space-evenly;">
          <div style="width:150px">
            <img class="pp" src="https://scontent-sin2-2.cdninstagram.com/vp/6f793dacb0901845be55c3624ca6bed0/5DD5956B/t51.2885-19/s320x320/59440893_336666376926221_276408968295743488_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com" alt="" style="width:100%; border-radius: 50%;">
          </div>
          <div class="username">zachlavine8</div>
        </div>
      </div>
      <compare-profile style="margin-top: 3rem"></compare-profile>
      <compare-needs :needs="needs" style="margin-top: 2rem"></compare-needs>
      <compare-values :values="values" style="margin-top: 2rem"></compare-values>
    </div>
  </div>
</template>

<script>
import CompareProfile from '@/components/Compare/Profile'
import CompareNeeds from '@/components/Compare/Needs'
import CompareValues from '@/components/Compare/Values'
import io from 'socket.io-client';

import startData from './mockResponse/start';
import ibmData from './mockResponse/ibm';
import rekogData from './mockResponse/rekog';

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
      rekogData: {},
    }
  },
  methods: {
    getSavedUser() {
      const getSavedUsers = JSON.parse(localStorage.getItem('savedUsers'))
      const user1 = getSavedUsers.savedUsers.find(user=>user.username === this.$route.query.match)
      // this.savedUser = user1
      // mock
      this.startData = startData;
      setTimeout(() => {
        this.ibmData = ibmData.personalityAnalysisResult;
        this.rekogData = rekogData;
      }, 500)

      setTimeout(() => {
        const extid = 'njalbdhpniekifijjefichllkdjeecll'
        // chrome.runtime.sendMessage(extid, {saveUser: {test: 'sartoien'}});
      }, 500)
    }
  },
  created() {
    const savedUsers = JSON.stringify({"savedUsers": [ {"username": "stef", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "lutfi", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "max", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}, {"username": "yonathan", "userImage": "https://scontent-sin2-2.cdninstagram.com/vp/8d40cd77cea8846909425b7ebc60e50e/5DE3E987/t51.2885-19/s150x150/13395042_1061367873910107_837713333_a.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com", "ibmData": {}}]})

    localStorage.setItem('savedUsers', savedUsers)


    this.getSavedUser()
  },
  computed: {
    userData() {
      return {
        username: this.username,
        profilePicture: this.profilePicture,
      }
    },
    personality() {
      if(this.ibmData && this.ibmData.personality) {
        return this.ibmData.personality.reduce((acc, trait) => {
          acc[trait.trait_id] = Math.round(trait.percentile * 100)
          return acc;
        }, {})
      } else return null;
    },
    needs() {
      if(this.ibmData && this.ibmData.needs) {
        return this.ibmData.needs.reduce((acc, trait) => {
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
    consumptionPreferences() {
      if(this.ibmData && this.ibmData.consumption_preferences) {
        let combined = {}
        this.ibmData.consumption_preferences.forEach(ob => {
          ob.consumption_preferences.forEach(ob2 => {
            combined[ob2.consumption_preference_id] = ob2.score
          })
        })
        return combined;
      } else return null;
    },
  }
}
</script>

<style>

</style>
