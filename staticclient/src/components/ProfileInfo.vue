<template>
	<div class="userprofile">
		<div class="ppc" v-if="user.profilePicture">
			<img class="pp" :src="user.profilePicture" alt="">
		</div>
		<div class="username">{{user.username}}</div>
	</div>
</template>

<script>
export default {
	props: ['user'],
	data() {
		return {
			// numberOfPostsScraped: 0,
		}
	},
	created() {
		console.log(this.user)
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
</style>
