<template>
    <div id="help_docs" :style="{height:clientHeight}">
        <mt-header fixed title="帮助文档">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <!-- 列表 -->
        <div class="list_wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">自选相关</mt-tab-item>
                <mt-tab-item id="2">交易相关</mt-tab-item>
                <mt-tab-item id="3">兑换相关</mt-tab-item>
                <mt-tab-item id="4">提醒相关</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <ul class="list">
                        <li class="list_item" v-for="item in selfList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
    
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <ul class="list">
                         <li class="list_item" v-for="item in tradeList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <ul class="list">
                         <li class="list_item" v-for="item in exchangeList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <ul class="list">
                         <li class="list_item" v-for="item in remindList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
    const self_about = [{
            question: '如何成为指数天下会员？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '美股的收费标准？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '如何外汇入金？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        }
    ]
    const trade_about = [{
            question: '如何成为指数天下会员trade_about？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '美股的收费标准trade_about？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '如何外汇入金trade_about？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        }
    ]
    const exchange_about = [{
            question: '如何成为指数天下会员？exchange_about',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '美股的收费标准？exchange_about',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '如何外汇入金？exchange_about',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        }
    ]
    const remind_about = [{
            question: '如何成为指数天下会员？remind_about',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。',
            isShow: false
        },
        {
            question: '美股的收费标准？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。remind_about',
            isShow: false
        },
        {
            question: '如何外汇入金？',
            answer: '注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘、策略跟单等服务。remind_about',
            isShow: false
        }
    ]
    export default {
        name: "help_docs",
    
        data() {
            return {
                hasList: true,
                selected: '1',
                selfList: self_about,
                tradeList: trade_about,
                remindList: remind_about,
                exchangeList: exchange_about
    
            };
        },
    
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + "px";
            }
        },
    
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
    
            goto(path) {
                this.$router.push({
                    path: path
                });
            },
            changeShow(item) {
                item.isShow = !item.isShow
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #help_docs {
        width: 7.5rem;
        background-color: $bgGray;
    }
    
    .list_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        background-color: $bg;
        .list_item {
            width: 7.5rem;
            @include font($fs28, 0.88rem, $grayMiddle, left);
            h3,
            p {
                padding: 0 0.3rem;
                border-bottom: 1px solid #e6e6e6;
            }
            p {
                display: none;
                color: $blcakThin;
                line-height: 0.36rem;
                padding: 0.2rem 0.3rem;
            }
            .show {
                display: block;
            }
            h3 {
                position: relative;
                .triangle_down,
                .triangle_top {
                    position: absolute;
                    right: 0.3rem;
                    bottom: 0.1rem;
                    content: '';
                    width: 0;
                    height: 0;
                    border: 0.1rem solid transparent;
                    border-right-color: #c2c2cc;
                }
                .triangle_down {
                    border-bottom-color: #c2c2cc;
                }
                .triangle_top {
                    border-top-color: #c2c2cc;
                }
            }
        }
    }
    
    #help_docs .is-selected {
        margin: 0;
        border-bottom: 0.03rem solid #e64552;
        color: #e64552;
    }
    
    #help_docs .mint-navbar {
        border-bottom: 1px solid #e6e6e6;
        padding: 0 0.3rem;
    }
</style>