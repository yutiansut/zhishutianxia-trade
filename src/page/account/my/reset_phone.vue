<template>
    <div id="reset_phone" :style="{height:clientHeight}">
        <mt-header fixed title="修改手机号">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        
        <!-- 表单 -->
        <div class="input_wrap">
            <p class="phone_text">您现在正在为账户 182****6898 修改手机号</p>
            <p class="phone_number"><span>手机号：</span>182****6898</p>
            <div class="input_group">
                <input type="number" placeholder="短信验证">
                <div class="get_code">倒计时 <span>60</span> S</div>
            </div>
            <div class="input_group">
                <input type="number" placeholder="新手机号">
            </div>
            <div class="input_group">
                <input type="number" placeholder="确认新密码">
                <div class="get_code">点击获取</div>
            </div>
        </div>
        <div class="btn_wrap">
            <button class="btn">确认</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'reset_phone',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hasList: true,
    }
  },
  computed: {
      clientHeight () {
          return document.documentElement.clientHeight + 'px';
      }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goto(path) {
      this.$router.push({ path: path });
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#reset_password{
    width: 7.5rem;
}
.input_wrap{
    width: 7.5rem;
    padding: 1.11rem 0 0.15rem 0;
    background-color: $bg;
    text-align: center;
    .input_group{
        position: relative;
    }
    .phone_text{
       @include font($fs24,0.88rem,$graySimple,left);
       text-indent: 0.3rem; 
    }
    .phone_number{
        @include font($fs28,0.88rem,$blackBold,left);
        text-indent: 0.3rem; 
        background-color: $bgDeep;
        span{
            color: $graySimple
        }
    }
    input{
        width: 6.9rem;
        height: 0.88rem;
        margin: 0.15rem 0;
        text-indent: 0.3rem;
        line-height: 0.88rem;
        background-color: $bg;
        border-radius: 0.08rem;
        border: solid 1px $bgDeep;
    }
    .get_code{
        position: absolute;
        top: 0.15rem;
        right: 0.3rem;
        width: 1.76rem;
        height: 0.88rem;
        background-color: #ffffff;
        border: solid 1px #e6e6e6;
        border-radius: 0 0.08rem 0.08rem 0;
        @include font($fs24,0.88rem,$graySimple);
        span{
            color: $redDeep
        }
    }
}
.btn_wrap {
  width: 7.5rem;
  text-align: center;
  .btn {
    width: 7rem;
    @include font($fs36,0.88rem,$bg);
    background-color: $redDeep;
    border-radius: 0.44rem;
  }
}




</style>