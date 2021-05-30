import axios from 'axios'
let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'; //地图接口

//请求地图数据根路径
const instance0 = axios.create({
  baseURL: ROOT_PATH,
  timeout: 5000
})

//请求后端数据根路径
const instance1 = axios.create({
  baseURL: 'http://192.168.31.206:8888',//把后端的接口放在这里
  timeout: 5000
})

export function requestUSA(config) {

  return instance0(config)
}

export function requestMyData(config) {

  return instance1(config)

}

// mapData存储美国地图数据
// lastTime存储上一次请求的时间
// myData存储地图上的人数
// list存储列表数据



//请求地图数据
export function getMapData(config) {
  let localStorage = window.localStorage;
  let JData = localStorage.getItem('mapData');
  // let JLastTime = localStorage.getItem('lastTime');
  let data = JSON.parse(JData)
  // let lastTime = JSON.parse(JLastTime);
  // let nowTime = new Date().getTime();

  if (data){
    /*if (nowTime - lastTime >= 1000 * 3 *60){
      console.log('data')
      return requestUSA(config).then(res => {
        localStorage.setItem('data',JData);
        JLastTime = JSON.stringify(nowTime);
        localStorage.setItem('lastTime',JLastTime);
        console.log(res.data);
        return Promise.resolve(res.data)
      })
    }else {*/
      return Promise.resolve(data) //只要有地图数据就直接返回
    // }
  }else { //如果没地图数据，再发出请求

   return requestUSA(config).then(res => {
      JData = JSON.stringify(res.data);
      localStorage.setItem('mapData',JData);
      // JLastTime = JSON.stringify(nowTime);
      // localStorage.setItem('lastTime',JLastTime);
      return Promise.resolve(res.data)
    })

  }

}

//请求后端数据用于显示地图上的人数
export function getMyData(config) {
  let localStorage = window.localStorage;//
  let JMyData = localStorage.getItem('myData');
  let JLastTime = localStorage.getItem('lastTime');
  let data = JSON.parse(JMyData)
  let lastTime = JSON.parse(JLastTime);
  let nowTime = new Date().getTime();

  if (data){
    if (nowTime - lastTime >= 1000 * 3 *62 && false){
      return requestMyData(config).then(res => {
        JMyData = JSON.stringify(res.data);
        localStorage.setItem('myData',JMyData);
        JLastTime = JSON.stringify(nowTime);
        localStorage.setItem('lastTime',JLastTime);

        return Promise.resolve(res.data)
      })
    }else {
      return Promise.resolve(data)
    }
  }else {

   return requestMyData(config).then(res => {
      JMyData = JSON.stringify(res.data);
      localStorage.setItem('myData',JMyData);
      JLastTime = JSON.stringify(nowTime);
      localStorage.setItem('lastTime',JLastTime);
      return Promise.resolve(res.data)
    })

  }

}


//请求各州的数据 通用的方法，不一定请求的是州
export function getState(config,name){
  let localStorage = window.localStorage;
  let JState = localStorage.getItem(name);
  let JLastTime = localStorage.getItem('lastTime');
  let data = JSON.parse(JState)
  let lastTime = JSON.parse(JLastTime);
  let nowTime = new Date().getTime();

  if (data ){
    if (nowTime - lastTime >= 1000*3*62 && false ){
      return requestMyData(config).then(res => {
        console.log(res);

        JState = JSON.stringify(res.data);
        localStorage.setItem(name,JState);
        JLastTime = JSON.stringify(nowTime);
        localStorage.setItem('lastTime',JLastTime);

        return Promise.resolve(res.data)
      })
    }else {
      return Promise.resolve(data)
    }
  }else {

    return requestMyData(config).then(res => {
      JState = JSON.stringify(res.data);
      localStorage.setItem(name,JState);
      JLastTime = JSON.stringify(nowTime);
      localStorage.setItem('lastTime',JLastTime);
      return Promise.resolve(res.data)
    })

  }

}


export default function getListData(config,name){
  name = 'list';
  let localStorage = window.localStorage;
  let JState = localStorage.getItem(name);
  let JLastTime = localStorage.getItem('lastTime');
  let data = JSON.parse(JState)
  let lastTime = JSON.parse(JLastTime);
  let nowTime = new Date().getTime();

  if (data){
    if (nowTime - lastTime >= 1000*3*62 && false){
      return requestMyData(config).then(res => {
        JState = JSON.stringify(res.data);
        localStorage.setItem(name,JState);
        JLastTime = JSON.stringify(nowTime);
        localStorage.setItem('lastTime',JLastTime);

        return Promise.resolve(res.data)
      })
    }else {
      return Promise.resolve(data)
    }
  }else {

    return requestMyData(config).then(res => {
      JState = JSON.stringify(res.data);
      localStorage.setItem(name,JState);
      JLastTime = JSON.stringify(nowTime);
      localStorage.setItem('lastTime',JLastTime);
      return Promise.resolve(res.data)
    })

  }

}





