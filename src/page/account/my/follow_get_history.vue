<template>
    <div id="match_details_history" >
        <mt-header fixed :title="titleName">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="list_wrap">           
            <!-- tab-container -->
                <!-- 历史记录 -->
                <ul class="history_list">
                    <li class="history_item_title">
                        <span>序号</span>
                        <div class="phone_number">跟投用户名 发起者用户名</div>
                        <div class="name">跟投方向</div>
                        <span class="small">提取收益率</span>
                        <span class="small">跟投总收益</span>
                        <span>提取收益</span>
                        <span class="more">跟投获取收益</span>
                        <div class="time">跟投时间</div>
                        <div class="time">结束时间</div>
                        
                    </li>
                    <li class="history_item">                        
                        <span>01</span>
                        <div class="phone_number">小四</div>
                        <div class="name">正</div>                        
                        <span class="small">12</span>
                        <span class="small">100000</span>
                        <span>12000</span>
                        <span class="more">88000</span>
                        <div class="time"><p class="time_day">2018-03-01</p><p class="time_date">15:59:12</p></div>
                        <div class="time"><p class="time_day">2018-03-03</p><p class="time_date">15:59:12</p></div>
                    </li>
                    <li class="history_item">                        
                        <span>01</span>
                        <div class="phone_number">151****1502</div>
                        <div class="name">正</div>                        
                        <span class="small">12</span>
                        <span class="small">100000</span>
                        <span>12000</span>
                        <span class="more">88000</span>
                        <div class="time"><p class="time_day">2018-03-01</p><p class="time_date">15:59:12</p></div>
                        <div class="time"><p class="time_day">2018-03-05</p><p class="time_date">15:59:12</p></div>
                    </li>
                    <li class="history_item">                        
                        <span>01</span>
                        <div class="phone_number">小四</div>
                        <div class="name">正</div>                        
                        <span class="small">12</span>
                        <span class="small">100000</span>
                        <span>12000</span>
                        <span class="more">88000</span>
                        <div class="time"><p class="time_day">2018-03-01</p><p class="time_date">15:59:12</p></div>
                        <div class="time"><p class="time_day">2018-03-21</p><p class="time_date">15:59:12</p></div>
                    </li>
                </ul>                                                
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
      selected: '1'
    }
  },
  computed: {
      clientHeight () {
          return document.documentElement.clientHeight + 'px';
      },
       titleName () {
           switch (this.id) {
                case 'extract':
                   return '跟投提取收益'
                   break;
                case 'deduction':
                   return '跟投扣除收益'
                   break;   
           
               default:
                   break;
           }
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
    width: 210%;
    @include flex(space-around);
    @include font($fs28,0.64rem,$graySimple);
    .name{
        width: 1.5rem;
        padding: 0.15rem 0;
    }
    .time{
       width: 2rem;
    text-align: right;
    padding-right: 0.4rem;
    }
    .phone_number{
        width: 1.8rem;
    }
    span{        
        width: 1.4rem;
    }
    .more{
        width: 1.8rem;
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