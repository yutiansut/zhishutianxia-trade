<template>
    <div id="my_match">
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
                            <div class="matchDiv" v-for="match in matchingList" :key="match.id" @click="goto(match.id,match.title)">
                                <div class="img_div">
                                    <img :src="imgPath+match.imgUrl" :alt="match.title"/>
                                </div>
                                <div class="time_div">
                                    <img :src="statusName[match.statusName - 1]" />
                                    <span>{{match.beginTime.split(' ')[0]}}至{{match.endTime.split(' ')[0]}}</span>
                                    <span>{{match.joinNum}}</span>
                                    <span>参赛人数：</span>
                                </div>
                            </div>
                    </template>
                    <div class="no_list" v-else @click="goto('/match')">
                        <p>啊哦，你暂未参加任何模拟比赛</p>
                        <button>立即报名</button>
                    </div>
				</mt-tab-container-item>
			    <mt-tab-container-item id="2">
                    <template v-if="hasHistoryList">
                        <div class="matchDiv" v-for="match in matchHistoryList" :key="match.id" @click="gotoOld(match.id,match.title)">
                            <div class="img_div">
                                <img :src="imgPath+match.imgUrl" :alt="match.title" />
                            </div>
                            <div class="time_div">
                                <img :src="statusName[match.statusName - 1]" />
                                <span>{{match.beginTime.split(' ')[0]}}至{{match.endTime.split(' ')[0]}}</span>
                                <span>{{match.joinNum}}</span>
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
    import topTitle from "../../../components/topTitle"
    
    export default {
        name: 'match',
        components: {
            topTitle
        },
        data() {
            return {
                selected: "1",
                tabSelected: 'match',
                hasList: false,
                hasHistoryList: false,
                userInfo: {},
                matchingList: [],
                matchHistoryList: [],
                statusName: ['等待报名', require('../../../assets/images/match/match_waitplay.png'), require('../../../assets/images/match/match_waitplay.png'), require('../../../assets/images/match/match_playready.png'), require('../../../assets/images/match/match_end.png')]
            }
    
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + "px";
            },
            imgPath () {
                return this.$store.getters.IMGPATH
                
            },

        },
        methods: {
            goto(...rest) {
                // console.log(rest[0])
                // console.log(rest[1])
                if (rest.length == 1) {
                    this.$router.push({
                        path: rest[0],
                    });
                }else if(rest.length == 2){
                    this.$router.push({
                        path: `match_details/${rest[0]}/title/${rest[1]}`,
                    });
                }
                
            },
            gotoOld(id,title) {
                this.$router.push({
                   path: `match_details_history/${id}/title/${title}`,
                });
            },
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            getMatchList(status, listName) {
                let isShow = listName == 'matchingList' ? 'hasList' : 'hasHistoryList'
                const sendData = {
                    status: status,
                    pageNo: 1,
                    pageSize: 20
                }
                const headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                this.$pro.fetch('post', '/tradeCompetition/historyRecords', sendData, headers).then(function(res) {
                    //console.log(res)
                    if (res.success && res.code == 1) {
                        this[listName] = res.data.list
                        this[isShow] = res.data.list?res.data.list.length:res.data.list
                    }
    
                }.bind(this)).catch(function(err) {
                    console.log(err)
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后重试",
                            duration: 2000
                        });
                    }else if(data.code == '-100') {
                        this.$toast({
                            message: `服务器异常 ${err.code}`,
                            duration: 2000
                        });
                    }else {
                        console
                        this.$toast({
                            message: data.message,
                            duration: 2000
                        });
                    }
                    
                }.bind(this))
            }
        },
        watch: {
            selected: function(n, old) {
                // console.log(n);
                // console.log("----" + old)
            },
        },
        // created() {
        //     const local = this.$pro.local
        //     this.userInfo = local.get('user')
        //     this.getMatchList(4, 'matchingList')
        //     this.getMatchList(5, 'matchHistoryList')
        // },
        activated () {
            const local = this.$pro.local
            this.userInfo = local.get('user')
            this.getMatchList(4, 'matchingList')
            this.getMatchList(5, 'matchHistoryList')
        },  
       beforeRouteEnter: (to, from, next) => {            
            next(vm => {
                const local = vm.$pro.local
                vm.userInfo = local.get('user')
                if (!vm.userInfo) {
                    vm.$router.replace('/login')
                }
                
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #my_match {
        width: $w;
    }
    
    #container {
        margin-top: 0.96rem;
        width: 100%;
        .mint-navbar .mint-tab-item.is-selected {
            margin: 0;
            border-bottom: 0.03rem solid $redDeep;
            color: $redDeep;
        }
        .mint-navbar .mint-tab-item {
            padding: 0.27rem;
        }
        .mint-navbar {
            border-bottom: 0.01rem solid $bgDeep;
            padding: 0 0.3rem;
        }
        .mint-tab-container {
            padding: 0 0.3rem;
        }
        .matchDiv {
            width: 6.9rem;
            height: 3.2rem;
            background-color: $bg;
            margin-top: 0.3rem;
            box-shadow: 0rem 0.03rem 0rem 0.03rem $bgDeep;
            border-radius: 0.1rem;
            background-size: 100% 100%;
        }
        .img_div {
            img {
                width: 6.9rem;
                height: 2.4rem;
                background-size: 100% 100%;
            }
        }
        .time_div {
            width: 100%;
            height: 0.8rem;
            line-height: 0.8rem;
            img {
                width: 0.76rem;
                height: 0.32rem;
                margin-left: 0.1rem;
            }
            span {
                font-size: $fs24;
                &:nth-child(2) {
                    color: $blcakThin;
                }
                &:nth-child(3) {
                    float: right;
                    color: $grayDeep;
                    margin-right: 0.1rem;
                }
                &:nth-child(4) {
                    float: right;
                    color: #ff6a00;
                }
            }
        }
    }
    
    .no_list {
        margin: 3.2rem 0 0 0;
        text-align: center;
        p {
            @include font($fs28, 0.28rem, $graySimple);
            padding-bottom: 0.58rem;
        }
        button {
            width: 4rem;
            @include font($fs36, 0.88rem, $bg);
            background-color: $redDeep;
            border-radius: 0.44rem;
        }
    }
    #my_match .mint-tab-container-item{
        padding-bottom: 0.1rem
    }
</style>