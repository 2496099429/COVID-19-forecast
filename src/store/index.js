import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {getMapData,getListData} from "network/request";
import CNName from "../assets/js/map/CNName";
import {getMyData} from "../network/request";

let StateName;//州名
let OrderStateName;//字典序州名
let ENOrderStateName;//英文序州名

/*requestUSA({
  url: '/data/asset/geo/USA.json',
  method: 'get'
}).then(res => {
  StateName = res.data.features.map((features) => {
    let enname = features.properties.name;
    let cnname = CNName(enname)
    return  {'EN': enname,'CN': cnname}
  })
  OrderStateName = StateName.sort(function (a, b) {

    let chineseA = a.CN;
    let chineseB = b.CN;
    return chineseA.localeCompare(chineseB)
  });
  ENOrderStateName = StateName.sort(function (a, b) {

    let chineseA = a.EN;
    let chineseB = b.EN;
    return chineseA.localeCompare(chineseB)
  });
})*/


Vue.use(Vuex)

const state = {
  StateName: [],
  OrderStateName: [],
  ENOrderStateName: [],
  SelectStateName: [],
  SortStateName: [], //默认为累积确诊降序


}

const store = new Vuex.Store({
  state,
  getters: {

  },
  mutations: {
    UpdateData(state, payload) {
      state.StateName = payload.StateName;
      state.OrderStateName = payload.OrderStateName;
      state.ENOrderStateName = payload.ENOrderStateName;
      state.SelectStateName = state.OrderStateName;

    },

    SelectData(state, payload) {//按中文或英文选
      state.SelectStateName = state.OrderStateName.filter(res => {
        return res.CN.indexOf(payload) !== -1 || res.EN.toLowerCase().indexOf(payload.toLowerCase()) !== -1
      })

    },

    SortData(state,payload){

      if (payload.cIndex === 1){   //按新增确诊排序
        if (payload.currentIndex){ //按降序排序
          state.SortStateName.sort(function (a,b) {
            return b.addIll-a.addIll
          })
        }else{  //按升序排序
          state.SortStateName.sort(function (a,b) {
            return a.addIll-b.addIll
          })
        }

      }else if (payload.cIndex === 2){ //按累积确诊排序
        if (payload.currentIndex){ //按降序排序
          state.SortStateName.sort(function (a,b) {
            return b.totalIll-a.totalIll
          })
        }else{  //按升序排序
          state.SortStateName.sort(function (a,b) {
            return a.totalIll-b.totalIll
          })
        }
      }else if (payload.cIndex === 3){ //按新增死亡排序

        if (payload.currentIndex){ //按降序排序
          state.SortStateName.sort(function (a,b) {
            return b.addDead-a.addDead
          })
        }else{  //按升序排序
          state.SortStateName.sort(function (a,b) {
            return a.addDead-b.addDead

          })
        }
      }else if (payload.cIndex === 4){ //按累积死亡排序
        if (payload.currentIndex){ //按降序排序
          state.SortStateName.sort(function (a,b) {
            return b.totalDead-a.totalDead
          })
        }else{  //按升序排序
          state.SortStateName.sort(function (a,b) {
            return a.totalDead-b.totalDead
          })
        }
      }


    },
    UpdateList(state,payload){
      for (const item of payload) {
        item.stateName = CNName(item.stateName)
      }

      state.SortStateName = payload;
    }


  }


  ,
  actions: {

    getData(context){

      getMapData({
        url: '/data/asset/geo/USA.json',
        method: 'get'
      }).then(res => {
        /*console.log(res);*/
        StateName = res.features.map((features) => {
          let enname = features.properties.name;
          let cnname = CNName(enname)

          return  {EN: enname,CN: cnname}
        })

        OrderStateName = [...StateName];

        OrderStateName.sort(function (a, b) {
          let chineseA = a.CN;
          let chineseB = b.CN;
          return chineseA.localeCompare(chineseB)
        });
        ENOrderStateName = [...StateName];
        ENOrderStateName.sort(function (a, b) {

          let chineseA = a.EN;
          let chineseB = b.EN;
          return chineseA.localeCompare(chineseB)
        });
        context.commit('UpdateData',{StateName,OrderStateName,ENOrderStateName});
      })
    },

    getList(context){

      getMyData({
        url: "/queryStateEpidemicListByDate?date_=2020-05-19"
      }).then(res => {

        let data = res;

        context.commit('UpdateList',data.sort(function (a,b) {

          return b.totalIll - a.totalIll;
        }));
      })




    }


  }

})



export default store





