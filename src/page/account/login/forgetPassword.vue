<template>
	<div id="forgetPassword">
		<loginHeader title="找回密码" type="0"></loginHeader>
		<div id="container">
			<ul>
				<li>
					<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
				</li>
				<li class="Rt">
					<span class="getcode">获取验证码</span>
					<input type="tel"  placeholder="请输入验证码" class="input" v-model="code" maxlength="11"/>
				</li>
			</ul>
			<button class="btn" @click="toResetPassword">下一步</button>
			<p>新用户注册>></p>
			<div class="showWX">
				<i class="toWX"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import loginHeader from "../../../components/loginHeader.vue"
	export default{
		name:'forgetPassword',
		components:{ loginHeader },
		data(){
			return{
				phone:'',
				code:''
			}
		},
		methods:{
			toResetPassword:function(){
				this.$router.push({path:"/resetPassword"})
			}
		}
	}
</script>

<
<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#forgetPassword{
		width: $w;
	}
	#container{
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
		.Rt{
			position: relative;
		}
		.getcode{
			display: block;
			position: absolute;
			top: 0.52rem;
			right: 0.3rem;
			font-size: $fs24;
			color: $grayMiddle;
		}
		.btn{
			width: 100%;
			height: 0.9rem;
			font-size: 0.36rem;
			line-height: 0.9rem;
			background-color: #c2c2cc;
			color: $bg;
			border-radius: 0.45rem;
			margin-top: 0.6rem;
		}
		p{
			text-align: center;
			color: $blackBold;
			margin-top: 0.8rem;
			font-size: $fs28;
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