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
  margin-bottom: 0.5rem;
  padding: 0.1rem 0.5rem;
  background-color: #eee;
  border-radius: 0.3rem;
	font-size: 1rem;
	font-weight: 700;
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

