<template>
	<div id="matchUserDetails">
		<topTitle title="模拟比赛详情" type="0" type1="2"></topTitle>
		<div id="container">
			<ul class="dis_flex2 border_bottom">
				<li>
					<i class="userP"></i>
					<span class="span_gray">这里是名字</span>
				</li>
				<li>
					<span class="span_gray">报名时间：2018-11-11-2018-11-11</span>
				</li>
			</ul>
			<div class="details border_bottom">
				<ul class=" dis_flex1">
					<li>
						<span class="span_gray">今权益：</span>
						<span class="span_black">+131115</span>
					</li>
					<li>
						<span class="span_gray">初始资金：</span>
						<span class="span_black">12151.020</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">总收益：</span>
						<span class="span_red">+212.212</span>
					</li>
					<li>
						<span class="span_gray">排名:</span>
						<span class="span_black">11</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">跟投收益：</span>
						<span class="span_green">+212.212</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">跟投人数：</span>
						<span class="span_black">暂无</span>
					</li>
					<li>
						<span class="span_gray">排名:</span>
						<span class="span_black">11</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">分成比例：</span>
						<span class="span_black">50%</span>
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
							<span>下单时间</span>
						</li>
						<template>
							<li class="border_bottom" v-for="n in 10">
								<span>1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<span>6</span>
								<span>7</span>
								<span>8</span>
								<span>8</span>
								<span>9</span>
							</li>
							
						</template>
					</ul>
				</div>
			</div>
			<div class="div_white"></div>
			<div class="bottom_tab">
				<span @click="forwards(0)">正向跟投</span>
				<span @click="forwards(1)">反向跟投</span>
			</div>
			<!--<div class="bottom_tab1">
				<span @click="forwards(2)">取消跟投</span>
			</div>-->
		</div>
	</div>	
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	import pro from "../../assets/js/common.js"
	const local = pro.local;
//	const apiUrl = "";
//	const header = "";
//	const upData = "";
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
				matchid:""//比赛id
			}
		},
		methods:{
			getUser:function(apiurl,upData,header){
				pro.fetch("post",apiurl,upData,header).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
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
					account:this.userid,
					type:type
				};
				var header=this.headers;
				pro.fetch("post","/followInvest/follow",data,header).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		activated:function(){
			this.getHeaders();
			this.userId = this.$route.query.userId;
			this.type = this.$route.query.type;
			this.matchid = this.$route.query.matchid;
			if(this.type == "mine"){
				this.upData = {
					account:this.userId
				};
				this.apiUrl = "/tradeCompetition/competitionDetails";
			}else{
				this.upData = {
					id:this.userId
				};
				this.headers = "";
				this.apiUrl = "/ tradeCompetition/getRankDetails";
			}
			this.getUser(this.apiUrl,this.upData,this.headers);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchUserDetails{
		width: $w;
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
					width: 20.6rem;
					li{
						text-align: center;
						line-height: 0.88rem;
						height:0.88rem;
						span{
							float: left;
							width: 2rem;
							display: block;
							overflow: hidden;
							color: $blcakThin;
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