<template>
	<div id="market">
		<nav>
			<div class="nav_box">
				<template v-for="(v, index) in typeList">
					<span :class="{current: currentNum == index}" @tap="clickEvent(index)">{{v.name}}</span>
				</template>
			</div>
		</nav>
		<div class="main">
			<div class="recommend" v-if="recommendShow">
				<template v-for="(v, index) in parameters">
					<div class="col" v-show="v.isRecommend == '1'" @tap="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
						<span class="name">{{v.CommodityName}}</span>
						<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}<i class="icon icon_arrow" :class="{up: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, down: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i></span>
						<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%&nbsp;&nbsp;<em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
					</div>
				</template>
			</div>
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
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast, Indicator } from 'mint-ui';
	export default {
		name: 'market',
		components: {},
		data(){
			return{
				currentNum: 0,
				typeList: [],
				goodsList: [],   //商品
				stockList: [],   //股指期货
				foreignList: [],   //外汇
				metalList: [],  //金属
				bondList: [],   //债券期货
				etfList: [],   //ETF
				changeRateShow: true,
				changeRateName: '涨跌幅',
				recommendShow: true,
			}
		},
		computed: {
			parameters(){
				return this.$store.state.market.Parameters;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			len(){
				return this.$store.state.market.Parameters.length;
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
		watch: {
			len: function(n, o){
				if(n && n > 0) Indicator.close();
			},
			parameters: function(n, o){
				if(n && this.len == 0){
					setTimeout(function(){
						Indicator.close();
					}, 5000);
				}
			}
		},
		methods: {
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
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
			clickEvent: function(index){
				Indicator.open({spinnerType: 'fading-circle'});
				this.currentNum = index;
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				switch(index){
					case 0:
						this.$store.state.market.commodityOrder = this.goodsList.list;
						if(this.goodsList.list.length > 0){
							this.goodsList.list.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 1:
						this.$store.state.market.commodityOrder = this.stockList.list;
						if(this.stockList.list.length > 0){
							this.stockList.list.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 2:
						this.$store.state.market.commodityOrder = this.foreignList.list;
						if(this.foreignList.list.length > 0){
							this.foreignList.list.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 3:
						this.$store.state.market.commodityOrder = this.metalList.list;
						if(this.metalList.list.length > 0){
							this.metalList.list.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 4:
						this.$store.state.market.commodityOrder = this.bondList.list;
						if(this.bondList.list.length > 0){
							this.bondList.list.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 5:
						this.$store.state.market.commodityOrder = this.etfList.list;
						if(this.etfList.list.length > 0){
							this.etfList.list.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
				}
				let num = 0;
				this.$store.state.market.commodityOrder.forEach((o, i) => {
					if(o.isRecommend == '1') num++;
				});
				if(num == 0){
					this.recommendShow = false;
				}else{
					this.recommendShow = true;
				}
			},
			operateDate: function(){
				this.typeList = this.$parent.marketList;
				this.goodsList = this.typeList[0];
				this.stockList = this.typeList[1];
				this.foreignList = this.typeList[2];
				this.metalList = this.typeList[3];
				this.bondList = this.typeList[4];
				this.etfList = this.typeList[5];
			}
		},
		mounted: function(){
			//获取合约类型
			this.operateDate();
			//是否显示推荐合约
			let num = 0;
			if(this.len > 0){
				this.parameters.forEach((o, i) => {
					if(o.isRecommend == '1') num++;
				});
				if(num == 0) this.recommendShow = false;
			}
		},
		activated: function(){
			this.currentNum = 0;
			this.$store.state.market.Parameters = [];
			this.$store.state.market.commodityOrder = [];
			pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
				if(res.success == true && res.code == 1){
					this.recommendShow = true;
					this.typeList = res.data;
					this.goodsList = this.typeList[0];
					this.stockList = this.typeList[1];
					this.foreignList = this.typeList[2];
					this.metalList = this.typeList[3];
					this.bondList = this.typeList[4];
					this.etfList = this.typeList[5];
					this.$store.state.market.commodityOrder = res.data[0].list;
					res.data[0].list.forEach((o, i) => {
						this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
					});
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
		color:#616166;
		position: fixed;
		top: 0.96rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		background: $bg;
		border-bottom: 0.01rem solid $bgDeep;
		padding: 0 0.3rem;
		.nav_box{
			width: 7.51rem;
		}
		span{
			display: inline-block;
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: $fs28;
			margin-left: 0.3rem;
			
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $redDeep;
				border-bottom: 0.05rem solid $redDeep;
			}
		}
	}
	.main{
		color:#616166;
		width: 7.5rem;
		overflow: hidden;
		margin-top: 1.82rem;
	}
	.recommend{
		width: 7.5rem;
		height: 1.6rem;
		overflow: hidden;
		border-bottom: 0.01rem solid $bgDeep;
		.col{
			float: left;
			width: 2.5rem;
			height: 1.6rem;
			border-right: 0.01rem solid $bgDeep;
			span{
				display: inline-block;
				width: 2.5rem;
				text-align: center;
				font-size: $fs32;
				&.name{
					font-size: $fs30;
					color: $white;
					margin-top: 0.25rem;
				}
				&:last-child{
					font-size: 0.2rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
					padding-top: 0;
				}
				&:nth-child(2){
					height: 0.6rem;
					line-height: 0.6rem;
					.icon_arrow{
						width: 0.13rem;
						height: 0.27rem;
						margin: 0.1rem 0 0 0.1rem;
						&.up{
							background: url(../../assets/images/quote/arrow_up.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
						&.down{
							background: url(../../assets/images/quote/arrow_down.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
					}
				}
			}
		}
	}
	.list{
		width: 7.5rem;
		li{
			height: 0.96rem;
			line-height: 0.96rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $bgDeep;
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
						margin-top: 0.18rem;
						font-size: $fs32;
						color: $white;
					}
				}
			}
		}
	}
</style>