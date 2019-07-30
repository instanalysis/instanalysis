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
      <compare-needs style="margin-top: 2rem"></compare-needs>
      <compare-values style="margin-top: 2rem"></compare-values>
    </div>
  </div>
</template>

<script>
import CompareProfile from '@/components/Compare/Profile'
import CompareNeeds from '@/components/Compare/Needs'
import CompareValues from '@/components/Compare/Values'

export default {
  name: 'match',
  components: {
    CompareProfile,
    CompareNeeds,
    CompareValues
  },
  methods: {
    getInitialUser() {
      const getSavedUsers = JSON.parse(localStorage.getItem('savedUsers'))
      const user1 = getSavedUsers.savedUsers.find(user=>user.username === this.$route.query.match)

      console.log(user1);
    }
  },
  mounted() {
    const savedUsers = JSON.stringify({"savedUsers": [ {"username": "stef", "userImage": "http://www.stef.com", "ibmResult": {}}, {"username": "lutfi", "userImage": "http://www.lutfi.com", "ibmResult": {}}, {"username": "max", "userImage": "http://www.max.com", "ibmResult": {}}, {"username": "yonathan", "userImage": "http://www.yonathan.com", "ibmResult": {}}]})

    localStorage.setItem('savedUsers', savedUsers)


    this.getInitialUser()
  },
}
</script>

<style>

</style>
