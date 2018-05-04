import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import trade from '@/page/trade'
import home from "@/page/home"
import discover from '@/page/discover'
import match from '@/page/match'
import quote from '@/page/quote'
import my from '@/page/account/my/my'
import self_select from '@/page/account/my/self_select'
import self_setting from '@/page/account/my/self_setting'
import reset_password from '@/page/account/my/reset_password'
import reset_phone from '@/page/account/my/reset_phone'
import customer_server from '@/page/account/my/customer_server'
import feedback from '@/page/account/my/feedback'
import service_online from '@/page/account/my/service_online'
import news_info from '@/page/account/my/news_info'
import news_info_details from '@/page/account/my/news_info_details'
import information from '@/page/account/my/information'


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
    /* my页面的路由配置 begin */
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
    	path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/self_select',
      name: 'self_select',
      component: self_select
    },
    {
      path: '/self_setting',
      name: 'self_setting',
      component: self_setting
    },
    {
      path: '/reset_password',
      name: 'reset_password',
      component: reset_password
    },
    {
      path: '/reset_phone',
      name: 'reset_phone',
      component: reset_phone
    },
    {
      path: '/customer_server',
      name: 'customer_server',
      component: customer_server
    },
    {
      path: '/service_online',
      name: 'service_online',
      component: service_online
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/news_info',
      name: 'news_info',
      component: news_info
    },
    {
      path: '/news_info_details/:id',
      component: news_info_details,
      props:true
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    
    /* my页面的路由配置 end */
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
