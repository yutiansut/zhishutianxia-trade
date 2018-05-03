<template>
	<div id="register">
		<loginHeader title="注册" type="1"></loginheader>
		<div id="container">
			<ul>
				<li>
					<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
				</li>
				<li class="Rt">
					<span class="getcode" @click="getCode">获取验证码</span>
					<input type="tel"  placeholder="请输入验证码" class="input" v-model="code" maxlength="11"/>
				</li>
				<li class="Rt">
					<i class="psdIcon"></i>
					<input type="password"  placeholder="请输入密码" class="input" v-model="password"/>
				</li>
			</ul>
			<button class="btn">注册</button>
			<p @click="toLogin"><span class="color_gray">已有账户？</span>立即登录>></p>
			<div class="showWX">
				<i class="toWX" @click="toWX"></i>
			</div>
			<p @click="toProtocol"><span class="color_gray">注册即代表阅读并同意</span>《指数天下用户协议》</p>
		</div>
		<codeDialog type="register" ref="codeDialog"></codeDialog>
	</div>
</template>

<script>
	import loginHeader from "../../../components/loginHeader.vue"
	import codeDialog from "../../../components/codeDialog.vue"
	export default{
		name:"register",
		components:{ loginHeader,codeDialog },
		data(){
			return{
				phone:"",
				password:"",
				code:''
			}
		},
		methods:{
			toLogin:function(){
				this.$router.push({path:"/login"});
			},
			toWX:function(){
				this.$router.push({path:"/WXregister"});
			},
			toProtocol:function(){
				this.$router.push({path:"/userRegistrationProtocol"});
			},
			getCode:function(){
				this.$refs.codeDialog.ishow = true;
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#register{
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
			&:nth-child(1){
				font-size: $fs28;
			}
			&:nth-child(2){
				font-size: $fs24;
			}
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
		.color_gray{
			color: $grayMiddle;
		}
	}
</style>