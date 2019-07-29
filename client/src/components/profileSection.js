Vue.component('profile-section', {
  props: ['user'],
  template: 
  `
  <section id="profile" 
    style="display: flex;
    padding: 1.3rem 145px;
    margin: 0px -7.5rem;"
  >
    <div style="margin-right: 1.5rem;">
      <img src="http://placehold.it/100x100" alt="" style="border-radius: 50%;">
    </div>
    <div>
      <div style="font-size: 30px;">
        <span class="mr-2" v-if="user.summary.gender==='Male'"><i class="fas fa-mars" style="font-size: 1.4rem;
        color: rgb(81, 184, 232);;"></i></span>
        <span class="mr-2" v-else-if="user.summary.gender==='Female'"><i class="fas fa-venus" style="font-size: 1.4rem;
        color: #f26d84;"></i></span>
        {{user.username}}
      </div>
      <div class="color-grey3 fs-14" style="color: #f783ac"><i class="fas fa-heart" style="margin-right: .3rem"></i>1,323 total likes</div>
      <div class="color-grey3 fs-14">post from July 4th, 2015-August 15th, 2019</div>
    </div>
  </section>
  `,
  mounted() {
    console.log(this.user);
  },
})