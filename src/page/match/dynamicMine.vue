<template>
	<div id="dynamicMine">
		<mt-loadmore :bottom-method="loadBottom"  :auto-fill="false" :top-method="loadTop" ref="loadmore">
			<div class="container" v-for="n in dataList" v-show="dataList != ''">
				<div class="buyDetails" @click="toMatchUser(n.userNo,'mine')">
					<ul>
						<li>{{n.direction | changeDrection}}：<span>{{tradeName[n.commodityNo]}}</span>{{n.commodityNo}}{{n.contractNo}}</li>
						<li>价格：<span>{{n.tradePrice}}</span></li>
					</ul>
					<ul>
						<li>{{n.tradeDatetime}}</li>
					</ul>
				</div>
				<div class="h_20"></div>
			</div>
		</mt-loadmore>
		<div v-show="dataList == ''" class="listNone">
			暂无动态哦
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
				dataList:'',
				pagesize:10
			}
		},
		computed:{
			tradeName () {
                return this.$store.state.tradeName
            }
		},
		methods:{
			//加载跟多
			loadBottom:function(){
				this.pagesize+=10;
				console.log(this.pagesize)
				this.getDynamic(this.id,this.pagesize);
				this.$refs.loadmore.onTopLoaded();
			},
			//下拉刷新
			loadTop:function(){
				this.pagesize = 10 ;
				this.getDynamic(this.id,this.pagesize);
				this.$refs.loadmore.onTopLoaded();
			},
			toMatchUser:function(e,other){
				this.$router.push({path:"matchUserDetails",query:{userId:e,type:other,matchid:this.id}});
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
			getDynamic:function(id,pagesize){
				var data ={
					id:id,
					guardId:'',
					type:2,
					pageNo:0,
					pageSize:pagesize,
					direction:0
				};
				var headers = this.headers;
				pro.fetch("post","/tradeCompetition/tradeDynamic",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res);
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
			this.pagesize = 10;
			this.getHeaders();
			this.getDynamic(this.id,this.pagesize);
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
	.listNone{
		font-size: 0.28rem;
		width: 100%;
		margin-top: 50%;
		text-align: center;
		color: $grayDeep;
	}
</style>