<template>
  <div class="state-name">
    <a href="javascript:void (0)" style="font-size: 15px" @click="stateClick" @mouseover="highLight" @mouseleave="downPlay" class="list-group-item">{{cstateName.CN}}</a>
  </div>
</template>

<script>

  //存放州的名字
  export default {
    name: "StateName",
    props: {
      cstateName: {
        type: Object,
        default(){
          return {}
        }
      },
      ccmyChart: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {

    },
    methods: {
      stateClick(){
        this.$router.push({
          path: '/usa/state',
          query: {
            pro: this.cstateName.EN
          }
        });
        this.ccmyChart.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          name: this.cstateName.EN
        })
      },
      highLight(){
        this.ccmyChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          name: this.cstateName.EN
        })
      },
      downPlay(){
        this.ccmyChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          name: this.cstateName.EN
        })
      }
    }

  }
</script>

<style scoped>
  .state-name {
    /*border: 1px solid red;*/
    height: 45px;
    max-height: 45px;

  }


</style>