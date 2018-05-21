<template>
	<div id="todayOrder" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="type">买卖</span>
					<span class="num">成交价</span>
					<span class="price">成交量</span>
					<span class="status">成交时间</span>
				</div>
			</li>
			<template v-for="v in dealList">
				<li>
					<div class="list_cont">
						<div class="name">
							<em>{{v.commodityName}}</em>
							<em>{{v.ContractCode}}</em>
						</div>
						<span class="type">{{v.buyOrSell}}</span>
						<span class="num">{{v.tradePrice}}</span>
						<span class="price">{{v.tradeNum}}</span>
						<span class="status">{{v.tradeDateTime}}</span>
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	export default{
		name: "todayOrder",
		data(){
			return{
				dealList: [],
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			OnRspQryTradeDealListCont(){
				return this.$store.state.market.OnRspQryTradeDealListCont;
			}
		},
		watch: {
			OnRspQryTradeDealListCont: function(n, o){
				if(n){
					//获取成交列表数据
					this.operateData(this.OnRspQryTradeDealListCont);
				}
			}
		},
		methods: {
			operateData: function(obj){
				this.dealList = [];
				if(obj){
					this.OnRspQryTradeDealListCont.forEach(function(o, i){
						var data = {};
						data.commodityName = this.orderTemplist[o.CommodityNo].CommodityName;
						data.buyOrSell = function(){
							if(o.Drection == 0){
								return '买';
							}else{
								return '卖';
							}
						}();
						data.tradePrice = parseFloat(o.TradePrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
						data.tradeNum = o.TradeNum;
						data.tradeDateTime = o.TradeDateTime;
						data.ContractCode = o.ContractCode;
						data.OrderID = o.OrderID;
						this.dealList.unshift(data);
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取成交列表数据
			this.operateData(this.OnRspQryTradeDealListCont);
			//初始化fm当前高度
			let h = window.screen.height - $("header").height() - $("#tabbar").height()*2.2 - $(".nav").height() - $("#moneyTotal").height();
			$(".list").height(h);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.list{
		width: 7.5rem;
		overflow: auto;
		ul{
			width: 10rem;
		}
		li{
			span{
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				float: left;
				width: 2.6rem;
			}
			.num{
				width: 1.4rem;
			}
			.type{
				width: 0.9rem;
			}
			.price{
				width: 1.3rem;
			}
			.status{
				width: 3rem;
			}
			.price, .status{
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			.list_title{
				height: 0.64rem;
				border-bottom: 0.01rem solid $bgDeep;
				background: $bg;
				padding-left: 0.3rem;
				span{
					height: 0.64rem;
					line-height: 0.64rem;
				}
			}
			&.current{
				.list_cont{
					background: $lightBlue;
				}
			}
			.list_cont{
				height: 0.88rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 0.3rem;
				span{
					line-height: 0.88rem;
					color: $white;
				}
				.name{
					em{
						display: block; 
						&:first-child{
							font-size: $fs28;
							color: $white;
							margin: 0.15rem 0 0.05rem 0;
						}
					}
				}
			}
			.tools{
				/*display: none;*/
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 2.9rem;
				#btn{
					float: left;
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>