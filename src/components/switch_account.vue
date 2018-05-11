<template>
    <div id="switch_account" :style="{height:clientHeight}">
        <div class="wrap">
            <div class="list_box">
                <h2>交易账号</h2>
                <ul class="list">
                    <li v-for="(item, index) in userList1" :key="item.username" :class="['item',{'checked': !index}]" @click="login(item)">
                        {{item.username}}<i v-if="index" @click.stop="deleteItem(userList,item.username)" class="delete"></i>
                    </li>
                    <!-- <li class="item checked">2607000071<i class="delete"></i></li> -->
                </ul>
            </div>
            <span class="close" @click="close"></span>
        </div>
    
    </div>
</template>

<script>
    import pro from '../assets/js/common'
    const local = pro.local
    export default {
        name: "switch_account",
        props: ['userList'],
        data() {
            return {
                isShow: true,
                userInfo: {},
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + "px";
            },
            userList1() {
                return this.userList.reduce((newList, item) => {
                    if (item.username == this.userInfo.username) {
                        newList.unshift(item)
                    } else {
                        newList.push(item)
                    }
                    return newList
                }, [])
            }
    
        },
        methods: {
            close() {
                //this.isShow = !this.isShow;
                this.$emit('show-modal', false)
            },
            deleteItem (listArr , username, key= 'userList') {
                let index = listArr.findIndex((userObj) =>{
					return userObj.username == username
                })
                if(index > -1) {
					listArr.splice(index,1);
                }
                local.set(key,listArr)
                this.$toast('删除成功')
            },
            login(item) {
                let ClientId = localStorage.clientid ? JSON.parse(localStorage.clientid).id : '';
                let info = {
                    mobile: item.username,
                    password: Base64.decode(item.password),
                    clientId: ClientId
                };
                pro.fetch('post', '/loginAndRegister/mobileLogin', info, "").then(function(res) {
                    if (res.success == true) {
                        if (res.code == 1) {
                            this.$toast({
                                message: '账号切换成功',
                                duration: 1000,
                            });
                            let userData = item;
                            localStorage.setItem("user", JSON.stringify(userData));
                            this.$store.state.account.isLogin = true;
                            //刷新当前页面
                            location.reload();
                        }
                    }
                }.bind(this)).catch(function(err) {
                    console.log(err)
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后重试",
                            duration: 2000
                        });
                    } else {
                        this.$toast({
                            message: data.message,
                            duration: 2000
                        });
                    }
                }.bind(this));
            }
        },
        activated() {
            this.userInfo = local.get('user') || {};
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
        .list_box{
            height: 5.8rem;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
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
        .checked {
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