<template>
	<div id="resetPassword">
		<loginHeader title="设置新密码" type="0"></loginHeader>
		<div id="container">
			<ul>
				<li class="Rt">
				<i class="psdIcon"></i>
					<input type="password"  placeholder="请输入密码(至少6位数)" class="input" v-model="password" maxlength="11"/>
				</li>
				<li class="Rt">
					<i class="psdIcon"></i>
					<input type="password"  placeholder="请再次输入密码" class="input" v-model="surePassword" maxlength="11"/>
				</li>
			</ul>
			<button class="btn">登录</button>
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
		name:"resetPassword",
		components:{ loginHeader },
		data(){
			return{
				password:"",
				surePassword:""
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#resetPassword{
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