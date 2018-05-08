<template>
	<div id="match">
		<topTitle title="比赛" type="1" type1="1"></topTitle>
		<div id="container">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">全部比赛</mt-tab-item>
			  <mt-tab-item id="2">报名中</mt-tab-item>
			  <mt-tab-item id="3">进行中</mt-tab-item>
			   <mt-tab-item id="4">已结束</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
				   <div class="matchDiv" v-for="n in List" @click="toNext">
				   		<div class="img_div">
				   			<img src="../assets/images/match/match_bananer.png" />
				   		</div>
				   		<div class="time_div">
				   			<img src="../assets/images/match/match_apply.png" />
				   			<span>0105至0205</span>
				   			<span>10086</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
				   <div class="h_98"></div>
				</mt-tab-container-item>
			    <mt-tab-container-item id="2">
			    	<div class="matchDiv" v-for="n in List" @click="toNext">
				   		<div class="img_div">
				   			<img src="../assets/images/match/match_bananer.png" />
				   		</div>
				   		<div class="time_div">
				   			<img src="../assets/images/match/match_apply.png" />
				   			<span>0105至0205</span>
				   			<span>10086</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="3">
			    	<div class="matchDiv" v-for="n in List" @click="toNext">
				   		<div class="img_div">
				   			<img src="../assets/images/match/match_bananer.png" />
				   		</div>
				   		<div class="time_div">
				   			<img src="../assets/images/match/match_apply.png" />
				   			<span>0105至0205</span>
				   			<span>10086</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="4">
			    	<div class="matchDiv" v-for="n in List" @click="toNext">
				   		<div class="img_div">
				   			<img src="../assets/images/match/match_bananer.png" />
				   		</div>
				   		<div class="time_div">
				   			<img src="../assets/images/match/match_apply.png" />
				   			<span>0105至0205</span>
				   			<span>10086</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
			    </mt-tab-container-item>
			</mt-tab-container>
		</div>
		<!-- 选项卡 -->
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>
</template>

<script>
	import { Navbar, TabItem } from 'mint-ui';
	import topTitle from "../components/topTitle"
	import bottomTab from "../components/bottom_tab"
	import pro from "../assets/js/common.js"
	export default{
		name: 'match',
		components:{ topTitle ,bottomTab},
		data(){
			return{
				selected:"1",
				tabSelected: 'match',
				List:""
			}
			
		},
		methods:{
			toNext:function(){
				this.$router.push({path:"/topNars"});
			},
			getMatchList:function(n){
				var data = {
					status:n,
					pageNo:'',
					pageSize:''
				}
				var headers = "";
				pro.fetch("post","/tradeCompetition/list",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						console.log(res)
						this.List = res.data.list;
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted:function(){
			this.getMatchList(0);
		},
		activited:function(){
			
		},
		watch:{
			selected:function(n){
				this.getMatchList(n-1);
			},
		},		
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	
	#match{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		width: 100%;
		.mint-navbar .mint-tab-item.is-selected{
			margin: 0;
			border-bottom: 0.03rem solid $redDeep;
			color: $redDeep;
		}
		.mint-navbar .mint-tab-item{
			padding: 0.27rem;
		}
		.mint-navbar{
			border-bottom: 0.01rem solid $bgDeep;
			padding: 0 0.3rem;
		}
		.mint-tab-container{
			padding: 0 0.3rem;
		}
		#4 .mint-navbar .mint-tab-item.is-selected.mint-tab-item-label{
			color:$redDeep ;
		}
		.matchDiv{
			width: 6.9rem;
			height: 3.2rem;
			background-color: $bg;
			margin-top: 0.3rem;
			box-shadow: 0rem 0.03rem 0rem 0.03rem $bgDeep;
			border-radius: 0.1rem;
			
			background-size: 100% 100%;
		}
		.img_div{
			img{
				width: 6.9rem;
				height: 2.4rem;
				background-size: 100% 100%;
			}
		}
		.time_div{
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			img{
				width: 0.76rem;
				height: 0.32rem;
				margin-left: 0.1rem;
			}
			span{
				font-size:$fs24; 
				&:nth-child(2){
					color: $blcakThin;
				}
				&:nth-child(3){
					float: right;
					color: $grayDeep;
					margin-right: 0.1rem;
				}
				&:nth-child(4){
					float: right;
					color: #ff6a00;
				}
			}
		}
	}


</style>