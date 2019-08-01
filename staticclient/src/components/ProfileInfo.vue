<template>
	<div class="userprofile">
		<div class="ppc" v-if="user.profilePicture">
			<img class="pp" :src="user.profilePicture" alt="User's profile picture">
		</div>
		<div>
			<div class="username">{{user.username}}</div>
			<div>
				<div style="margin: 0.3rem 0 0.6rem 2rem; font-size: 1rem; display: flex; align-items: center;">
					<div style="width: 1rem; height: 1rem; margin-right: 0.5rem;">
						<img style="width: 100%;" src="../assets/like.png" alt="">
					</div>
					<span>{{totalLikes}} total likes</span>
				</div>
				<div class="box genderbox" v-if="loadingDone">
					Predicted Gender: <b>
						<span v-show="gender.Confidence">{{gender.Value}} ({{Math.floor(gender.Confidence)}}% Confidence)</span>
						<span v-show="!gender.Confidence">Uncertain</span>
					</b><br>
					Predicted Age: <b>
						<span v-show="age.High">{{age.Low + ' to ' + age.High}}</span>
						<span v-show="!age.High">Uncertain</span>
					</b><br>
				</div>
				<div class="box genderbox" v-else>
					<div class="gbh">Status</div><br>
					Text analysis:
					<span class="progstat" v-show="!personality"> In progress</span>
					<span class="progstat" v-show="personality"> Done!</span>
					<br>
					Image analysis:
					<span class="progstat" v-show="!gender"> In progress</span>
					<span class="progstat" v-show="gender"> Done!</span>
					<br>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['user', 'totalLikes', 'gender', 'age', 'personality', 'ibmError'],
	data() {
		return {
			// numberOfPostsScraped: 0,
		}
	},
	created() {
	},
	computed: {
		loadingDone() {
			return ((this.gender && this.personality) || (this.gender && this.ibmError));
		}
	},
}
</script>

<style lang="scss" scoped>
.userprofile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.5rem;
}
.username {
  font-size: 1.8rem;
  padding: 0 1rem 0.2rem 2rem;
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
.progstat {
	color: #592ba1;
	font-weight: bold;
}
.genderbox {
	padding: 0.5rem 0.8rem;
	width: 19rem;
	margin-left: 1.5rem;
	margin-bottom: 0.2rem;
}
.gbh {
	display: inline-block;
	padding: 0 0.3rem;
	background-color: #dfdfdf;
	border-radius: 0.2rem;
}
</style>
