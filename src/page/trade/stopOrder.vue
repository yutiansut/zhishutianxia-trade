<template>
	<div id="stopOrder" >
		<div class="order_type">
			<template v-for="(v, index) in tabList">
				<span :class="{current: currentNum == index}" @tap="tabEvent(index)">{{v}}</span>
			</template>
		</div>
		<div class="list">
			<ul v-if="tabShow">
				<li>
					<div class="list_title">
						<span class="name">合约名称</span>
						<span class="num">状态</span>
						<span class="type">多空</span>
						<span class="num">类型</span>
						<span class="type">手数</span>
						<span class="status">触发条件</span>
						<span class="price">委托价</span>
						<span class="num">有效日期</span>
						<span class="status">下单时间</span>
					</div>
				</li>
				<template v-for="(v, index) in notStopLossList">
					<li :class="{current: selectedNum == index}" @click="clickEvent(index, v.StopLossNo, v.Status, v.StopLossType00)">
						<div class="list_cont">
							<div class="name">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.CommodityNo + v.ContractNo}}</em>
							</div>
							<span class="num">{{v.StatusMsg00}}</span>
							<span class="type">{{v.HoldDrection}}</span>
							<span class="num">{{v.StopLossType}}</span>
							<span class="type">{{v.Num}}</span>
							<span class="status">{{v.triggerCondition}}</span>
							<span class="price">{{v.entrustPrice}}</span>
							<span class="num">{{v.validity}}</span>
							<span class="status">{{v.InsertDateTime}}</span>
						</div>
					</li>
				</template>
			</ul>
			<ul v-if="!tabShow">
				<li>
					<div class="list_title">
						<span class="name">合约名称</span>
						<span class="num">状态</span>
						<span class="type">多空</span>
						<span class="num">类型</span>
						<span class="type">手数</span>
						<span class="status">触发条件</span>
						<span class="price">委托价</span>
						<span class="num">有效日期</span>
						<span class="status">下单时间</span>
					</div>
				</li>
				<li class="current">
					<template v-for="(v, index) in alreadyStopLossList">
						<div class="list_cont">
							<div class="name">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.CommodityNo + v.ContractNo}}</em>
							</div>
							<span class="num">{{v.StatusMsg00}}</span>
							<span class="type">{{v.HoldDrection}}</span>
							<span class="num">{{v.StopLossType}}</span>
							<span class="type">{{v.Num}}</span>
							<span class="status">{{v.triggerCondition}}</span>
							<span class="price">{{v.entrustPrice}}</span>
							<span class="num">{{v.validity}}</span>
							<span class="status">{{v.InsertDateTime}}</span>
						</div>
					</template>
				</li>
			</ul>
		</div>
		<div class="tools" v-show="toolShow">
			<btn :name="statusName" className="orangesm" @click.native="suspendEvent"></btn>
			<btn name="修改" className="bluesm" @click.native="editEvent"></btn>
			<btn name="删除" className="greensm" @click.native="deleteEvent"></btn>
		</div>
		<stopLossAlert ref="stopLossAlert"></stopLossAlert>
		<stopProfitAlert ref="stopProfitAlert"></stopProfitAlert>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import stopLossAlert from "./stopLossAlert.vue"
	import stopProfitAlert from "./stopProfitAlert.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "stopOrder",
		components: {btn, stopLossAlert, stopProfitAlert},
		data(){
			return{
				tabList: ['未触发列表','已触发列表'],
				currentNum: 0,
				tabShow: true,
				notStopLossList: [],
				alreadyStopLossList: [],
				selectedNum: -1,
				currentId: '',
				status: '',
				statusName: '暂停',
				stopLossType: '',
				toolShow: false,
			}
		},
		computed: {
			tradeSocket() {
				return this.$store.state.tradeSocket;
			},
			orderTemplist(){
				return	this.$store.state.market.orderTemplist;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			stopLossList(){
				return this.$store.state.market.stopLossList;
			},
			stopLossTriggeredList(){
				return this.$store.state.market.stopLossTriggeredList;
			},
		},
		watch: {
			stopLossList: function(n, o){
				this.notStopLossListEvent();
			},
			stopLossTriggeredList: function(n, o){
				this.alreadyStopLossListEvent();
			},
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.tabShow = true;
				}else{
					this.tabShow = false;
					this.alreadyStopLossListEvent();
				}
			},
			clickEvent: function(i, id, status, type){
				this.selectedNum = i;
				this.currentId = id;
				this.status = status;
				this.stopLossType = type;
				if(this.status == 0){
					this.statusName = '暂停';
				}else{
					this.statusName = '启动';
				}
				//显示操作按钮
				$('.list li').css({'height': 'auto'});
				$('.list li').eq(i+1).css({'height': '1.85rem'});
				this.toolShow = true;
				let h = 5.16;   //初始值
				h = h + (i+1)*0.88;
				$(".tools").css({'top': h + 'rem'});
			},
			suspendEvent: function(){
				var b, confirmText;
				this.notStopLossList.forEach(function(o, i){
					if(o.StopLossNo == this.currentId){
						if(o.Status == 0){ //运行中
							confirmText = '是否暂停止损单？';
							b = {
								"Method": 'ModifyStopLoss',
								"Parameters":{
									'StopLossNo': o.StopLossNo,
									'ModifyFlag': 2,
									'Num': parseInt(o.Num),
									'StopLossType': parseInt(o.StopLossType00),
									'OrderType': parseInt(o.OrderType00),
									'StopLossPrice': parseFloat(o.StopLossPrice),
									'StopLossDiff': parseFloat(o.StopLossDiff)
								}
							};
						}else if (o.Status == 1){ //暂停
							confirmText = '是否启动止损单？';
							b = {
								"Method": 'ModifyStopLoss',
								"Parameters":{
									'StopLossNo': o.StopLossNo,
									'ModifyFlag': 3,
									'Num': parseInt(o.Num),
									'StopLossType': parseInt(o.StopLossType00),
									'OrderType': parseInt(o.OrderType00),
									'StopLossPrice': parseFloat(o.StopLossPrice),
									'StopLossDiff': parseFloat(o.StopLossDiff)
								}
							};
						}
						MessageBox.confirm(confirmText,"提示").then(action=>{
							this.tradeSocket.send(JSON.stringify(b));
							this.currentId = '';
							this.selectedNum = -1;
							$('.list li').css({'height': 'auto'});
							this.toolShow = false;
						}).catch(err=>{});
					}
				}.bind(this));
			},
			editEvent: function(){
				if(this.currentId == '' || this.currentId == undefined){
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}else if(this.status == 0){
					Toast({message: '运行中的止损单不能修改', position: 'bottom', duration: 1000});
				}else{
					if(this.stopLossType == 0){
						this.$refs.stopLossAlert.show = true;
						this.notStopLossList.forEach(function(o, i){
							if(this.currentId == o.StopLossNo){
								this.$refs.stopLossAlert.commodityName = o.CommodityNo + o.ContractNo;
								this.$refs.stopLossAlert.commodityNo = o.CommodityNo;
								this.$refs.stopLossAlert.commodityType = o.HoldDrection;
								this.$refs.stopLossAlert.priceType = '止损价';
								this.$refs.stopLossAlert.lossPrice = o.StopLossPrice;
								this.$refs.stopLossAlert.num = o.Num;
								this.$refs.stopLossAlert.holdAvgPrice = o.HoldAvgPrice;
								this.$refs.stopLossAlert.stopLossPrice = o.StopLossPrice;
							}
						}.bind(this));
					}else if(this.stopLossType == 1){
						this.$refs.stopProfitAlert.show = true;
						this.notStopLossList.forEach(function(o, i){
							if(this.currentId == o.StopLossNo){
								this.$refs.stopProfitAlert.commodityName = o.CommodityNo + o.ContractNo;
								this.$refs.stopProfitAlert.commodityNo = o.CommodityNo;
								this.$refs.stopProfitAlert.commodityType = o.HoldDrection;
								this.$refs.stopProfitAlert.profitPrice = o.StopLossPrice;
								this.$refs.stopProfitAlert.num = o.Num;
								this.$refs.stopProfitAlert.holdAvgPrice = o.HoldAvgPrice;
							}
						}.bind(this));
					}else{
						this.$refs.stopLossAlert.show = true;
						this.notStopLossList.forEach(function(o, i){
							if(this.currentId == o.StopLossNo){
								this.$refs.stopLossAlert.commodityName = o.CommodityNo + o.ContractNo;
								this.$refs.stopLossAlert.commodityNo = o.CommodityNo;
								this.$refs.stopLossAlert.commodityType = o.HoldDrection;
								this.$refs.stopLossAlert.priceType = '动态价';
								this.$refs.stopLossAlert.lossPrice = o.StopLossDiff;
								this.$refs.stopLossAlert.num = o.Num;
								this.$refs.stopLossAlert.holdAvgPrice = o.HoldAvgPrice;
								this.$refs.stopLossAlert.stopLossPrice = o.StopLossPrice;
								this.$refs.stopLossAlert.stopLossDiff = o.StopLossDiff;
							}
						}.bind(this));
					}
				}
			},
			deleteEvent: function(){
				this.notStopLossList.forEach(function(o, i){
					if(o.StopLossNo == this.currentId){
						let b = {
							"Method": 'ModifyStopLoss',
							"Parameters": {
								'StopLossNo': o.StopLossNo,
								'ModifyFlag': 1,
								'Num': parseInt(o.Num),
								'StopLossType': parseInt(o.StopLossType00),
								'OrderType': parseInt(o.OrderType00),
								'StopLossPrice': parseFloat(o.StopLossPrice),
								'StopLossDiff': parseFloat(o.StopLossDiff)
							}
						};
						MessageBox.confirm('是否删除止损单？',"提示").then(action=>{
							this.tradeSocket.send(JSON.stringify(b));
							this.currentId = '';
							this.selectedNum = -1;
							$('.list li').css({'height': 'auto'});
							this.toolShow = false;
						}).catch(err=>{});
					}
				}.bind(this));
			},
			notStopLossListEvent: function(){
				this.notStopLossList = [];
				this.stopLossList.forEach(function(o, i){
					let obj = {};
					obj.ClientNo = o.ClientNo;
					obj.CommodityNo = o.CommodityNo;
					obj.ContractNo = o.ContractNo;
					obj.ExchangeNo = o.ExchangeNo;
					obj.HoldAvgPrice = o.HoldAvgPrice;
					obj.HoldDrection = (function(){
							if(o.HoldDrection == 0){
								return '多';
							}else{
								return '空';
							}
						})();
					obj.InsertDateTime = o.InsertDateTime;
					obj.Num = o.Num;
					obj.OrderType = (function(){
						if(o.OrderType == 1){
							return '市价';
						}else{
							return '限价';
						}
					})();
					obj.OrderType00 = o.OrderType;
					obj.Status = o.Status;
					obj.StatusMsg = o.StatusMsg;
					obj.StatusMsg00 = (function(){
						if(o.Status == 0)
							return '运行中';
						if(o.Status == 1)
							return '暂停';
						if(o.Status == 2)
							return '已触发';
						if(o.Status == 3)
							return '已取消';
						if(o.Status == 4)
							return '插入失败';
						if(o.Status == 5)
							return '触发失败';	
					})();
					obj.StopLossDiff = o.StopLossDiff;
					obj.StopLossNo = o.StopLossNo;
					obj.StopLossPrice = parseFloat(o.StopLossPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
					obj.StopLossType = (function(){
						if(o.StopLossType == 0)
							return '限价止损';
						if(o.StopLossType == 1)	
							return '限价止盈';
						if(o.StopLossType == 2)
							return '动态止损';
					})();
					obj.StopLossType00 = o.StopLossType;
					obj.triggerCondition=(function(){
						if(o.StopLossType == 0 || o.StopLossType == 1)
							return '触发价:'+parseFloat(o.StopLossPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
						if(o.StopLossType == 2)
							return '动态价:'+parseFloat(o.StopLossDiff).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
					}.bind(this))();
					obj.entrustPrice = (function(){
						if(o.OrderType == 1){
							return '市价';
						}else{
							return '对手价';
						}
					})();
					obj.validity = '永久有效';
					obj.InsertDateTime = o.InsertDateTime;
					this.notStopLossList.push(obj);
				}.bind(this));
			},
			alreadyStopLossListEvent: function(){
				this.alreadyStopLossList = [];
				this.stopLossTriggeredList.forEach(function(o, i){
					let obj = {};
					obj.ClientNo = o.ClientNo;
					obj.CommodityNo = o.CommodityNo;
					obj.ContractNo = o.ContractNo;
					obj.ExchangeNo = o.ExchangeNo;
					obj.HoldAvgPrice = o.HoldAvgPrice;
					obj.HoldDrection = (function(){
							if(o.HoldDrection == 0){
								return '多';
							}else{
								return '空';
							}
						})();
					obj.InsertDateTime = o.InsertDateTime;
					obj.Num = o.Num;
					obj.OrderType = (function(){
						if(o.OrderType == 1){
							return '市价';
						}else{
							return '限价';
						}
					})();
					obj.Status = o.Status;
					obj.StatusMsg = o.StatusMsg;
					obj.StatusMsg00 = (function(){
						if(o.Status == 0)
							return '运行中';
						if(o.Status == 1)
							return '暂停';
						if(o.Status == 2)
							return '已触发';
						if(o.Status == 3)
							return '已取消';
						if(o.Status == 4)
							return '插入失败';
						if(o.Status == 5)
							return '触发失败';	
					})();
					obj.StopLossDiff = o.StopLossDiff;
					obj.StopLossNo = o.StopLossNo;
					obj.StopLossPrice = parseFloat(o.StopLossPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
					obj.StopLossType = (function(){
						if(o.StopLossType == 0)
							return '限价止损';
						if(o.StopLossType == 1)	
							return '限价止盈';
						if(o.StopLossType == 2)
							return '动态止损';
					})();
					obj.triggerCondition = (function(){
						if(o.StopLossType == 0 || o.StopLossType == 1)
							return '触发价:'+parseFloat(o.StopLossPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
						if(o.StopLossType == 2)
							return '动态价:'+parseFloat(o.StopLossDiff).toFixed(this.orderTemplist[o.CommodityNo].DotSize);	
					}.bind(this))();
					obj.entrustPrice = (function(){
						if(o.OrderType == 1){
							return '市价';
						}else{
							return '对手价';
						}
					})();
					obj.validity = '永久有效';
					obj.InsertDateTime = o.InsertDateTime;
					this.alreadyStopLossList.push(obj);
				}.bind(this));
			}
		},
		mounted: function(){
			//获取渲染页面所需数据
			this.notStopLossListEvent();
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
	.order_type{
		height: 0.96rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $black;
		span{
			display: inline-block;
			float: left;
			width: 3.45rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			background: $lightBlue;
			margin: 0.2rem 0;
			color: $white; 
			&:first-child{
				border-top-left-radius: 0.1rem;
				border-bottom-left-radius: 0.1rem;
			}
			&:last-child{
				border-top-right-radius: 0.1rem;
				border-bottom-right-radius: 0.1rem;
			}
			&.current{
				background: $blue;
			}
		}
	}
	.list{
		width: 7.5rem;
		overflow: auto;
		ul{
			width: 16.4rem;
		}
		li{
			span{
				float: left;
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
		}
	}
</style>