<template>
	<div id="matchSet">
		<topTitle title="跟投设置" type="0" type1="2"></topTitle>
		<div id="container">
			<ul class="dis_flex border_bottom">
				<li>开启跟投</li>
				<li><mt-switch v-model="switchN" @change="changSwitch('switchN')"></mt-switch></li>
			</ul>
			<ul class="ipt border_bottom">
				<li><input type="text" v-model="scale"/>%</li>
				<li><span>扣除跟单者盈利分成</span></li>
			</ul>
			<div class="h_20"></div>
			<ul class="dis_flex border_bottom">
				<li>开启持仓记录</li>
				<li><mt-switch v-model="history" @change="changSwitch('history')"></mt-switch></li>
			</ul>
			<ul class="dis_flex border_bottom">
				<li>开启历史成交记录</li>
				<li><mt-switch v-model="buyHistory" @change="changSwitch('buyHistory')"></mt-switch></li>
			</ul>
			<p>该功能只可设置一次，不可进行更改请您慎重设置！</p>
			<button>保存</button>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	export default{
		name:'matchSet',
		components:{ topTitle },
		data(){
			return{
				switchN:false,
				history:false,
				buyHistory:false,
				scale:''
			}
		},
		methods:{
			changSwitch:function(n){
				this[n]=!this[n];
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchSet{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		width: 100%;
		p{
			padding-left: 0.3rem;
			line-height: 0.48rem;
			font-size: $fs24;
		}
		.ipt{
			height: 0.96rem;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 0.3rem;
		}
		input{
			width: 1rem;
			height: 0.68rem;
			border: 0.01rem solid $bgDeep;
			border-radius: 0.2rem;
			font-size: $fs28;
			color: $blcakThin;
			margin-right: 0.1rem;
		}
		span{
			margin-left: 1.48rem;
		}
		button{
			width: 100%;
			height: 0.98rem;
			background-color: $redDeep;
			color: $bg;
			line-height: 0.98rem;
			text-align: center;
			position: fixed;
			left: 0;
			bottom: 0;
		}
	}
	.dis_flex{
		height: 0.96rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.3rem;
		font-size: $fs28;
	}
	.mint-switch{
		height: 0.48rem;
	}
	.mint-switch-core{
		height: 0.48rem;
	}
</style>