<template>
	<div id="moneyTotal">
		<div class="total">
			<div class="col">
				<em>总资产</em>
				<span>{{jCacheTotalAccount.TodayBalance | fixNumTwo}}</span>
			</div>
			<div class="col">
				<em>持仓盈亏</em>
				<span :class="{red: jCacheTotalAccount.FloatingProfit > 0, green: jCacheTotalAccount.FloatingProfit < 0}">{{jCacheTotalAccount.FloatingProfit | fixNumTwo}}</span>
			</div>
			<div class="col">
				<em>平仓线：<span>{{forceLine}}</span></em>
				<em>风险度：<span>{{jCacheTotalAccount.RiskDegree | fixNum(2)}}%</span></em>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'moneyTotal',
		props: [],
		computed: {
			jCacheTotalAccount(){
				return this.$store.state.market.CacheAccount.jCacheTotalAccount;
			},
			forceLine(){
				return this.$store.state.market.forceLine;
			},
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			}
		},
		methods: {},
		mounted: function(){
//			console.log(this.jCacheTotalAccount);
		}
	}	
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	.total{
		width: 7.5rem;
		height: 0.95rem;
		background: $lightBlue;
		border-bottom: 0.01rem solid $black;
		.col{
			float: left;
			width: 2.5rem;
			height: 0.95rem;
			text-align: center;
			border-left: 0.01rem solid $black;
			&:first-child{
				border: none;
			}
			em{
				display: block;
				color: $fontBlue;
				margin: 0.14rem 0;
			}
			span{
				display: inline-block;
				text-align: center;
				color: $white;
				font-size: $fs28;
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
		}
	}
</style>