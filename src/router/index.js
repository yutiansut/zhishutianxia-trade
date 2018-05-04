import Vue from 'vue'
import Router from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(Router)
Vue.use(VueQuillEditor)
const load = (...p)=>resolve => require([`@/${p[1]||'page'}/${p[0]}.vue`], resolve);
const router = new Router({
  //mode: 'history',
  routes:[
  	{
      path: '/',
      redirect:{
      	name:"home"
      }
    },
    {
      path: '/quote',
      name: 'quote',
   		component: load('quote')
    },
    {
      path: '/trade',
      name: 'trade',
     component: load('trade')
    },
     {
    	path: '/home',
      name: 'home',
      component: load('home')
    },
    {
      path: '/discover',
      name: 'discover',
     component: load('discover')
    },
    {
      path: '/match',
      name: 'match',
      component: load('match')
    },
    /* my页面的路由配置 begin */
    {
      path: '/my',
      name: 'my',
      component: load('account/my/my')
    },
    {
      path: '/self_select',
      name: 'self_select',
      component: load('account/my/self_select')
    },
    {
      path: '/self_setting',
      name: 'self_setting',
      component: load('account/my/self_setting')
    },
    {
      path: '/reset_password',
      name: 'reset_password',
      component: load('account/my/reset_password')
    },
    {
      path: '/reset_phone',
      name: 'reset_phone',
     	component: load('account/my/reset_phone')
    },
    {
      path: '/customer_server',
      name: 'customer_server',
      component: load('account/my/customer_server')
    },
    {
      path: '/service_online',
      name: 'service_online',
      component: load('account/my/service_online')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: load('account/my/feedback')
    },
    {
      path: '/news_info',
      name: 'news_info',
      component: load('account/my/news_info')
    },
    {
      path: '/news_info_details/:id',
      component: load('account/my/news_info_details'),
      props:true
    },
    {
      path: '/information',
      name: 'information',
     component: load('account/my/information')
    },
    {
      path: '/my_match',
      name: 'my_match',
     component: load('account/my/my_match')
    },
    {
      path: '/match_details/:id',
     component: load('account/my/match_details'),
     props:true
    },
    {
      path: '/match_details_history/:id',
     component: load('account/my/match_details_history'),
     props:true
    },
    
    /* my页面的路由配置 end */
    //以下注册登录
    {
      path: '/login',
      name: 'login',
     component: load('account/login/login')
    },
    {
      path: '/register',
      name: 'register',
      component: load('account/login/register')
    },
    {
      path: '/WXregister',
      name: 'WXregister',
     component: load('account/login/WXregister')
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: load('account/login/forgetPassword')
    },
     {
      path: '/resetPassword',
      name: 'resetPassword',
     component: load('account/login/resetPassword')
    },
    {
      path: '/userRegistrationProtocol',
      name: 'userRegistrationProtocol',
     component: load('account/login/userRegistrationProtocol')
    },
    //以上是注册登录
    //以下是比赛
    {
    	path:"/topNars",
    	name:'topNars',
    	component: load('match/topNars')
    }
  ]
})
export default router
