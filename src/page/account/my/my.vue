<template>
    <div id="home" :style="{height:clientHeight}">
        <mt-header fixed title="我的">           
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
            <mt-button slot="right" @click="goto('/information')">
                <span class="icon"></span>
            </mt-button>
        </mt-header>
        <div class="user_info">
            <img :src="accountInfo.wxHeadimgurl||require('../../../assets/images/account/WXuser.png')" alt="用户头像">
            <p v-if="!isLogin" @click="goto('/login')" >-点击登录-</p>
            <p class="login" @click="changeValue(true,'isShow')" v-else>{{accountInfo.wxNickname||accountInfo.mobile}}</p>
        </div>
        <div class="money_wrap">
            <div class="money_box">
                <p>可用资金</p>
                <p class="money_text"><span>{{accountInfo.balance||'0.00'}}</span> 元</p>
            </div>
            <div class="money_box">
                <p>账户余额</p>
                <p class="money_text"><span>{{allMoney||"0.00"}}</span> 元</p>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li class="item" v-for="item in list" :key="item.path" @click="goto(item.path)">
                    <span class="icon"></span>
                    {{item.name}}
                    <span class="right_icon"></span>
                </li>
            </ul>
        </div>
        <!-- login_out -->
        <div class="btn_wrap">
            <button v-if="isLogin" @click="loginOut" class="btn">退出登录</button>
        </div>
        <switch-account v-show="isShow" @show-modal="changeValue($event,'isShow')"></switch-account>
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
import {mapMutations} from 'vuex'
import switchAccount from '../../../components/switch_account'
const user_info = {
  token: 'NzE5YTdhOTlmNjJhNDlkZGI0YTk0ZTNiZmM0OWUwNmM=',
  secret: '791cfd28e9bfd82e575418a96360e655'
}
export default {
  name: "my",
  components: {
    switchAccount
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      isLogin: false,
      isShow: false,
      list: [
        {
          name: "自选管理",
          path: "/self_select"
        },
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
      userInfo: user_info,
      //accountInfo: {}
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
    }
  },
  methods: {
    ...mapMutations({
      setAccountInfo: 'ACCOUNT_INFO',
      clearUserInfo: 'INFO_CLEAR'
    }),
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goto(path) {
      this.$router.push({ path: path });
    },
    changeValue (msg, key) {
      console.log(msg)
      this[key] = msg
    },
    loginOut () {
      this.userInfo = {}
      this.clearUserInfo()
      this.isLogin = false
      //this.accountInfo = {}
      this.$toast({message:"成功退出登录",duration: 1000});

    },
    //获取用户信息
		getUserInfo () {
      this.userInfo = user_info
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
			  //	console.log(headers)
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
            console.log(res);
            this.setAccountInfo(res.data);
            //this.accountInfo = this.$store.state.accountInfo;
            this.isLogin = true;          
        }).catch((err)=>{
//					console.log("err==0"+JSON.stringify(err))
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
    },  
  },  
  // created () {
  //    this.getUserInfo()
  // },
  activated () {
    this.getUserInfo()
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
  @for $i from 1 through 6 {
    $background_img: (
      "self_choose_icon",
      "home_match_icon",
      "home_self_icon",
      "home_customer_icon",
      "home_help_icon",
      "home_note_icon"
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
}
.btn_wrap {
  width: 7.5rem;
  padding: 0.6rem 0 0 0;
  text-align: center;
  background-color: $bgGray;
  .btn {
    width: 7rem;
    @include font($fs36,0.88rem,$bg);
    background-color: $redDeep;
    border-radius: 0.44rem;
  }
}
</style>