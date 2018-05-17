<template>
	<div id="conditionPrice" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<h1>修改价格条件单</h1>
			<div class="row">
				<span>合约</span>
				<em class="name">{{commodityName}}</em>
				<span class="percent pl">最新：<em>{{lastPrice}}</em></span>
			</div>
			<div class="row">
				<span>价格</span>
				<div class="box">
					<div class="slt fl">
						<input type="text" class="ipt" :value="selectType | conditionTypeSwitch" readonly="readonly" @click.stop="openConditionType" />
						<i class="icon icon_select"></i>
					</div>
					<input type="text" class="ipt" v-model="conditionPrice" />
				</div>
				<div class="slt fl">
					<input type="text" class="ipt" :value="selectAdditionalType |　conditionTypeSwitch" readonly="readonly" @click.stop="openAdditionalType" />
					<i class="icon icon_select"></i>
				</div>
				<input type="text" class="ipt"　v-model="additionalPrice" />
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
				<span @tap="cancelEvent">取消</span>
			</div>
		</div>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import selectBox from "../../components/selectBox.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "conditionPrice",
		components: {selectBox},
		data(){
			return{
				show: false,
				conditionNo: '',
				commodityName: '',
				commodityNo: '',
				lastPrice: '',
				selectType: '0',   //条件
				conditionPrice: '',
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
			openConditionType: function(){
				this.obj = ['0', '1', '2', '3'];
				this.type = 'condition';
				$(".select_cont").css({bottom: -1.78 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
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
			confirmEvent: function(){
				let miniTikeSize = this.orderTemplist[this.commodityNo].MiniTikeSize;
				let dotSize = this.orderTemplist[this.commodityNo].DotSize;
				let confirmText;
				if(this.additionalPrice){
					var d1 = this.additionalPrice % miniTikeSize;
					if(d1 >= 0.000000001 && parseFloat(miniTikeSize - d1) >= 0.0000000001){
						Toast({message: '输入附加价格不符合最小变动价，最小变动价为：' + miniTikeSize, position: 'bottom', duration: 1500});
						return;
					}
					//判断价格与附加价格是否形成区间
					var additionalPrice = this.additionalPrice - miniTikeSize;
					additionalPrice = additionalPrice.toFixed(dotSize);
					var additionalPrice00 = Number(this.additionalPrice) + Number(miniTikeSize);
					additionalPrice00 = additionalPrice00.toFixed(dotSize);
					switch (this.selectType){
						case '0':
							if(this.selectAdditionalType == '0' || this.selectAdditionalType == '2' || this.selectAdditionalType == '1' && additionalPrice <= this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							if(this.selectAdditionalType == '3' && additionalPrice < this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							break;
						case '2':
							if(this.selectAdditionalType == '0' || this.selectAdditionalType == '2' || this.selectAdditionalType == '1' && additionalPrice < this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							if(this.selectAdditionalType == '3' && this.additionalPrice < this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							break;
						case '1':
							if(this.selectAdditionalType == '1' || this.selectAdditionalType == '3' || this.selectAdditionalType == '0' && additionalPrice00 >= this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							if(this.selectAdditionalType == '2' && additionalPrice00 > this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							break;
						case '3':
							if(this.selectAdditionalType == '1' || this.selectAdditionalType == '3' || this.selectAdditionalType == '0' && additionalPrice00 > this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							if(this.selectAdditionalType == '2' && this.additionalPrice > this.conditionPrice){
								Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
								return;
							}
							break;
						default:
							break;
					}
				}
				var d0 = this.conditionPrice % miniTikeSize;
				if(this.conditionPrice == '' || this.conditionPrice == 0 || this.conditionPrice == undefined){
					Toast({message: '请输入价格', position: 'bottom', duration: 1500});
				}else if(d0 >= 0.000000001 && parseFloat(miniTikeSize - d0) >= 0.0000000001){
					Toast({message: '输入价格不符合最小变动价，最小变动价为：' + miniTikeSize, position: 'bottom', duration: 1500});
				}else if(this.conditionNum == '' || this.conditionNum <= 0 || this.conditionNum == undefined){
					Toast({message: '请输入手数', position: 'bottom', duration: 1500});
				}else{
					confirmText = '是否修改价格条件单？';
					let b = {
						"Method": 'ModifyCondition',
							"Parameters":{
							'ConditionNo': this.conditionNo,
							'ModifyFlag': 0,
							'Num': parseInt(this.conditionNum),
							'ConditionType': 0,
							'PriceTriggerPonit': parseFloat(this.conditionPrice),
							'CompareType': parseInt(this.selectType),
							'TimeTriggerPoint': '',
							'AB_BuyPoint': 0.0,
							'AB_SellPoint': 0.0,
							'OrderType': parseInt(this.priceType),
							'StopLossType': 5,
							'Drection': parseInt(this.directionType),
							'StopLossDiff': 0.0,
							'StopWinDiff': 0.0,
							'AdditionFlag': this.additionalPrice == '' ? false :  true,
							'AdditionType': parseInt(this.selectAdditionalType),
							'AdditionPrice': this.additionalPrice == '' ? 0 : parseFloat(this.additionalPrice)
						}
					}
					MessageBox.confirm(confirmText,"提示").then(action=>{
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
			}
		},
		mounted: function(){
//			console.log(this.currentCondition);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.main{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 100;
		margin: -3.15rem 0 0 -3rem;
		width: 6rem;
		height: 5.4rem;
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
					padding-left: 0.25rem;
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
				width: 1.8rem;
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