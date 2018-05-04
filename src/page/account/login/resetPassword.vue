<template>
	<div id="resetPassword">
		<topTitle title="设置新密码" type="0"></topTitle>
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
			<button class="btn" @click="login">登录</button>
			<p>新用户注册>></p>
			<div class="showWX">
				<i class="toWX"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:"resetPassword",
		components:{ topTitle },
		data(){
			return{
				password:"",
				surePassword:"",
				pwdReg:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
			}
		},
		methods:{
			login:function(){
				if(this.password == ''){
					this.$toast({message: '请输入密码',duration: 2000});
				}else if(this.surePassword == ''){
					this.$toast({message: '请输入确认密码',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false || this.pwdReg.test(this.surePassword) == false){
					this.$toast({message: '请输入6-16位数字加字母的密码',duration: 2000});
					this.password = "";
					this.password = "";
				}else if(this.password!=this.surePassword){
					this.$toast({message: '密码两次输入不一致，请仔细检查',duration: 2000});
				}else{
					var data = {
						mobile:this.phone,
						smsCode:this.code,
						newPwd:this.password
					}
					pro.fetch("post","/loginAndRegister/setNewPwd",data,"").then((res)=>{
						if( res.code == 1 && res.success == true){
							this.$toast({message: '登录密码设置成功',duration: 2000});
							this.$router.push({path:"/login"});
						}
					}).catch((err)=>{
						var data =err.data;
						if(data == undefined){
							this.$toast({message: '网络不给力，请稍后再试',duration: 2000});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		activited:function(){
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
		},
		mounted:function(){
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#resetPassword{
		width: $w;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
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