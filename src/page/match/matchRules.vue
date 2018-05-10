<template>
	<div id="matchRules">
		<div class="time">
			比赛时间：{{rulesData.beginTime}} 至 {{rulesData.endTime}}
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
					<label>{{k}}元</label>
				</li>
			</ul>
		</div>
		<div class="tips">
			<span>提醒：</span>
			<p v-for="(k,v) in tip">{{v}}.{{k}}</p>
		</div>
		<div class="btn1 bt" v-if="rulesData.join == 0 && rulesData.statusName == 5">
			<button>报名终止</button>
		</div>
		<div class="btn2 bt" v-else-if="rulesData.join == 1">
			<button>已报名，等待开赛</button>
			<button>跟投设置</button>
		</div>
		<div class="btn3 bt" v-else-if="rulesData.join == 2">
			<button>进入比赛</button>
			<button @click="toMatchSet">跟投设置</button>
		</div>
		<div class="btn bt" v-else>
			<button>比赛报名中，立即参加</button>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"matchRules",
		props:['matchid'],
		data(){
			return{
				rulesData:[],
				award:[],
				tip:[],
				rule:{}
			}
		},
		methods:{
			toMatchSet:function(){
				this.$router.push({path:"/matchSet"});
			},
			getMtchRules:function(matchid){
				var data = {
					id:matchid
				};
				var headers = {
					token:"YTlkYzQ5NmUxMjQ3NGRkN2E4OWE5MWE0MjJhZjcyNzM",
					secret:"7cda0b054336c9cca469bf0aca8e3918"
				}
				pro.fetch("post","/tradeCompetition/details",data,"").then((res)=>{
					if(res.code == 1 && res.success == true){
						this.rulesData = res.data.qiwCompetition;
						this.award = res.data.award;
						$.map(res.data.rule,function(i,item){
							if(typeof i == "object"){
								this.tip = i
							}else{
								this.rule[item] = i;
							}
						}.bind(this))
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted:function(){
			if(this.matchid != ""){
				this.getMtchRules(this.matchid);
			}
		},
		watch:{
			matchid:function(e){
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