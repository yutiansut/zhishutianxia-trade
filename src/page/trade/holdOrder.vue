<template>
	<div id="holdOrder">
		<div class="nav">
			<ul>
				<template v-for="(v, index) in navList">
					<li :class="{current: currentNum == index}" @tap="navEvent(index)">{{v}}</li>
				</template>
			</ul>
		</div>
		<div class="">
			<components :is="currentView"></components>
		</div>
	</div>
</template>

<script>
	import position from "./position.vue"
	import hangOrder from "./hangOrder.vue"
	import entrust from "./entrust.vue"
	import condition from "./condition.vue"
	import stopOrder from "./stopOrder.vue"
	import todayOrder from "./todayOrder.vue"
	import historyOrder from "./historyOrder.vue"
	export default{
		name: "holdOrder",
		components: {position, hangOrder, entrust, condition, stopOrder, todayOrder, historyOrder},
		data(){
			return{
				navList: ['持仓','挂单', '委托', '止损单', '条件单', '当日成交', '历史成交'],
				currentNum: 0,
				currentView: 'position',
			}
		},
		methods: {
			navEvent: function(index){
				this.currentNum = index;
				switch (index){
					case 0:
						this.currentView = 'position';
						break;
					case 1:
						this.currentView = 'hangOrder';
						break;
					case 2:
						this.currentView = 'entrust';
						break;
					case 3:
						this.currentView = 'stopOrder';
						break;
					case 4:
						this.currentView = 'condition';
						break;
					case 5:
						this.currentView = 'todayOrder';
						break;
					case 6:
						this.currentView = 'historyOrder';
						break;
				}
			},
		},
		mounted: function(){}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.nav{
		width: 7.5rem;
		height: 0.8rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $bgDeep;
		overflow-x: auto;
		ul{
			width: 8rem;
			overflow: hidden;
			li{
				float: left;
				height: 0.8rem;
				line-height: 0.8rem;
				margin-right: 0.35rem;
				font-size: $fs28;
				&:last-child{
					margin-right: 0;
				}
				&.current{
					color: $redDeep;
				}
			}
		}
	}
</style>