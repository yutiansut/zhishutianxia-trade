<template>
	<div id="matchUserDetails">
		<topTitle title="模拟比赛详情" type="0" type1="2"></topTitle>
		<div id="container">
			<ul class="dis_flex2 border_bottom">
				<li>
					<img :src="wxHeadImg | changeWXimg" alt=""   class="userP" />
					<span class="span_gray">{{wxNickname || telphone}}</span>
				</li>
				<li>
					<span class="span_gray">报名时间：{{applyTime | changTime}}</span>
				</li>
			</ul>
			<div class="details border_bottom">
				<ul class=" dis_flex1">
					<li>
						<span class="span_gray">今权益：</span>
						<span class="span_black">{{Number(otherData.equities).toFixed(2)}}</span>
					</li>
					<li>
						<span class="span_gray">初始资金：</span>
						<span class="span_black">{{otherData.initialFund}}</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">总收益：</span>
						<span class="span_red">{{Number(otherData.totalProfit).toFixed(2)}}</span>
					</li>
					<li>
						<span class="span_gray">排名:</span>
						<span class="span_black">{{otherData.byProfitRate}}</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">跟投收益：</span>
						<span class="span_green">{{Number(otherData.followProfit).toFixed(2)}}</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">跟投人数：</span>
						<span class="span_black">{{otherData.followCount}}</span>
					</li>
					<li>
						<span class="span_gray">排名:</span>
						<span class="span_black">{{otherData.byFollowCount}}</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">分成比例：</span>
						<span class="span_black">{{otherData.divide}}%</span>
					</li>
				</ul>
			</div>
			<div class="h_20"></div>
			<div class="p_left border_bottom">
				<span>成交记录</span>	
			</div>
			<div id="history_details">
				<div class="history">
					<ul>
						<li class="border_bottom">
							<span>序号</span>
							<span>合约名称</span>
							<span>买/卖</span>
							<span>成交价</span>
							<span>成交量</span>
							<span>手续费</span>
							<span>平仓盈亏</span>
							<span>币种</span>
							<span>交易所</span>
							<span>成交时间</span>
						</li>
						<template>
							<li class="border_bottom" v-for="(n,index) in list">
								<span>{{index+1}}</span>
								<span>{{n.commodityNo}}</span>
								<span>{{n.direction | changeDrection}}</span>
								<span>{{n.tradePrice}}</span>
								<span>{{n.tradeNum}}</span>
								<span>{{n.tradeFee}}</span>
								<span>{{n.hedgeProfit}}</span>
								<span>{{n.currencyNo}}</span>
								<span>{{n.exchangeNo}}</span>
								<span>{{n.tradeDatetime}}</span>
							</li>
							
						</template>
					</ul>
				</div>
			</div>
			<div class="div_white"></div>
			<div v-show="type!='mine'">
				<div class="bottom_tab" v-show="status == '0'">
					<span @click="forwards(0)">正向跟投</span>
					<span @click="forwards(1)">反向跟投</span>
				</div>
				<div class="bottom_tab1" v-show="status == '1'">
					<span @click="forwards(2)">取消跟投</span>
				</div>
				<div class="bottom_tab1" v-show="status == '2'">
					<span>已跟其他用户</span>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import topTitle from "../../components/topTitle.vue";
	import pro from "../../assets/js/common.js";
	import { MessageBox } from 'mint-ui';
	const local = pro.local;
	export default{
		name:"matchUserDetails",
		components:{ topTitle },
		data(){
			return{
				userId:"",
				type:"",
				upData:"",
				headers:"",
				apiUrl:"",
				userNo:"",//交易账号
				matchid:"",//比赛id
				status:0,
				otherData:{},
				userData:{},
				wxNickname:"",
				applyTime:"",
				telphone:'',
				list:[],
				wxHeadImg:""
			}
		},
		methods:{
			//获取详情
			getOtherUser:function(apiurl,upData,header){
				pro.fetch("post",apiurl,upData,header).then((res)=>{
					if(res.code == 1 && res.success == true){
						this.status = res.data.followStatus;
						this.otherData = res.data;
						this.userData = {};
						this.wxNickname = res.data.wxNickname;
						this.telphone = res.data.telphone;
						this.applyTime = res.data.joinTime;
						this.list = res.data.tradeRecords;
						this.wxHeadImg = res.data.wxHeadImg;
					}
				}).catch((err)=>{
						console.log(err)
				})
			},
			getHeaders:function(){
				if(local.get("user") != null){
					this.headers = {
						token:local.get("user").token,
						secret:local.get("user").secret
					}
				}else{
					this.headers = ""	
				}
			},
			//跟投
			forwards:function(type){
				var data = {
					id:this.matchid,
					account:this.userId,
					type:type
				};
				var header=this.headers;
				let title = '';
				if(type == 0){
					title="正向跟投："
				}else if(type == 1){
					title = "反向跟投："
				}else if(type == 2){
					title = "取消跟投："
				}
				let name = this.wxNickname ? thiw.wxNickname : this.telphone
				MessageBox.confirm("您确定"+title+"</br>"+name+"吗？","跟投设置").then(()=>{
					pro.fetch("post","/followInvest/follow",data,header).then((res)=>{
						if(res.code == 1 && res.success == true){
							if(type == 2){
								this.$toast({message: "取消成功",duration: 2000});
							}else{
								this.$toast({message: "恭喜您，跟投成功！",duration: 2000});
							}
							this.status = this.status == 0 ? 1 : 0;
						}
					}).catch((err)=>{
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}).catch(()=>{})
				
			}
		},
		activated:function(){
			this.getHeaders();
			this.userId = this.$route.query.userId;
			this.type = this.$route.query.type;
			this.matchid = this.$route.query.matchid;
			this.upData = {
				account:this.userId,
				id:this.matchid 
			};
			this.apiUrl = "/tradeCompetition/rankDetails";
			this.getOtherUser(this.apiUrl,this.upData,this.headers);
		},
		filters:{
			changTime:function(e){
				return pro.getDate(e,"y-m-d h:i:s");
			},
			changeWXimg:function(e){
				return e != "" ? e : require("../../assets/images/account/WXlogin.png");
			},
			changeDrection:function(e){
				return e == 0 ? "买" : "卖";
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchUserDetails{
		width: $w;
		background-color: $bg;
	}
	#container{
		margin-top: 0.96rem;
		.userP{
			width: 0.44rem;
			height: 0.44rem;
			display: inline-block;
			background: url(../../assets/images/match/userP.png) no-repeat;
			background-size: 0.44rem 0.44rem;
			margin-right: 0.2rem;
		}
		.details{
			width: 100%;
			height: 5rem;
			
		}
		.dis_flex2{
			display: flex;
			justify-content: space-between;
			padding: 0 0.3rem;
			width: 100%;
			height: 0.88rem;
			li{
				display: inline-flex;
				align-items: center;
			}
		}
		.dis_flex1{
			height: 1.48rem;
			padding: 0 0.3rem;
			width: 100%;
			li{
				height: 0.74rem;
				line-height: 0.74rem;
			}
		}
		.dis_flex{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.3rem;
			width: 100%;
			height: 0.88rem;
		}
		.span_gray{
			color:$grayDeep ;
		}
		.span_black{
			color: $blcakThin;
		}
		.span_red{
			color: $redDeep;
		}
		.span_green{
			color: $greenDeep;
		}
		.p_left{
			height: 0.64rem;
			width: 100%;
			line-height: 0.64rem;
			padding: 0 0.3rem;
			span{
				border-left: 0.04rem solid $redDeep;
				padding-left: 0.1rem;
			}
		}
		#history_details{
			width: $w;
			.history{
				width: 100%;
				overflow-x: scroll;
				-webkit-overflow-scrolling: touch;
				ul{
					display: block;
					padding: 0 0.3rem;
					width: 17.6rem;
					li{
						text-align: center;
						line-height: 0.88rem;
						height:0.88rem;
						span{
							float: left;
							width: 1.5rem;
							display: block;
							overflow: hidden;
							color: $blcakThin;
							&:nth-child(10){
								width: 3rem;
							}
						}
					}
				}
			}
		}
		.div_white{
			width: 100%;
			height: 0.98rem;
			background-color: $bg;
		}
		.bottom_tab{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 0.98rem;
			text-align: center;
			line-height: 0.98rem;
			font-size: 0.36rem;
			span{
				&:nth-child(1){
					height: 0.98rem;
					float: left;
					display: block;
					width: 50%;
					background-color: $redDeep;
					color: $bg;
				}
				&:nth-child(2){
					height: 0.98rem;
					float: left;
					display: block;
					width: 50%;
					background-color: $blcakThin;
					color: $bg;
				}
			}
		}
		.bottom_tab1{
			width: 100%;position: fixed;
			bottom: 0;
			left: 0;
			height: 0.98rem;
			text-align: center;
			line-height: 0.98rem;
			background-color: #0099e6;
			font-size: 0.36rem;
			span{
				height: 0.98rem;
				color: $bg;
				
			}
		}
	}
</style>