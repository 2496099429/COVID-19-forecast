//折线图和柱状图切换
import * as echarts from 'echarts'
import {request} from "network/request";
import axios from 'axios'
import CNName from "./CNName";
import router from "../../../router";

export function PaintPredict(LineName) {
    let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

    let chartDom = document.getElementById('predict-line');
    let myChart = echarts.init(chartDom);
    // myChart.clear();
    let option;
    let CNStateName = '预测'

    /*let myChart1 = echarts.init(chartDom);
    setTimeout(function () { //经过验证，同一个容器创建的echarts对象是同一个
      if (myChart === myChart1){
        console.log('宝贝娜娜是狗屎娜娜')
      }
    },2000)*/

    /*request({
      url: '',
      method: 'get',
      params: {
        name: StateName
      }
    }).then(function (res) {
      let myChart = echarts.init(document.querySelector("#state"))

      let option = {

        title: {
          text: StateName
        }

      }

      myChart.setOption(option)
    }).catch(err => {
      console.log(err)
    })*/
    let path = '/data/asset/data/aqi-beijing.json'
    if (LineName === '现有'){
        // path = ;

    }else if (LineName === '预测'){
        // path = ;

    }

    axios(ROOT_PATH + path ).then(function (res) {
        let data = res.data

        option = {
            title: {
                text: LineName,
                left: '0'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '1%',
                right: '5%',
                bottom: '10%'
            },
            xAxis: {
                data: data.map(function (item) {//横坐标名称
                    return item[0];
                }),
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
                },

            },
            dataZoom: [{
                startValue: data.length -30,
                type: 'slider',
                maxSpanValue: 30,

            }],
            legend:{},
            series: [
                {

                    name: '新增人数',
                    type: 'line',
                    data: data.map(function (item) { //数据值
                        return item[1] * 20*2*3;
                    }),
                    showSymbol: false,
                    color: 'red',
                    smooth: true,
                    sampling: 'lttb'

                },
                {
                    name: '死亡人数',
                    type: 'line',
                    data: data.map(function (item) { //数据值
                        return item[1] * 10*2*3 - 30;
                    }),
                    color: 'black',
                    smooth: true,
                    showSymbol: false,
                    sampling: 'lttb'
                },

            ],
            animation: true
        }


        myChart.setOption(option,true);


    })
    window.addEventListener('resize',() => {
        myChart.resize()
    })

}

