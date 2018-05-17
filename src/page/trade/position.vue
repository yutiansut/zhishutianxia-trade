<template>
	<div id="position" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="type">多空</span>
					<span class="type">手数</span>
					<span class="price">持仓均价</span>
					<span class="status">浮动盈亏</span>
				</div>
			</li>
			<template v-for="(v, index) in positionListCont">
				<li :class="{current: selectedNum == index}">
					<div class="list_cont" @click.stop="clickEvent(index, v.commodityNocontractNo)">
						<div class="name">
							<em>{{v.CommodityName}}</em>
							<em>{{v.commodityNocontractNo}}</em>
						</div>
						<span class="type" :class="v.type_color">{{v.type}}</span>
						<span class="type">{{v.HoldNum}}</span>
						<span class="price">{{v.price}}</span>
						<span class="status" :class="v.total_color">{{v.total}}</span>
					</div>
				</li>
			</template>
		</ul>
		<div class="tools" v-show="toolShow">
			<btn name="平仓" className="orangesm" @click.native="closePosition"></btn>
			<btn name="反手" className="bluesm" @tap.native="backTrade"></btn>
			<btn name="止损止盈" className="greensm" @click.native="stopMoney"></btn>
		</div>
		<stopMoneyAlert ref="stopMoneyAlert"></stopMoneyAlert>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import stopMoneyAlert from "./stopMoneyAlert.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "position",
		components: {btn, stopMoneyAlert},
		data(){
			return{
				selectedNum: -1,
				currentOrderID: '',
				toolShow: false,
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			templateList(){
				return this.$store.state.market.templateList;
			},
			qryHoldTotalArr(){
				return this.$store.state.market.qryHoldTotalArr;
			},
			positionListCont(){
				return this.$store.state.market.positionListCont;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			buyStatus(){
				return this.$store.state.market.buyStatus;
			},
			jCacheTotalAccount(){
				return this.$store.state.market.CacheAccount.jCacheTotalAccount;
			},
		},
		watch: {
			qryHoldTotalArr: function(n, o){
				if(n && this.toolShow == true){
					this.toolShow = false;
				}
			}
		},
		methods: {
			stopMoney: function(){   //止损止盈
				this.$refs.stopMoneyAlert.show = true;
				this.qryHoldTotalArr.forEach(function(o,i){
					if(this.currentOrderID == o.ContractCode){
						let dosize = this.orderTemplist[o.CommodityNo].DotSize;
						this.$refs.stopMoneyAlert.commodityName = o.ContractCode;
						this.$refs.stopMoneyAlert.commodityNo = o.CommodityNo;
						this.$refs.stopMoneyAlert.commodityType = o.Drection;
						this.$refs.stopMoneyAlert.lossPrice = parseFloat(o.OpenAvgPrice).toFixed(dosize);
						this.$refs.stopMoneyAlert.profitPrice = parseFloat(o.OpenAvgPrice).toFixed(dosize);
						this.$refs.stopMoneyAlert.openAvgPrice = parseFloat(o.OpenAvgPrice).toFixed(dosize);
						this.$refs.stopMoneyAlert.holdAvgPrice = parseFloat(o.HoldAvgPrice).toFixed(dosize);
						this.$refs.stopMoneyAlert.num = o.HoldNum;
					}
				}.bind(this));
			},
			clickEvent: function(i, id){
				this.selectedNum = i;
				this.currentOrderID = id;
				//显示操作按钮
				$('.list li').css({'height': 'auto'});
				$('.list li').eq(i+1).css({'height': '1.85rem'});
				this.toolShow = true;
				let h = 4.2;   //初始值
				h = h + (i+1)*0.88;
				$(".tools").css({'top': h + 'rem'});
			},
			closePosition: function(){
				var confirmText;
				if(this.currentOrderID != ''){
					this.positionListCont.forEach(function(o,i){
						if(this.currentOrderID == o.commodityNocontractNo){
							var buildIndex = 0;
							if(buildIndex > 100) buildIndex = 0;
							var Contract = o.commodityNocontractNo.substring(0, o.commodityNocontractNo.length-4);
							var drection;
							o.type == '多' ? drection = 1 : drection = 0;
							var b = {
								"Method": 'InsertOrder',
								"Parameters":{
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.orderTemplist[Contract].CommodityNo,
									"ContractNo": this.orderTemplist[Contract].MainContract,
									"OrderNum": o.HoldNum,
									"Drection": drection,
									"PriceType": 1,
									"LimitPrice": 0.00,
									"TriggerPrice": 0,
									"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
								}
							};
							confirmText = '提交订单:【'+ o.commodityNocontractNo +'】,价格【市价】,手数【'+ o.HoldNum +'】？';
							MessageBox.confirm(confirmText,"提示").then(action=>{
								if(this.buyStatus == true) return;
								this.$store.state.market.buyStatus = true;
								this.tradeSocket.send(JSON.stringify(b));
								this.currentOrderID = '';
								this.selectedNum = -1;
								$('.list li').css({'height': 'auto'});
								this.toolShow = false;
							}).catch(err=>{});
						}
					}.bind(this));
				}else{
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}
			},
			backTrade: function(){
				var confirmText;
				if(this.currentOrderID != ''){
					this.positionListCont.forEach(function(o,i){
						if(this.currentOrderID == o.commodityNocontractNo){
							if(o.price > this.jCacheTotalAccount.TodayCanUse){
								Toast({message: '当前余额不足，反手操作失败', position: 'bottom', duration: 1000});
								return;
							}
							var buildIndex = 0;
							if(buildIndex > 100) buildIndex = 0;
							var Contract = o.commodityNocontractNo.substring(0, o.commodityNocontractNo.length-4);
							var drection, _drection;
							o.type == '多' ? drection = 1 : drection = 0;
							var b = {
								"Method": 'InsertOrder',
								"Parameters":{
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.templateList[Contract].CommodityNo,
									"ContractNo": this.templateList[Contract].ContractNo,
									"OrderNum": o.HoldNum,
									"Drection": drection,
									"PriceType": 1,
									"LimitPrice": 0.00,
									"TriggerPrice": 0,
									"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
								}
							};
							confirmText = '确定反手:【'+ o.commodityNocontractNo +'】,价格【市价】,手数【'+ o.HoldNum +'】？';
							MessageBox.confirm(confirmText,"提示").then(action=>{
								if(this.buyStatus == true) return;
								this.$store.state.market.buyStatus = true;
								this.tradeSocket.send(JSON.stringify(b));
								setTimeout(function(){
									this.tradeSocket.send(JSON.stringify(b));
									this.currentOrderID = '';
									this.selectedNum = -1;
									$('.list li').css({'height': 'auto'});
									this.toolShow = false;
								}.bind(this), 500);
							}).catch(err=>{});
						}
					}.bind(this));
				}else{
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}
			},
			operateData: function(obj){
				this.$store.state.market.positionListCont = [];
				if(obj){
					obj.forEach(function(o, i){
						var data = {};
						data.CommodityName = this.orderTemplist[o.CommodityNo].CommodityName;
						data.type = function(){
							if(o.Drection == 0){
								return '多'
							}else{
								return '空'
							}
						}();
						data.HoldNum = o.HoldNum;
						data.price = o.HoldAvgPrice.toFixed(this.orderTemplist[o.CommodityNo].DotSize);
						data.total = 0;
						data.type_color = function(){
							if(o.Drection==0){
								return 'red'
							}else{
								return 'green'
							}
						}();
						data.total_color = 'green';
						data.commodityNocontractNo = this.orderTemplist[o.CommodityNo].CommodityNo + this.orderTemplist[o.CommodityNo].MainContract;
						this.$store.state.market.positionListCont.unshift(data);
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取持仓列表数据
			this.operateData(this.qryHoldTotalArr);
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
		border-bottom: 0.01rem solid $black;
		background: $bg;
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
			width: 9.4rem;
		}
		li{
			span{
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				float: left;
				width: 2.6rem;
				em{
					display: block; 
					&:first-child{
						font-size: $fs28;
						color: $white;
						margin: 0.15rem 0 0.05rem 0;
					}
				}
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
			.price, .status, .type{
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			.list_title{
				height: 0.64rem;
				border-bottom: 0.01rem solid $black;
				background: #16597f;
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
			}
		}
	}
</style>