<template>
    <div id="match_details_history" :style="{height:clientHeight}">
        <mt-header fixed :title="id">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li class="item title_item">
                    <div class="left">
                        <img src="../../../assets/images/account/touxiang.png" alt="头像"/>
                    </div>
                    <div class="right">
                        <h3>进击的胡汉三</h3>
                    </div>
                </li>
                <li class="item">
                    <p>初始资金:&nbsp<span class="money">20000</span>&nbsp元</p>
                    <p>亏损平仓线:&nbsp<span class="money">20000</span>&nbsp元</p>                   
                </li>
                 <li class="item">
                    <p>交易账号：&nbsp<span class="money">055003</span></p>
                    <p>交易密码:&nbsp<span class="money">ZERO1X</span></p>                   
                </li>
                <li class="item">
                    <p>活动时间：&nbsp<span class="money">2018-03-05 至 2018-04-05</span></p>
                    <p>报名时间:&nbsp<span class="money">2018-03-06 14:30</span></p>                   
                </li>
            </ul>
        </div>
        <div class="btn_wrap">
            <button class="trade" :class="{'disabled': !isBegin}">立即交易</button>
            <button class="black">比赛规则</button>
        </div>
           
        
        
    </div>
</template>

<script>
export default {
  name: 'match_details_history',
  props: ['id'],
  data () {
    return {
      isBegin: true,
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
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#match_details_history{
    width: 7.5rem;
    background-color: $bgGray;
}
.list_wrap{
   width:7.5rem; 
   padding: 0.96rem 0 0 0;
   background-color:$bgGray;
   .item{
        width: 7.5rem;        
        margin-bottom: 0.16rem; 
        background-color:$bg;             
        p{
            padding: 0 0.3rem;
            @include font($fs28,0.88rem,$graySimple,left);
            border-bottom: 1px solid $bgDeep;    
        }
   }
   .money{
       color: $blcakThin;
   } 
   .title_item{
       padding: 0.22rem 0.3rem;
       font-size: 0;
        border-bottom: 1px solid $bgDeep;    
       .left,.right{
           display: inline-block;
           vertical-align: middle;
            @include font($fs28,0.46rem,$graySimple,left);
        }
        .left{
            margin-right: 0.2rem
        }
       img{
           width: 0.44rem;
       }
   }
}
.btn_wrap{
    position: absolute;
    bottom: 0;
    width: 7.5rem;
    font-size: 0;
    button{
        width: 50%;
        @include font($fs36,0.98rem,$bg);
    }
    .black{
        background-color: $headColr;
    }
    .trade{
        background-color: $redDeep
    }
    .disabled{
        background-color: $grayBtn
    }
}

</style>