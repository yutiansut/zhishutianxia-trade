<template>
	<div id="index">
		<nav>
			<div class="nav_box">
				<template v-for="(v,index) in tabList">
					<span :class="{current: currentNum == index}" @tap="tabEvent(index)">{{v}}</span>
				</template>
			</div>
		</nav>
		<div class="list">
			<ul>
				<li>
					<div class="name"><span>名称</span></div>
					<span>价格</span>
					<span>成交量</span>
					<span @tap="switchEvent">{{changeRateName}}<i class="icon icon_switch"></i></span>
				</li>
				<template v-for="(v, index) in parameters">
					<li @tap="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
						<div class="name">
							<em>{{v.CommodityName}}</em>
							<em>{{v.CommodityNo + v.MainContract}}</em>
						</div>
						<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}<i class="icon icon_arrow" :class="{up: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, down: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i></span>
						<span>{{v.LastQuotation.TotalVolume}}</span>
						<span v-show="changeRateShow" class="changeRate" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
						<span v-show="!changeRateShow" class="changeRate" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
					</li>
				</template>
			</ul>
		</div>
		<div class="add_optional">
			<div class="box" @tap="addOptional">
				<i class="icon icon_add"></i>
				<span>添加自选</span>
			</div>
		</div>
		<div class="btn_box">
			<!--<i class="icon icon_rotate" @tap="rotateEvent"></i>-->
			<i class="icon icon_list" @tap="switchList"></i>
			<i class="icon icon_packup" v-show="!btnShow" @tap="packupEvent"></i>
			<i class="icon icon_btn" v-show="btnShow" @tap="btnEvent"></i>
		</div>
	</div>
</template>

