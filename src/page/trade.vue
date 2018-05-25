<template>
	<div id="trade">
		<bottomTab :tabSelect="tabSelected"></bottomTab>
		<hasLogin ref="hasLogin" :name="tradeUser"></hasLogin>
		<header>
			<h1>ID:{{tradeUser}}</h1>
			<i class="icon icon_menu" @tap="menuEvent"></i>
		</header>
		<div class="nav">
			<ul>
				<template v-for="(v, index) in tabList">
					<li :class="{current: currentNum == index}" @touchstart="tabEvent(index)"><span>{{v}}</span></li>
				</template>
			</ul>
		</div>
		<div class="main">
			<div class="cont" v-if="componentsShow">
				<moneyTotal></moneyTotal>
				<components :is="currentView"></components>
			</div>
		</div>
	</div>
</template>

<script>
	import moneyTotal from "../components/moneyTotal.vue"
	import tradeCenter from "./trade/tradeCenter.vue"
	import holdOrder from "./trade/holdOrder.vue"
	import moneyDetails from "./trade/moneyDetails.vue"
	import hasLogin from "./trade/hasLogin.vue"
	import bottomTab from "../components/bottom_tab"
	export default{
		name: "trade",
		components: { moneyTotal, tradeCenter, holdOrder, moneyDetails, hasLogin,bottomTab},
		data(){
			return{
				tabList: ['交易','持仓','资金明细'],
				currentNum: 0,
				currentView: 'tradeCenter',
				totalShow: false,
				componentsShow: false,
				currentNo: '',
				tabSelected: 'trade'
			}
		},
		computed: {
			tradeUser(){
				return this.$store.state.market.tradeConfig.username;
			},
			isBack(){
				return this.$store.state.account.isBack;
			},
			tradableCommodity(){
				return this.$store.state.account.tradableCommodity;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		watch: {
			isBack: function(n, o){
				if(n && n == true){
					this.$router.push({path: '/quote'});
					this.$store.state.account.isLogin = true;
				}
			},
			parameters: function(n, o){
				if(n && n.length == 1){
					this.componentsShow = true;
					let val = this.$route.query.currentNo;
					if(val) this.currentNo = val;
					if(this.currentNo == ''){
						this.$store.state.market.currentdetail = this.parameters[0];
						this.$store.state.market.currentNo = this.parameters[0].CommodityNo;
					}else{
						this.$store.state.market.currentNo = this.currentNo;
						this.currentNo = '';
					}
				}
			}
		},
		methods: {
			tabEvent: function(index){
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.currentNum = index;
				if(index == 0){
					this.currentView = 'tradeCenter';
				}else if(index == 1){
					this.currentView = 'holdOrder';
				}else{
					this.currentView = 'moneyDetails';
				}
			},
			menuEvent: function(){
				this.$refs.hasLogin.show = true;
			}
		},
		mounted: function(){
			//初始化页面高度
			let h = window.screen.height - $("header").height() - $(".nav").height() - $("#tabbar").height();
			$(".main").height(h);
		},
		activated: function(){
			this.currentNum = 0;
			this.currentView = 'tradeCenter';
			//初始化页面高度
			let h = window.screen.height - $("header").height() - $(".nav").height() - $("#tabbar").height();
			$(".main").height(h);
			//初始化所有可交易合约行情
			this.$store.state.market.Parameters = [];
			this.$store.state.market.commodityOrder = [];
			this.tradableCommodity.forEach((o, i) => {
				this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[o.commodityNo].ExchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + this.orderTemplist[o.commodityNo].MainContract +'"}}');
			});
//			console.log(this.$store.state.market.currentdetail);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	header{
		width: 7.5rem;
		height: 1rem;
		background: $blcakThin;
		border-bottom: 0.01rem solid $bgDeep;
		position: relative;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		h1{
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			color: $white;
			font-size: 0.36rem;
		}
		.icon_menu{
			width: 1rem;
			height: 1rem;
			background: url(../assets/images/quote/menu.png) no-repeat 0.3rem 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: fixed;
			top: 0;
			right: 0;
		}
	}
	.nav{
		width: 7.5rem;
		height: 0.8rem;
		border-bottom: 0.01rem solid $bgDeep;
		background: $bg;
		position: fixed;
		top: 1.01rem;
		left: 0;
		z-index: 1;
		li{
			float: left;
			width: 2.5rem;
			text-align: center;
			span{
				display: inline-block;
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: $fs28;	
			}
			&.current{
				span{
					color: $redDeep;
					border-bottom: 0.05rem solid $redDeep;
				}
			}
		}
	}
	.main{
		margin: 1.81rem 0 0 0;
	}
</style>