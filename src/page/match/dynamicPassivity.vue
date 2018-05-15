<template>
	<div id="dynamicPassivity">
		<div class="container" v-for="n in dataList">
			<div class="details" @click="toMatchUser(n.userNo,'other')">
				<div class="user border_bottom">
					<ul>
						<li>
							<img :src="n.wxHeadImg | changeWXimg" class="userP"/>
							<span class="username">{{n.wxNickname ?n.wxNickname : n.mobile}}</span>
						</li>
					</ul>
				</div>
				<div class="buyDetails">
					<ul>
						<li>{{n.direction | changeDrection}}：<span>{{tradeName[n.commodityNo]}}</span>{{n.commodityNo}}{{n.contractNo}}</li>
						<li>价格：<span>{{n.tradePrice}}</span></li>
					</ul>
					<ul>
						<li>{{n.tradeDatetime}}</li>
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
		name:"dynamicPassivity",
		props:['id'],
		data(){
			return{
				headers:"",
				dataList:''
			}
		},
		computed:{
			tradeName () {
                return this.$store.state.tradeName
            }
		},
		methods:{
			toMatchUser:function(e,other){
				this.$router.push({path:"matchUserDetails",query:{userId:e,type:other,matchid:this.matchid}});
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
			toMatchUser:function(){
				this.$router.push({path:"matchUserDetails"});
			},
			getDynamic:function(id){
				var data ={
					id:id,
					guardId:'',
					type:1,
					pageNo:1,
					pageSize:10,
					direction:0
				};
				var headers = this.headers;
				pro.fetch("post","/tradeCompetition/tradeDynamic",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
						this.dataList = res.data;
					}
				}).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
					}else{
						this.$toast({message:data.message,duration: 2000});
					}
				})
			}
		},
		mounted:function(){
			this.getHeaders();
			this.getDynamic(this.id);
		},
		filters:{
			changeDrection:function(e){
				return e == 0 ? "买入" : "卖出"
			},
			changeWXimg:function(e){
				console.log(e)
				return e != "" ? e : require("../../assets/images/account/WXlogin.png");
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#dynamicPassivity{
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
		width: 0.44rem;
		height: 0.44rem;
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