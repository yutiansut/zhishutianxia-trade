<template>
	<div id="login">
		<topTitle title="登录" type="1"></topTitle>
		<div id="container">
			<ul>
				<li>
					<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
				</li>
				<li class="psdRt">
					<i class="psdIcon"></i>
					<input type="password"  placeholder="请输入密码" class="input" v-model="password"/>
				</li>
			</ul>
			<div>
				<div class="showTip">请输入正确手机号</div>
				<span class="forgetPsd" @click="toForgetPsd">忘记密码？</span>
			</div>
			<button class="btn">登录</button>
			<p @click="toRegister">新用户注册>></p>
			<div class="showWX">
				<i class="toWX"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	export default{
		name:"login",
		components:{ topTitle },
		data(){
			return{
				phone:"",
				password:""
			}
		},
		methods:{
			toRegister:function(){
				this.$router.push({path:"/register"});
			},
			toForgetPsd:function(){
				this.$router.push({path:"/forgetPassword"});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#login{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		width: 7.5rem;
		display: flex;
		flex-direction: column;
		padding: 0 0.3rem;
		.input{
			width: 100%;
			height: 1.2rem;
			line-height: 1.2rem;
			border-bottom: 0.01rem solid $bgDeep;
			color:$graySimple ;
			text-indent: 0.36rem;
			font-size: 0.28rem;
		}
		.input1{
			margin-top: 0.4rem;
		}
		.psdRt{
			position: relative;
		}
		.psdIcon{
			top: 0.52rem;
			right: 0.3rem;
			position: absolute;
			display: inline-block;
			width:0.32rem;
			height: 0.16rem;
			background: url(../../../assets/images/account/account_psd.png);
			background-size: 100% 100%;
		}
		.showTip{
			float: left;
			width:3.2rem;
			height: 0.64rem;
			line-height: 0.64rem;
			background-color: #dadae6;
			color: $blcakThin;
			text-align: center;
			margin-left: 1.85rem;
			font-size: $fs24;
			border-radius: 0.1rem;
			margin-top: 0.1rem;
		}
		.forgetPsd{
			float: right;
			height: 0.64rem;
			display: block;
			line-height: 0.64rem;
			font-size: $fs28;
			color: $blackBold;
			margin-top: 0.1rem;
		}
		.btn{
			width: 100%;
			height: 0.9rem;
			font-size: 0.36rem;
			line-height: 0.9rem;
			background-color: $redDeep;
			color: $bg;
			border-radius: 0.45rem;
			margin-top: 0.6rem;
		}
		p{
			text-align: center;
			color: $blackBold;
			font-size: $fs28;
			margin-top: 0.8rem;
		}
		.showWX{
			width: 100%;
			margin-top: 0.8rem;
			text-align: center;
			.toWX{
				display: inline-block;
				width: 0.64rem;
				height: 0.64rem;
				background: url(../../../assets/images/account/WXlogin.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>