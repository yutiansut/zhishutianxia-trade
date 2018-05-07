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
				   <div class="matchDiv" v-for="n in 4">
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
			    <mt-tab-container-item id="2">
			    	<mt-cell v-for="n in 4" :title="'测试 ' + n"  :key="'测试'+n"/>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="3">
			    	<mt-cell v-for="n in 6" :title="'选项 ' + n"  :key="'选项'+n"/>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="4">
			    	<mt-cell v-for="n in 6" :title="'哈哈 ' + n"  :key="'哈哈'+n"/>
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
	export default{
		name: 'match',
		components:{ topTitle ,bottomTab},
		data(){
			return{
				selected:"1",
				tabSelected: 'match'
			}
			
		},
		watch:{
			selected:function(n,old){
				console.log(n);
				console.log("----"+old)
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