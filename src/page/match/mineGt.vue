<template>
	<div id="mineGt">
		<topTitle title="我的跟投" type="0" type1="2"></topTitle>
		<div id="container">
			<div  class="details" v-show="myFollower != ''">
				<p class="border_bottom">我当前跟投的：</p>
				<ul  class="border_bottom" @click="toDetails(myFollower.UserNo)">
					<li>
						<img :src="myFollower.wxHeadImg | changeImg" alt="" class="user"/>
						<span class="span_black">{{myFollower.wxNickname != '' ? myFollower.wxNickname : mobileHidden(myFollower.telphone)}}</span>
					</li>
					<li>
						<span class="span_simp">{{myFollower.FollowTime}}</span>
						<span class="color_red">{{myFollower.direction}}</span>
					</li>
				</ul>
			</div>
			<div class="h_20"></div>
			<div class="tip">
				<p class="border_bottom">我的跟投者：</p>
				<ul>
					<li>
						<span class="span_gray">提取收益率：</span>
						<span class="span_black">{{divide ? divide : '0'}}%</span>
					</li>
					<li>
						<span class="span_gray">跟投人数:</span>
						<span class="span_black">{{followCount}}</span>
					</li>
				</ul>
			</div>
			<div class="h_20"></div>
			<div class="details">
				<ul class="border_bottom" v-for="n in followList">
					<li>
						<img :src="n.wxHeadImg | changeImg" class="user"/>
						<span class="span_gray">{{n.wxNickname || mobileHidden(n.telphone)}}</span>
					</li>
					<li>
						<span class="span_simp">{{n.FollowTime}}</span>
						<span class="color_red">{{n.direction}}</span>
					</li>
				</ul>
			</div>
			<div class="listNone" v-show="followList == undefined">
				{{this.followCount == 'undefined' ? '比赛未报名' : '暂无跟投者'}}
			</div>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	import pro from "../../assets/js/common.js"
	const local = pro.local;
	export default{
		name:"mineGt",
		components:{ topTitle },
		data(){
			return{
				matchid :'',
				divide:"",//收益率
				followCount:"",//跟投人数
				followList:[],//跟投列表
				myFollower:{}
			}
		},
		methods:{
			toDetails:function(user){
				this.$router.push({path:"/matchUserDetails",query:{userId:user,type:"other",matchid:this.matchid}});
			},
			mobileHidden (phoneNumber) {
		        return pro.mobileHidden(phoneNumber);
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
			getMintGt:function(id){
				var data = {
					id:id,
					pageNo:0,
					pageSize:10
				}
				var headers = this.headers
				pro.fetch("post","/followInvest/myFollowers",data,headers).then((res)=>{
					if(res.success == true){
						this.divide = res.data.divide;
						this.followList = res.data.follower;
						this.followCount = res.data.followCount != undefined ? res.data.followCount : '0';
						this.myFollower = res.data.myFollower == undefined ? '': res.data.myFollower;
						console.log(this.myFollower.wxNickname);
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
		},
		activated:function(){
			this.getHeaders();
			this.matchid = this.$route.query.matchId;
			this.getMintGt(this.matchid);
		},
		filters:{
			changeImg:function(e){
				return e != '' ? e : require("../../assets/images/account/WXlogin.png");
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#mineGt{
		width: $w;
		background-color: $bg;
	}
	#container{
		margin-top: 0.96rem;
		width: 100%;
		.tip{
			ul{
				font-size: $fs28;
				padding: 0 0.3rem;
				height: 0.88rem;	
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.span_gray{
			color: $grayDeep;
		}
		.span_black{
			color: $blcakThin;
		}
		.span_simp{
			color: $graySimple;
		}
		.color_red{
			color: $redDeep;
			margin-left: 0.4rem;
		}
		.details{
			ul{
				font-size: $fs28;
				padding: 0 0.3rem;
				width: 100%;
				height: 0.88rem;
				display: flex;
				justify-content: space-between;
				li{
					display: inline-flex;
					align-items: center;
				}
			}
		}
		.user{
			width: 0.44rem;
			height: 0.44rem;
			display: inline-block;
			margin-right: 0.2rem;
		}
		.listNone{
			width: 100%;
			text-align: center;
			font-size: 0.28rem;
			color: $grayDeep;
			margin-top: 50%;
		}
		p{
			height: 0.88rem;
			font-size: 0.32rem;
			text-align: left;
			text-indent: 0.3rem;
			line-height: 0.88rem;
			color: $blcakThin;
			font-weight: bold;
		}
	}
</style>