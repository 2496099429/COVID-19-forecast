import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';


Vue.config.productionTip = false

Vue.use(Antd);

import $ from 'jquery/dist/jquery.min'
import('bootstrap/dist/css/bootstrap.min.css')
import('bootstrap/dist/js/bootstrap.min.js')

require('assets/js/flexible.js')

store.dispatch('getData')

store.dispatch('getList')

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')




