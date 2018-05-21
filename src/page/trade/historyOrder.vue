<template>
	<div id="historyOrder">
		<div class="search">
			<div class="col">
				<i class="icon icon_time"></i>
				<input type="text" placeholder="开始时间" readonly="readonly" v-model="startTime" @click="selectStartDate" />
			</div>
			<span class="fl">-</span>
			<div class="col">
				<i class="icon icon_time"></i>
				<input type="text" placeholder="结束时间" readonly="readonly" v-model="endTime" @click="selectEndDate" />
			</div>
			<button @tap="searchEvent">查询</button>
		</div>
		<div class="list">
			<ul>
				<li>
					<div class="list_title">
						<span class="type">序号</span>
						<span class="name spe">合约代码</span>
						<span class="num">交易所</span>
						<span class="name">币种</span>
						<span class="type">买卖</span>
						<span class="price">成交价</span>
						<span class="price">成交量</span>
						<span class="price">手续费</span>
						<span class="name">平仓盈亏</span>
						<span class="status">成交时间</span>
					</div>
				</li>
				<template v-for="v in histroyDealList">
					<li>
						<div class="list_cont">
							<span class="type">{{v.index + 1}}</span>
							<div class="name spe">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.CommodityNoContractNo}}</em>
							</div>
							<span class="num">{{v.ExchangeNo}}</span>
							<span class="name">{{v.CurrencyNo}}</span>
							<span class="type">{{v.Drection}}</span>
							<span class="price">{{v.TradePrice}}</span>
							<span class="price">{{v.TradeNum}}</span>
							<span class="price">{{v.TradeFee}}</span>
							<span class="name">{{v.hedgeProfit}}</span>
							<span class="status">{{v.TradeDateTime}}</span>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<mt-datetime-picker ref="startTimePicker" type="date" :startDate="startDate" :endDate="endDate" @confirm="startTimeConfirm"></mt-datetime-picker>
		<mt-datetime-picker ref="endTimePicker" type="date" :startDate="startDate" :endDate="endDate" @confirm="endTimeConfirm"></mt-datetime-picker>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import pro from "../../assets/js/common.js"
	import { Toast } from 'mint-ui';
	export default{
		name: "historyOrder",
		components: {btn},
		data(){
			return{
				startTime: '',
				endTime: '',
				startDate: new Date('2017'),
		      	endDate: new Date('2020-12-31'),
		      	histroyDealList: [],
			}
		},
		computed: {
			queryHisList(){
				return this.$store.state.market.queryHisList;
			},
			orderTemplist(){
				return	this.$store.state.market.orderTemplist;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
		},
		methods: {
			selectStartDate: function(){
				this.$refs.startTimePicker.open();
			},
			selectEndDate: function(){
				this.$refs.endTimePicker.open();
			},
			startTimeConfirm: function(e){
				let time = new Date(e);
				this.startTime = pro.getDate(time, "y-m-d");
			},
			endTimeConfirm: function(e){
				let time = new Date(e);
				this.endTime = pro.getDate(time, "y-m-d");
			},
			searchEvent: function(){
				let _beginTime = Date.parse(new Date(this.startTime));
				let _endTime = Date.parse(new Date(this.endTime));
				if(_endTime < _beginTime) Toast({message: '查询时间错误', position: 'bottom', duration: 1000});
				this.histroyDealList = [];
				let beginTime = this.startTime + ' 00:00:00';
				let endTime = this.endTime + ' 00:00:00';
				this.$store.state.market.queryHisList = [];
				this.tradeSocket.send('{"Method":"QryHisTrade","Parameters":{"ClientNo":"'+JSON.parse(localStorage.tradeUser).username+'","BeginTime":"'+beginTime+'","EndTime":"'+endTime+'"}}');
				setTimeout(function(){
					this.operateData();
				}.bind(this),500);
			},
			operateData: function(){
				this.queryHisList.forEach(function(o, i){
					var data = {};
					data.index = i;
					data.CommodityNo = o.CommodityNo
					data.CommodityNoContractNo = o.ContractCode;
					data.ExchangeNo = o.ExchangeNo;
					data.CurrencyNo = o.CurrencyNo;
					data.Drection =(function(){
						if(o.Drection==0){
							return '买';
						}else{
							return '卖';
						}
					})();
					data.TradePrice = parseFloat(o.TradePrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
					data.TradeNum = o.TradeNum;
					data.TradeFee = o.TradeFee;
					data.TradeDateTime = o.TradeDateTime;
					data.hedgeProfit = o.HedgeProfit;
					this.histroyDealList.push(data);
				}.bind(this));
			},
		},
		mounted: function(){
			//取当前时间
			let time = new Date();
			this.startTime = pro.getDate("y-m-d", time);
			this.endTime = pro.getDate("y-m-d", time);
			//默认取所有数据
			this.operateData();
			//初始化fm当前高度
			let h = window.screen.height - $("header").height() - $("#tabbar").height()*2.2 - $(".nav").height() - $("#moneyTotal").height();
			$(".list").height(h);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.search{
		width: 7.5rem;
		height: 0.96rem;
		border-bottom: 0.01rem solid $bgDeep;
		padding: 0 0.3rem;
		.col{
			float: left;
			width: 2.2rem;
			height: 0.64rem;
			overflow: hidden;
			background: $bg;
			border: 0.01rem solid $bgDeep;
			border-radius: 0.1rem;
			margin: 0.16rem 0;
			.icon{
				float: left;
				width: 0.4rem;
				height: 0.4rem;
				background: url(../../assets/images/quote/time.png) no-repeat center center;
				background-size: 100% 100%;
				margin: 0.11rem 0 0 0.11rem;
			}
			input{
				float: left;
				display: inline-block;
				width: 1.65rem;
				height: 0.64rem;
				padding: 0.1rem;
			}
		}
		span{
			line-height: 0.96rem;
			font-weight: bold;
			margin: 0 0.1rem;
		}
		button{
			color: $bg;
			width: 1.12rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			background: $redDeep;
			border-radius: 0.1rem;
			margin: 0.2rem 0.1rem;
			padding: 0;
		}
	}
	.list{
		width: 7.5rem;
		overflow: auto;
		border-bottom: 0.01rem solid $bgDeep;
		ul{
			width: 16.6rem;
		}
		li{
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				float: left;
				width: 1.6rem;
			}
			.spe{
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
			.tools{
				height: 0.96rem;
				border-bottom: 0.01rem solid $bgDeep;
				display: flex;
				justify-content: center;
				#btn{
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>