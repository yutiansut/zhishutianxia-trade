<template>
	<div id="condition">
		<div class="order_type">
			<template v-for="(v, index) in tabList">
				<span :class="{current: currentNum == index}" @click="tabEvent(index)">{{v}}</span>
			</template>
		</div>
		<div class="list">
			<ul v-if="tabShow">
				<li>
					<div class="list_title">
						<span class="name">合约名称</span>
						<span class="num">状态</span>
						<span class="num">类型</span>
						<span class="status">条件</span>
						<span class="status">下单</span>
						<span class="num">有效日期</span>
						<span class="status">下单时间</span>
					</div>
				</li>
				<template v-for="(v, index) in conditionListCont">
					<li :class="{current: selectedNum == index}" @click="clickEvent(index, v.ConditionNo, v.Status, v.ConditionType)">
						<div class="list_cont">
							<div class="name">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.name}}</em>
							</div>
							<span class="num">{{v.status00}}</span>
							<span class="num">{{v.type}}</span>
							<span class="status">{{v.conditions}}</span>
							<span class="status">{{v.order}}</span>
							<span class="num">{{v.term}}</span>
							<span class="status">{{v.time}}</span>
						</div>
					</li>
				</template>
			</ul>
			<ul v-if="!tabShow">
				<li>
					<div class="list_title">
						<span class="name">合约名称</span>
						<span class="num">状态</span>
						<span class="num">类型</span>
						<span class="status">条件</span>
						<span class="status">下单</span>
						<span class="num">有效日期</span>
						<span class="status">下单时间</span>
					</div>
				</li>
				<template v-for="v in triggerConditionListCont">
					<li>
						<div class="list_cont">
							<div class="name">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.name}}</em>
							</div>
							<span class="num">{{v.status00}}</span>
							<span class="num">{{v.type}}</span>
							<span class="status">{{v.conditions}}</span>
							<span class="status">{{v.order}}</span>
							<span class="num">{{v.term}}</span>
							<span class="status">{{v.time}}</span>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<div class="tools" v-show="toolShow" >
			<btn :name="statusName" className="orangesm" @click.native="suspendConditionOrder"></btn>
			<btn name="修改" className="bluesm" @click.native="editEvent"></btn>
			<btn name="删除" className="greensm" @click.native="deleteConditionOrder"></btn>
		</div>
		<conditionTime ref="conditionTime"></conditionTime>
		<conditionPrice ref="conditionPrice"></conditionPrice>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import conditionTime from "./conditionTime.vue"
	import conditionPrice from "./conditionPrice.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "condition",
		components: {btn, conditionTime, conditionPrice},
		data(){
			return{
				tabList: ['未触发列表','已触发列表'],
				currentNum: 0,
				tabShow: true,
				conditionListCont: [],
				triggerConditionListCont: [],
				selectedNum: -1,
				currentId: '',
				status: '',
				statusName: '暂停',
				conditionType: '',
				toolShow: false,
			}
		},
		computed: {
			conditionList(){
				return this.$store.state.market.conditionList;
			},
			triggerConditionList(){
				return this.$store.state.market.triggerConditionList;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			orderTemplist(){
				return	this.$store.state.market.orderTemplist;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		watch: {
			conditionList: function(n, o){
				this.regroupConditionList();
			},
			triggerConditionList: function(n, o){
				this.regroupTriggerConditionList();
			},
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.tabShow = true;
				}else{
					this.tabShow = false;
					this.regroupTriggerConditionList();
				}
			},
			clickEvent: function(i, id, status, type){
				this.selectedNum = i;
				this.currentId = id;
				this.status = status;
				this.conditionType = type;
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
			suspendConditionOrder: function(){
				if(this.currentId == '' || this.currentId == undefined){
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000}); return;
				}
				let b, confirmText;
				this.conditionListCont.forEach((o,i) => {
					if(this.currentId == o.ConditionNo){
						if(o.Status == 0){    //如果处于运行中，则暂停
							confirmText = '是否暂停条件单？';
							b = {
								"Method": 'ModifyCondition',
								"Parameters": {
									"ConditionNo": o.ConditionNo,
									"ModifyFlag": 2, //暂停
									"Num": o.Num,
									"ConditionType": o.ConditionType,
									"PriceTriggerPonit": o.PriceTriggerPonit,
									"CompareType": o.CompareType,
									"TimeTriggerPoint": o.TimeTriggerPoint,
									"AB_BuyPoint": o.AB_BuyPoint,
									"AB_SellPoint": o.AB_SellPoint,
									"OrderType": o.OrderType,
									"StopLossType": o.StopLossType,
									"Direction": o.Drection,
									"StopLossDiff": 0.0,
									"StopWinDiff": 0.0,
									"AdditionFlag": o.AdditionFlag,
									"AdditionType": o.AdditionType,
									"AdditionPrice": o.AdditionPrice
								}
							};
						}else if(o.Status == 1){
							confirmText = '是否启动条件单？';
							b = {
								"Method": 'ModifyCondition',
								"Parameters": {
									"ConditionNo": o.ConditionNo,
									"ModifyFlag": 3, //启动
									"Num": o.Num,
									"ConditionType": o.ConditionType,
									"PriceTriggerPonit": o.PriceTriggerPonit,
									"CompareType": o.CompareType,
									"TimeTriggerPoint": o.TimeTriggerPoint,
									"AB_BuyPoint": o.AB_BuyPoint,
									"AB_SellPoint": o.AB_SellPoint,
									"OrderType": o.OrderType,
									"StopLossType": o.StopLossType,
									"Direction": o.Drection,
									"StopLossDiff": 0.0,
									"StopWinDiff": 0.0,
									"AdditionFlag": o.AdditionFlag,
									"AdditionType": o.AdditionType,
									"AdditionPrice": o.AdditionPrice
								}
							};
						}
						MessageBox.confirm(confirmText, "提示").then(action=>{
							this.tradeSocket.send(JSON.stringify(b));
							this.currentId = '';
							this.selectedNum = -1;
							$('.list li').css({'height': 'auto'});
							this.toolShow = false;
						}).catch(err=>{});
					}
				});
			},
			editEvent: function(){
				if(this.status == 0){
					Toast({message: '运行中的条件单不能修改', position: 'bottom', duration: 1000}); return;
				}
				if(this.conditionType == 0){
					this.$refs.conditionPrice.show = true;
					this.conditionListCont.forEach((o, i) => {
						if(this.currentId == o.ConditionNo){
							this.$refs.conditionPrice.conditionNo = o.ConditionNo;
							this.$refs.conditionPrice.commodityName = o.name;
							this.$refs.conditionPrice.commodityNo = o.CommodityNo;
							this.$refs.conditionPrice.selectType = o.CompareType.toString();
							this.$refs.conditionPrice.conditionPrice = o.PriceTriggerPonit;
							if(o.AdditionPrice == 0){
								this.$refs.conditionPrice.selectAdditionalType = '附加';
								this.$refs.conditionPrice.additionalPrice = '';
							}else{
								this.$refs.conditionPrice.selectAdditionalType = o.AdditionType.toString();
								this.$refs.conditionPrice.additionalPrice = o.AdditionPrice;
							}
							this.$refs.conditionPrice.directionType = o.Drection;
							this.$refs.conditionPrice.priceType = o.OrderType;
							this.$refs.conditionPrice.conditionNum = o.Num;
						}
					});
				}else{
					this.conditionListCont.forEach((o, i) => {
						if(this.currentId == o.ConditionNo){
							this.$refs.conditionTime.show = true;
							this.$refs.conditionTime.conditionNo = o.ConditionNo;
							this.$refs.conditionTime.commodityName = o.name;
							this.$refs.conditionTime.commodityNo = o.CommodityNo;
							this.$refs.conditionTime.conditionTime = o.TimeTriggerPoint.split(' ')[1];
							if(o.AdditionPrice == 0){
								this.$refs.conditionTime.selectAdditionalType = '附加';
								this.$refs.conditionTime.additionalPrice = '';
							}else{
								this.$refs.conditionTime.selectAdditionalType = o.AdditionType.toString();
								this.$refs.conditionTime.additionalPrice = o.AdditionPrice;
							}
							this.$refs.conditionTime.directionType = o.Drection;
							this.$refs.conditionTime.priceType = o.OrderType;
							this.$refs.conditionTime.conditionNum = o.Num;
						}
					});
				}
			},
			deleteConditionOrder: function(){
				if(this.currentId == '' || this.currentId == undefined){
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000}); return;
				}
				this.conditionListCont.forEach((o, i) => {
					if(this.currentId == o.ConditionNo){
						let b = {
							"Method": 'ModifyCondition',
							"Parameters": {
								"ConditionNo": o.ConditionNo,
								"ModifyFlag": 1, //删除
								"Num": o.Num,
								"ConditionType": o.ConditionType,
								"PriceTriggerPonit": o.PriceTriggerPonit,
								"CompareType": o.CompareType,
								"TimeTriggerPoint": o.TimeTriggerPoint,
								"AB_BuyPoint": o.AB_BuyPoint,
								"AB_SellPoint": o.AB_SellPoint,
								"OrderType": o.OrderType,
								"StopLossType": o.StopLossType,
								"Direction": o.Drection,
								"StopLossDiff": 0.0,
								"StopWinDiff": 0.0,
								"AdditionFlag": o.AdditionFlag,
								"AdditionType": o.AdditionType,
								"AdditionPrice": o.AdditionPrice
							}
						};
						MessageBox.confirm('是否删除条件单？', "提示").then(action=>{
							this.tradeSocket.send(JSON.stringify(b));
							this.currentId = '';
							this.selectedNum = -1;
							$('.list li').css({'height': 'auto'});
							this.toolShow = false;
						}).catch(err=>{});
					}
				});
			},
			regroupConditionList:function(){
				this.conditionListCont = [];
				this.conditionList.forEach((o, i) => {
					let obj = {};
					obj.AB_BuyPoint = o.AB_BuyPoint;
					obj.AB_SellPoint = o.AB_SellPoint;
					obj.AdditionFlag=o.AdditionFlag;
					obj.AdditionPrice = o.AdditionPrice;
					obj.AdditionType = o.AdditionType;
					obj.CommodityNo = o.CommodityNo;
					obj.CompareType = o.CompareType;
					obj.ConditionNo = o.ConditionNo;
					obj.ConditionType = o.ConditionType;
					obj.ContractNo = o.ContractNo;
					obj.Drection = o.Drection;
					obj.ExchangeNo = o.ExchangeNo;
					obj.InsertDateTime = o.InsertDateTime;
					obj.Num = o.Num;
					obj.OrderType = o.OrderType;
					obj.PriceTriggerPonit = o.PriceTriggerPonit;
					obj.Status = o.Status;
					obj.StatusMsg = o.StatusMsg;
					obj.StopLossDiff = o.StopLossDiff;
					obj.StopLossType = o.StopLossType;
					obj.StopLossWin = o.StopLossWin;
					obj.TimeTriggerPoint = o.TimeTriggerPoint;
					obj.TriggedTime = o.TriggedTime;
					obj.name=o.CommodityNo+o.ContractNo;
					obj.status00 = (function(){
									if(o.Status==0){
										return '运行中';
									}else if(o.Status==1){
										return '暂停';
									}else if(o.Status==2){
										return '已触发';
									}else if(o.Status==3){
										return '已取消';
									}else if(o.Status==4){
										return '插入失败';
									}else if(o.Status==5){
										return '触发失败';
									}
								})();
					obj.type = (function(){
									if(o.ConditionType==0){
										return '价格条件';
									}else if(o.ConditionType==1){
										return '时间条件';
									}else if(o.ConditionType==2){
										return 'AB单';
									}
								})();
					obj.conditions = (function(){
									if(o.AdditionFlag==0){ //没有附件条件
										if(o.CompareType==0){
											return '>'+o.PriceTriggerPonit;
										}else if(o.CompareType==1){
											return '<'+o.PriceTriggerPonit;
										}else if(o.CompareType==2){
											return '>='+o.PriceTriggerPonit;
										}else if(o.CompareType==3){
											return '<='+o.PriceTriggerPonit;
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else{
												return s[1];
											}
										}
									}else{ //有附加条件
										if(o.CompareType==0){
											if(o.AdditionType==0){
												return '>'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==1){
											if(o.AdditionType==0){
												return '<'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==2){
											if(o.AdditionType==0){
												return '>='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==3){
											if(o.AdditionType==0){
												return '<='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else{
												return s[1];
											}
										}
									}
								})();
					obj.order = (function(){
								if(o.Drection == 0){ //买
									if(o.OrderType==1){
										return '买,市价,'+o.Num+'手'
									}else{
										return '买,对手价,'+o.Num+'手'
									}
								} else if(o.Drection == 1){//卖
									if(o.OrderType==1){
										return '卖,市价,'+o.Num+'手'
									}else{
										return '卖,对手价,'+o.Num+'手'
									}
								}
							})();
					obj.term = '永久有效';
					obj.time = o.InsertDateTime;
					this.conditionListCont.push(obj);
				});
			},
			regroupTriggerConditionList: function(){
				this.triggerConditionListCont = [];
				this.triggerConditionList.forEach((o, i) => {
					let obj = {};
					obj.AB_BuyPoint = o.AB_BuyPoint;
					obj.AB_SellPoint = o.AB_SellPoint;
					obj.AdditionFlag=o.AdditionFlag;
					obj.AdditionPrice = o.AdditionPrice;
					obj.AdditionType = o.AdditionType;
					obj.CommodityNo = o.CommodityNo;
					obj.CompareType = o.CompareType;
					obj.ConditionNo = o.ConditionNo;
					obj.ConditionType = o.ConditionType;
					obj.ContractNo = o.ContractNo;
					obj.Drection = o.Drection;
					obj.ExchangeNo = o.ExchangeNo;
					obj.InsertDateTime = o.InsertDateTime;
					obj.Num = o.Num;
					obj.OrderType = o.OrderType;
					obj.PriceTriggerPonit = o.PriceTriggerPonit;
					obj.Status = o.Status;
					obj.StatusMsg = o.StatusMsg;
					obj.StopLossDiff = o.StopLossDiff;
					obj.StopLossType = o.StopLossType;
					obj.StopLossWin = o.StopLossWin;
					obj.TimeTriggerPoint = o.TimeTriggerPoint;
					obj.TriggedTime = o.TriggedTime;
					obj.name=o.CommodityNo+o.ContractNo;
					obj.status00 = (function(){
									if(o.Status==0){
										return '运行中';
									}else if(o.Status==1){
										return '暂停';
									}else if(o.Status==2){
										return '已触发';
									}else if(o.Status==3){
										return '已取消';
									}else if(o.Status==4){
										return '插入失败';
									}else if(o.Status==5){
										return '触发失败';
									}
								})();
					obj.type = (function(){
									if(o.ConditionType==0){
										return '价格条件';
									}else if(o.ConditionType==1){
										return '时间条件';
									}else if(o.ConditionType==2){
										return 'AB单';
									}
								})();
					obj.conditions = (function(){
									if(o.AdditionFlag==0){ //没有附件条件
										if(o.CompareType==0){
											return '>'+o.PriceTriggerPonit;
										}else if(o.CompareType==1){
											return '<'+o.PriceTriggerPonit;
										}else if(o.CompareType==2){
											return '>='+o.PriceTriggerPonit;
										}else if(o.CompareType==3){
											return '<='+o.PriceTriggerPonit;
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else {
												return s[1];
											}
										}
									}else{ //有附加条件
										if(o.CompareType==0){
											if(o.AdditionType==0){
												return '>'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==1){
											if(o.AdditionType==0){
												return '<'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==2){
											if(o.AdditionType==0){
												return '>='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==3){
											if(o.AdditionType==0){
												return '<='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else {
												return s[1];
											}
										}
									}
								})();
					obj.order = (function(){
								if(o.Drection == 0){ //买
									if(o.OrderType==1){
										return '买,市价,'+o.Num+'手'
									}else{
										return '买,对手价,'+o.Num+'手'
									}
								} else if(o.Drection == 1){//卖
									if(o.OrderType==1){
										return '卖,市价,'+o.Num+'手'
									}else{
										return '卖,对手价,'+o.Num+'手'
									}
								}
							})();
					obj.term = '永久有效';
					obj.time = o.InsertDateTime;
					this.triggerConditionListCont.push(obj);
				});
			},
			getNowFormatDate: function(){
				let date = new Date();
			    let seperator1 = "-";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			    return currentdate;
			},
		},
		mounted: function(){
			//重组数据
			this.regroupConditionList();
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
		border-bottom: 0.01rem solid $bgDeep;
		span{
			display: inline-block;
			float: left;
			width: 3.45rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			border:0.01rem solid $redDeep;
			background: $bg;
			margin: 0.2rem 0;
			color: $redDeep; 
			&:first-child{
				border-top-left-radius: 0.1rem;
				border-bottom-left-radius: 0.1rem;
			}
			&:last-child{
				border-top-right-radius: 0.1rem;
				border-bottom-right-radius: 0.1rem;
			}
			&.current{
				background: $redDeep;
				color: $bg;
			}
		}
	}
	.list{
		width: 7.5rem;
		overflow: auto;
		ul{
			width: 16.2rem;
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