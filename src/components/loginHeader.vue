<template>
	<div id="loginHeader">
		<mt-header :title=title>
		  	<router-link to="/" slot="left">
		    	<!--<mt-button icon="back">返回</mt-button>-->
		    	<i class="account"></i>
		  	</router-link>
		  	<router-link to="/" slot="right">
		 		<!--<mt-button icon="more"></mt-button>-->
		 		<i class="online"></i>
		 	</router-link>
		</mt-header>
	</div>
</template>

<script>
	export default{
		name:"loginHeader",
		props:['title'],
		data(){
			return{
				
			}
		},
		mounted:function(){
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#loginHeader{
		width: 100%;
	}
	.account{
		display: inline-block;
		width: 0.8rem;
		height: 0.96rem;
		background: url(../assets/images/account/account_user.png) no-repeat 0.32rem 0.32rem;
		background-size: 0.32rem 0.32rem;
		margin-top: 0.32rem;
	}
	.online{
		display: inline-block;
		width: 0.8rem;
		height: 0.96rem;
		background: url(../assets/images/account/account_online.png) no-repeat 0.32rem 0.32rem;
		background-size: 0.32rem 0.32rem;
		margin-top: 0.32rem;
	}
</style>