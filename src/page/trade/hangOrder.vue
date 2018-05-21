<template>
	<div id="hangOrder" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="type">买卖</span>
					<span class="num">委托价</span>
					<span class="price">委托量</span>
					<span class="price">挂单量</span>
					<span class="status">挂单时间</span>
				</div>
			</li>
			<template v-for="(v, index) in orderListCont">
				<li :class="{current: selectedNum == index}">
					<div class="list_cont" @click.stop="clickEvent(index, v.OrderID, v.delegatePrice, v.delegateNum)">
						<div class="name">
							<em>{{v.commodityName}}</em>
							<em>{{v.ContractCode}}</em>
						</div>
						<span class="type">{{v.buyOrSell}}</span>
						<span class="num">{{v.delegatePrice}}</span>
						<span class="price">{{v.delegateNum}}</span>
						<span class="price">{{v.ApplyOrderNum}}</span>
						<span class="status">{{v.InsertDateTime}}</span>
					</div>
				</li>
			</template>
		</ul>
		<div class="tools" v-show="toolShow">
			<btn name="撤单" className="whitesm" @click.native="cancelOrder"></btn>
			<btn name="改单" className="whitesm" @click.native="editOrder"></btn>
		</div>
		<editOrder ref="editOrder"></editOrder>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import editOrder from "./editOrder.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "hangOrder",
		components: {btn, editOrder},
		data(){
			return{
				selectedNum: -1,
				currentOrderID: '',
				entrustPrice: '',
				entrustNum: '',
				toolShow: false,
			}
		},computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			templateList(){
				return this.$store.state.market.templateList;
			},
			OnRspOrderInsertOrderListCont(){
				return this.$store.state.market.OnRspOrderInsertOrderListCont;
			},
			orderListCont(){
				return this.$store.state.market.orderListCont;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			cancelStatus(){
				return this.$store.state.market.cancelStatus;
			}
		},
		watch: {
			OnRspOrderInsertOrderListCont: function(n, o){
				if(n){
					//更新挂单列表数据
					this.operateData(n);
				}
			},
			orderListCont: function(n, o){
				this.currentOrderID = '';
				this.selectedNum = -1;
			}
		},
		methods: {
			clickEvent: function(i, id, price, num){
				this.selectedNum = i;
				this.currentOrderID = id;
				this.entrustPrice = price;
				this.entrustNum = num;
				//显示操作按钮
				$('.list li').css({'height': 'auto'});
				$('.list li').eq(i+1).css({'height': '1.85rem'});
				this.toolShow = true;
				let h = 4.2;   //初始值
				h = h + (i+1)*0.88;
				$(".tools").css({'top': h + 'rem'});
			},
			cancelOrder: function(){
				var confirmText;
				if(this.currentOrderID != ''){
					this.orderListCont.forEach(function(o,i){
						if(this.currentOrderID == o.OrderID){
							var Contract = o.ContractCode.substring(0, o.ContractCode.length-4);
							var b = {
								"Method": 'CancelOrder',
								"Parameters":{
									"OrderSysID": '',
									"OrderID": o.OrderID,
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.templateList[Contract].CommodityNo,
									"ContractNo": this.templateList[Contract].ContractNo,
									"OrderNum": parseFloat(o.delegateNum),
									"Direction": function(){
													if(o.buyOrSell=='买'){
														return 0;
													}else{
														return 1;
													}
												},
									"OrderPrice": parseFloat(o.delegatePrice)
								}
							};
							confirmText = '提交撤单:【'+ o.ContractCode +'】,价格【'+ o.delegatePrice +'】,手数【'+ o.delegateNum +'】,方向【'+ o.buyOrSell +'】？';
							MessageBox.confirm(confirmText,"提示").then(action=>{
								if(this.cancelStatus == true) return;
								this.$store.state.market.cancelStatus = true;
								this.tradeSocket.send(JSON.stringify(b));
								$('.list li').css({'height': 'auto'});
								this.toolShow = false;
							}).catch(err=>{});
						}
					}.bind(this));
				}else{
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}
			},
			editOrder: function(){
				this.$refs.editOrder.show = true;
				this.$refs.editOrder.id = this.currentOrderID;
				this.$refs.editOrder.entrustPrice = this.entrustPrice;
				this.$refs.editOrder.entrustNum = this.entrustNum;
			},
			operateData: function(obj){
				this.$store.state.market.orderListCont = [];
				if(obj){
					obj.forEach(function(o, i){
						var data = {};
						data.commodityName = this.orderTemplist[o.CommodityNo].CommodityName;
						data.buyOrSell = function(){
							if(o.Drection == 0){
								return '买';
							}else{
								return '卖';
							}
						}();
						data.delegatePrice = function(){
							if(o.OrderPriceType == 1){
								return '市价';
							}else{
								return parseFloat(o.OrderPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
							}
						}.bind(this)();
						data.delegateNum = o.OrderNum;
						data.ApplyOrderNum = o.OrderNum-o.TradeNum;
						data.InsertDateTime = o.InsertDateTime;
						data.ContractCode = o.ContractCode;
						data.OrderID = o.OrderID;
						this.$store.state.market.orderListCont.unshift(data);
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取挂单列表数据
			this.operateData(this.OnRspOrderInsertOrderListCont);
			//初始化fm当前高度
			let h = window.screen.height - $("header").height() - $("#tabbar").height()*2.2 - $(".nav").height() - $("#moneyTotal").height();
			$(".list").height(h);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.tools{
		width: 7.5rem;
		height: 0.96rem;
		border-bottom: 0.01rem solid $bgDeep;
		background: #f2f2f2;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		#btn{
			margin: 0.16rem 0.1rem;
		}
	}
	.list{
		width: 7.5rem;
		overflow: auto;
		ul{
			width: 11.4rem;
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
					background: $bgDeep;
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