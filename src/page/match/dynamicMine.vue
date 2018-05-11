<template>
	<div id="dynamicMine">
		<div class="container" v-for="n in dataList">
			<div class="buyDetails">
				<ul>
					<li>{{n.direction | changeDrection}}：<span>{{tradeName[n.commodityNo]}}</span>{{n.commodityNo}}{{n.contractNo}}</li>
					<li>价格：<span>{{n.tradePrice}}</span></li>
				</ul>
				<ul>
					<li>10分钟前</li>
				</ul>
			</div>
			<div class="h_20"></div>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	const local = pro.local;
	export default{
		name:"dynamicMine",
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
					type:2,
					pageNo:1,
					pageSize:10,
					direction:0
				};
				var headers = this.headers;
				pro.fetch("post","/tradeCompetition/tradeDynamic",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res);
						this.dataList = res.data;
					}
				}).catch((err)=>{
					console.log(err)
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#dynamicMine{
		width: $w;
	}
	.buyDetails{
		width: 100%;
		height: 1.88rem;
		padding-left: 0.3rem;
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