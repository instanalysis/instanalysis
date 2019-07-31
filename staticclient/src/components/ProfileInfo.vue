<template>
	<div class="userprofile">
		<div class="ppc" v-if="user.profilePicture">
			<img class="pp" :src="user.profilePicture" alt="User's profile picture">
		</div>
		<div>
			<div class="username">{{user.username}}</div>
			<div>
				<div style="margin-left: 1.5rem;">
					Total likes: {{totalLikes}}
				</div>
				<div class="box genderbox">
					Predicted Gender: Female ({{Math.floor(gender.Confidence)}}% Confidence)<br>
					Predicted Age: {{age.Low + ' to ' + age.High}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['user', 'totalLikes', 'gender', 'age'],
	data() {
		return {
			// numberOfPostsScraped: 0,
		}
	},
	created() {
	}
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
  font-size: 2rem;
  padding: 0 1rem 0.5rem 2rem;
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
.genderbox {
	margin-left: 1.5rem;
	margin-bottom: 0.5rem;
}
</style>
