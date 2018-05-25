<template>
	<div id="optionalManage">
		<header>
			<i class="icon icon_back" @tap="goBackEvent"></i>
			<h1>自选管理</h1>
			<span @tap="saveNumEvent">完成</span>
		</header>
		<div class="main">
			<div class="search_box">
				<div class="search">
					<i class="icon icon_search"></i>
					<input type="text" placeholder="搜索并添加合约" @touch="toSearch" />
				</div>
			</div>
			<div class="list">
				<ul class="title">
					<li>
						<i class="icon icon_check"></i>
						<div class="name">名称</div>
						<div class="price">现价</div>
						<div class="drag">拖动</div>
					</li>
				</ul>
				<ul class="cont">
					<draggable v-model="optionalList" :options="{animation: 300,handle:'.icon_drag'}">
					    <!--<transition-group>-->
					      <li v-for="v in optionalList" :key.stop="v.CommodityName" :id="v.id" :orderNum="v.orderNum">
					        <i class="icon" :class="{icon_check: v.check == 0, icon_checked: v.check == 1}" @tap="checkEvent(v.check, v.CommodityNo)"></i>
							<div class="name">
								<span>{{v.CommodityName}}</span>
								<span>{{v.CommodityNo + v.MainContract}}</span>
							</div>
							<div class="price">
								<span>{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.DateTimeStamp | operateTime}}</span>
							</div>
							<i class="icon icon_drag"></i>
					      </li>
					    <!--</transition-group>-->
					</draggable>
				</ul>
			</div>
		</div>
		<div class="tools">
			<div class="col" @tap="checkAllEvemt">
				<i class="icon icon_radio"></i>
				<i class="icon icon_radios" v-show="checkedShow"></i>
				<span>{{checkedName}}</span>
			</div>
			<div class="col" @click="deleteEvent">
				<i class="icon icon_del"></i>
				<span :class="{grey: num == 0}">删除</span>
				<em :class="{grey: num == 0}">({{this.num}})</em>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui'
	import draggable from 'vuedraggable'
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'optionalManage',
		components: {draggable,
		},
		data(){
			return{
				checkedShow: false,
				checkedName: '全选',
				optionalList: [],
				num: 0,
				id: '',
				
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			},
			operateTime: function(val){
				return val.split(' ')[1];
			}
		},
		watch: {
			parameters: function(n, o){
				let num = 0;
				if(n != undefined){
					if(this.checkedShow == true){
						n.forEach((o, i) => {
							if(o.check == 0){
								this.checkedShow = false;
								this.checkedName = '全选';
							}
						});
					}else{
						n.forEach((o, i) => {
							if(o.check == 0) num++;
						});
						if(num == 0){
							this.checkedShow = true;
							this.checkedName = '取消全选';
						}
					}
				}
			}
		},
		methods: {
			goBackEvent: function(){
				this.$router.go(-1);
			},
			toSearch: function(){
				this.$router.push({path: '/search'});
			},
			checkEvent: function(val, name){
				this.num = 0;
				if(val == 0){
					this.parameters.forEach((o, i) => {
						if(name == o.CommodityNo) o.check = 1;
						if(o.check == 1) this.num++;
					});
				}else{
					this.parameters.forEach((o, i) => {
						if(name == o.CommodityNo) o.check = 0;
						if(o.check == 1) this.num++;
					});
				}
			},
			checkAllEvemt: function(){
				if(this.checkedShow == false){
					this.checkedShow = true;
					this.checkedName = '取消全选';
					this.num = this.parameters.length;
					this.parameters.forEach((o, i) => {
						o.check = 1;
					});
				}else{
					this.checkedShow = false;
					this.checkedName = '全选';
					this.num = 0;
					this.parameters.forEach((o, i) => {
						o.check = 0;
					});
				}
			},
			deleteEvent: function(){
				if(this.num == 0){
					Toast({message: '请选择一条自选合约', position: 'bottom', duration: 2000});
					return;
				}
				if(this.userInfo == undefined) return;
				MessageBox.confirm("确定删除自选？","提示").then(action=>{
					var headers = {
						token: this.userInfo.token,
						secret: this.userInfo.secret
					}
					let arr = [];
					this.parameters.forEach((o, i) => {
						if(o.check == 1) arr.push(o.id);
					});
					this.id = arr.join(',');
					let datas = {id: this.id};
					pro.fetch('post', '/quoteTrader/userRemoveCommodity', datas, headers).then((res) => {
						if(res.success == true && res.code == 1){
							Toast({message: '删除成功', position: 'bottom', duration: 2000});
							this.num = 0;
							//重新请求自选合约列表
							this.getCommodityList();
						}
					}).catch((err) => {
						Toast({message: err.data.message, position: 'bottom', duration: 2000});
					});
				}).catch(err=>{});
			},
			saveNumEvent: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				let arr = [];
				let len = $(".list .cont li").length;
				$.each($(".list .cont li"), function(i, o) {
					let obj = {
						id: $(o).attr('id'),
						orderNum: len - i
					}
					arr.push(obj);
				});
				var datas = {data: JSON.stringify(arr)};
				pro.fetch('post', '/quoteTrader/userSort', datas, headers).then((res) => {
					if(res.success == true && res.code == 1){
						Toast({message: '排序成功', position: 'bottom', duration: 2000});
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			getCommodityList: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data && res.data.length > 0){
							this.$store.state.market.Parameters = [];
							this.$store.state.market.commodityOrder = [];
							this.$store.state.market.commodityOrder = res.data;
							this.$parent.optionalList = res.data;
							res.data.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
							this.optionalList = this.parameters;
						}else{
							this.optionalList = [];
							this.checkedShow = false;
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		mounted: function(){
			//自选列表赋初值
			this.optionalList = this.parameters;
		},
		activated: function(){
			//重新请求自选合约列表
			this.getCommodityList();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		height: 1rem;
		overflow: hidden;
		background: $blcakThin;
		border-bottom: 0.01rem solid $bgDeep;
		padding: 0 0.3rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		h1{
			color: $bg;
			width: 6.9rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: 0.36rem;
		}
		.icon_back{
			width: 0.64rem;
			height: 1rem;
			background: url(../../assets/images/quote/back_icon.png) no-repeat 0.3rem 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0;
		}
		span{
			display: inline-block;
			height: 1rem;
			line-height: 1rem;
			font-size: $fs28;
			color: $bg;
			position: fixed;
			top: 0;
			right: 0.3rem;
		}
	}
	.main{
		margin-top: 1.01rem;
		.search_box{
			width: 7.5rem;
			height: 0.96rem;
			background: $bg;
			border-bottom: 0.01rem solid $bgDeep;
			padding: 0.16rem 0.3rem;
			.search{
				width: 6.9rem;
				height: 0.64rem;
				background: $bg;
				border: 0.01rem solid $bgDeep;
				border-radius: 0.1rem;
				position: relative;
				input{
					width: 6.9rem;
					height: 0.64rem;
					line-height: 0.64rem;
					padding: 0 0.1rem 0 0.85rem;
					box-sizing: border-box;
					color: $blcakThin;
				}
				.icon_search{
					position: absolute;
					top: 0;
					left: 0;
					width: 0.4rem;
					height: 0.4rem;
					background: url(../../assets/images/quote/search.png) no-repeat center center;
					background-size: 100% 100%;
					margin: 0.12rem 0 0 0.3rem;
				}
			}
		}
		.list{
			width: 7.5rem;
			.title{
				li{
					height: 0.64rem;
					line-height: 0.64rem;
					background: #f2f2f2;
					.icon{
						height: 0.64rem;
						background: url(../../assets/images/quote/check.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
						opacity: 0;
					}
					div{
						color: $fontBlue;
						font-size: $fs28;
					}
				}
			}
			.cont{
				overflow-y: auto;	
			}
			li{
				height: 0.96rem;
				overflow: hidden;
				background: $bg;
				border-bottom: 0.01rem solid $bgDeep;
				.icon{
					float: left;
					width: 0.84rem;
					height: 0.96rem;
					&.icon_check{
						background: url(../../assets/images/quote/check.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
					&.icon_checked{
						background: url(../../assets/images/quote/checked.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
				}
				div{
					float: left;
					text-align: right;
					&.name{
						width: 3rem;
						text-align: left;
					}
					&.price{
						width: 1.5rem;
					}
					span{
						display: block;
						&:first-child{
							font-size: $fs32;
							margin: 0.15rem 0 0.1rem 0;
						}
					}
					&.drag{
						float: right;
						width: 1rem;
						margin-right: 0.3rem;
					}
				}
				.icon_drag{
					float: right;
					width: 1.3rem;
					height: 0.95rem;
					background: url(../../assets/images/quote/drag.png) no-repeat 0.6rem 0.35rem;
					background-size: 0.24rem 0.24rem;
					margin: 0 0 0 0;
				}
			}
		}
	}
	.tools{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 7.5rem;
		height: 0.96rem;
		border-top: 0.01rem solid $bgDeep;	
		background: $bg;
		.col{
			float: left;
			width: 50%;
			height: 0.96rem;
			line-height: 0.96rem;
			text-align: center;
			border-left: 0.01rem solid $bgDeep;
			position: rrelative;
			&:first-child{
				border: none;
			}
			.icon, span, em{
				float: left;
			}
			.grey{
				color: #7a8599;
			}
			em{
				margin-left: 0.1rem;
				color: $white;
			}
			.icon_radio{
				width: 0.24rem;
				height: 0.24rem;
				background: $grayDeep;
				border-radius: 0.12rem;
				margin: 0.35rem 0.1rem 0 1.48rem;
			}
			.icon_radios{
				width: 0.18rem;
				height: 0.18rem;
				background: $redDeep;
				border-radius: 0.1rem;
				position: absolute;
				top: 0.38rem;
				left: 1.51rem;
			}
			.icon_del{
				width: 0.24rem;
				height: 0.24rem;
				background: url(../../assets/images/quote/delete.png) no-repeat center center;
				background-size: 100% 100%;
				margin: 0.35rem 0.1rem 0 1.24rem;
			}
		}	
	}
</style>