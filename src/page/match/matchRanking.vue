<template>
	<div id="matchRanking">
		<div class="myRank">
			<ul>
				<li>我的排名：<span>100 80</span></li>
				<li><span>总收益</span><i class="change change_1"></i><span>跟投人数</span><i class="change"></i></li>
			</ul>
		</div>
		<ul class="ranking border_bottom" v-for="n in 10" @click="toMatchUser">
			<li>
				<i class="rang_no"></i>
				<i class="user"></i>
				<span class="username">那年那图</span>
			</li>
			<li><span class="perecnt">333.88%</span><span class="count">13</span></li>
		</ul>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"matchRanking",
		props:['matchid'],
		data(){
			return{
				
			}
		},
		methods:{
			toMatchUser:function(){
				this.$router.push({path:"/matchUserDetails"});
			}
		},
		mounted:function(){
			console.log("111111")
		},
		
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchRanking{
		width: $w;
	}
	.myRank{
		width: $w;
		background-color: $bgDeep;
		padding: 0 0.3rem;
		font-size: $fs24;
		ul{
			height: 0.64rem;
			display: flex;
			justify-content: space-between;
			li{
				display: inline-flex;
				align-items: center;
			}
		}
	}
	.change{
		display: inline-block;
		width: 0.18rem;
		height: 0.24rem;
		background: url(../../assets/images/match/match_change.png) no-repeat;
		background-size: 0.18rem 0.24rem;
		margin-left: 0.1rem;
	}
	.change_1{
		margin-right: 0.4rem;
	}
	.ranking{
		width: $w;
		padding: 0 0.3rem;
		font-size: $fs28;
		height: 1.28rem;
		display: flex;
		justify-content: space-between;
		li{
			display: inline-flex;
			align-items:center;
		}
	}
	.rang_no{
		display: inline-block;
		width: 0.44rem;
		height: 0.44rem;
		background: url(../../assets/images/match/no_a.png) no-repeat ;
		background-size: 0.44rem 0.44rem;
	}
	.user{
		width: 0.8rem;
		height: 0.8rem;
		display: inline-block;
		background: url(../../assets/images/account/WXlogin.png) no-repeat;
		background-size: 0.8rem 0.8rem;
	}
	.username{
		color: $grayDeep;
	}
	.perecnt{
		margin-right: 1.32rem;
		color: $redDeep;
	}
</style>