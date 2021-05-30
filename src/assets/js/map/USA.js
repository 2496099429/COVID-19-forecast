import * as echarts from 'echarts'
import CNName from "./CNName";
import router from "../../../router";
import axios from 'axios'

import {getMapData,getMyData} from "network/request";

// import {a} from './saf' //对接口


export function PaintUSA() {

  // a()//对接口


  let chartDom = document.querySelector("#usa");
  let localStorage = window.localStorage;



  let myChart = echarts.init(chartDom);
  let option;
  let flag = 0;

// myChart.showLoading();
  let date = new Date();
  let str = date.getFullYear()+'-'+(date.getMonth()-1)+'-'+(date.getDate()-1);


  Promise.all([getMapData({
    url: '/data/asset/geo/USA.json',
    method: 'get'
  }),getMyData({ //请求后端数据
    url: '/queryStateEpidemicListByDate?date_=2020-05-19',
    method: 'get'
  })])
      .then( function (usaJson) {
    // console.log(usaJson[0]);
    // myChart.hideLoading();
    //     console.log(usaJson[0]);//因为用了Promise.all，所以返回的数据是一个数组，用一个参数接收时，这个参数会直接变成数组
        let myData = usaJson[1]


    echarts.registerMap('USA', usaJson[0], {
      Alaska: {              // 把阿拉斯加移到美国主大陆左下方
        left: -131,
        top: 25,
        width: 15
      },
      Hawaii: {
        left: -110,        // 夏威夷
        top: 28,
        width: 5
      },
      'Puerto Rico': {       // 波多黎各
        left: -76,
        top: 26,
        width: 2
      },


    });
    option = {

      title: {
        text: '累积确诊病例数，排除治愈、死亡',
        textStyle:{
          fontSize: 'small',
          fontWeight: 'normal'
        },
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        renderMode: 'html',
        transitionDuration: 0.2,
        formatter: function (params) {
          var value = (params.value + '').split('.');
          value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
          return  `
<div style="width: 100%">
  <div style="float: left">
    <div style="text-align: left">地区:&nbsp;&nbsp;  `+ CNName(params.name) + `</div>
    <div style="text-align: left">确诊:&nbsp;&nbsp; ` + value +`</div>
  </div>

  
</div>

                `
        },
        // triggerOn: 'click',
        // alwaysShowContent: true,
        borderWidth: 0,
        textStyle: {
          color: 'rgb(255,255,255)',
          fontSize: 10,

        }

      },
      visualMap: {
        type: 'piecewise',
        left: 'left',
        showLabel: true,

        align: 'left',
        overflow: 'break',
        pieces: [
          {gt: 10000000 ,label: '≥1000万' ,color: 'rgb(138,8,8)'},
          {gte: 5000000 ,lte: 9999999,label: '500万-1000万' ,color: 'rgb(184,9,9)'},
          {gte: 1000000,lte: 4999999 ,label: '100万-500万' ,color: 'rgb(232,49,50)'},
          {gte: 100000,lte: 999999 ,label: '10万-100万' ,color: 'rgb(255,106,87)'},
          {gte: 10000, lte: 99999,label: '1万-10万' ,color: 'rgb(255,153,133)'},
          {gte: 5000, lte: 9999,label: '5000-9999' ,color: 'rgb(255,196,179)'},
          {gte: 1,lte: 4999,label: '1-4999' ,color: 'rgb(255,229,219)'},
          {value: 0, label: '0', color: 'rgb(50,255,50)', icon: 'path://M560.264533 512L512 463.735467l248.9344-248.9344 48.264533 48.264533L560.264533 512l248.9344 248.9344-48.264533 48.264533L512 560.264533l-248.9344 248.9344-48.264533-48.264533L463.735467 512 512 560.264533l-248.9344 248.9344-48.264533-48.264533L463.735467 512 214.801067 263.0656l48.264533-48.264533L512 463.735467l248.9344-248.9344 48.264533 48.264533z'
          }  // [123, 123]
        ],

        outOfRange: { //定义 在选中范围中 的视觉元素
          color: 'rgb(255,255,255)'
        },
        controller: {
          outOfRange: {
            color: 'rgb(204,204,204)'
          }
        },

        text: ['高', '低'],           // 文本，默认为数值文本
        // calculable: true,


      },


      series: [
        {
          name: 'USA PopEstimates',
          type: 'map',
          roam: false,
          map: 'USA',

          // 文本位置修正
          textFixed: {
            Alaska: [20, -20]
          },
          data:myData.map((res,index) => {
            return {name:res.stateName,value:res.totalIll}
          }),
          label: {//设置标签样式以及内容
            formatter: function (params) {
              return CNName(params.name)
            },
            silent: true,
            fontWeight: 'bold',
            color: 'black'
          },

          emphasis: {//设置高亮时的样式及内容
            label: {
              color: 'black'
            },
            itemStyle: {

              areaColor: 'rgb(199,255,253)'
            },
          },
          select: {//设置选中时的样式及内容
            label: {
              color: 'black'
            },
            itemStyle: {
              areaColor: 'rgb(199,255,253)'
            },
          },
          selectedMode: 'single',
          // silent: true,

        }
      ],


    };



    myChart.setOption(option);

    for (let i = 1; i < option.series[0].data.length; i++) {
      if (option.series[0].data[flag].value < option.series[0].data[i].value){
        flag = i;
      }
    }

    myChart.dispatchAction({
      type: 'select',
      seriesIndex: 0,
      dataIndex: flag
    })

    /*myChart.dispatchAction({
      type: 'legendUnSelect',
      // 图例名称
      name: ''
    })*/



  });




  let ec;

//获取到正确的属性值
  function getEc(event) {

    let str = '__ec_inner_';
    for (let i = 0; i < 10; i++) {
      let str0 = str + i;
      if (event.target[str0] !== undefined){
        return str0;
      }
    }

  }

//将英文地名转成中文



//监听空白事件
  myChart.getZr().on('click', function (event) {


    // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
    if (!event.target) {
      // 点击在了空白处
      // 取消地图选中
      myChart.dispatchAction({
        type: 'select',
        seriesName: 'USA PopEstimates',
        dataIndex: flag
      })
      myChart.dispatchAction({
        type: 'unselect',
        seriesName: 'USA PopEstimates',
        dataIndex: flag
      })

    }else{

        if (ec === undefined){
          ec = getEc(event)
        }
        // console.log(event.target);//系列
        flag = event.target[ec].dataIndex;

        //判断点击的州是否为选中
        if(event.target.currentStates[0] === "select"){
          myChart.dispatchAction({
            type: 'downplay',
            seriesName: 'USA PopEstimates',
            dataIndex: flag,
          });
        }else{
          stateClick(option.series[0].data[event.target[ec].dataIndex].name)

        }

      }

  });



  /*myChart.getZr().on('')*/




  window.addEventListener("resize", function() {
    myChart.resize();
  });


  return myChart


}

function stateClick(state) {
  router.push('/usa/state?pro='+state)
}