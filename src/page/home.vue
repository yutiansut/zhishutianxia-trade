<template>
    <div id="home">
        <mt-header fixed title="我的">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right">
                <span class="icon"></span>
            </mt-button>
        </mt-header>
        <div class="user_info">
            <img src="../assets/images/account/portrait_icon.png" alt="用户头像">
            <p v-if="!isLogin">-点击登录-</p>
            <p class="login" v-else>拉风的皮皮</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLogin: true,
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
#id{
    width: 7.5rem
}
.icon{
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url('../assets/images/account/massage_info.png') center no-repeat;
    background-size: cover;
}
.user_info{

    width:7.5rem;
    padding: 0.96rem 0 0 0; 
    background-color:$headColr; 
    img{
        display: block;
        width:1.2rem;
        height: 1.2rem;
        margin: 0.2rem auto;
    }
    p{
        @include font($fs32,0.44rem,#fff)
    }
    .login{
        &::after{
            content: '',

        }
    }
}



</style>