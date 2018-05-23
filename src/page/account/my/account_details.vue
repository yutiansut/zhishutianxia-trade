<template>
    <div id="account_details" :style="{height:clientHeight}">
        <mt-header fixed title="平台交易账号">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li class="item title_item">
                    <div class="left">
                        <img :src="accountInfo.wxHeadimgurl||require('../../../assets/images/account/WXlogin.png')" alt="header">
                    </div>
                    <div class="right">
                        <h3>{{accountInfo.wxNickname||mobileHidden(accountInfo.mobile)}}</h3>
                    </div>
                </li>
                <li class="item">
                    <p>初始资金: &nbsp<span class="money">{{buwei(accountInfo.balance)||"0.00"}}</span>&nbsp元</p>
                    <p>亏损平仓线: &nbsp<span class="money">{{buwei(allMoney)||"0.00"}}</span>&nbsp元</p>
                </li>
                <li class="item">
                    <p>交易账号: &nbsp<span class="money">{{account.account}}</span></p>
                    <p>交易密码: &nbsp<span class="money">{{account.pwd}}</span></p>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
    export default {
        name: 'account_details',
        props: ['id', 'title'],
        data() {
            return {
                isBegin: true,
                details: {},
                account: {},
                
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
            accountInfo () {
                return this.$store.state.accountInfo
            },
             allMoney () {
                if(this.accountInfo.balance &&this.accountInfo.freeze) {
                    return (this.accountInfo.balance*1 + this.accountInfo.freeze*1).toString();
            }
    },

        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            mobileHidden (phoneNumber) {
                return pro.mobileHidden(phoneNumber)              
            }, 
            buwei (numString) {     
                if(numString === undefined||null) {
                    return  numString
                }else if(numString.indexOf('.')>-1){
                    return  numString
                }else{  
                    //console.log(typeof numString)
                    return  numString + '.00'
                }
            },
            getDetails() {
                const headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                this.$pro.fetch('post', '/futureManage/getAccounts', '', headers).then(function(res) {
                    //console.log(res)
                    if (res.success && res.code == 1) {
                        //console.log(res)
                        const abc = res.data.find((item)=>{
                            //console.log(123)
                            return item.account == this.accountInfo.mobile
                            
                        })
                        this.account = abc||{}
                    }
    
                }.bind(this)).catch(function(err) {
                    console.log(err)
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
                        this.$toast({
                            message: data.message,
                            duration: 2000
                        });
                    }
                }.bind(this))
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
        },
        activated() {
            this.getDetails()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #account_details {
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
        }
        .money {
            color: $blcakThin;
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
            }
            .left {
                margin-right: 0.2rem
            }
            img {
                width: 0.44rem;
                height: 0.44rem;
            }
        }
    }
    
    .btn_wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 7.5rem;
        height: 0.98rem;
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
    
</style>