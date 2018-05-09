<template>
	<div id="matchRules">
		<div class="time">
			比赛时间：2018-01-20 至 2018-02-20
		</div>
		<div class="nar border_bottom">
			<span>活动奖励</span>
		</div>
		<div class="activity">
			<ul>
				<li class="border_bottom">
					<div>
						<img src="../../assets/images/match/no1.png"/>
						<span>第一名</span>
					</div>
					<label>1000元</label>
				</li>
				<li class="border_bottom">
					<div>
						<img src="../../assets/images/match/no2.png"/>
						<span>第一名</span>
					</div>
					<label>1000元</label>
				</li>
				<li class="border_bottom">
					<div>
						<img src="../../assets/images/match/no3.png"/>
						<span>第一名</span>
					</div>
					<label>1000元</label>
				</li>
			</ul>
		</div>
		<div class="h_20"></div>
		<div class="nar border_bottom">
			<span>比赛规则</span>
		</div>
		<div class="rules">
			<ul>
				<li class="border_bottom">
					<span>初始资金：</span>
					<label>1000元</label>
				</li>
				<li class="border_bottom">
					<span>初始资金：</span>
					<label>1000元</label>
				</li>
				<li class="border_bottom">
					<span>初始资金：</span>
					<label>1000元</label>
				</li>
				<li class="border_bottom">
					<span>初始资金：</span>
					<label>1000元</label>
				</li>
			</ul>
		</div>
		<div class="tips">
			<span>提醒：</span>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
			<p>1.交易品种仅限于在交易所上市的正股，其他品种交易结束将不计算在收益之中；</p>
		</div>
		<!--<div class="btn bt">
			<button>比赛报名中，立即参加</button>
		</div>-->
		<!--<div class="btn1 bt">
			<button>报名终止</button>
		</div>-->
		<!--<div class="btn2 bt">
			<button>已报名，等待开赛</button>
			<button>跟投设置</button>
		</div>-->
		<div class="btn3 bt">
			<button>进入比赛</button>
			<button @click="toMatchSet">跟投设置</button>
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
//				id:""
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
				pro.fetch("post","/tradeCompetition/details",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted:function(){
//			console.log(this.$parent.matchid);
//			console.log(this.matchid)
//			this.getMtchRules(this.matchid);
		},
		activated:function(){
//			console.log(this.$parent.matchid);
//			console.log(this.matchid)
//			this.getMtchRules(this.matchid);
		},
		watch:{
			matchid:function(e){
				this.getMtchRules(e);
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