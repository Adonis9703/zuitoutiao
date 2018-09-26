import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import home from '@/pages/news_types/home'
import domestic from '@/pages/news_types/domestic'
import international from '@/pages/news_types/international'
import Hot from '@/pages/news_types/hot'
import News from '@/pages/news'
import Tec from '@/pages/news_types/technology'
import Mil from '@/pages/news_types/military'
import Eco from '@/pages/news_types/economic'
import Ent from '@/pages/news_types/entertain'
import Fas from '@/pages/news_types/fashion'
import Spo from '@/pages/news_types/sport'
import login from '@/pages/user_manage/login'
import news_detail from '@/pages/news_manage/news_detail'
import user_home from '@/pages/user_manage/user_home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '/home',
          component: home
        },
        {
          path: '/domestic',
          component: domestic
        },
        {
          path: '/international',
          component: international
        },
        {
          path: '/technology',
          component: Tec
        },
        {
          path: '/military',
          component: Mil
        },
        {
          path: '/economic',
          component: Eco
        },
        {
          path: '/entertain',
          component: Ent
        },
        {
          path: '/fashion',
          component: Fas
        },
        {
          path: '/sport',
          component: Spo
        },
        {
          path: '/detail',
          name: 'news_detail',
          component: news_detail
        },
        {
          path: '/userHome',
          component: user_home
        }
      ]
    },

  ]
})
