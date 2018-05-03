<template>
    <div id="reset_password" :style="{height:clientHeight}">
        <mt-header fixed title="修改登录密码">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        
        <!-- 表单 -->
        <div class="input_wrap">
            <div class="input_group">
                <input type="password" placeholder="原密码">
            </div>
            <div class="input_group">
                <input type="password" placeholder="输入新密码（6-16位）">
            </div>
            <div class="input_group">
                <input type="password" placeholder="确认新密码">
            </div>
        </div>
        <div class="btn_wrap">
            <button class="btn">完成</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'self_select',
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
}
.btn_wrap {
  width: 7.5rem;
  padding: 0.6rem 0 0 0;
  text-align: center;
  .btn {
    width: 7rem;
    @include font($fs36,0.88rem,$bg);
    background-color: $redDeep;
    border-radius: 0.44rem;
  }
}




</style>