<template>
	<div id="forgetPassword">
		<topTitle title="找回密码" type="0"></topTitle>
		<div id="container">
			<ul>
				<li>
					<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
				</li>
				<li class="Rt">
					<span class="getcode" @click="getCode">{{volid ? info : (time+'秒')}}</span>
					<input type="tel"  placeholder="请输入验证码" class="input" v-model="code" maxlength="11"/>
				</li>
			</ul>
			<button class="btn" @click="toResetPassword">下一步</button>
			<p>新用户注册>></p>
			<div class="showWX">
				<i class="toWX"></i>
			</div>
		</div>
		<codeDialog ref="codeDialog"  type="findpwd"></codeDialog>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	import pro from "../../../assets/js/common.js"
	import codeDialog from "../../../components/codeDialog.vue"
	export default{
		name:'forgetPassword',
		components:{ topTitle,codeDialog },
		data(){
			return{
				phone:'',
				code:'',
				time: 0,
				info: '获取验证码',
				phoneReg:/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/
			}
		},
		computed : {
			PATH: function(){
				return this.$store.getters.PATH;
			},
			volid: function(){
				if(this.time <= 0){
					return true
				}else{
					return false
				}
			}
		},
		methods:{
			toResetPassword:function(){
				if(this.phone == ''){
				this.$toast({message: '请输入手机号',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else if(this.code == ''){
					this.$toast({message: '请输入验证码',duration: 2000});
				}else{
					this.$router.push({path:"/resetPassword",query:{sendcode:this.code,sendphone:this.phone}});
				}
			},
			getCode:function(e){
				if(this.phone == ''){
					this.$toast({message: '请输入手机号',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else{
					this.$refs.codeDialog.ishow = true;
					this.$refs.codeDialog.path= this.PATH+"/loginAndRegister/getImgCode.jpg"+Math.random()*1000+"?mobile=" + this.phone;
					this.$refs.codeDialog.phone = this.phone;
					//页面效果
					$(e.target).addClass('current');
					this.time = 60;
					var timing = setInterval(function(){
						this.time--;
						if(this.time <= 0){
							clearInterval(timing);
							$(e.target).removeClass('current');
						}
					}.bind(this), 1000);
				}
			},
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