<template>
  <div class="state-c">
    <div id="state-a"></div>
    <div style="font-size: 0px" >{{CNStateName}}疫情</div>
  </div>
</template>

<script>
  import {PaintState} from 'assets/js/map/State'
  import CNName from "assets/js/map/CNName";

  export default {
    name: "State",
    mounted() {
      PaintState(this.$route.query.pro);

    },
    computed: {
      CNStateName(){
        return CNName(this.$route.query.pro)
      }
    },
    updated() {
      PaintState(this.$route.query.pro);
    },
    methods: {
      deleteDiv(){//关闭州的折线图
        let div = document.getElementById('state-a');
        let parent = div.parentNode;
        parent.removeChild(div)
        this.$router.push('/usa')
      }
    },
    data(){
      return {
        sss: ''
      }
    }

  }
</script>

<style scoped>

  #state-a {

    width: 13rem;
    max-width: 720px;
    height: 470px;

    background-color: rgba(255,255,255,1) ;

  }

  .state-c {
    position: absolute;
    right: 0%;


  }




</style>