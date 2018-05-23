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
      	name:"quote"
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
      path: '/discover',
      name: 'discover',
      component: load('discover'),
    },
    {
      path: '/match',
      name: 'match',
      component: load('match')
    },
    //一下是行情交易
    {
      path: '/stockFutures',
      name: 'stockFutures',
      component: load('quote/stockFutures')
    },
     {
      path: '/optionalList',
      name: 'optionalList',
      component: load('quote/optionalList')
    },
     {
      path: '/optionalBox',
      name: 'optionalBox',
      component: load('quote/optionalBox')
    },
     {
      path: '/noLogin',
      name: 'noLogin',
      component: load('quote/noLogin')
    },
     {
      path: '/optionalManage',
      name: 'optionalManage',
      component: load('quote/optionalManage')
    },
     {
      path: '/search',
      name: 'search',
      component: load('quote/search')
    },
     {
      path: '/quoteDetails',
      name: 'quoteDetails',
      component: load('quote/quoteDetails')
    },
		 {
	      path: '/remind',
	      name: 'remind',
	      component: load('quote/remind')
	    },
		{
	      path: '/cl',
	      name: 'cl',
	      component: load('role/cl')
	    },
	    {
	      path: '/cn',
	      name: 'cn',
	      component: load('role/cn')
	    },
	    {
	      path: '/es',
	      name: 'es',
	      component: load('role/es')
	    },
	    {
	      path: '/fdax',
	      name: 'fdax',
	      component: load('role/fdax')
	    },
	    {
	      path: '/fdxm',
	      name: 'fdxm',
	      component: load('role/fdxm')
	    },
	    {
	      path: '/gc',
	      name: 'gc',
	      component: load('role/gc')
	    },
	    {
	      path: '/hg',
	      name: 'hg',
	      component: load('role/hg')
	    },
	    {
	      path: '/hhi',
	      name: 'hhi',
	      component: load('role/hhi')
	    },
	    {
	      path: '/hsi',
	      name: 'hsi',
	      component: load('role/hsi')
	    },
	    {
	      path: '/mch',
	      name: 'mch',
	      component: load('role/mch')
	    },
	    {
	      path: '/mhi',
	      name: 'mhi',
	      component: load('role/mhi')
	    },
	    {
	      path: '/ng',
	      name: 'ng',
	      component: load('role/ng')
	    },
	    {
	      path: '/nk',
	      name: 'nk',
	      component: load('role/nk')
	    },
	     {
	      path: '/nq',
	      name: 'nq',
	      component: load('role/nq')
	    },
	    {
	      path: '/qm',
	      name: 'qm',
	      component: load('role/qm')
	    },
	     {
	      path: '/si',
	      name: 'si',
	      component: load('role/si')
	    },
	    {
	      path: '/ym',
	      name: 'ym',
	      component: load('role/ym')
	    },
	    {
	      path: '/tradeLogin',
	      name: 'tradeLogin',
	      component: load('trade/tradeLogin')
	    },
    	{
    		path:"/backProbe",
    		name:'backProbe',
    		component : load('trade/backProbe')
    	},
    	{
    		path:"/backPresentation",
    		name:'backPresentation',
    		component : load('trade/backPresentation')
    	},
    	{
    		path:"/strategyName",
    		name:'strategyName',
    		component : load('role/strategyName')
    	},
    //以上是行情交易
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
      path: '/account_details',
      name: 'account_details',
      component: load('account/my/account_details')
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
      path: '/match_details/:id/title/:title',
      component: load('account/my/match_details'),
      props: true
    },
    {
      path: '/match_details_history/:id/title/:title',      
      component: load('account/my/match_details_history'),
      props:true
    },
    {
      path: '/follow_get_history/:account/type/:type/id/:id',
      component: load('account/my/follow_get_history'),
      props:true
    },
    {
      path: '/help_docs',
      component: load('account/my/help_docs'),
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
    },
    {
    	path:"/mineGt",
    	name:"mineGt",
    	component:load('match/mineGt')
    },
    {
    	path:"/matchUserDetails",
    	name:"matchUserDetails",
    	component:load('match/matchUserDetails')
    },
    {
    	path:"/matchSet",
    	name:"matchSet",
    	component:load("match/matchSet")
    },
    /* discover页面的路由配置 begin */
    {
      path:"/discoverSearch",
    	name:"discoverSearch",
    	component:load("discover/discover_search")
    },
    {
      path:"/importantDetails",
    	name:"importantDetails",
    	component:load("discover/importantDetails")
    },
    /* discover页面的路由配置 end */
  
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})
export default router
