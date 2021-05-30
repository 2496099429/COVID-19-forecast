//折线图和柱状图切换
import * as echarts from 'echarts'
import {getState} from "network/request";
import axios from 'axios'
import CNName from "./CNName";
import router from "../../../router";

export function PaintNew(LineName) {
    // let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

    let ROOT_PATH = 'http://192.168.31.206:8888';

    let chartDom = document.getElementById('new-line');
    let myChart = echarts.init(chartDom);
    // myChart.clear();
    let option;
    let CNStateName = LineName

    /*let myChart1 = echarts.init(chartDom);
    setTimeout(function () { //经过验证，同一个容器创建的echarts对象是同一个
      if (myChart === myChart1){
        console.log('宝贝娜娜是狗屎娜娜')
      }
    },2000)*/


    // let path = '/data/asset/data/aqi-beijing.json'
    let path = '/queryTotalEpidemicList'


    getState({
        url: ROOT_PATH+path,
        method: 'get',
    },'total').then(function (res) {
        // console.log(res);
        let data = res

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
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                data: data.map(function (item) {//横坐标名称
                    return item.date_;
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
                type: 'slider',

            }],
            legend:{},
            series: [
                {

                    name: '新增确诊',
                    type: 'line',
                    data: data.map(function (item) { //数据值
                        return item.addIll;
                    }),
                    showSymbol: false,
                    color: 'pink',
                    smooth: true,
                    sampling: 'lttb'

                },
                {
                    name: '新增死亡',
                    type: 'line',
                    data: data.map(function (item) { //数据值
                        return item.addDead;
                    }),
                    color: '#77787b',
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

