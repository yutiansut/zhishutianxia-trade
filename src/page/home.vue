<template>
    <div id="home">
        <router-link to="/HelloWorld">HelloWorld</router-link>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";



</style>