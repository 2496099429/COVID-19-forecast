import Vue from 'vue'
import VueRouter from 'vue-router'


const Usa = () => import('components/map/Usa')
const Home = () => import('views/home/Home')
const State = () => import('components/map/State')
const DatePage = () => import('components/datepage/DatePage')



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/usa'
  },
  {
    path: '/usa',
    component: Usa,
    meta: {
      title: '美国疫情地图'
    },
    children: [
      {
        path: 'state',
        component: State,
        meta: {
          title: '州变化图'
        }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/datepage',
    component: DatePage,
    meta: {
      title: '日期疫情图'
    }
  }





]


const router = new VueRouter({
  routes,
  mode: 'hash'
})

router.beforeEach((to,from,next) => {


  document.title = to.matched[0].meta.title;
  next();

})

export default router