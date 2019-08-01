<template>
  <div id="app">
    <div id="topnav">
      <div id="brand">InstAnalysis</div>
      <div style="display: flex; ">
        <div id="aboutlink" @click="goToAboutPage" style="margin-right: 1rem">About</div>
        <div id="print" @click="printPage">Print</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    printPage() { window.print() },
    goToAboutPage() { this.$router.push('/about') }
  },
}
</script>

<style lang="scss">
$purp1: #592ba1;
* {
  margin: 0;
  padding: 0;
}
#app {
  max-width: 1290px;
  margin: 0 auto;
  font-family: "Open Sans", "Segoe UI", "Helvetica Neue", Helvetica, sans-serif;
  color: #222222;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#topnav {
  padding: 0.8rem 1.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#brand {
  font-size: 22px;
  font-weight: 700;
}
#aboutlink,
#print {
  cursor: pointer;
  background-color: #dfdfdf;
  padding: 0.3rem 0.6rem 0.4rem 0.6rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
}

</style>
