<template>
	<div id="dynamicAll">
		<div class="container" v-for="n in 5">
			<div class="details" @click="toMatchUser">
				<div class="user border_bottom">
					<ul>
						<li><i class="userP"></i><span class="username">哈哈哈</span></li>
						<li><span class="income">收益：</span><span class="count">1.86%</span></li>
					</ul>
				</div>
				<div class="buyDetails">
					<ul>
						<li>卖出：<span>国际原油</span>cl1820</li>
						<li>价格：<span>152.5</span></li>
					</ul>
					<ul>
						<li>10分钟前</li>
					</ul>
				</div>
			</div>
			<div class="h_20"></div>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	const local = pro.local;
	export default{
		name:"dynamicAll",
		props:['id'],
		data(){
			return{
				headers:""
			}
		},
		methods:{
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
			toMatchUser:function(){
				this.$router.push({path:"matchUserDetails"});
			},
			getDynamic:function(id){
				var data ={
					id:id,
					tradeNo:'',
					type:0,
					pageNo:1,
					pageSize:10,
					direction:0
				}
				var header = this.headers
				pro.fetch("post","/tradeCompetition/tradeDynamic",data,header).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted:function(){
			this.getHeaders();
			this.getDynamic(this.id);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#dynamicAll{
		width: $w;
	}
	.details{
		height: 2.76rem;
		width: 100%;
		padding-left: 0.3rem;
	}
	.user{
		ul{
			height: 0.88rem;
			display: flex;
			justify-content: space-between;
			li{
				display: inline-flex;
				align-items: center;
			}
		}
	}
	.userP{
		display: inline-block;
		width: 0.44rem;
		height: 0.44rem;
		background: url(../../assets/images/match/userP.png) no-repeat;
		background-size: 0.44rem 0.44rem;
		margin-right: 0.2rem;
	}
	.username{
		font-size:$fs28;
		color: $grayDeep;
	}
	.income{
		font-size: $fs24;
		color: $grayDeep;
	}
	.count{
		font-size: $fs24;
		color: $greenDeep;
		margin-right: 0.3rem;
	}
	.buyDetails{
		width: 100%;
		height: 1.88rem;
		padding-left: 0.64rem;
		color: $grayDeep;
		font-size: $fs28;
		ul{
			&:nth-child(1){
				margin-top: 0.3rem;
				height: 0.75rem;
				line-height: 0.4rem;
			}
			&:nth-child(2){
				margin-top: 0.4rem;
				font-size: $fs24;
			}
		}
		span{
			color:$blcakThin ;
		}
	}
</style>