<template>
	<div id="hasLogin">
		<div class="bg" @tap="hideEvent"></div>
		<div class="cont">
			<h1>交易账号：{{name}}</h1>
			<ul>
				<li @touchstart="touchstartEvent" @touchend="touchendEvent" @click.stop="totradeLogin">
					<i class="icon icon_one"></i>
					<span>切换交易账号</span>
				</li>
				<li @touchstart="touchstartEvent" @touchend="touchendEvent" @click.stop="exitEvent">
					<i class="icon icon_two"></i>
					<span>退出交易账号</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hasLogin',
		props: ['name'],
		components: {
		},
		data(){
			return{
				show: false,
			}
		},
		computed: {
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			exitStatus(){
				return this.$store.state.account.exitStatus;
			},
		},
		watch: {
			show: function(n, o){
				if(n && n == true){
					$(".bg").css({'opacity': 0.5, 'z-index': 99});
					$(".cont").css({'right': 0});
				}
			},
			exitStatus: function(n, o){
				if(n && n == true){
					localStorage.removeItem('tradeUser');
					this.$store.state.market.tradeConfig.username = '';
					this.$store.state.market.tradeConfig.password = '';
					this.$store.state.account.loginStatus = false;
					
					this.$store.state.market.qryHoldTotalArr = [];
					this.$store.state.market.positionListCont = [];
					this.$store.state.market.OnRspOrderInsertEntrustCont = [];
					this.$store.state.market.OnRspOrderInsertOrderListCont = [];
					this.$store.state.market.orderListCont = [];
					this.$store.state.market.OnRspQryTradeDealListCont = [];
					this.$store.state.market.queryHisList = [];
					this.$store.state.market.CacheAccount.moneyDetail = [];
					this.$store.state.market.stopLossList = [];
					this.$store.state.market.stopLossTriggeredList = [];
					this.$store.state.market.conditionList = [];
					this.$store.state.market.triggerConditionList = [];
					this.$store.state.market.CacheHoldFloatingProfit.jHoldFloatingProfit = {};
					localStorage.removeItem('subscribeOrder');
				}
			},
		},
		methods: {
			touchstartEvent: function(e){
				$(e.currentTarget).addClass("current");
			},
			touchendEvent: function(e){
				$(e.currentTarget).removeClass("current");
			},
			hideEvent: function(){
				this.show = false;
				$(".bg").css({'opacity': 0, 'z-index': -1});
				$(".cont").css({'right': -6.2 + 'rem'});
			},
			exitEvent: function(){
				this.show = false;
				$(".bg").css({'opacity': 0, 'z-index': -1});
				$(".cont").css({'right': -6.2 + 'rem'});
				this.tradeSocket.send('{"Method":"Logout","Parameters":{"ClientNo":"'+ JSON.parse(localStorage.tradeUser).username +'"}}');
				this.$router.push({path: '/index'});
			},
			totradeLogin: function(){
				this.tradeSocket.send('{"Method":"Logout","Parameters":{"ClientNo":"'+ JSON.parse(localStorage.tradeUser).username +'"}}');
				this.show = false;
				$(".bg").css({'opacity': 0, 'z-index': -1});
				$(".cont").css({'right': -6.2 + 'rem'});
				this.$router.push({path: '/tradeLogin'});
				sessionStorage.isSwitchAccount = true;
			}
		},
		mounted: function(){
			var h = window.screen.height;
			$(".cont").height(h);
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.bg{
		position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: -1;
	    background: #000;
	    opacity: 0;
	    transition: all .4s;
	}
	.cont{
		position: fixed;
		top: 0;
		right: -6.2rem;
		z-index: 100;
		width: 6.2rem;
		overflow: hidden;
		background: $bg;
		transition: all .4s;
		h1{
			height: 2.5rem;
			line-height: 2.5rem;
			text-align: center;
			font-size: $fs32;
			border-bottom: 0.01rem solid $black;
		}
		li{
			width: 6.2rem;
			height: 0.88rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			background: $bg;
			span{
				float: left;
				line-height: 0.88rem;
				font-size: $fs28;
			}
			.icon{
				float: left;
				width: 0.4rem;
				height: 0.4rem;
				margin: 0.22rem 0.2rem 0.22rem 0;
				&.icon_one{
					background: url(../../assets/images/quote/num_01.png) no-repeat center center;
					background-size: 100% 100%;
				}
				&.icon_two{
					background: url(../../assets/images/quote/num_02.png) no-repeat center center;
					background-size: 100% 100%;
				}
			}
			&.current{
				background: $lightBlue;
				span{
					color: $blue;
				}
				.icon{
					&.icon_one{
						background: url(../../assets/images/quote/num_11.png) no-repeat center center;
						background-size: 100% 100%;
					}
					&.icon_two{
						background: url(../../assets/images/quote/num_22.png) no-repeat center center;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
	
</style>