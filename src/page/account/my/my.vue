<template>
    <div id="home">
        <mt-header fixed title="我的">           
            <mt-button slot="left" icon="back" @click="goLast"></mt-button>
            <!-- <mt-button slot="right" @click="goto('/information')">
                <span class="icon"></span>
            </mt-button> -->
        </mt-header>
        <div class="user_info">
            <img :src="accountInfo.wxHeadimgurl||require('../../../assets/images/account/WXuser.png')" alt="用户头像">
            <p v-if="!isLogin" @click="goto('/login')" >-点击登录-</p>
            <p class="login" @click="changeValue(true,'isShow')" v-else>{{accountInfo.wxNickname||mobileHidden(accountInfo.mobile)}}</p>
        </div>
        <div class="money_wrap">
            <div class="money_box">
                <p>可用资金</p>
                <p class="money_text"><span>{{buwei(accountInfo.balance)||"0.00"}}</span> 元</p>
            </div>
            <div class="money_box">
                <p>账户余额</p>
                <p class="money_text"><span>{{allMoney||"0.00"}}</span> 元</p>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li class="item" v-for="(item, index) in list" :key="item.path" @click="goto(item.path)">
                    <span class="icon" :class="{'news_icon':index==4&&isNew}"></span>
                    {{item.name}}
                    <span class="right_icon"></span>
                </li>
            </ul>
        </div>
        <!-- login_out -->
        <div class="btn_wrap">
            <button v-if="isLogin" @click="loginOut" class="btn">退出登录</button>
        </div>
        <switch-account 
        v-show="isShow" 
        @show-modal="changeValue($event,'isShow')"
        :userList = userList
        ></switch-account>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import switchAccount from '../../../components/switch_account'
import pro from '../../../assets/js/common'
const local = pro.local;
const idList1 = local.get('idList')||[];


