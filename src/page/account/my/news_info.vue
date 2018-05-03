<template>
    <div id="home" :style="{height:clientHeight}">
        <mt-header fixed title="新闻公告">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="news_wrap">          
            <ul class="news_list" v-if="hasList">
               <li v-for="item in newsList" :key="item.id" @click="goto(item.id)">
                   <span v-if="!item.isRead" class="is_read"></span>
                   <h3 :class="{have_read:!item.isRead}">{{item.title}}</h3>
                   <p>{{item.time}}</p>
                </li>  
            </ul>
            <p class="no_news" v-else>暂无最新的新闻公告哟</p>            
        </div>              
    </div>
</template>

<script>
export default {
  name: 'news_info',
  data () {
    return {
      hasList: true, 
      newsList: [
          {
              title: '关于模拟操盘比赛第五期：黄金期货操盘的比赛公告！',
              time: '2018-02-25',
              isRead: true,
              id: 'sdsdsd'
          },
          {
              title: '华为轮值CEO：作为新的通用技术 人工智能新一轮复兴才刚刚开始。',
              time: '2018-02-26',
              isRead: false,
              id: 'fdfffff'
              
          }
      ],
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
    goto(id) {
      this.$router.push({ path: `news_info_details/${id}` });
    },
    changeIndex (index) {
        this.currentIndex = index
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#news_info{
    width: 7.5rem;
    background-color: $bg;
}
.news_wrap{
    width:7.5rem;
    padding: 0.96rem 0 0 0;
    li{
        position: relative;
        padding:  0.1rem 0.3rem;
        border-bottom: 1px solid $bgDeep;
        h3{
           @include font($fs28,0.46rem,$grayDeep,left); 
        }
        p{
            @include font($fs24,0.46rem,$grayDeep,left); 
        }
        .is_read{
            position: absolute;
            left: 0.1rem;
            top: 0.28rem;
            width: 0.12rem;
            height: 0.12rem;
            background-color: $redDeep;
            border-radius: 50%;
        }
        .have_read{
            color: $blcakThin
        }
    }
    .no_news{
        position: absolute;
        top: 6rem;
        left: 50%;
        transform: translateX(-50%);
        @include font($fs28,0.46rem,$grayDeep); 
    }
}




</style>