<template>
	<div id="matchSet">
		<topTitle title="跟投设置" type="0" type1="2"></topTitle>
		<div id="container" v-show="show">
			<ul class="dis_flex border_bottom">
				<li>开启跟投</li>
				<li><mt-switch v-model="switchN" @change="changSwitch('switchN')"></mt-switch></li>
			</ul>
			<ul class="ipt border_bottom">
				<li><input type="tel" v-model="scale"/>%</li>
				<li><span>扣除跟单者盈利分成</span></li>
			</ul>
			<div class="h_20"></div>
			<ul class="dis_flex border_bottom">
				<li>开启历史成交记录</li>
				<li><mt-switch v-model="buyHistory" @change="changSwitch('buyHistory')"></mt-switch></li>
			</ul>
			<h3>
				跟投规则 :
			</h3>
			<p>1.该功能只可设置一次，不可进行更改请您慎重设置！</p>
			<p>2.b跟投a，a操作合约，b操作相同的合约</p>
			<p>3.c跟投b，b操作合约，c操作相同的合约</p>
			<p>4.a跟投c，c操作合约，a和b操作相同的合约，c自己检测到这单是自己的操作，不重复跟投</p>
			<button @click="matchSet">保存</button>
		</div>
		<div id="container1" v-show="!show">
			<ul class="dis_flex border_bottom">
				<li>开启跟投</li>
				<li>已开启</li>
			</ul>
			<ul class="ipt border_bottom">
				<li><input type="text" v-model="scale1" disabled="disabled"/>%</li>
				<li><span>扣除跟单者盈利分成</span></li>
			</ul>
			<div class="h_20"></div>
			<ul class="dis_flex border_bottom">
				<li>开启历史成交记录</li>
				<li>{{isHistory}}</li>
			</ul>
			<h3>
				跟投规则 :
			</h3>
			<p>1.该功能只可设置一次，不可进行更改请您慎重设置！</p>
			<p>2.b跟投a，a操作合约，b操作相同的合约</p>
			<p>3.c跟投b，b操作合约，c操作相同的合约</p>
			<p>4.a跟投c，c操作合约，a和b操作相同的合约，c自己检测到这单是自己的操作，不重复跟投</p>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	import pro from "../../assets/js/common.js"
	import { MessageBox } from 'mint-ui'
	const local = pro.local;
	export default{
		name:'matchSet',
		components:{ topTitle },
		data(){
			return{
				switchN:false,
				history:false,
				buyHistory:false,
				scale:'',
				matchid:'',
				headers:"",
				show:true,
				scale1:"",
				follow:0,//跟投开关0默认关闭
				tradeRecord:0,//开启成交历史记录
				isHistory:''
			}
		},
		methods:{
			changSwitch:function(n){
				this[n]=!this[n];
				this.follow = this.switchN ? 1 : 0;
				this.tradeRecord = this.buyHistory ? 1 : 0;
			},
			//获取跟投信息
			getIsSet:function(n,h){
				var data = {
					id:n
				}
				pro.fetch("post","/followInvest/getSetting",data,h).then((res)=>{
					if(res.code == 1 && res.success == true){
						this.show = res.data == undefined ? true : false ;
						if(res.data !=null){
							this.isHistory = res.data.dealRecord == 0 ? "未开启" : "已开启";
							this.scale1 = res.data.divide;
						}
					}
				}).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
					}else{
						this.$toast({message:data.message,duration: 2000});
					}
				})
			},
			getHeaders:function(){
				if(local.get("user") != null){
					this.headers = {
						token:local.get("user").token,
						secret:local.get("user").secret
					}
				}else{
					this.headers = ""	
				}
			},
			//保存跟投
			matchSet:function(){
				if(!this.switchN){
					this.$toast({message: '请先开启跟投开关',duration: 2000});
				}else if(this.scale > 40){
					this.$toast({message: '比例最大不超过40%',duration: 2000});
				}else if(this.scale < 0){
					this.$toast({message: '比例不能设置为负数',duration: 2000});
				}else{
					var data = {
						id:this.matchid,
						follow:this.follow,
						divide:this.scale,
						tradeRecord:this.tradeRecord
					}
					var header = this.headers
					MessageBox.confirm("扣除跟单盈利分成："+this.scale+"%"+"</br>"+"注意：只能设置一次","提示").then(()=>{
						pro.fetch("post","/followInvest/setting",data,header).then((res)=>{
							if(res.code == 1 && res.success == true){
								this.$toast({message: '恭喜您，设置成功！',duration: 2000});
								this.$router.back(-1);
							}
						}).catch((err)=>{
							var data = err.data;
							if(data == undefined){
								this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
							}else{
								this.$toast({message:data.message,duration: 2000});
							}
						})
					}).catch(()=>{})
				}
			}
		},
		activated:function(){
			this.scale = '';
			this.buyHistory = false;
			this.getHeaders();
			this.follow = 0;
			this.tradeRecord = 0;
			this.switchN = false;
			this.history = false;
			this.matchid = this.$route.query.matchid;
			this.getIsSet(this.matchid,this.headers)
			
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
		#container1{
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
	h3{
		font-size: 0.28rem;
		color: $redDeep;
		width: 100%;
		background-color: $bgDeep;
		height: 0.64rem;
		line-height: 0.64rem;
		padding-left: 0.3rem;
	}
</style>