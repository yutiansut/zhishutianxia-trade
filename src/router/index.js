import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import trade from '@/page/trade'

import discover from '@/page/discover'
import match from '@/page/match'
import quote from '@/page/quote'
import my from '@/page/account/my/my'
import login from '@/page/account/login/login'
import regitser from '@/page/account/login/regitser'
import WXregister from '@/page/account/login/WXregister'
import forgetPassword from "@/page/account/login/forgetPassword"
import resetPassword from "@/page/account/login/resetPassword"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/quote',
      name: 'quote',
      component: quote
    },
    {
      path: '/trade',
      name: 'trade',
      component: trade
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/discover',
      name: 'discover',
      component: discover
    },
    {
      path: '/match',
      name: 'match',
      component: match
    },
    
    
    
    
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regitser',
      name: 'regitser',
      component: regitser
    },
    {
      path: '/WXregister',
      name: 'WXregister',
      component: WXregister
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
     {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
  ]
})
