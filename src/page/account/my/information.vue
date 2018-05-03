<template>
    <div id="information" :style="{height:clientHeight}">
        <mt-header fixed title="消息中心">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li class="item">
                    <div class="left">
                        <img src="../../../assets/images/account/touxiang.png" alt="头像">
                    </div>
                    <div class="right">
                        <h3>用户 <span class="name">进击的胡汉三</span> 跟投了你的正向订单</h3>
                        <p class="activity_name">冬日猎手第一期</p>
                        <p class="time">3月5日 17:13</p>
                    </div>
                </li>
                <li class="item">
                    <div class="left">
                        <img src="../../../assets/images/account/touxiang.png" alt="头像">
                    </div>
                    <div class="right">
                        <h3>用户 <span class="name">进击的胡汉三</span> 取消了对你的跟投</h3>
                        <p class="activity_name">冬日猎手第一期</p>
                        <p class="time">3月5日 17:13</p>
                    </div>
                </li>
            </ul>
        </div>
           
        
        
    </div>
</template>

<script>
export default {
  name: 'information',
  data () {
    return {
      hasList: true, 
      typeList: ['程序BUG', '功能建议', '行情相关', '其他'],
      currentIndex: 0,    
      suggestionText: ''
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
    },
    changeIndex (index) {
        this.currentIndex = index
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#information{
    width: 7.5rem;
    background-color: $bgGray;
}
.list_wrap{
   width:7.5rem; 
   padding: 0.96rem 0 0 0;
   background-color:$bgGray;
   .item{
        width: 7.5rem;
        @include flex(flex-start,flex-start);
        padding: 0.3rem 0.2rem;
        margin-bottom: 0.16rem; 
        background-color:$bg;
        border-bottom: 1px solid $bgDeep; 
   }
   .left{
       flex: 0 0 1.1rem;
       padding-left: 0.1rem;
       img{
           width: 0.8rem;
       }
   }
   .right{
       @include font($fs28,0.46rem,$blcakThin,left);
   }
   .name{
       color: $redDeep
   }
   .activity_name,.time{
       color: $grayDeep
   }
   .time{
       font-size: 0.24rem;
       padding-top: 0.2rem;
       
   }

}

</style>