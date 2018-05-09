<template>
	<div id="my_match" >
		<mt-header fixed title="我的比赛">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
		<div id="container">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">正在参加的比赛</mt-tab-item>
			  <mt-tab-item id="2">历史参加的比赛</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
                    <template v-if="hasList">
                        <div class="matchDiv" v-for="n in 4" @click="goto('test')">
                            <div class="img_div">
                                <img src="../../../assets/images/match/match_bananer.png" />
                            </div>
                            <div class="time_div">
                                <img src="../../../assets/images/match/match_end.png" />
                                <span>01-05至02-05</span>
                                <span>10086</span>
                                <span>参赛人数：</span>
                            </div>
                        </div>
                    </template>				   
                    <div class="no_list" v-else>
                        <p>啊哦，你暂未参加任何模拟比赛</p>
                        <button>立即报名</button>
                    </div>
				</mt-tab-container-item>
			    <mt-tab-container-item id="2">
                   <template v-if="hasHistoryList">
                        <div class="matchDiv" v-for="n in 4" @click="gotoOld('oldtest')">
                            <div class="img_div">
                                <img src="../../../assets/images/match/match_bananer.png" />
                            </div>
                            <div class="time_div">
                                <img src="../../../assets/images/match/match_end.png" />
                                <span>01-05至02-05</span>
                                <span>10086</span>
                                <span>参赛人数：</span>
                            </div>
                        </div>
                    </template>				   
                    <div class="no_list" v-else>
                        <p>啊哦，你暂未参加任何模拟比赛</p>
                    </div>
			    </mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	import { Navbar, TabItem } from 'mint-ui';
	import topTitle from "../../../components/topTitle"
	
	export default{
		name: 'match',
		components:{ topTitle },
		data(){
			return{
				selected:"1",
                tabSelected: 'match',
                hasList: true,
                hasHistoryList: true
			}
			
        },
        computed: {
            clientHeight() {
            return document.documentElement.clientHeight + "px";
            }
        },
        methods: {
            goto(id) {
                this.$router.push({ path: `match_details/${id}` });
            },
            gotoOld (id) {
                this.$router.push({ path: `match_details_history/${id}` });
            },
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
			},
			getMatchList () {
				var sendData = {
					status: 4,
					pageNo: 1,
					pageSize: 10

				}
				const headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				this.$pro.fetch('post', '/tradeCompetition/historyRecords', sendData, headers).then(function(res) {
					console.log(res)
				}.bind(this)).catch(function(err) {

				}.bind(this))
			}
        },
		watch:{
			selected:function(n,old){
				console.log(n);
				console.log("----"+old)
			},
		},	
		created () {
			const local = this.$pro.local
			this.userInfo = local.get('user')
			this.getMatchList()
		}	
	}
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    
	
	#my_match{
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
   
.no_list{
    margin: 3.2rem 0 0 0;
    text-align: center;
    p{
        @include font($fs28,0.28rem ,$graySimple);
        padding-bottom: 0.58rem;
    }
    button{
        width: 4rem;
        @include font($fs36,0.88rem,$bg);
        background-color: $redDeep;
        border-radius: 0.44rem;
    }
}

</style>