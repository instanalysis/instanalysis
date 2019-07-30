<template>
  <div class="match">
    <div class="container">
      <div class="userprofile" style="justify-content: space-evenly;">
        <div class="ppc" style="display: flex;">
          <img class="pp" src="https://scontent-sin2-2.cdninstagram.com/vp/6f793dacb0901845be55c3624ca6bed0/5DD5956B/t51.2885-19/s320x320/59440893_336666376926221_276408968295743488_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com" alt="">
          <div class="username">zachlavine8</div>
        </div>

        <div class="ppc">
          <img class="pp" src="https://scontent-sin2-2.cdninstagram.com/vp/6f793dacb0901845be55c3624ca6bed0/5DD5956B/t51.2885-19/s320x320/59440893_336666376926221_276408968295743488_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com" alt="">
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
      console.log(this.$route.query.user)
      console.log(this.$route.query.key)
      console.log(this.$route.query.match)
    }
  },
  mounted() {
    this.getInitialUser()
  },
}
</script>

<style>

</style>
