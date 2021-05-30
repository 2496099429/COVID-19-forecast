<template>
  <div id="search-box" >
    <search-tab :ccmyChart="cmyChart"></search-tab>
    <state-box>
      <div v-if="$store.state.SelectStateName.length !== 0">
        <state-name v-for="item in $store.state.SelectStateName" :ccmyChart="cmyChart" :cstateName="item" ></state-name>
      </div>
      <div v-else>
        <div style="margin-top: 2.4rem"><span style="font-size: 28px;color: rgba(0,0,0,.5)"><strong><a-empty description="没有数据" /></strong></span></div>
      </div>
    </state-box>
  </div>
</template>

<script>
  import SearchTab from "./SearchTab";
  import StateName from "./StateName";
  import StateBox from "./StateBox";


  //容器
  export default {
    name: "SearchBox",
    components: {
      SearchTab,
      StateName,
      StateBox
    },
    data(){
      return {
        stateName: []
      }
    },
    props: {
      cmyChart: {
        type:Object,
        default(){
          return {}
        }
      }
    }


  }
</script>

<style scoped>
  #search-box {



  }
</style>