<template>
    <div id="home" :style="{height:clientHeight}">
        <mt-header fixed title="个人设置">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
    
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li @click="WXregister">
                <!-- <li @click="accountInfo.wxHeadimgurl?'':WXregister"> -->
                    <div>昵称</div>
                    <div class="item_right_box">                        
                        <img class="img" :src="accountInfo.wxHeadimgurl||require('../../../assets/images/account/WXlogin.png')" alt="">
                        <span class="gray_text">{{accountInfo.wxNickname||'绑定微信'}}</span>                       
                        <span class="right_icon"></span>
                   </div>
                </li>  
                 <li @click="goto('/account_details')">
                   <div>平台交易账号</div>
                   <div class="item_right_box">
                        <span class="right_icon"></span>
                   </div>
                </li>
                <li @click="goto('/reset_password')">
                   <div>修改登录密码</div>
                   <div class="item_right_box">
                        <span class="gray_text">修改</span>
                        <span class="right_icon"></span>
                   </div>
                </li>
                <li @click="goto('/reset_phone')">
                   <div>修改手机号</div>
                   <div class="item_right_box">
                        <span class="gray_text">修改</span>
                        <span class="right_icon"></span>
                   </div>
                </li>
                <li>
                   <div>版本号</div>
                   <div class="item_right_box">
                        <span class="gray_text red">V1.0.0</span>
                   </div>
                </li> 
            </ul>            
        </div>
        <!-- login_out -->
        <div class="btn_wrap">
            <button class="btn">退出登录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'self_setting',
        data() {
            return {
                hasList: true,
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
            accountInfo() {
                return this.$store.state.accountInfo;
            },
            weixinLoginInfo:function(){
				return this.$store._modules.root.state.account.weixinLoginInfo
			},
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
            WXregister () {
                console.log(123)
                this.$pro.toweixin();
            },

        },
        watch: {
            weixinLoginInfo (o,n) {
                if(o == true){
                    var weixinInfo = localStorage.weixinUser ? JSON.parse(localStorage.weixinUser) : "" ;
                    this.$router.push({path:"/WXregister",query:{weixinInfo:weixinInfo}});
                    this.$store._modules.root.state.account.weixinLoginInfo = false;
                }           
            }
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
    #home {
        width: 7.5rem;
        background-color: $bgGray;
    }
    
    .list_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        background-color: $bg;
        li {
            @include flex(space-between);
            width: 7.5rem;
            padding: 0 0.3rem;
            @include font($fs28, 0.88rem, $blcakThin);
            border-bottom: 1px solid #e6e6e6;
            span {
                vertical-align: middle;
            }
        }
        .item_right_box {
            font-size: 0
        }
        .gray_text {
            @include font($fs24, 0.88rem, $grayDeep);
            padding: 0 0.16rem 0 0.1rem;
        }
        .img {
            display: inline-block;
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 50%; 
        }
        .right_icon {
            display: inline-block;
            width: 0.14rem;
            height: 0.22rem;
            background: url("../../../assets/images/account/right_jiantou.png") center no-repeat;
            background-size: cover;
        }
        .red {
            color: $redDeep;
        }
    }
    
    .btn_wrap {
        width: 7.5rem;
        padding: 0.6rem 0 0 0;
        text-align: center;
        background-color: $bgGray;
        .btn {
            width: 7rem;
            @include font($fs36,
            0.88rem,
            $bg);
            background-color: $redDeep;
            border-radius: 0.44rem;
        }
    }
</style>