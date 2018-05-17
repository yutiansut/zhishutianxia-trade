<template>
	<div id="editOrder" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<h1>改单</h1>
			<div class="row">
				<span>委托价格</span>
				<input type="text" v-model="entrustPrice" />
			</div>
			<div class="row">
				<span>委托数量</span>
				<input type="text" v-model="entrustNum" />
			</div>
			<div class="btn_box">
				<span @tap="confirmEvent">确认</span>
				<span @tap="cancelEvent">取消</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		name: "editOrder",
		components: {},
		data(){
			return{
				show: false,
				id: '',
				entrustPrice: '',
				entrustNum: '',
			}
		},
//		props: ['price', 'num', 'id'],
		computed: {
			cancelStatus(){
				return this.$store.state.market.cancelStatus;
			},
			orderListCont(){
				return this.$store.state.market.orderListCont;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
		},
		methods: {
			confirmEvent: function(){
				if(this.entrustPrice == '' || this.entrustPrice == 0){
					Toast({message: '委托价格不能为空或者0', position: 'bottom', duration: 1000});
				}else if(this.entrustPrice < 0){
					Toast({message: '委托价格不能为负', position: 'bottom', duration: 1000});
				}else if(this.entrustNum == '' || this.entrustNum == 0){
					Toast({message: '委托数量不能为空或者0', position: 'bottom', duration: 1000});
				}else if(this.entrustNum < 0){
					Toast({message: '委托数量不能为负', position: 'bottom', duration: 1000});
				}else{
					if(this.cancelStatus == true) return;
					this.$store.state.market.cancelStatus = true;
					this.orderListCont.forEach(function(o,i){
						if(this.id == o.OrderID){
							var Contract = o.ContractCode.substring(0, o.ContractCode.length - 4);
							var b = {
								"Method": 'ModifyOrder',
								"Parameters":{
									"OrderSysID": '',
									"OrderID": o.OrderID,
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.orderTemplist[Contract].CommodityNo,
									"ContractNo": this.orderTemplist[Contract].MainContract,
									"OrderNum": parseFloat(this.entrustNum),
									"Direction": o.buyOrSell == '买' ? 0 : 1,
									"OrderPrice": parseFloat(this.entrustPrice),
									"TriggerPrice":0
								}
							};
							this.tradeSocket.send(JSON.stringify(b));
							$('.list li').css({'height': 'auto'});
							this.$parent.toolShow = false;
							this.$parent.currentOrderID = '';
							this.$parent.selectedNum = -1;
						}
					}.bind(this));
				}
				this.show = false;
			},
			cancelEvent: function(){
				this.show = false;
			}
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
		margin: -1.82rem 0 0 -3rem;
		width: 6rem;
		height: 3.64rem;
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
				width: 1.6rem;
				text-align: center;
				line-height: 0.88rem;
				border-right: 0.01rem solid $black;
			}
			input{
				display: inline-block;
				width: 4.2rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
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