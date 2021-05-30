<template>
  <div class="home" v-cloak>

    <router-link style="text-decoration: none" to="/usa"><h2>美国疫情地图</h2></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import Usa from "../../components/map/Usa";

  export default {
    name: "Home",
    components: {
      Usa
    }
  }

</script>

<style scoped>

</style>