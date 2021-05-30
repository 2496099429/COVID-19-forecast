//折线图和柱状图切换
import * as echarts from 'echarts'
import {getState} from "network/request";
import CNName from "./CNName";
import router from "../../../router";
import axios from 'axios'


export function PaintState(StateName) {
  // let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

  let ROOT_PATH = 'http://192.168.31.206:8888'

  let chartDom = document.getElementById('state-a');
  let myChart = echarts.init(chartDom);
  let option;
  let CNStateName = CNName(StateName)



  getState({
    url: ROOT_PATH + '/queryStateEpidemicList?pro='+StateName,
    method: 'get'
  },StateName).then(function (res) {
    let data = res;
    // console.log(res);
    option = {
      title: {
        text: CNStateName ,
        left: '0'
      },
      tooltip: {
        trigger: 'axis',

      },
      grid: {
        left: '1%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        data: data.map(function (item) {//横坐标名称
          return item.date_;
        }),
        boundaryGap: false,

      },
      yAxis: {
        type: 'value',

        name: '单位: 例',
        nameTextStyle: {
          fontSize: 12,
          color: 'rgba(0,0,0,.4)',
          align: 'left',
          inside: true
        },
        axisLabel: {
          fontSize: 12,
          color: 'rgba(0,0,0,.4)',
          inside: true,
          align: 'auto',
        }
      },
      toolbox: {
        right: 10,
        feature: {
          magicType: {
            type: ['line','bar']
          },
          myClose: {
            show: true,

            title: '关闭',
            icon: 'path://M560.264533 512L512 463.735467l248.9344-248.9344 48.264533 48.264533L560.264533 512l248.9344 248.9344-48.264533 48.264533L512 560.264533l-248.9344 248.9344-48.264533-48.264533L463.735467 512 512 560.264533l-248.9344 248.9344-48.264533-48.264533L463.735467 512 214.801067 263.0656l48.264533-48.264533L512 463.735467l248.9344-248.9344 48.264533 48.264533z',
            onclick: function () {
              /*let state = document.getElementById('state-a');
              let parent = state.parentNode;
              parent.removeChild(state);*/
              router.push('/usa');
            }
          }
        },

      },
      dataZoom: [{
        type: 'slider',
      }],
      /*timeline: {

      },*/

      legend:{},
      animation: false,
      series: [
        {

          name: '新增确诊',
          type: 'line',
          data: data.map(function (item) { //数据值
            return item.addIll;
          }),
          color: 'pink',
          smooth: true,
          showSymbol: false,
        },
        {

          name: '累积确诊',
          type: 'line',
          data: data.map(function (item) { //数据值
            return item.totalIll;
          }),
          color: 'red',
          smooth: true,
          showSymbol: false,
        },
        {

          name: '新增死亡',
          type: 'line',
          data: data.map(function (item) { //数据值
            if (item.addDead < 0) item.addDead = 0;
            return item.addDead;
          }),
            color: '#77787b',
          smooth: true,
          showSymbol: false,
        },
        {
          name: '累积死亡',
          type: 'line',
          data: data.map(function (item) { //数据值
            return item.totalDead;
          }),
          color: 'black',
          smooth: true,
          showSymbol: false,
        }
      ]
    }

    myChart.setOption(option);
  })
  window.addEventListener('resize',() => {
    myChart.resize()
  })

}

