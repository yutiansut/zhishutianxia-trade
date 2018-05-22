<template>
	<div id="index">
		<bottomTab :tabSelect="tabSelected"></bottomTab>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: currentNum == index}" @tap="tavEvent(index)">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search" @tap="toSearch"></i>
			<i class="icon icon_set" v-show="setShow" @tap="toOptionalManage"></i>
		</header>
		<p class="connect connecting" v-show="isconnecting">网络连接已断开，正在尝试重连…</p>
		<p class="connect connected" v-show="isconnected">已连接到服务器！</p>
		<div class="cont" v-if="quoteStatus">
			<components :is="currentView"></components>
		</div>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import optionalList from "./quote/optionalList.vue"
	import optionalBox from "./quote/optionalBox.vue"
	import noLogin from "./quote/noLogin.vue"
	import market from "./quote/market.vue"
	import pro from '../assets/js/common.js'
	import { Toast } from 'mint-ui'
	import bottomTab from "../components/bottom_tab"
	export default {
		name: 'index',
		components: {optionalList, optionalBox, noLogin, market,bottomTab},
		data(){
			return{
				currentNum: 1,
				tabList: ['自选', '市场'],
				currentView: 'market',
				setShow: false,
				optionalList: [],
				marketList: [],
				isconnecting: false,
				isconnected: false,
				selected:"1",
				tabSelected: 'quote'
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			},
			tradeUser(){
				if(localStorage.tradeUser) return JSON.parse(localStorage.tradeUser);
			},
			isLogin(){
				return this.$store.state.account.isLogin;
			},
			warningShow(){
				return this.$store.state.isshow.warningShow;
			},
			quoteStatus(){
				return this.$store.state.account.quoteStatus;
			},
			url_real(){
				return this.$store.state.market.tradeConfig.url_real
			},
		},
		watch: {
			quoteStatus: function(n, o){
				if(n && n == true && this.tradeUser != '' && this.tradeUser != undefined && this.tradeUser != null && this.url_real){
					setTimeout(() => {
						this.initTrade();
					}, 1000);
				}
			},
			warningShow: function(n, o){
				if(n && n == true){
					this.isconnected = false;
					this.isconnecting = true;
					setTimeout(function(){
						window.location.reload();
					}, 5000);
				}else{
					this.isconnected = true;
					this.isconnecting = false;
				}
			},
		},
		methods: {
			...mapActions([
				'initQuoteClient',
				'initTrade'
			]),
			tavEvent: function(index){
				this.currentNum = index;
				if(index == 0){
//					let userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
					let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
					if(stateLogin.issavepsd == false){
						this.currentView = 'noLogin';
					}else{
						this.currentView = 'optionalList';
						this.setShow = true;
						//获取用户所有自选 合约
						this.getUserCommodityList();
						this.$store.state.market.Parameters = [];
						this.$store.state.market.commodityOrder = [];
					}
				}else{
					this.currentView = 'market';
					this.setShow = false;
					this.$store.state.market.Parameters = [];
					this.$store.state.market.commodityOrder = [];
					this.$store.state.market.commodityOrder = this.marketList[0].list;
					this.marketList[0].list.forEach((o, i) => {
						this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
					});
				}
			},
			toSearch: function(){
				this.$router.push({path: '/search'});
			},
			toOptionalManage: function(){
				this.$router.push({path: '/optionalManage'});
			},
			getUserCommodityList: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data && res.data.length > 0){
							this.optionalList = res.data;
							this.$store.state.market.commodityOrder = res.data;
							res.data.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.marketList = res.data;
						if(this.quoteStatus == true) return;
						this.$store.state.market.commodityOrder = res.data[0].list;
						//初始化行情
						if(this.$store.state.market.commodityOrder){
							this.initQuoteClient();
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			getTradeWsUrl: function(){   //获取交易ws地址
				var data = {
					quoteVersion: this.$store.state.market.quoteConfig.version,
					tradeVersion: this.$store.state.market.tradeConfig.version
				};
				pro.fetch('post', '/others/getSocket', data, '').then((res) => {
					if(res.success == true && res.code == '1'){
						this.$store.state.market.tradeConfig.url_real = res.data.tradeUrl;
					}
				}).catch((err) => {
					var data = err.data;
					if(data) Toast({message: data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		created: function(){
			//获取所有市场合约
			pro.fetch('post', '/quoteTrader/getCommodityInfoNoType', '', '').then((res) => {
				if(res.success == true && res.code == 1){
					this.$store.state.account.commodityAll = res.data;
					this.$store.state.market.currentNo = res.data[0].commodityNo;
				}
			}).catch((err) => {
				Toast({message: err.data.message, position: 'bottom', duration: 2000});
			});
			//获取所有可交易合约
			pro.fetch("post", "/futureManage/getApplyData", "", "").then((res)=>{
				if(res.success == true && res.code == 1){
					this.$store.state.account.tradableCommodity = res.data.tradableList;
				}
			}).catch((err)=>{
				Toast({message: err.data.message, duration: 2000});
			});
		},
		updated: function(){
			//判断网络
			pro.netIsconnected(function(){    //手机
				this.isconnected = false;
				this.isconnecting = true;
			}.bind(this), function(){
				this.isconnected = true;
				this.isconnecting = false;
				//刷新页面
				window.location.reload();
			}.bind(this));
			
			var EventUtil = { 
				addHandler: function (element, type, handler) { 
					if (element.addEventListener) { 
						element.addEventListener(type, handler, false); 
					}else if(element.attachEvent) { 
						element.attachEvent("on" + type, handler); 
					}else{ 
						element["on" + type] = handler; 
					} 
				} 
			}; 
			EventUtil.addHandler(window, "online", function () { 
				window.location.reload();
			}); 
			EventUtil.addHandler(window, "offline", function () { 
				this.isconnecting = true;
//				console.log('网络已断开');
			}); 
		},
		mounted: function(){
			//获取所有合约
			this.getCommodityInfo();
		},
		activated: function(){
			if(this.isLogin == true){
				this.$store.state.account.isLogin = false;
				this.currentNum = 1;
				this.currentView = 'market';
				window.location.reload();
//				this.setShow = false;
//				this.$store.state.market.Parameters = [];
//				this.$store.state.market.commodityOrder = [];
//				this.$store.state.market.commodityOrder = this.marketList[0].list;
//				this.marketList[0].list.forEach((o, i) => {
//					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
//				});
			}
			//获取交易ws地址
			this.getTradeWsUrl();
			//初始化是否跳至首页
			this.$store.state.account.isBack = false;
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 0.96rem;
		overflow: hidden;
		background: $headColr;
		margin: auto;
		.tab{
			width: 2rem;
			height: 0.96rem;
			margin:auto;
			span{
				display: inline-block;
				float: left;
				width: 1rem;
				height: 0.96rem;
				line-height: 0.96rem;
				text-align: center;
				font-size: $fs28;
				color:$grayDeep;
				&.current{
					color: $white;
					border-bottom: 0.03rem solid $white;
				}
			}
		}
		.icon_search{
			width: 0.6rem;
			height: 0.96rem;
			background: url(../assets/images/quote/search.png) no-repeat right 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.3rem;
		}
		.icon_set{
			width: 0.6rem;
			height: 0.96rem;
			background: url(../assets/images/quote/set.png) no-repeat left 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.9rem;
		}
	}
	.cont{
		overflow-y: auto;
		padding-bottom: 1.3rem;
	}
	.connect{
		position: fixed;
		bottom: 1rem;
		left: 0;
		width: 7.5rem;
		height: 0.48rem;
		line-height: 0.48rem;
		text-align: center;
		overflow: hidden;
		border-bottom: 0.01rem solid $black;
		color: $white;
		&.connecting{
			background: #e64560;
		}
		&.connected{
			background: #0f996b;
		}
	}
</style>