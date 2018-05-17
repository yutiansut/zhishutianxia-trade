<template>
	<div id="conditionTime" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<h1>修改时间条件单</h1>
			<div class="row">
				<span>合约</span>
				<em class="name">{{commodityName}}</em>
				<span class="percent pl">最新：<em>{{lastPrice}}</em></span>
			</div>
			<div class="row">
				<span>时间</span>
				<div class="row_box">
					<input type="text" readonly="readonly" v-model="conditionTime" />
					<input type="text" class="none" readonly="readonly" @click="selectTime" />
				</div>
			</div>
			<div class="row">
				<span>价格</span>
				<div class="slt fl">
					<input type="text" class="ipt" :value="selectAdditionalType |　conditionTypeSwitch" readonly="readonly" @click.stop="openAdditionalType" />
					<i class="icon icon_select"></i>
				</div>
				<input type="text" class="ipt" v-model="additionalPrice" />
			</div>
			<div class="row">
				<span>操作</span>
				<div class="box">
					<div class="slt fl">
						<input type="text" class="ipt" :value="directionType | directionTypeSwitch" readonly="readonly" @click.stop="openDirectionType" />
						<i class="icon icon_select"></i>
					</div>
					<div class="slt fl">
						<input type="text" class="ipt" :value="priceType | priceTypeSwitch" readonly="readonly" @click.stop="openPriceType" />
						<i class="icon icon_select"></i>
					</div>
				</div>
				<span>手数</span>
				<input type="text" class="ipt" v-model="conditionNum" />
			</div>
			<div class="row">
				<span>有效</span>
				<p>永久有效</p>
			</div>
			<div class="btn_box">
				<span @click="confirmEvent">确认</span>
				<span @click="cancelEvent">取消</span>
			</div>
		</div>
		<mt-datetime-picker ref="timePicker" :value="conditionTime" type="time" @confirm="handleConfirm"></mt-datetime-picker>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import selectBox from "../../components/selectBox.vue"
	import pro from "../../assets/js/common.js"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "conditionTime",
		components: {selectBox},
		data(){
			return{
				show: false,
				conditionNo: '',
				commodityName: '',
				commodityNo: '',
				lastPrice: '',
				conditionTime: '',
				selectAdditionalType: '附加',   //附加条件
				additionalPrice: '',
				directionType: 0,
				priceType: 1,
				conditionNum: '',
				obj: '',
				type: '',
			}
		},
		computed: {
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
		filters: {
			conditionTypeSwitch: function(e){
				if(e == '0'){
					return '>';
				}else if(e == '1'){
					return '<';
				}else if(e == '2'){
					return '>=';
				}else if(e == '3'){
					return '<=';
				}else{
					return '附加';
				}
			},
			directionTypeSwitch: function(e){
				if(e == 0){
					return '买入';
				}else if(e == 1){
					return '卖出';
				}
			},
			priceTypeSwitch: function(e){
				if(e == 1){
					return '市价';
				}else if(e == 2){
					return '对手价';
				}
			}
		},
		watch: {
			parameters: function(n, o){
				if(this.commodityNo != undefined && this.commodityNo != ''){
					n.forEach(function(o, i){
						if(this.commodityNo == o.CommodityNo){
							this.lastPrice = this.orderTemplist[this.commodityNo].LastQuotation.LastPrice;
							this.lastPrice = parseFloat(this.lastPrice).toFixed(this.orderTemplist[this.commodityNo].DotSize);
						}
					}.bind(this));
				}
			},
		},
		methods: {
			openAdditionalType: function(){
				this.obj = ['0', '1', '2', '3'];
				this.type = 'additionalCondition';
				$(".select_cont").css({bottom: -1.78 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			openDirectionType: function(){
				this.obj = [0, 1];
				this.type = 'direction';
				$(".select_cont").css({bottom: -3.55 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			openPriceType: function(){
				this.obj = [1, 2];
				this.type = 'conditionPrice';
				$(".select_cont").css({bottom: -3.55 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			selectTime: function(){
				this.$refs.timePicker.open();
			},
			handleConfirm: function(e){
				let time = new Date();
				this.conditionTime = pro.getDate("h:i:s", time);
				this.conditionTime = e + ':' + this.conditionTime.split(':')[2];
			},
			confirmEvent: function(){
				let miniTikeSize = this.orderTemplist[this.commodityNo].MiniTikeSize;
				let confirmText;
				let time = this.getNowFormatDate() + ' ' + this.conditionTime;
				if(this.additionalPrice){
					var d2 = this.additionalPrice % miniTikeSize;
					if(d2 >= 0.000000001 && parseFloat(miniTikeSize-d2) >= 0.0000000001){
						Toast({message: '输入附加价格不符合最小变动价，最小变动价为：' + miniTikeSize, position: 'bottom', duration: 1500}); return;
					}
				}
				if(this.conditionNum == '' || this.conditionNum <= 0 || this.conditionNum == undefined){
					Toast({message: '请输入手数', position: 'bottom', duration: 1500});
				}else{
					confirmText = '是否修改时间条件单？';
					let b = {
						"Method": 'ModifyCondition',
						"Parameters":{
							'ConditionNo': this.conditionNo,
							'ModifyFlag': 0,
							'Num': parseInt(this.conditionNum),
							'ConditionType': 1,
							'PriceTriggerPonit': 0.00,
							'CompareType': 5,
							'TimeTriggerPoint': time,
							'AB_BuyPoint': 0.0,
							'AB_SellPoint': 0.0,
							'OrderType': parseInt(this.priceType),
							'StopLossType': 5,
							'Drection': parseInt(this.directionType),
							'StopLossDiff': 0.0,
							'StopWinDiff': 0.0,
							'AdditionFlag': this.additionalPrice == '' ? false : true,
							'AdditionType': this.additionalPrice == '' ? 5 : parseInt(this.selectAdditionalType),
							'AdditionPrice': this.additionalPrice == '' ? 0 : parseFloat(this.additionalPrice)
						}
					};
					MessageBox.confirm(confirmText, "提示").then(action=>{
						this.tradeSocket.send(JSON.stringify(b));
						this.additionalPrice = '';
						this.show = false;
						$('.list li').css({'height': 'auto'});
						this.$parent.toolShow = false;
					}).catch(err=>{});
				}
			},
			cancelEvent: function(){
				this.show = false;
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
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#conditionTime{
		position: relative;
	}
	.main{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 100;
		margin: -3.15rem 0 0 -3rem;
		width: 6rem;
		height: 6.3rem;
		overflow: hidden;
		border-radius: 0.1rem;
		background: $bg;
		h1{
			width: 6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			font-size: $fs28;
			border-bottom: 0.01rem solid $black;
		}
		.row{
			width: 6rem;
			height: 0.88rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $black;
			span{
				float: left;
				display: inline-block;
				width: 1rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
				&.percent{
					width: auto;
					border: 0;
				}
				&.pl{
					padding-left: 0.1rem;
				}
				em{
					color: $white;
				}
			}
			.name{
				float: left;
				display: inline-block;
				width: 2.34rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
			}
			.row_box{
				float: left;
				/*width: 2.34rem;*/
				position: relative;
				.none{
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					opacity: 0;
				}
			}
			.box{
				float: left;
				width: 2.34rem;
				height: 0.88rem;
				overflow: hidden;
				border-right: 0.01rem solid $black;
			}
			.slt{
				float: left;
				width: 1rem;
				height: 0.64rem;
				overflow: hidden;
				margin: 0.12rem 0 0.12rem 0.1rem;
				position: relative;
				input{
					margin: 0;
				}
				.icon{
					width: 0.1rem;
					height: 0.1rem;
					position: absolute;
					bottom: 0.1rem;
					right: 0.1rem;
					&.icon_select{
						background: url(../../assets/images/account/subscript_01.png) no-repeat center center;
						background-size: 100% 100%;
					}
					&.icon_selected{
						background: url(../../assets/images/account/subscript_02.png) no-repeat center center;
						background-size: 100% 100%;
					}
				}
			}
			input{
				float: left;
				display: inline-block;
				width: 2rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				text-align: center;
				&.ipt{
					width: 1rem;
				}
			}
			select{
				float: left;
				width: 1rem;
				height: 0.65rem;
				line-height: 0.65rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				padding-left: 0.2rem;
			}
			p{
				float: left;
				width: 5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
			}
		}
		.btn_box{
			display: flex;
			justify-content: center;
			width: 6rem;
			height: 0.92rem;
			line-height: 0.92rem;
			border-top: 0.15rem solid #1b1f26;
			span{
				width: 50%;
				text-align: center;
			}
		}
	}
</style>