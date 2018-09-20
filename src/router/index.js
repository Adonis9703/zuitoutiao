import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home'
import Hot from '@/pages/hot'
import News from '@/pages/news'
import Tec from '@/pages/technology'
import login from '@/pages/user_manage/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
    },
    {
      path:'/login',
      component: login
    },
    {
      path:'/home',
      component: Home,
      children:[
        {
          path:'/hot',
          component: Hot
        },
        {
          path:'/news',
          component: News
        },
        {
          path:'/technology',
          component: Tec
        }
      ]
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
  ]
})
