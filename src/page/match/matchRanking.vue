<template>
	<div id="matchRanking">
		<div class="myRank">
			<ul>
				<li>我的排名：<span>{{this.user.byProfitRate}}&nbsp;{{this.user.byFollowCount}}</span></li>
				<li>
					<span @click="profitRateFollow('profitrate')" :class="{current : current == 0}">总收益</span>
					<i  :class="profitrateUp ? 'change' : 'change_2'" class="change_1" @click="changeSort('profitrateUp')"></i>
					<span @click="profitRateFollow('follow')" :class="{current : current == 1}">跟投人数</span>
					<i :class="followUp ? 'change':'change_2'" @click="changeSort('followUp')"></i>
				</li>
			</ul>
		</div>
		<ul class="ranking border_bottom" @click="toMatchUser(user.userNo,'mine')" v-show="user">
			<li class="li_no">
				<img :src="this.user.wxHeadImg | changwxhead" alt="" class="rang_no1" />
				<span class="username">{{this.user.wxNickname ||  (mobileHidden(this.user.telphone))}}</span>
			</li>
			<li><span class="perecnt">{{user.profitRate | changpoint}}</span><span class="count">{{user.followCount}}</span></li>
		</ul>
		<ul class="ranking border_bottom" v-for="(n,k) in rankingList" @click="toMatchUser(n.userNo,(n.userNo == user.userNo ? 'mine' : 'other'))">
			<li class="li_no">
				<img :src="k | changNo" alt="" class="rang_no" />
				<span class="span_no">{{k+1}}</span>
				<img :src="n.wxHeadImg  | changwxhead" alt="" class="user"/>
				<span class="username">{{n.wxNickname ? n.wxNickname : (mobileHidden(n.telphone))}}</span>
			</li>
			<li><span class="perecnt">{{n.profitRate | changpoint}}</span><span class="count">{{n.followCount}}</span></li>
		</ul>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	import { Indicator } from 'mint-ui';
	const local = pro.local;
	export default{
		name:"matchRanking",
		props:['matchid'],
		data(){
			return{
				user:[],//用户信息
				followedUser:[],//被跟投信息
				rankingList:[],//排行信息
				headers:"",
				//收益跟投
				sidx:"",
				//排序
				sort:'',
				profitrateUp:true,
				followUp:true,
				current:0
				
			}
		},
		methods:{
			changeSort:function(type){
				this[type] = !this[type];
				this.sort = this[type] ? '0' : '1';
				this.current = type == 'profitrateUp' ? 0 : 1;
				this.sidx = type == 'profitrateUp' ? 0 : 1;
				this.getRanking(this.matchid,this.sidx,this.sort);
			},
			profitRateFollow:function(type){
				this.sidx = type == 'profitrate' ? 0 : 1 ;
				this.sort = 0;
				this.current = type == 'profitrate' ? 0 : 1;
				this.profitrateUp = true;
				this.followUp = true;
				this.getRanking(this.matchid,this.sidx,this.sort);
			},
			mobileHidden (phoneNumber) {
		        return pro.mobileHidden(phoneNumber);
		    },
			toMatchUser:function(e,type){
				this.$router.push({path:"/matchUserDetails",query:{userId:e,type:type,matchid:this.matchid}});
			},
			getRanking:function(id,sidx,sort){
				Indicator.open({spinnerType: 'fading-circle'});
				var data = { 
					id:id,
					sidx:sidx,
					sort:sort,
					pageNo:0,
					pageSize:10
				};
				var headers = this.headers;
				pro.fetch("post","/tradeCompetition/ranking",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						this.user = res.data.user;
						this.followedUser = res.data.followedUser;
						this.rankingList = res.data.rankingList;
						Indicator.close();
					}
				}).catch((err)=>{
					Indicator.close();
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
			this.profitrateUp = true;
			this.sort = 0;
			this.sidx = 0;
			this.getHeaders();
			this.getRanking(this.matchid,this.sidx,this.sort);
		},
		filters:{
			changNo:function(e){
				switch (e){
					case 0:
						return require("../../assets/images/match/no1.png");
					case 1:
						return require("../../assets/images/match/no2.png");
					case 2:
						return require("../../assets/images/match/no3.png");
					default:
						return require("../../assets/images/match/no_a.png");
				}
			},
			changpoint:function(e){
				var str=Number(e*100).toFixed(2);
			    str+="%";
			    return str;
			},
			changwxhead:function(e){
				return e != "" ? e : require("../../assets/images/account/WXlogin.png");
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchRanking{
		width: $w;
	}
	.myRank{
		width: $w;
		background-color: $bgDeep;
		padding: 0 0.3rem;
		font-size: $fs24;
		ul{
			height: 0.64rem;
			display: flex;
			justify-content: space-between;
			li{
				display: inline-flex;
				align-items: center;
			}
		}
	}
	.change{
		display: inline-block;
		width: 0.18rem;
		height: 0.24rem;
		background: url(../../assets/images/match/match_rankUp.png) no-repeat;
		background-size: 0.18rem 0.24rem;
		margin-left: 0.1rem;
	}
	.change_1{
		margin-right: 0.4rem;
	}
	.change_2{
		display: inline-block;
		width: 0.18rem;
		height: 0.24rem;
		background: url(../../assets/images/match/match_rankDown.png) no-repeat;
		background-size: 0.18rem 0.24rem;
		margin-left: 0.1rem;
	}
	.ranking{
		width: $w;
		padding: 0 0.3rem;
		font-size: $fs28;
		height: 1.28rem;
		display: flex;
		justify-content: space-between;
		li{
			display: inline-flex;
			align-items:center;
		}
	}
	.rang_no{
		display: inline-block;
		width: 0.44rem;
		height: 0.44rem;
	}
	.rang_no1{
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.2rem;
	}
	.li_no{
		position: relative;
	}
	.span_no{
		position: absolute;
		top: 0.52rem;
		left: 0.16rem;
		font-size: $fs24;
		font-weight: bold;
		color: $bg;
	}
	.user{
		width: 0.8rem;
		height: 0.8rem;
		display: inline-block;
		border-radius: 50%;
		margin: 0 0.2rem;
	}
	.username{
		color: $grayDeep;
	}
	.perecnt{
		margin-right: 1.32rem;
		color: $redDeep;
	}
	.current{
		color:$redDeep;
	}
</style>