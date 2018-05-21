<template>
	<div id="discover">
		<mt-header fixed title="指数天下">
			<mt-button slot="left" @click="goto('/my')">
				<span class="icon_account"></span>
			</mt-button>
			<mt-button slot="right">
				<span class="icon_search" v-show="selected==1" @click="goto('/discoverSearch')"></span>
		    	<span class="icon_calendar" v-show="selected==2" @click="toChooseDay('picker1')"></span>
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
					<calendar-news :newDate ="newsDate"></calendar-news>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<focus-news></focus-news>
				</mt-tab-container-item>
			</mt-tab-container>
			<mt-datetime-picker
				ref="picker1"
				type="date"
				v-model="value1"
				year-format="{value} 年"
				month-format="{value} 月"
				date-format="{value} 日"
				:startDate="startDate"
				:endDate="endDate"
				@confirm="handleChange">
			</mt-datetime-picker>
	
	
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
				selected: "1",
				navCheck: 0,
				newsDate: '',
				value: null,
		      	value1: new Date(),
		      	startDate: new Date('2014'),
		      	endDate: new Date('2020-12-31'),
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
				
			},
			toImformationSearch () {

			},
			toChooseDay (picker){
				this.$refs[picker].open();
			},
			handleChange:function(value){
				console.log(value)
				console.log(this.$pro.getDate(Date.parse(value),"y-m-d"))
				this.newsDate = this.$pro.getDate(Date.parse(value),"y-m-d");
				// this.startTime = pro.getDate("y-m-d", Date.parse(value));
				// this.endTime = pro.getDate("y-m-d",(Date.parse(this.startTime)/1000+24*60*60)*1000);
				// this.getDayList(this.startTime);
				// //保证未登录的状态下进行调用
				// if(this.userInfo == ''){
				// 	this.getInfoListNokoken(this.startTime,this.endTime)
				// }else{
				// 	this.getInfoList(this.startTime,this.endTime);
				// }
				// this.show_day = pro.getDate("yy-mm-dd", Date.parse(value));
			},
		},
		
		
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#discover {
		width: $w;
		background-color: #fff;
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
	.icon_search,
	.icon_calendar {
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
	.icon_calendar {
		background: url("../assets/images/discover/choose_day.png") center no-repeat;
		background-size: cover;
	}
	.tab_wrap{
		margin-top: 0.96rem;
		width: 7.5rem;
		padding-bottom: 1.16rem;
	}
	
	
</style>