<template>
    <div >
      <div style="font-size: 30px;text-align: left "><strong>美国各州疫情汇总</strong></div>
      <table class="table table-bordered table-hover table-striped" style="background-color:white;">

        <thead >
        <tr class="warning">
          <th style="text-align: center">地区</th>
          <th style="text-align: center"><div style="display: flex"><div style="flex: 1"></div>新增确诊 <a-confirm-button @change-index="changeIndex" :c-index="1" :ccurrent-index="currentIndex" style="left: 0px"></a-confirm-button> <div style="flex: 1"></div></div></th>
          <th style="text-align: center"><div style="display: flex"><div style="flex: 1"></div>累积确诊 <a-confirm-button @change-index="changeIndex" :c-index="2" :ccurrent-index="currentIndex" style="left: 0px"></a-confirm-button> <div style="flex: 1"></div></div></th>
          <th style="text-align: center"><div style="display: flex"><div style="flex: 1"></div>新增死亡 <a-confirm-button @change-index="changeIndex" :c-index="3" :ccurrent-index="currentIndex" style="left: 0px"></a-confirm-button> <div style="flex: 1"></div></div></th>
          <th style="text-align: center"><div style="display: flex"><div style="flex: 1"></div>累积死亡 <a-confirm-button @change-index="changeIndex" :c-index="4" :ccurrent-index="currentIndex" style="left: 0px"></a-confirm-button> <div style="flex: 1"></div></div></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="item in $store.state.SortStateName" >
            <td>{{item.stateName}}</td>
            <td>{{item.addIll}}</td>
            <td>{{item.totalIll}}</td>
            <td>{{item.addDead}}</td>
            <td>{{item.totalDead}}</td>
          </tr>

        </tbody>

      </table>
    </div>
</template>

<script>
  import AConfirmButton from "../buttoncontent/AConfirmButton";

  export default {
    name: "ListContent",
    methods: {

      changeIndex(index){
        this.currentIndex = index;
      }
    },
    components: {
      AConfirmButton
    },
    data(){
      return {
        currentIndex: 2
      }
    }
  }
</script>

<style scoped>

</style>