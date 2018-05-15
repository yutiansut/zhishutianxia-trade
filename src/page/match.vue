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
				   <div class="matchDiv" v-for="n in List" @click="toNext(n.id)">
				   		<div class="img_div">
				   			<img :src="'http://192.168.0.225'+n.imgUrl" />
				   		</div>
				   		<div class="time_div">
				   			<img :src="n.statusName | showMatch" />
				   			<span>{{n.beginTime | changeTime}}至{{n.endTime | changeTime}}</span>
				   			<span>{{n.joinNum}}</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
				   <div class="h_98"></div>
				</mt-tab-container-item>
			    <mt-tab-container-item id="2">
			    	 <div class="matchDiv" v-for="n in List" @click="toNext(n.id)">
				   		<div class="img_div">
				   			<img :src="'http://192.168.0.225'+n.imgUrl" />
				   		</div>
				   		<div class="time_div">
				   			<img :src="n.statusName | showMatch" />
				   			<span>{{n.beginTime | changeTime}}至{{n.endTime | changeTime}}</span>
				   			<span>{{n.joinNum}}</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
				    <div class="h_98"></div>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="3">
			    	 <div class="matchDiv" v-for="n in List" @click="toNext(n.id)">
				   		<div class="img_div">
				   			<img :src="'http://192.168.0.225'+n.imgUrl" />
				   		</div>
				   		<div class="time_div">
				   			<img :src="n.statusName | showMatch" />
				   			<span>{{n.beginTime | changeTime}}至{{n.endTime | changeTime}}</span>
				   			<span>{{n.joinNum}}</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
				    <div class="h_98"></div>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="4">
			    	 <div class="matchDiv" v-for="n in List" @click="toNext(n.id)">
				   		<div class="img_div">
				   			<img :src="'http://192.168.0.225'+n.imgUrl" />
				   		</div>
				   		<div class="time_div">
				   			<img :src="n.statusName | showMatch" />
				   			<span>{{n.beginTime | changeTime}}至{{n.endTime | changeTime}}</span>
				   			<span>{{n.joinNum}}</span>
				   			<span>参赛人数：</span>
				   		</div>
				   </div>
				    <div class="h_98"></div>
			    </mt-tab-container-item>
			</mt-tab-container>
			<div id="listNone" v-show="List == null">暂无比赛哟~</div>
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
	const local = pro.local;
	export default{
		name: 'match',
		components:{ topTitle ,bottomTab},
		data(){
			return{
				selected:"1",
				tabSelected: 'match',
				List:"",
				headers : '',
//				PATH:""
			}
			
		},
		computed:{
			PATH: function(){
				return this.$store.getters.PATH;
			},
		},
		methods:{
			toNext:function(id){
				this.$router.push({path:"/topNars",query:{matchId:id}});
			},
			getMatchList:function(n,headers){
				var data = {
					status:n,
					pageNo:'',
					pageSize:''
				}
				pro.fetch("post","/tradeCompetition/list",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						this.List = res.data.list;
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
			}
		},
		mounted:function(){
		},
		activated:function(){ 
			this.selected = "1";
			this.getHeaders();
			this.getMatchList(0,this.headers);
		},
		watch:{
			selected:function(n){
				switch (n){
					case '1':
						this.getMatchList(0,this.headers);	
						break;
					case '2':
						this.getMatchList(2,this.headers);	
						break;
					case '3':
						this.getMatchList(4,this.headers);	
						break;
					case '4':
						this.getMatchList(5,this.headers);	
						break;
				}
			},
		},	
		filters:{
			showMatch:function(e){
				switch (e){
					case 1:
						return require("../assets/images/match/match_waitapply.png");
					case 2:
						return require("../assets/images/match/match_applying.png");
					case 3:
						return require("../assets/images/match/match_waitplay.png");
					case 4:
						return require("../assets/images/match/match_playready.png");
					case 5:
						return require("../assets/images/match/match_end.png");
				}
			},
			changeTime:function(e){
				return pro.getDate(new Date(e.replace(/-/g, "/")),'y-m-d');
			}
		}
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
	#listNone{
		width: 100%;
		text-align: center;
		margin-top: 50%;
		font-size: 0.32rem;
		color: $grayDeep;
	}

</style>