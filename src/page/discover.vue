<template>
	<div id="discover">
		<mt-header fixed title="指数天下">
			<mt-button slot="left" @click="goto('/my')">
				<span class="icon_account"></span>
			</mt-button>
			<mt-button slot="right" @click="goto('/discoverSearch')">
				<span class="icon_search"></span>
			</mt-button>
		</mt-header>
		<!-- 选项卡 -->
		<div class="tab_wrap">
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">7x24</mt-tab-item>
				<mt-tab-item id="2">日历</mt-tab-item>
				<mt-tab-item id="3">要闻</mt-tab-item>
			</mt-navbar>
			
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<discover7x24></discover7x24>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<calendar-news></calendar-news>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<focus-news></focus-news>
				</mt-tab-container-item>
			</mt-tab-container>
	
	
	
		</div>
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>
</template>

<script>
	import bottomTab from "../components/bottom_tab"
	import discover7x24 from '../page/discover/discover7x24'
	import calendarNews from '../page/discover/calendarNews'
	import focusNews from '../page/discover/focusNews'
	
	export default {
		name: "discover",
		components: {
			bottomTab,
			discover7x24,
			calendarNews,
			focusNews
		},
		data() {
			return {
				tabSelected: 'discover',
				selected: "1"
			}
		},
		methods: {
			goto (...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({path:pathObj[0]})
				}else if (pathObj.length == 2) {
					this.$router.push({path:pathObj[0] ,query: {
						id:1,
						title:'比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
						time: '2018-02-10'
					}})
				}
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#discover {
		width: $w;
		.mint-navbar .mint-tab-item.is-selected {
			margin: 0;
			border-bottom: 0.03rem solid $redDeep;
			color: $redDeep;
		}
		.mint-navbar .mint-tab-item {
			padding: 0.27rem;
		}
		.mint-navbar {
			border-bottom: 0.01rem solid $bgDeep;
			padding: 0 0.3rem;
		}
		
	}
	
	.icon_account,
	.icon_search {
		display: inline-block;
		width: 0.32rem;
		height: 0.32rem;
		background: url("../assets/images/account/account_user.png") center no-repeat;
		background-size: cover;
	}
	
	.icon_search {
		background: url("../assets/images/account/search_icon_white.png") center no-repeat;
		background-size: cover;
	}
	.tab_wrap{
		margin-top: 0.96rem;
        width: 7.5rem;
	}
	
	
</style>