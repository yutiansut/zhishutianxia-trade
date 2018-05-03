<template>
	<div id="loginHeader">
		<div id="container">
			<i :class="type == 1 ? 'account' : 'back'" @click="toNext(type)"></i>
			<h1>{{title}}</h1>
			<i class="online"></i>
		</div>
	</div>
</template>

<script>
	export default{
		name:"loginHeader",
		props:['title',"type"],
		data(){
			return{
				
			}
		},
		methods:{
			toNext(type){
				if(type == 1){
					this.$router.push({path:"/my"})
				}else{
					this.$router.back(-1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#loginHeader{
		width: $w;
	}
	#container{
		height: 0.96rem;
		background-color: $blcakThin;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		h1{
			color: $bg;
			font-size: 0.36rem;
		}
		.account{
			display: inline-block;
			width: 0.64rem;
			height: 0.64rem;
			background: url(../assets/images/account/account_user.png) no-repeat 100% 50%;
			background-size: 0.32rem 0.32rem;
		}
		.online{
			display: inline-block;
			width: 0.64rem;
			height: 0.64rem;
			background: url(../assets/images/account/account_online.png) no-repeat 0 50%;
			background-size: 0.32rem 0.32rem;
		}
		.back{
			display: inline-block;
			width: 0.64rem;
			height: 0.64rem;
			background: url(../assets/images/account/icon_back.png) no-repeat 70% 50%;
			background-size: 0.16rem 0.32rem;
		}
	}
	
</style>