export default {
  name: "my",
  components: {
    switchAccount
  },
  data() {
    return {
      isLogin: false,
      isShow: false,
      idList: idList1,
      list: [
        // {
        //   name: "自选管理",
        //   path: "/self_select"
        // },
        {
          name: "比赛记录",
          path: "/my_match"
        },
        {
          name: "个人设置",
          path: "/self_setting"
        },
        {
          name: "客服中心",
          path: "/customer_server"
        },
        {
          name: "帮助文档",
          path: "/help_docs"
        },
        {
          name: "新闻公告",
          path: "/news_info"
        }
      ],
      userInfo: {},
      lastPath: '/',
      userList: []
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    allMoney () {
      return this.accountInfo.balance*1 + this.accountInfo.freeze*1
    },
    accountInfo () {
      return this.$store.state.accountInfo;
    },
    isNew () {
        return this.$store.state.newsList.some(item => item.isRead == false)
    }
  },
  methods: {
    ...mapMutations({
      setAccountInfo: 'ACCOUNT_INFO',
      clearUserInfo: 'INFO_CLEAR',
    }),
    goLast() {
      this.$router.push(this.lastPath);
    },
    goto(path) {
      this.$router.push({ path: path });
    },
    changeValue (msg, key) {
      //console.log(msg)
      this[key] = msg
    },
    mobileHidden (phoneNumber) {
        return pro.mobileHidden(phoneNumber)
    },
    buwei (numString) {     
      if(numString === undefined||null) {
          numString
      }else if(numString.indexOf('.')>-1){
         numString
      }else{  
         numString + '.00'
      }
    },
    loginOut () {
      this.userInfo = {}
      this.clearUserInfo()
      this.isLogin = false
      this.$toast({message:"成功退出登录",duration: 1000})
      local.remove('user')

    },
    //获取用户信息
		getUserInfo () {     
		  const headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
            //console.log(res);
            if(res.code == '1'){
              this.setAccountInfo(res.data);
              this.isLogin = true; 
            }
                     
        }).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							//this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
    },  
    //获取新闻列表
     getNewList() {
                const data = {
                    pageNo: 1,
                    pageSize: 20
                }
                pro.fetch("post", "/others/getNoticeList", data, "").then((res) => {
                    //console.log(res)
                   if(res.success == true){
						if(res.code == 1){
                            /* 
                                本地存储新闻内容 
                                 1.给返回的list 添加一个isread属性
                                 2. 点击事件 改变所点击那个item的isread 
                                    2.1 改变isread 
                                    2.2 存储 item 的id
                                 3. 重新渲染 对比本地存储的id,改变isread
                                    3.1 二次循环 改变对应id 的 isread属性
                                    3.2 赋值给渲染的 属性   
                            */
                            res.data.list.forEach(item => {
                                //是否在idList中                                
                                item.isRead = this.idList.includes(item.id);
                                
                            });
                            this.$store.state.newsList = res.data.list
                        }
                    }
    
                }).catch((err) => {
                    var data = err.data;
                    console.log(err)
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                            this.$router.push({
                                path: "/login"
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
            },

  },  
  activated () {    
    this.userInfo = local.get('user')
    this.userList = local.get('userList')
    this.idList = local.get('idList')||[]
    if(this.userInfo){
      this.getUserInfo()
      this.getNewList() //为了得到新闻中心信息是否更新
    }
    
  },
  beforeRouteEnter: (to, from, next) => {
    //console.log(from)
    next(vm => {
      // 通过 `vm` 访问组件实例
      //console.log(from.path)
      const lastPathArr = ['/home', '/quote', '/match', '/discover', '/trade']
      if(lastPathArr.includes(from.path)){        
        vm.lastPath = from.path
      }
  })
    // ...
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#home {
  width: 7.5rem;
  background-color: $bgGray;
}
.icon {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  background: url("../../../assets/images/account/massage_info.png") center
    no-repeat;
  background-size: cover;
}
.user_info {
  width: 7.5rem;
  padding: 0.96rem 0 0 0;
  background-color: $headColr;
  img {
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.2rem auto;
    border-radius: 50%;
  }
  p {
    @include font($fs32,0.44rem,#fff);
    padding-bottom: 0.5rem;
  }
  .login {
    position: relative;
    padding-bottom: 0.5rem;
    &::after {
      position: absolute;
      left: 50%;
      bottom: 0.1rem;
      content: "";
      width: 0;
      height: 0;
      border: 0.08rem transparent solid;
      border-top: 0.08rem #fff solid;
      transform: translateX(-50%);
    }
  }
}
.money_wrap {
  @include flex();
  width: 7.5rem;
  @include font($fs24,0.46rem,#919199);
  flex-wrap: wrap;
  background-color: $bg;
  .money_box {
    width: 50%;
    padding: 0.46rem;
    .money_text {
      color: $blcakThin;
    }
    span {
      font-size: $fs36;
    }
  }
  .money_box:first-child {
    border-right: 1px solid #e6e6e6;
  }
  &::after {
    @include padding_bg(7.5rem,0.16rem,#e6e6e6);
  }
}
.list_wrap {
  width: 7.5rem;
  background-color: $bg;
  .item {
    position: relative;
    padding-left: 0.3rem;
    @include font($fs28,0.96rem,$blcakThin,left);
    border-bottom: 1px solid #e6e6e6;
  }
  .icon {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    margin-right: 0.1rem;
    vertical-align: middle;
  }
  .right_icon {
    position: absolute;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 0.14rem;
    height: 0.22rem;
    background: url("../../../assets/images/account/right_jiantou.png") center no-repeat;
    background-size: cover;
    vertical-align: middle;
    text-align: right;
  }
  @for $i from 1 through 5 {
    $background_img: (
      //"self_choose_icon",
      "home_match_icon",
      "home_self_icon",
      "home_customer_icon",
      "home_help_icon",
      'home_note_icon_no'
    );
    .item:nth-child(#{$i}) {
      .icon {
        $img: nth($background_img, $i);
        background: url("../../../assets/images/account/#{$img}.png") center
          no-repeat;
        background-size: 100%;
      }
    }
  }
  .item:nth-child(5) .news_icon {
      background: url("../../../assets/images/account/home_note_icon.png") center no-repeat ;
      background-size: 100%;
  }
}
.btn_wrap {
  width: 7.5rem;
  text-align: center;
  background-color: $bgGray;
  .btn {
    width: 7rem;
    margin: 0.6rem 0;
    @include font($fs36,0.88rem,$bg);
    background-color: $redDeep;
    border-radius: 0.44rem;
  }
}
</style>