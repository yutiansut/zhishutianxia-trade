<template>
	<div id="index">
		<div class="main">
			<template v-for="(v,index) in typeList">
				<div class="type">
					<div class="title">
						<span>{{v.name | operateData}}</span>
						<i class="icon" :class="{icon_show: v.status == 1, icon_hide: v.status == 0}" @tap="switchEvent(v.status, v.name)"></i>
					</div>
					<div class="recommend" v-show="v.status == 1">
						<template v-for="(o, k) in parameters">
							<div class="col" v-if="v.name == o.commodityType" @tap="toQuoteDetails(o.CommodityNo, o.MainContract, o.ExchangeNo, o.contrast)">
								<span class="name">{{o.CommodityName}}</span>
								<span :class="{red: o.LastQuotation.LastPrice > o.LastQuotation.PreSettlePrice, green: o.LastQuotation.LastPrice < o.LastQuotation.PreSettlePrice}">{{o.LastQuotation.LastPrice | fixNum(o.DotSize)}}<i class="icon icon_arrow" :class="{up: o.LastQuotation.LastPrice > o.LastQuotation.PreSettlePrice, down: o.LastQuotation.LastPrice < o.LastQuotation.PreSettlePrice}"></i></span>
								<span :class="{green: o.LastQuotation.ChangeRate < 0, red: o.LastQuotation.ChangeRate > 0}"><em v-show="o.LastQuotation.ChangeRate > 0">+</em>{{o.LastQuotation.ChangeRate | fixNumTwo}}%&nbsp;&nbsp;<em v-show="o.LastQuotation.ChangeRate > 0">+</em>{{o.LastQuotation.ChangeValue | fixNum(o.DotSize)}}</span>
							</div>
						</template>
					</div>
				</div>
			</template>
			<div class="add_optional">
				<div class="box" @tap="addOptional">
					<i class="icon icon_add">+</i>
					<span>添加自选</span>
				</div>
			</div>
			<div class="btn_box">
				<i class="icon icon_box" @tap="switchList"></i>
				<i class="icon icon_packup" v-show="!btnShow" @tap="packupEvent"></i>
				<i class="icon icon_btn" v-show="btnShow" @tap="btnEvent"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'index',
		components: {},
		data(){
			return{
				_typeList: [],
				typeList: [],
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
//			userInfo(){
//				if(localStorage.user) return JSON.parse(localStorage.user);
//			}
		},
		filters: {
			operateData: function(e) {
				switch(e) {
					case '1':
						return '商品';
						break;
					case '2':
						return '股指期货';
						break;
					case '3':
						return '外汇';
						break;
					case '4':
						return 'LME金属';
						break;
					case '5':
						return '债券期货';
						break;
					case '6':
						return 'ETF';
						break;
				}
			},
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
			addOptional: function(){
				this.$router.push({path: '/search'});
			},
			switchList: function(){
				this.$parent.currentView = 'optionalList';
			},
			packupEvent: function(){
				this.btnShow = true;
				$(".icon_box").css({bottom: 1.5 + 'rem', opacity: 0});
			},
			btnEvent: function(e){
				this.btnShow = false;
				$(e.currentTarget).addClass('current');
				$(".icon_box").css({bottom: 2.3 + 'rem', opacity: 1});
				$(".icon_rotate").css({bottom: 3.1 + 'rem', opacity: 1});
			},
			switchEvent: function(status, name){
				if(status == 1){
					this.typeList.forEach((o) => {
						if(name == o.name) o.status = 0;
					});
				}else{
					this.typeList.forEach((o) => {
						if(name == o.name) o.status = 1;
					});
				}
			},
			getOrderInfo: function(){
				this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(this.userInfo != ''){
					let headers = {
						token: this.userInfo.token,
						secret: this.userInfo.secret
					}
					pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
						if(res.success == true && res.code == 1){
							this.typeList = [];
							this.$store.state.market.Parameters = [];
							this.$store.state.market.commodityOrder = [];
							if(res.data && res.data.length > 0){
								this.$store.state.market.commodityOrder = this.$parent.optionalList;
								let arr = [], arrs = [];
								res.data.forEach((o,i) => {
									console.log(o);
									this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
									arr.push(o.commodityType);
								});
								arr.forEach((o, i) => {
									if(arrs.indexOf(o) == -1){
										arrs.push(o);
									}
								});
								arrs.forEach((v) => {
									let obj = {name: v, status: 1};
									this.typeList.push(obj);
								});
							}
						}
					}).catch((err) => {
						Toast({message: err.data.message, position: 'bottom', duration: 2000});
					});
				}
				
			},
		},
		mounted: function(){
			//获取所有自选合约数据
			this.getOrderInfo();
		},
		activated: function(){
			//重新请求自选合约列表
			this.getOrderInfo();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.main{
		margin-top: 1.01rem;
	}
	.type{
		overflow: hidden;
		border-bottom: 0.01rem solid $bgDeep;
	}
	.title{
		width: 7.5rem;
		height: 0.64rem;
		overflow: hidden;
		background: #F2F2F2;
		border-bottom: 0.01rem solid $bgDeep;
		padding: 0 0.3rem;
		span{
			line-height: 0.64rem;
		}
		.icon{
			float: right;
			width: 0.2rem;
			height: 0.64rem;
			&.icon_show{
				background: url(../../assets/images/quote/show.png) no-repeat center 0.26rem;
				background-size: 0.2rem 0.12rem;
			}
			&.icon_hide{
				background: url(../../assets/images/quote/hide.png) no-repeat center 0.26rem;
				background-size: 0.2rem 0.12rem;
			}
		}
	}
	.recommend{
		width: 7.5rem;
		.col{
			float: left;
			width: 2.5rem;
			height: 1.6rem;
			border-right: 0.01rem solid $bgDeep;
			span{
				display: block;
				text-align: center;
				font-size: $fs32;
				&.name{
					margin-top: 0.25rem;
					font-size: $fs30;
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
	.add_optional{
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid $bgDeep;
		display: flex;
		justify-content: center;
		.icon_add{
			float: left;
			font-size: 0.32rem;
			color: $grayDeep;
			margin-right: 0.1rem;
		}
	}
	.btn_box{
		.icon{
			width: 0.64rem;
			height: 0.64rem;
			position: fixed;
			bottom: 1.5rem;
			right: 0.3rem;
			opacity: 0;
			transition: all .3s;
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
		}
	}
</style>