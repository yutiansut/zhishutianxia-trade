<template>
    <div id="home" :style="{height:clientHeight}">
        <mt-header fixed title="自选管理">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <div class="input_wrap">
            <input type="search" placeholder="品种/代码/首字母">
            <span>取消</span>
        </div>
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list" v-if="hasList">
                <li class="title">
                    <div class="name_box">名称</div>
                    <div class="price_box">价格</div>
                    <span class="top">置顶</span>
                    <span class="draggle">拖动</span>
                </li>
                <li class="item">
                    <div class="name_box">
                        <div class="left">
                            <span class="choose choose_checked"></span>
                        </div>
                        <div class="right">
                            <p class="name">日经225</p>
                            <p class="code">CNQ16</p>
                        </div>
                    </div>
                    <div class="price_box">
                        <p class="price">72.5</p>
                        <p class="time">10:30:21</p>
                    </div>
                    <div class="top">
                        <span class="top_icon"></span>
                    </div>
                    <div class="draggle">
                        <span class="draggle_icon"></span>
                    </div>
                </li>
                <li class="item">
                    <div class="name_box">
                        <div class="left">
                            <span class="choose choose"></span>
                        </div>
                        <div class="right">
                            <p class="name">日经225</p>
                            <p class="code">CNQ16</p>
                        </div>
                    </div>
                    <div class="price_box">
                        <p class="price">72.5</p>
                        <p class="time">10:30:21</p>
                    </div>
                    <div class="top">
                        <span class="top_icon"></span>
                    </div>
                    <div class="draggle">
                        <span class="draggle_icon"></span>
                    </div>
                </li>
                <li class="item">
                    <div class="name_box">
                        <div class="left">
                            <span class="choose choose"></span>
                        </div>
                        <div class="right">
                            <p class="name">日经225</p>
                            <p class="code">CNQ16</p>
                        </div>
                    </div>
                    <div class="price_box">
                        <p class="price">72.5</p>
                        <p class="time">10:30:21</p>
                    </div>
                    <div class="top">
                        <span class="top_icon"></span>
                    </div>
                    <div class="draggle">
                        <span class="draggle_icon"></span>
                    </div>
                </li>
                <!-- <li class="item" v-for="item in list" :key="item">
                    <span class="icon"></span>
                    {{item}}
                    <span class="right_icon"></span>
                </li> -->
            </ul>
            <p class="none_list" v-else>啊哦，暂无自选合约可管理</p>
        </div>
        <!-- bottom -->
        <footer class="footer_wrap"> 
            <div class="check_box all_checked">
                <span class="all_check"></span>
                全选
            </div>
             <div class="delete_box">
                <span class="delete_icon"></span>
                删除(1)
            </div>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'self_select',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hasList: true,
      list:['自选管理', '比赛记录', '个人设置', '客服中心', '帮助文档', '新闻公告']
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
#home{
    width: 7.5rem;
    background-color: $bgGray;
}
.input_wrap{
    position: relative;
    width: 7.5rem;
    padding: 1.12rem 0 0.16rem;
    background-color: $bg;
    text-align: center;
    input{
        width: 6.9rem;
        height: 0.64rem;
        text-indent: 0.82rem;
        background-color: $bg;
        border-radius: 0.08rem;
        border: solid 1px $bgDeep;
        background: url('../../../assets/images/account/search_icon.png') 0.3rem center no-repeat;
        background-size: 0.32rem 0.32rem;
    }
    span{
        position: absolute;
        right: 0.5rem;
        bottom: 0.26rem;
        @include font($fs24,0.24rem,#c2c2cc);
        padding: 0.1rem;
    }
}

.list_wrap{
    width:7.5rem;
    background-color:$bg;
    .title{
        @include flex();
        justify-content: flex-start;
        background-color: $bgDeep;
        @include font($fs28,0.64rem,$graySimple);
        .name_box{
            flex: 1 0 4rem;
            text-align: left;
            padding-left: 0.3rem;
        }
        .price_box,.top,.draggle{
            flex: 1 0 0.74rem
        }
    }
    .item{
        @include flex();
        justify-content: flex-start;
        padding:0.15rem 0;
        @include font($fs28,0.64rem,$graySimple);
        border-bottom: 1px solid #e6e6e6;
        .name_box{
            flex: 1 0 4rem;
            text-align: left;
            padding-left: 0.3rem;
            display: inline-flex;
            align-items: center;
            .left{               
                width: 0.6rem;
                .choose{
                    display: block;
                    width: 0.3rem;
                    height: 0.3rem;
                    background: url('../../../assets/images/account/self_select_icon.png') center no-repeat;
                    background-size: cover; 
                }
                .choose_checked{
                    background: url('../../../assets/images/account/self_select_check_icon.png') center no-repeat;
                    background-size: cover;
                }
            }
            .right{
                .name{
                    @include font($fs32,0.44rem,$blackBold,left);
                }
                .code{
                    @include font($fs24,0.44rem,$graySimple,left);
                }
            }
        }
        .price_box{
            padding-right: 0.5rem;
            flex: 1 0 1.34rem;
            .price{
                @include font($fs32,0.44rem,$blackBold,right); 
            }
            .time{
                @include font($fs24,0.44rem,$graySimple,right);
            }
        }
        .top,.draggle{
            flex: 1 0 0.74rem
        }
        .top_icon{
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            background: url('../../../assets/images/account/to_top_icon.png') center no-repeat;
            background-size: cover; 
        }
        .draggle_icon{
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            background: url('../../../assets/images/account/draggle_icon.png') center no-repeat;
            background-size: cover; 
        }
    }
    .none_list{
        position: absolute;
        top: 4rem;
        left:50%;
        transform: translateX(-50%);
        @include font($fs28,0.28rem,$graySimple);
    }
}
.footer_wrap{
    position: fixed;
    bottom: 0;
    z-index: 99;
    @include flex();
    width: 7.5rem;
    @include font($fs24,0.96rem,$grayMiddle);
    background-color: $bg;
    .check_box,.delete_box{
        width: 50%;
    }
    .check_box:first-child{
        border-right: 1px solid $bgDeep;
    }
    .all_check,.delete_icon{
        display: inline-block;
        width: 0.24rem;
        height: 0.24rem;
        vertical-align: middle;
        background: url('../../../assets/images/account/all_check_icon.png') center no-repeat;
        background-size: cover;
        margin-top: -0.06rem;
    }
    .all_checked{
        .all_check{
            background: url('../../../assets/images/account/all_checked_icon.png') center no-repeat;
            background-size: cover;
        }
        color: $redDeep;
    }
    .delete_icon{       
        background: url('../../../assets/images/account/delete_icon.png') center no-repeat;
        background-size: cover;
    }

}




</style>