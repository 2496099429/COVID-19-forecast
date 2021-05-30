<template>
  <div id="app" v-cloak>
<!--    <Usa :cshow="false"></Usa>-->

    <div>

      <keep-alive><router-view></router-view></keep-alive>

    </div>
  </div>
</template>

<script>
import Home from "views/home/Home"
import State from "components/map/State";

export default {
  name: 'App',
  components: {
    Home,
    State
  },
  created() {
  }
}
</script>


<style>

    @import "~assets/css/myCss.css";
    @import "~assets/css/layout.css";

#app {

}

/*#body {
  !*background-image: url("./assets/img/home/bgc.png");*!
  !*background-size: 1600px 1000px;*!
  !*background-repeat: no-repeat;*!
  !*background-attachment: fixed;*!
}*/


</style>
