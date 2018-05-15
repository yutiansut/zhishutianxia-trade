<template>
	<div id="matchRules">
		<div class="time">
			比赛时间：{{rulesData.joinBeginTime | changeDate}} 至 {{rulesData.joinEndTime | changeDate}}
		</div>
		<div class="nar border_bottom">
			<span>活动奖励</span>
		</div>
		<div class="activity">
			<ul>
				<li class="border_bottom" v-for="(k,v,index) in award">
					<div class="li_no">
						<img :src="index | changNo"/>
						<span id="span_no">{{index+1}}</span>
						<span>{{v}}</span>
					</div>
					<label>{{k}}元</label>
				</li>
			</ul>
		</div>
		<div class="h_20"></div>
		<div class="nar border_bottom">
			<span>比赛规则</span>
		</div>
		<div class="rules">
			<ul>
				<li class="border_bottom" v-for="(k,v) in rule">
					<span>{{v}}：</span>
					<label>{{k}}</label>
				</li>
			</ul>
		</div>
		<div class="tips">
			<span>提醒：</span>
			<p v-for="(k,v) in tip">{{v}}.{{k}}</p>
		</div>
		<div class="btn1 bt" v-if="rulesData.statusName == 5">
			<button>比赛已结束</button>
		</div>
		<div class="btn2 bt" v-else-if="rulesData.join == 1 && (rulesData.statusName == 2 || rulesData.statusName == 3)">
			<button>已报名，等待开赛</button>
			<button @click="toMatchSet">跟投设置</button>
		</div>
		<div class="btn3 bt" v-else-if="(rulesData.join == 2 || rulesData.join == 1) && rulesData.statusName == 4">
			<button @click="enterMatch">进入比赛</button>
			<button @click="toMatchSet">跟投设置</button>
		</div>
		<div class="btn1 bt" v-else-if="rulesData.statusName == 4 && rulesData.join == 0">
			<button>报名终止</button>
		</div>
		<div class="btn bt" v-else-if="rulesData.join == -1">
			<button @click="toLogin">比赛报名中，立即参加</button>
		</div>
		<div class="btn1 bt" v-else-if="rulesData.statusName == 1">
			<button>等待报名</button>
		</div>
		<div class="btn bt" v-show="currentTitle" v-else >
			<button @click="matchApply">比赛报名中，立即参加</button>
		</div>
		<div class="btn2 bt" v-show="!currentTitle">
			<button>已报名，等待开赛</button>
			<button @click="toMatchSet">跟投设置</button>
		</div>
		<!--<div class="btn3 bt">
			<button @click="enterMatch">进入比赛</button>
			<button @click="toMatchSet">跟投设置</button>
		</div>-->
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	import { MessageBox } from 'mint-ui';
	const local = pro.local;
	export default{
		name:"matchRules",
		props:['matchid'],
		data(){
			return{
				rulesData:[],
				award:[],
				tip:[],
				rule:{},
				headers:"",
				currentTitle:true
				
			}
		},
		methods:{
			toLogin:function(){
				this.$toast({message: '请您先登录',duration: 2000});
				this.$router.push({path:"/login"})
			},
			//进入比赛获取交易账号
			enterMatch:function(){
				var data = {
					id:this.matchid
				}
				var header = this.headers
				pro.fetch("post","/tradeCompetition/getAccount",data,header).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
						MessageBox.alert("账号："+res.data.account+"</br>"+"密码："+res.data.password,"交易账号",{confirmButtonText:"进入登录页面",}).then(action=>{
							console.log("9999");
						});
					}
				}).catch((err)=>{
					this.errobj(err);
				})
			},
			//去跟投设置
			toMatchSet:function(){
				this.$router.push({path:"/matchSet",query:{matchid:this.matchid}});
			},
			//获取比赛详情
			getMtchRules:function(matchid){
				var data = {
					id:matchid
				};
				var header = this.headers;
				pro.fetch("post","/tradeCompetition/details",data,header).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res);
						this.rulesData = res.data.qiwCompetition;
						this.award = res.data.award;
						$.map(res.data.rule,function(i,item){
							if(typeof i == "object"){
								this.tip = i
							}else{
								this.rule[item] = i;
							}
						}.bind(this));
						let statusData = {
							status:res.data.qiwCompetition.statusName
						}
						this.$emit('getStatus',statusData);
					}
				}).catch((err)=>{
					this.errobj(err);
				})
			},
			//是否登录
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
			//报名
			matchApply:function(e){
					var data = {
							id : this.matchid
						}
					var header = this.headers;
					pro.fetch("post","/tradeCompetition/join",data,header).then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"恭喜您，报名成功！",duration: 2000});
							this.currentTitle = false;
						}
					}).catch((err)=>{
						this.errobj(err);
					})
			},
			errobj:function(err){
				var data = err.data;
				if(data == undefined){
					this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
				}else{
					this.$toast({message:data.message,duration: 2000});
				}
			}
		},
		activated:function(){
			this.getHeaders();
			if(this.matchid != ""){
				this.getMtchRules(this.matchid);
			}
		},
		mounted:function(){
			this.getHeaders();
			if(this.matchid != ""){
				console.log("66666")
				this.getMtchRules(this.matchid);
			}
		},
		watch:{
			matchid:function(e){
				console.log(e)
				this.getHeaders();
				this.getMtchRules(e);
			}
		},
		filters:{
			changNo:function(e){
				switch (e){
					case 0:
						return require("../../assets/images/match/no1.png");
					case 1:
						return require("../../assets/images/match/no2.png");
					case 2:
						return require("../../assets/images/match/no3.png");
				}
			},
			changeDate:function(e){
				return pro.getDate(new Date(e.replace(/-/g, "/")),'y-m-d');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchRules{
		width: $w;
	}
	.time{
		width: 100%;
		height: 0.64rem;
		background-color: $bgGray;
		border-bottom: 0.01rem solid $bgDeep;
		border-top: 0.01rem solid $bgDeep;
		text-align: center;
		line-height: 0.64rem;
		color: #919199;
		font-size:$fs24;
	}
	.nar{
		width: 100%;
		height: 0.64rem;
		line-height: 0.64rem;
		padding-left: 0.3rem;
		span{
			font-size: $fs28;
			border-left: 0.04rem solid $redDeep;
			padding-left: 0.1rem;
		}
	}
	.activity{
		li{
			padding: 0 0.3rem;
			height: 0.96rem;
			line-height: 0.96rem;
			display: flex;
			justify-content: space-between;
			width: 100%;
			img{
				width: 0.44rem;
				height: 0.44rem;
			}
			span{
				margin-left: 0.1rem;
				color: #919199;
				font-size: $fs28;
			}
			
		}
		.li_no{
			position: relative;
			#span_no{
				position: absolute;
				left: 0.06rem;
				top: 0.04rem;
				font-size: $fs24;
				font-weight: bold;
				color: $bg;
			}
		}
		
	}
	.rules{
		li{
			padding: 0 0.3rem;
			height: 0.96rem;
			line-height: 0.96rem;
			width: 100%;
			span{
				font-size: $fs28;
				color: #919199;
			}
			label{
				font-size: $fs28;
				color: $blcakThin;
			}
		}
	}
	.tips{
		margin-bottom: 1.5rem;
		width: 100%;
		margin-top: 0.3rem;
		padding: 0rem 0.3rem;
		font-size: $fs28;
		span{
			color: $redDeep;
		}
		p{
			color: $graySimple;
			line-height: 0.4rem;
		}
	}
	button{
		color: $bg;
		font-size: 0.36rem;
		height: 100%;
	}
	.bt{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0.98rem;
		line-height: 0.48rem;
	}
	.btn{
		button{
			width: 100%;
			color: $bg;
			background-color: $redDeep;
		}
	}
	.btn1{
		button{
			width: 100%;
			background-color: $grayBtn;
		}
	}
	.btn2{
		button{
			width: 50%;
			&:nth-child(1){
				background-color: $grayBtn;
				float: left;
			}
			&:nth-child(2){
				background-color: $blcakThin;
				float: left;
			}
		}
	}
	.btn3{
		button{
			width: 50%;
			&:nth-child(1){
				background-color: $redDeep;
				float: left;
			}
			&:nth-child(2){
				background-color: $blcakThin;
				float: left;
			}
		}
	}
</style>