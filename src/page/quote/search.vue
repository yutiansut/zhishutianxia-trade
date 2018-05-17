<template>
	<div id="search">
		<div class="search_box">
			<div class="search">
				<i class="icon icon_search"></i>
				<input type="text" placeholder="搜索合约代码/简称" v-model="searchCont" />
				<span @tap="toIndex">取消</span>
			</div>
		</div>
		<div class="main">
			<div class="result" v-if="resultShow">
				<p class="title">搜索结果</p>
				<div class="empty" v-if="emptyShow">
					<p>暂无相关合约</p>
				</div>
				<div class="cont" v-if="contShow">
					<ul>
						<template v-for="(v, index) in resultList">
							<li>
								<div class="col" @tap="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
									<span>{{v.CommodityName}}</span>
									<span>{{v.CommodityNo + v.MainContract}}</span>
								</div>
								<!--<i class="icon icon_check" v-show="v.isOptional == undefined" @tap="addOptional(v.isOptional, v.ExchangeNo, v.CommodityNo, v.MainContract, v.id)"></i>-->
								<i class="icon" :class="{icon_check: v.isOptional == 0, icon_checked: v.isOptional == 1}" @click="addOptional(v.isOptional, v.ExchangeNo, v.CommodityNo, v.MainContract, v.id)"></i>
							</li>
						</template>
					</ul>
					<p class="tips">没有更多啦</p>
				</div>
			</div>
			<div class="recommend_box" v-show="recommendShow">
				<p class="title">大家都在搜索</p>
				<div class="recommend">
					<ul>
						<template v-for="(v,index) in recommendList">
							<li @tap="quickSearchEvent(v.label)">{{v.label}}</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'search',
		components: {
		},
		data(){
			return{
				searchCont: '',
				resultShow: false,
				emptyShow: false,
				contShow: false,
				recommendShow: true,
				totalList: [],
				resultList: [],
				recommendList: [],
				optionalList: [],
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			markettemp(){
				return this.$store.state.market.markettemp;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			}
		},
		watch: {
			searchCont: function(n, o){
				if(n != ''){
//					this.optionalList = [];
//					this.getUserCommodityList();
					this.resultShow = true;
					this.resultList = [];
					this.totalList.forEach((o, i) => {
						if(o.match(this.searchCont) != null){
							let obj = {};
							let arr = o.split(',');
							obj.CommodityName = arr[0];
							obj.CommodityNo = arr[1];
							obj.MainContract = arr[2];
							obj.ExchangeNo = arr[3];
							obj.isOptional = 0;
							this.resultList.push(obj);
						}
					});
					if(this.resultList.length > 0){
						this.contShow = true;
						this.recommendShow = false;
						this.emptyShow = false;
					}else{
						this.emptyShow = true;
						this.contShow = false;
						this.recommendShow = true;
					}
					//判断是否是自选合约
					this.resultList.forEach((o, i) => {
						if(this.optionalList.length > 0){
							this.optionalList.forEach((v, k) => {
								if(o.CommodityNo == v.commodityNo){
									o.isOptional = 1;
									o.contrast = v.contrast;
									o.id = v.id;
								}
							});
						}
					});
				}else{
					this.resultList = [];
					this.resultShow = false;
					this.emptyShow = false;
					this.recommendShow = true;
				}
			},
		},
		methods: {
			getRecommend: function(){
				pro.fetch('post', '/quoteTrader/getRecommend', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.recommendList = res.data;
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 1000});
				});
			},
			toIndex: function(){
				this.searchCont = '';
				this.resultList = [];
				this.resultShow = false;
				this.emptyShow = false;
				this.contShow = false;
				this.recommendShow = true;
				this.$router.go(-1);
			},
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
			quickSearchEvent: function(key){
				this.searchCont = key;
			},
			getUserCommodityList: function(){
				let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
				if(stateLogin.issavepsd == false) return;
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data == undefined) return;
						this.optionalList = res.data;
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 1000});
				});
			},
			addOptional: function(key,exchangeNo,commodityNo,contractNo,id){
				let userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
				let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
				if(stateLogin.issavepsd == false){
					Toast({message: '请先登录平台', position: 'bottom', duration: 1000});
					return;
				}
				var headers = {
					token: userInfo.token,
					secret: userInfo.secret
				}
				if(key == 1){   //删除自选
					var _datas = {id: id};
					MessageBox.confirm("确定删除自选？","提示").then(action=>{
						pro.fetch('post', '/quoteTrader/userRemoveCommodity', _datas, headers).then((res) => {
							if(res.success == true && res.code == 1){
								Toast({message: '自选删除成功', position: 'bottom', duration: 1000});
								this.resultList.forEach((o, i) => {
									if(o.CommodityNo == commodityNo){
										o.isOptional = 0;
									}
								});
							}
						}).catch((err) => {
							Toast({message: err.data.message, position: 'bottom', duration: 1000});
						});
					}).catch(err=>{});
				}else{   //添加自选
					var datas = {
						'exchangeNo': exchangeNo,
						'commodityNo': commodityNo,
						'contractNo': contractNo,
					}
					pro.fetch('post', '/quoteTrader/userAddCommodity', datas, headers).then((res) => {
						if(res.success == true && res.code == 1){
							Toast({message: '自选添加成功', position: 'bottom', duration: 1000});
							this.resultList.forEach((o, i) => {
								if(o.CommodityNo == commodityNo){
									o.isOptional = 1;
									o.id = res.data.id;
								}
							});
						}
					}).catch((err) => {
						Toast({message: err.data.message, position: 'bottom', duration: 1000});
					});
				}
			}
		},
		mounted: function(){
			//获取推荐
			this.getRecommend();
			//获取自选列表
			this.getUserCommodityList();
			//所有合约
			this.$store.state.market.markettemp.forEach((o,i) => {
				let str = o.CommodityName + ',' + o.CommodityNo + ',' + o.MainContract + ',' + o.ExchangeNo;
				this.totalList.push(str);
			});
		},
		activated: function(){
			//获取自选列表
			this.getUserCommodityList();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.search_box{
		position: fixed;
		top: 0;
		left: 0;
		width: 7.5rem;
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0.18rem 0.3rem;
		.search{
			width: 6.9rem;
			height: 0.64rem;
			background: #1b1f26;
			border: 0.01rem solid $black;
			border-radius: 0.1rem;
			position: relative;
			input{
				width: 6.9rem;
				height: 0.64rem;
				line-height: 0.64rem;
				padding: 0 0.9rem 0 0.85rem;
				box-sizing: border-box;
				color: $white;
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
			span{
				display: block;
				height: 0.64rem;
				line-height: 0.64rem;
				position: absolute;
				top: 0;
				right: 0.3rem;
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.recommend_box{
			overflow: hidden;
		}
		.title{
			height: 0.64rem;
			line-height: 0.64rem;
			padding: 0 0.3rem;
			border-bottom: 0.01rem solid $black;
			background: $titleBlue;
		}
		.recommend{
			li{
				float: left;
				width: 2.5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
				border-bottom: 0.01rem solid $black;
			}
		}
		.result{
			.cont{
				li{
					height: 0.96rem;
					padding: 0 0.17rem 0.3rem;
					border-bottom: 0.01rem solid $black;
					.col{
						float: left;
						span{
							display: block;
							&:first-child{
								font-size: $fs32;
								color: $white;
								margin: 0.15rem 0 0.1rem 0;
							}
						}
					}
					.icon{
						float: right;
						width: 0.5rem;
						height: 0.96rem;
						&.icon_check{
							background: url(../../assets/images/quote/check.png) no-repeat 0.13rem 0.36rem;
							background-size: 0.24rem 0.24rem;
						}
						&.icon_checked{
							background: url(../../assets/images/quote/checked.png) no-repeat 0.13rem 0.36rem;
							background-size: 0.24rem 0.24rem;
						}
					}
				}
			}
			.tips{
				height: 0.96rem;
				line-height: 0.96rem;
				text-align: center;
				color: #525866;
			}
		}
		.empty{
			height: 2.4rem;
			line-height: 2.4rem;
			border-bottom: 0.01rem solid $black;
			text-align: center;
			p{
				font-size: 0.36rem;
				color: #525866;
				font-weight: bold;
			}
		}
	}
</style>