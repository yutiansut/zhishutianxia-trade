<template>
    <div id="match_details_history" >
        <mt-header fixed :title="id">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="list_wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">比赛账号</mt-tab-item>
                <mt-tab-item id="2">交易记录</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!-- 详情 -->
                 <ul class="list">
                    <li class="item title_item">
                        <div class="left">
                            <img src="../../../assets/images/account/touxiang.png" alt="头像"/>
                            <h3>进击的胡汉三</h3>
                        </div>
                        <div class="right">
                            <p>跟投人数排名：<span class="orange">80</span></p>
                            <p>总收益排名：<span class="orange">100</span></p>
                        </div>
                    </li>
                    <li class="item">
                        <p>结算金额:&nbsp<span class="money">10000</span>&nbsp元</p>
                        <p>交易盈亏:&nbsp<span class="money">+20000</span>&nbsp元</p>     
                        <p>跟投提取收益:&nbsp<span class="money">178</span>&nbsp元 <span class="btn" @click="goFollow('extract')">查看详情</span></p>
                        <p>跟投扣除收益:&nbsp<span class="money">178</span>&nbsp元 <span class="btn" @click="goFollow('deduction')">查看详情</span></p>
                        <p>交易手续费:&nbsp<span class="money">178</span>&nbsp元</p>
                        <p class="note"><span class="red">提醒</span>：结算金额=初始资金+交易盈亏+跟投提取收益-交易手续费-跟投扣除收益</p>         
                    </li>
                    <li class="item">
                        <p>初始资金:&nbsp<span class="money">20000</span>&nbsp元</p>
                        <p>亏损平仓线:&nbsp<span class="money">20000</span>&nbsp元</p>
                        <p>交易账号：&nbsp<span class="money">055003</span></p>
                        <p>交易密码:&nbsp<span class="money">ZERO1X</span></p>
                        <p> 美元结算汇率:&nbsp<span class="money">1美元=6.9人民币 </span></p>
                        <p>活动时间：&nbsp<span class="money">2018-03-05 至 2018-04-05</span></p>
                        <p>报名时间:&nbsp<span class="money">2018-03-06 14:30</span></p>                                     
                    </li>
                    <li class="item trade_number">
                        <h4>交易手数</h4>
                        <p><span>富时A50</span><span class="money">1</span></p>
                        <p><span>迷你道琼斯</span><span class="money">2</span></p>
                        <p><span>迷你道琼斯</span><span class="money">3</span></p>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <!-- 历史记录 -->
                <ul class="history_list">
                    <li class="history_item_title">
                        <span>序号</span>
                        <div class="time">成交时间</div>
                        <div class="name">合约名称</div>
                        <span class="small">买</span>
                        <span class="small">卖</span>
                        <span>成交价</span>
                        <span>平仓盈亏</span>
                        <span>交易手续费</span>
                        <span>币种</span>
                        <span>交易所</span>
                    </li>
                    <li class="history_item">                        
                        <span>01</span>
                        <div class="time"><p class="time_day">2018-01-18</p><p class="time_date">15:30:25</p></div>
                        <div class="name"><p class="time_day">日经225</p><p class="time_date">CNQ16</p></div>                        
                        <span class="small">1</span>
                        <span class="small">0</span>
                        <span>61.27</span>
                        <span>-120</span>
                        <span>7</span>
                        <span>USD</span>
                        <span>NYMEX</span>
                    </li>
                    <li class="history_item">                        
                        <span>01</span>
                        <div class="time"><p class="time_day">2018-01-18</p><p class="time_date">15:30:25</p></div>
                        <div class="name"><p class="time_day">日经225</p><p class="time_date">CNQ16</p></div>                        
                        <span class="small">1</span>
                        <span class="small">0</span>
                        <span>61.27</span>
                        <span>-120</span>
                        <span>7</span>
                        <span>USD</span>
                        <span>NYMEX</span>
                    </li>
                    <li class="history_item">                        
                        <span>01</span>
                        <div class="time"><p class="time_day">2018-01-18</p><p class="time_date">15:30:25</p></div>
                        <div class="name"><p class="time_day">日经225</p><p class="time_date">CNQ16</p></div>                        
                        <span class="small">1</span>
                        <span class="small">0</span>
                        <span>61.27</span>
                        <span>-120</span>
                        <span>7</span>
                        <span>USD</span>
                        <span>NYMEX</span>
                    </li>
                </ul>
                
                   
               
            </mt-tab-container-item>
            </mt-tab-container>
           
        </div>
        <!-- <div class="btn_wrap">
            <button class="trade" :class="{'disabled': !isBegin}">立即交易</button>
            <button class="black">比赛规则</button>
        </div> -->
           
        
        
    </div>
</template>

<script>
export default {
  name: 'match_details_history',
  props: ['id'],
  data () {
    return {
      isBegin: true,
      selected: '1'
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
    goFollow(id) {
      this.$router.push({ path: `/follow_get_history/${id}` });
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
        .btn{
            display: inline-block;
            padding: 0 0.18rem;
            margin-left: 2.8rem;
            @include font($fs24,0.48rem,$bg);
            background-color: $redDeep;
            border-radius: 0.23rem;
            
        }
        .note{
            padding: 0.2rem 0.3rem;
            line-height: 0.48rem;
            
        }
   }
   .money{
       color: $blcakThin;
   } 
   .red{
       color: $redDeep
   }
   .trade_number{
       h4{
           padding: 0 0.3rem;
           @include font($fs28,0.88rem,$graySimple,left);
           background-color: #f2f2f2;
       }
       p{
           display: flex;
           justify-content: space-between;
           align-items: center;
       }
   }
   
   .title_item{
       padding: 0.22rem 0.3rem;
       font-size: 0;
        border-bottom: 1px solid $bgDeep;    
       .left,.right{
           display: inline-block;
           vertical-align: middle;
           @include font($fs28,0.46rem,$graySimple,left);
           font-size: 0;
        }
        .left{
            margin-right: 2.25rem;
        }
        img{
           width: 0.44rem;
           margin-right: 0.2rem;
           vertical-align: middle;
       }
       h3{
           display: inline-block;
           font-size: $fs28;
           vertical-align: middle;
       }
        .right{
            p{
               @include font($fs28,0.36rem,$graySimple,right); 
                padding: 0;
                border: 0;
            }
        }
        .orange{
            color: $orange
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
#match_details_history .is-selected {
    margin: 0;
    border-bottom: 0.03rem solid #e64552;
    color: #e64552;
}
.history_list{
    width: 7.5rem;
    overflow-x: scroll;

}
.history_item,.history_item_title{
    width: 200%;
    @include flex(space-around);
    @include font($fs28,0.64rem,$graySimple);
    .name{
        width: 1.5rem;
        text-align: right;
        padding: 0.15rem 0;
    }
    .time{
        width: 1.6rem;
        text-align: right;
    }
    span{        
        width: 1.4rem;
    }
    .small{
        width: 0.7rem;
    }
    .time_day{
        @include font($fs28,0.32rem,$blcakThin,right);
    }
    .time_date{
        @include font($fs24,0.32rem,$graySimple,right);
    }
    
}
.history_item{
    background-color: $bg
}
</style>