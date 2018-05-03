<template>
    <div id="home" :style="{height:clientHeight}">
        <mt-header fixed title="意见反馈">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="article_wrap">
            <h2>关于模拟操盘比赛第五期：黄金期货操盘的比赛公告！</h2>
            <span>2017年11月8日</span>
            <p>对比iPhone 8 Plus，iPhone X的拍照从96分提升到101分，录像维持在89分，综合也从94分提升到了97分，仅仅落后Pixel 2 XL，因后者的录视频能力要均衡的多。</p>
            <p>DxO认为，相较于iPhone 8 Plus，iPhone X的变焦又提升了一个档次，可能与长焦镜头光圈从F/2.8拉到F/2.4有关。</p>      
        </div>
    </div>
</template>

<script>
export default {
  name: 'news_info_details',
  props: ['id'],
  data () {
    return {
      
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
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#home{
    width: 7.5rem;
    background-color: $bgGray;
}

.article_wrap{
    width:7.5rem;
    padding: 1.26rem 0.3rem 0;
    background-color:$bg;
    h2{
        @include font($fs36,0.5rem,$blcakThin,left);
        font-weight: 600;
    }
    span{
        display: block;
        @include font($fs24,0.8rem,$graySimple,right);
    }
    p{
        @include font($fs28,0.4rem,$graySimple,left);
        text-indent: 2em;
    }
}




</style>