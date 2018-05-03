/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
  direction: 'forward',
};
/*更新路由方向*/
//const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
//const mutations = {
//UPDATE_DIRECTION(state,payload) {
//  state.direction = payload.direction
//},
//};
//控制显示与否
var isshow = {
	state: {
		isconnected: false,
		//判断是第一次画图还是第二次
		isfensshow: false,
		islightshow: false,
		isklineshow: false,
		//判断是否画图
		isfens: false,
		iskline: false,
		islight: false,
		isfensInit: false,
		warningShow: false,
		warningType: '',
	}
};

//账户信息
var account = {
	state: {
		packChannel: '5a7bc601b27b0a7ded0000e7',   //统计代码
		isLogin: false, //判断是否是从登录跳至首页
		isRefresh: false,  //判断是否刷新
		isBack: false,   //判断是否退出交易账号并跳至首页
		loginStatus: false,  //交易账号登录状态	
		exitStatus: false,   //交易账号退出状态
		quoteStatus: false,  //行情初始化状态
		userName: '',   //平台账号
		currentNav: 0,  //当前导航索引
		currentUrlHead: 'http:', //http or https
		phone:"",
		username:"",
		commodityAll: [],    //所有市场合约
		tradableCommodity: [],   //所有可交易合约
		weixinLoginInfo:false,
		backtestIndexArr:[]
	}
}

export default new Vuex.Store({
	modules: {
		isshow,
		account,
	},
	state: {
	    direction: 'forward',
	    wsjsondata: {},
		//行情websocket
		quoteSocket: {},
		//交易websocket
		tradeSocket: {},
		//test 测试环境，online 正式环境
		environment: 'test',
		//打包的时候，值为 build ，开发的时候，值为 dev
		setting: 'dev',
	},
	getters: {
		PATH: function(state) {
			if(state.setting == 'dev') {
//				return state.account.currentUrlHead + '//139.196.232.17';
				return '/api'
			} else if(state.setting == 'build'){
				if(state.environment == 'test'){
					return state.account.currentUrlHead + '//test.api.zhishutianxia.com';
				}else{
					return state.account.currentUrlHead + '//139.196.232.17';
				}
			} else if(state.setting == 'nat') {
				return '/nat';
			}
		}
	},
    mutations: {
    ['UPDATE_DIRECTION'](state,payload) {
      		state.direction = payload.direction
    	},
    },
	actions: {
	
	}
});