<script>
	import optionalBox from "./optionalBox.vue"
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'index',
		components: {optionalBox,  },
		data(){
			return{
				tabList: ['全部'],
				currentNum: 0,
				changeRateShow: true,
				changeRateName: '涨跌幅',
				contList: [],   //全部
				goodsList: [],   //商品
				stockList: [],   //股指期货
				foreignList: [],   //外汇
				metalList: [],  //金属
				bondList: [],   //债券期货
				etfList: [],   //ETF
				btnShow: true,
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			}
		},
		methods: {
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
			tabEvent: function(index){
				this.currentNum = index;
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				switch(index){
					case 0:
						if(this.contList.length > 0){
							this.$store.state.market.commodityOrder = this.contList;
							this.contList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 1:
						if(this.goodsList.length > 0){
							this.$store.state.market.commodityOrder = this.goodsList;
							this.goodsList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 2:
						if(this.stockList.length > 0){
							this.$store.state.market.commodityOrder = this.stockList;
							this.stockList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 3:
						if(this.foreignList.length > 0){
							this.$store.state.market.commodityOrder = this.foreignList;
							this.foreignList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 4:
						if(this.metalList.length > 0){
							this.$store.state.market.commodityOrder = this.metalList;
							this.metalList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 5:
						if(this.bondList.length > 0){
							this.$store.state.market.commodityOrder = this.bondList;
							this.bondList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 6:
						if(this.etfList.length > 0){
							this.$store.state.market.commodityOrder = this.etfList;
							this.etfList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					default:
						break;
				}
			},
			switchEvent: function(){   //涨跌幅与涨跌额切换
				if(this.changeRateShow == true){
					this.changeRateShow = false;
					this.changeRateName = '涨跌额';
				}else{
					this.changeRateShow = true;
					this.changeRateName = '涨跌幅';
				}
			},
			addOptional: function(){
				this.$router.push({path: '/search', query: {isRefresh: 1}});
			},
			rotateEvent: function(){
				
			},
			optionalEvent: function(){
				this.$router.push({path: '/optionalManage'});
			},
			packupEvent: function(){
				this.btnShow = true;
				$(".icon_list").css({bottom: 1.5 + 'rem', opacity: 0});
			},
			switchList: function(){
				this.$parent.currentView = 'optionalBox';
			},
			btnEvent: function(e){
				this.btnShow = false;
				$(e.currentTarget).addClass('current');
				$(".icon_list").css({bottom: 2.3 + 'rem', opacity: 1});
				$(".icon_rotate").css({bottom: 3.1 + 'rem', opacity: 1});
			},
			operateData: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				this.contList = [];
				this.goodsList = [];
				this.stockList = [];
				this.foreignList = [];
				this.metalList = [];
				this.bondList = [];
				this.etfList = [];
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data && res.data.length > 0){
							this.contList = res.data;
							this.contList.forEach((o, i) => {
								if(o.commodityType == 1){
									this.goodsList.push(o);
								}else if(o.commodityType == 2){
									this.stockList.push(o);
								}else if(o.commodityType == 3){
									this.foreignList.push(o);
								}else if(o.commodityType == 4){
									this.metalList.push(o);
								}else if(o.commodityType == 5){
									this.bondList.push(o);
								}else if(o.commodityType == 6){
									this.etfList.push(o);
								}
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
		},
		mounted: function(){
			//分类tab列表
			this.$parent.marketList.forEach((o, i) => {
				this.tabList.push(o.name);
			});
			//获取所有自选
			this.operateData();
		},
		activated: function(){
			this.currentNum = 0;
			this.$store.state.market.Parameters = [];
			this.$store.state.market.commodityOrder = [];
			//重新请求自选合约列表
			if(this.userInfo == undefined) return;
			var headers = {
				token: this.userInfo.token,
				secret: this.userInfo.secret
			}
			this.contList = [];
			this.goodsList = [];
			this.stockList = [];
			this.foreignList = [];
			this.metalList = [];
			this.bondList = [];
			this.etfList = [];
			pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
				if(res.success == true && res.code == 1){
					if(res.data && res.data.length > 0){
						this.$store.state.market.commodityOrder = res.data;
						this.$parent.optionalList = res.data;
						this.contList = res.data;
						this.contList.forEach((o, i) => {
							if(o.commodityType == 1){
								this.goodsList.push(o);
							}else if(o.commodityType == 2){
								this.stockList.push(o);
							}else if(o.commodityType == 3){
								this.foreignList.push(o);
							}else if(o.commodityType == 4){
								this.metalList.push(o);
							}else if(o.commodityType == 5){
								this.bondList.push(o);
							}else if(o.commodityType == 6){
								this.etfList.push(o);
							}
						});
						res.data.forEach((o, i) => {
							this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
						});
					}
				}
			}).catch((err) => {
				Toast({message: err.data.message, position: 'bottom', duration: 2000});
			});
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	nav{
		position: fixed;
		top: 1.01rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		background: $bg1;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		overflow-x: scroll;
		.nav_box{
			width: 8.2rem;
		}
		span{
			display: inline-block;
			height: 0.75rem;
			line-height: 0.75rem;
			border-bottom: 0.04rem solid $bg;
			font-size: $fs28;
			margin-left: 0.3rem;
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $blue;
				border-color: $blue;
			}
		}
	}
	.list{
		width: 7.5rem;
		margin-top: 1.82rem;
		li{
			height: 0.96rem;
			line-height: 0.96rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			&:first-child{
				height: 0.64rem;
				line-height: 0.64rem;
				span{
					color: $fontBlue !important;
				}
			}
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
				text-align: right;
				&:nth-child(1){
					width: 3rem;
					text-align: left;
				}
				&:nth-child(2){
					width: 1.25rem;
				}
				&:nth-child(3){
					width: 1.25rem;
					color: $white;
				}
				&:nth-child(4), &:nth-child(5){
					width: 1.4rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
				.icon_switch{
					width: 0.2rem;
					height: 0.24rem;
					background: url(../../assets/images/quote/switch.png) no-repeat center center;
					background-size: 0.18rem 0.24rem;
					margin-left: 0.05rem;
					margin-top: 0.1rem;
				}
			}
			.name{
				float: left;
				width: 3rem;
				em{
					display: block;
					line-height: 0.36rem;
					&:first-child{
						margin-top: 0.1rem;
						font-size: $fs32;
						color: $white;
					}
				}
			}
		}
	}
	.add_optional{
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		justify-content: center;
		.icon_add{
			float: left;
			width: 0.4rem;
			height: 0.4rem;
			background: url(../../assets/images/quote/add.png) no-repeat center center;
			background-size: 100% 100%;
			margin: 0.3rem 0.15rem 0 0;
		}
		span{
			color: $white;
		}
	}
	.btn_box{
		/*width: 0.9rem;
		height: 2.9rem;
		position: fixed;
		bottom: 1.3rem;
		right: 0;*/
		.icon{
			position: fixed;
			bottom: 1.5rem;
			right: 0.3rem;
			width: 0.64rem;
			height: 0.64rem;
			opacity: 0;
			transition: all .3s;
			&.icon_rotate{
				background: url(../../assets/images/quote/rotate.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_box{
				background: url(../../assets/images/quote/box.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_btn{
				opacity: 1;
				background: url(../../assets/images/quote/list.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_packup{
				opacity: 1;
				background: url(../../assets/images/quote/packup.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_list{
				background: url(../../assets/images/quote/optionalList.png) no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
	
</style>