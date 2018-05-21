<template>
	<div id="entrust" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="num">状态</span>
					<span class="type">买卖</span>
					<span class="price">委托价</span>
					<span class="price">委托量</span>
					<span class="price">已成交</span>
					<span class="price">已撤单</span>
					<span class="status">下单时间</span>
					<span class="mark">状态说明</span>
				</div>
			</li>
			<template v-for="v in entrustList">
				<li>
					<div class="list_cont">
						<div class="name">
							<em>{{v.commodityName}}</em>
							<em>{{v.ContractCode}}</em>
						</div>
						<span class="num">{{v.commodityStatus}}</span>
						<span class="type">{{v.buyOrSell}}</span>
						<span class="price">{{v.delegatePrice}}</span>
						<span class="price">{{v.delegateNum}}</span>
						<span class="price">{{v.TradeNum}}</span>
						<span class="price">{{v.RevokeNum}}</span>
						<span class="status">{{v.InsertDateTime}}</span>
						<span class="mark">{{v.StatusMsg}}</span>
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default{
		name: "entrust",
		components: {btn},
		data(){
			return{
				entrustList: [],    //渲染委托列表数据
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			OrderType(){
				return this.$store.state.market.OrderType;
			},
			OnRspOrderInsertEntrustCont(){
				return this.$store.state.market.OnRspOrderInsertEntrustCont;
			},
		},
		watch: {
			OnRspOrderInsertEntrustCont: function(n, o){
				if(n){
					//更新委托列表数据
					this.operateData(n);
				}
			}
		},
		methods: {
			operateData: function(obj){
				this.entrustList = [];
				if(obj){
					obj.forEach(function(o, i){
						var data = {};
						if(o.CommodityNo != ''){
							data.commodityName = this.orderTemplist[o.CommodityNo].CommodityName;
							data.commodityStatus = this.OrderType[o.OrderStatus];
							data.buyOrSell = function(){
								if(o.Drection==0){
									return '买';
								}else{
									return '卖';
								}
							}();
							data.delegatePrice = function(){
								if(o.OrderPriceType==1){
									return '市价';
								}else{
									return parseFloat(o.OrderPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
								}
							}.bind(this)();
							data.delegateNum = o.OrderNum;
							data.TradeNum = o.TradeNum;
							data.RevokeNum = function(){
								if(o.OrderStatus == 4){
									return o.OrderNum - o.TradeNum;
								}else{
									return 0;
								}
							}();
							data.InsertDateTime = o.InsertDateTime;
							data.ContractCode = o.ContractCode;
							data.OrderID = o.OrderID;
							data.StatusMsg = o.StatusMsg;
							this.entrustList.unshift(data);
						}
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取委托列表数据
			this.operateData(this.OnRspOrderInsertEntrustCont);
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
			width: 18rem;
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
			.mark{
				width: 4rem;
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
				border-bottom: 0.01rem solid $bgDeep;
				padding-left: 0.3rem;
				span{
					line-height: 0.88rem;
				}
				.name{
					em{
						display: block; 
						&:first-child{
							font-size: $fs28;
							margin: 0.15rem 0 0.05rem 0;
						}
					}
				}
			}
		}
	}
</style>