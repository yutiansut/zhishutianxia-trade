<template>
    <div id="match_details_history">
        <mt-header fixed :title="title">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
    
        <!-- 列表 -->
        <div class="list_wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">比赛账号</mt-tab-item>
                <mt-tab-item id="2">交易记录</mt-tab-item>
            </mt-navbar>
    
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <!-- 详情 -->
                    <ul class="list">
                        <li class="item title_item">
                            <div class="left">
                                <img :src="details.wxHeadImg||require('../../../assets/images/account/touxiang.png')" alt="header">
                                <h3>{{details.wxNickname||account.mobile}}</h3>
                            </div>
                            <div class="right">
                                <p>跟投人数排名：<span class="orange">{{details.byFollowCount}}</span></p>
                                <p>总收益排名：<span class="orange">{{details.byProfitRate}}</span></p>
                            </div>
                        </li>
                        <li class="item">
                            <p>结算金额:&nbsp<span class="money">{{account.clearMoney}}</span>&nbsp元</p>
                            <p>交易盈亏:&nbsp<span class="money">{{account.tradeProfitAndLoss}}</span>&nbsp元</p>
                            <p>跟投提取收益:&nbsp<span class="money">{{details.followProfit}}</span>&nbsp元 <span class="btn" @click="goFollow(account.account,'0',account.id)">查看详情</span></p>
                            <p>跟投扣除收益:&nbsp<span class="money">{{details.followDeduct}}</span>&nbsp元 <span class="btn" @click="goFollow(account.account,'1',account.id)">查看详情</span></p>
                            <p>交易手续费:&nbsp<span class="money">{{account.tradeFee}}</span>&nbsp元</p>
                            <p class="note"><span class="red">提醒</span>：结算金额=初始资金+交易盈亏+跟投提取收益-交易手续费-跟投扣除收益</p>
                        </li>
                        <li class="item">
                            <p>初始资金:&nbsp<span class="money">{{account.totalTradeFund}}</span>&nbsp元</p>
                            <p>亏损平仓线:&nbsp<span class="money">{{account.lossCloseOutLine}}</span>&nbsp元</p>
                            <p>交易账号：&nbsp<span class="money">{{account.account}}</span></p>
                            <p>交易密码:&nbsp<span class="money">{{account.accountPassword}}</span></p>
                            <p> 美元结算汇率:&nbsp<span class="money">1美元={{account.rate}}人民币 </span></p>
                            <p>活动时间：&nbsp<span class="money">{{details.beginTime|dateChange('y-m-d')}} 至 {{details.endTime|dateChange('y-m-d')}}</span></p>
                            <p>报名时间:&nbsp<span class="money">{{account.applyTime}}</span></p>
                        </li>
                        <li class="item trade_number">
                            <h4>交易手数</h4>
                            <p v-for="(value, key) in tradeNum" :key="key"><span>{{key}}</span><span class="money">{{value}}</span></p>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <!-- 历史记录 -->
                    <ul class="history_list">
                        <li class="history_item_title">
                            <span>序号</span>
                            <div class="time">成交时间</div>
                            <div class="name">合约名称</div>
                            <span class="small">买/卖</span>    
                            <span>成交量</span>                     
                            <span>成交价</span>
                            <span>平仓盈亏</span>
                            <span>交易手续费</span>
                            <span>币种</span>
                            <span>交易所</span>
                        </li>
                        <template v-if="hasHistoryList">
                             <li class="history_item" v-for="(item, index) in historyList" :key="item.id">
                                <span>{{ (index + 1).toString().padStart(2,0) }}</span>
                                <div class="time">
                                    <p class="time_day">{{item.tradeDatetime|dateChange('y-m-d')}}</p>
                                    <p class="time_date">{{item.tradeDatetime|dateChange('y-m-d')}}</p>
                                </div>
                                <div class="name">
                                    <p class="time_day">{{tradeName[item.commodityNo]}}</p>
                                    <p class="time_date">{{item.commodityNo + item.contractNo}}</p>
                                </div>
                                <span class="small">{{item.direction?'卖':'买'}}</span>
                                <span>{{item.tradeNum}}</span>
                                <span>{{item.tradePrice}}</span>
                                <span>{{item.hedgeProfit}}</span>
                                <span>{{item.tradeFee}}</span>
                                <span>{{item.currencyNo}}</span>
                                <span>{{item.exchangeNo}}</span>
                            </li>      
                        </template>
                        <li class="no_list" v-else>
                            <p>无相关比赛记录</p>
                        </li>
                    </ul>
                    
                </mt-tab-container-item>
            </mt-tab-container>
    
        </div>
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
    export default  {
        name: 'match_details_history',
        props: ['id', 'title'],
        data() {
            return {
                isBegin: true,
                selected: '1',
                userInfo: {},
                details: {},
                account: {},
                tradeNum: {},
                historyList: [],
                hasHistoryList: false
    
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
            tradeName () {
                return this.$store.state.tradeName
            },
            test1 () {
                console.log(333)
            }
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            goFollow(account, type ,id) {
                this.$router.push({
                    path: `/follow_get_history/${account}/type/${type}/id/${id}`,
                });
            },
            getDetails() {
                var sendData = {
                    id: this.id
                }
                const headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                this.$pro.fetch('post', '/tradeCompetition/competitionDetails', sendData, headers).then(function(res) {
                    console.log(res)
                    if (res.success && res.code == 1) {
                        this.details = res.data;
                        this.account = res.data.program;
                        this.tradeNum = res.data.tradeNum;
                    }
    
                }.bind(this)).catch(function(err) {
                    //console.log(err)
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后重试",
                            duration: 2000
                        });
                    } else if(data.code == '-100') {
                        this.$toast({
                            message: `服务器异常 ${data.code}`,
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
            },
            getHistory() {
                var sendData = {
                    id: this.id
                    //id: '92bfec94ab03433ba18020a4bfb0b50a'
                }
                const headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                this.$pro.fetch('post', '/futureManage/getHistoryTrade', sendData, headers).then(function(res) {
                    console.log(res)
                    if (res.success && res.code == 1) {
                        this.historyList = res.data
                    }
    
                }.bind(this)).catch(function(err) {
                    //console.log(err)
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后重试",
                            duration: 2000
                        });
                    } else {
                        this.$toast({
                            message: data.message,
                            duration: 2000
                        });
                    }
                }.bind(this))
            }
    
        },
        watch: {
            selected (value) {
                 if(value == 2) {
                    if(this.historyList.length) return; 
                    this.getHistory()
                }
            }
           
        },
        filters: {
            dateChange (time, d) {
               return pro.getDate(time, d)
            }
        },
        created() {
            const local = this.$pro.local
            this.userInfo = local.get('user')
            this.getDetails()
        },
        // activated() {
            
        // }
    
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #match_details_history {
        width: 7.5rem;
        background-color: $bgGray;
    }
    
    .list_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        background-color: $bgGray;
        .item {
            width: 7.5rem;
            margin-bottom: 0.16rem;
            background-color: $bg;
            p {
                padding: 0 0.3rem;
                @include font($fs28, 0.88rem, $graySimple, left);
                border-bottom: 1px solid $bgDeep;
            }
            .btn {
                float: right;
                padding: 0 0.18rem;
                margin-top: 0.2rem;
                @include font($fs24, 0.48rem, $bg);
                background-color: $redDeep;
                border-radius: 0.23rem;
            }
            .note {
                padding: 0.2rem 0.3rem;
                line-height: 0.48rem;
            }
        }
        .money {
            color: $blcakThin;
        }
        .red {
            color: $redDeep
        }
        .trade_number {
            h4 {
                padding: 0 0.3rem;
                @include font($fs28, 0.88rem, $graySimple, left);
                background-color: #f2f2f2;
            }
            p {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        .title_item {
            padding: 0.22rem 0.3rem;
            font-size: 0;
            border-bottom: 1px solid $bgDeep;
            .left,
            .right {
                display: inline-block;
                vertical-align: middle;
                @include font($fs28, 0.46rem, $graySimple, left);
                font-size: 0;
            }
            .left {
                margin-right: 2.25rem;
            }
            img {
                width: 0.44rem;
                margin-right: 0.2rem;
                vertical-align: middle;
            }
            h3 {
                display: inline-block;
                font-size: $fs28;
                vertical-align: middle;
            }
            .right {
                p {
                    @include font($fs28, 0.36rem, $graySimple, right);
                    padding: 0;
                    border: 0;
                }
            }
            .orange {
                color: $orange
            }
        }
    }
    
    .btn_wrap {
        position: absolute;
        bottom: 0;
        width: 7.5rem;
        font-size: 0;
        button {
            width: 50%;
            @include font($fs36, 0.98rem, $bg);
        }
        .black {
            background-color: $headColr;
        }
        .trade {
            background-color: $redDeep
        }
        .disabled {
            background-color: $grayBtn
        }
    }
    
    #match_details_history .is-selected {
        margin: 0;
        border-bottom: 0.03rem solid #e64552;
        color: #e64552;
    }
    
    .history_list {
        width: 7.5rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }
    
    .history_item,
    .history_item_title {
        width: 200%;
        @include flex(space-around);
        @include font($fs28, 0.64rem, $graySimple);
        .name {
            width: 1.5rem;
            text-align: right;
            padding: 0.15rem 0;
        }
        .time {
            width: 1.6rem;
            text-align: right;
        }
        span {
            width: 1.4rem;
        }
        .small {
            width: 0.7rem;
        }
        .time_day {
            @include font($fs28, 0.32rem, $blcakThin, right);
        }
        .time_date {
            @include font($fs24, 0.32rem, $graySimple, right);
        }
    }
     .no_list {
        text-align: center;
        p {
            @include font($fs28, 0.28rem, $graySimple);
            padding-bottom: 0.58rem;
        }
    }
    .history_item {
        background-color: $bg
    }
</style>