import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import trade from '@/page/trade'

import discover from '@/page/discover'
import match from '@/page/match'
import quote from '@/page/quote'
import my from '@/page/account/my/my'
import self_select from '@/page/account/my/self_select'
import login from '@/page/account/login/login'
import register from '@/page/account/login/register'
import WXregister from '@/page/account/login/WXregister'
import forgetPassword from "@/page/account/login/forgetPassword"
import resetPassword from "@/page/account/login/resetPassword"
import userRegistrationProtocol from "@/page/account/login/userRegistrationProtocol"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/self_select',
      name: 'self_select',
      component: self_select
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
      path: '/register',
      name: 'register',
      component: register
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
    {
      path: '/userRegistrationProtocol',
      name: 'userRegistrationProtocol',
      component: userRegistrationProtocol
    },
  ]
})
