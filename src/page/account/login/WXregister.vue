<template>
	<div id="WXregister">
		<topTitle title="微信注册"></topTitle>
		<div id="WXname">
			<ul>
				<li><img src="../../../assets/images/account/WXuser.png" alt="" /></li>
				<li>
					<p>亲爱的&nbsp;<span>哈哈哈</span></p>
					<p>为了您的账户安全，请关联您的手机号，下次可直接登录。</p>
				</li>
			</ul>
		</div>
		<div class="h_20"></div>
		<div id="container">
			<div class="reg">
				<ul>
					<li>
						<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
					</li>
					<li class="Rt">
						<span class="getcode">获取验证码</span>
						<input type="tel"  placeholder="请输入验证码" class="input" v-model="code" maxlength="11"/>
					</li>
					<li class="Rt">
						<i class="psdIcon"></i>
						<input type="password"  placeholder="请输入密码" class="input" v-model="password"/>
					</li>
				</ul>
			</div>
			<button class="btn">立即绑定并注册</button>
			<p class="color_p" @click="toLogin"><span class="color_gray">已有账户？</span>立即登录>></p>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	export default{
		name:"WXregister",
		components:{ topTitle },
		data(){
			return{
				nickname:"你是谁",
				phone:"",
				password:"",
				code:""
			}
		},
		methods:{
			toLogin:function(){
				this.$router.push({path:"/login"});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#WXregister{
		width: $w;
	}
	#WXname{
		margin-top: 0.96rem;
		width: 100%;
		text-align: center;
		height: 2.4rem;
		padding: 0.6rem 0.3rem;
		ul{
			display: flex;
			justify-content: space-around;
			li{
				&:nth-child(1){
					img{
						width: 1.2rem;
						height: 1.2rem;
						display: block;
						background-size: 100% 100%;
						border-radius: 50%;
					}
				}
				&:nth-child(2){
					padding-left: 0.26rem;
					display: flex;
					flex-direction: column;
					text-align: left;
					p{
						line-height: 0.3rem;
						color: $grayDeep;
						&:nth-child(1){
							font-size: $fs28;
						}
						&:nth-child(2){
							margin-top: 0.1rem;
							font-size: $fs24;
						}
					}
					span{
						color: $blackBold;
						font-size: 0.28rem;
						font-weight: 600;
					}
				}
			}
		}
	}
	#container{
		width: 7.5rem;
		padding: 0 0.3rem;
		.reg{
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
		.color_p{
			margin-top: 0.8rem;
			color: $blcakThin;
			text-align: center;
		}
		.color_gray{
			color: $grayMiddle;
		}
	}
</style>