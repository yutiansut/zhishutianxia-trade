<template>
    <div id="switch_account" :style="{height:clientHeight}">
        <div class="wrap">
            <div class="list_box">
                <h2>交易账号</h2>
                <ul class="list">
                    <li class="item checked">2607000071<i class="delete"></i></li>
                    <li class="item">2607000072<i class="delete"></i></li>
                    <li class="item">2607000073<i class="delete"></i></li>
                    <li class="item">2607000074<i class="delete"></i></li>
                    <li class="item">2607000075<i class="delete"></i></li>
                </ul>
            </div>
            <span class="close" @click="close"></span>
        </div>
    
    </div>
</template>

<script>
    export default {
        name: "switch_account",
        props: ['tabSelect', "type"],
        data() {
            return {
                isShow: true
    
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + "px";
            },
            
        },
        methods: {
            close () {
                //this.isShow = !this.isShow;
                this.$emit('show-modal',false)
            }
        },
        watch: {

        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/common.scss";
    #switch_account {
        position: absolute;
        top: 0;
        width: 7.5rem;
        background-color: rgba(51, 51, 64, 0.6);
        // opacity: 0.6;
    }
    
    .wrap {
        position: absolute;
        width: 6rem;
        height: 5.8rem;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        h2 {
            @include font($fs32, 0.88rem, $bg);
            background-color: $blcakThin;
            border-radius: 0.08rem 0.08rem 0rem 0rem;
        }
        .list {
            background-color: $bg;
            opacity: 1;
            border-radius: 0 0 0.08rem 0.08rem;
        }
        .item {
            @include flex(space-between);
            @include font($fs32, 0.96rem, $blcakThin, left);
            padding: 0 0.3rem;
            .delete {
                width: 0.24rem;
                height: 0.24rem;
                background: url('../assets/images/account/delete_gray.png') center no-repeat;
                background-size: cover;
            }
        }
        .checked{
            background-color: $redDeep;
            color: $bg;
            .delete {              
                background-image: url('../assets/images/account/delete.png');
            }
        }
        .close {
            position: absolute;
            top: -0.6rem;
            right: 0;
            width: 0.32rem;
            height: 0.32rem;
            background: url('../assets/images/account/close.png') center no-repeat;
            background-size: cover;
        }
    }
    
    @for $i from 1 through 5 {
        $img: ("index", "quotation", "trade", "match", "discover");
        .icon#{$i} {
            background: url('../assets/images/account/#{nth($img,$i)}_tab_icon.png') center no-repeat;
            background-size: cover;
        }
        .icon#{$i}.icon-checked {
            background-image: url('../assets/images/account/#{nth($img,$i)}_tab_icon_checked.png')
        }
    }
</style>