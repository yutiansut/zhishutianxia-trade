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
					<div class="wrap">
						<h2>2018－05－01 星期五</h2>
						<ul class="list">
							<li class="item">
								<p class="time_text"><span class="time">16:44</span></p>
								<div class="box">
									<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。</p>
									<i class="display_icon"></i>
								</div>
							</li>
							<li class="item">
								<p class="time_text"><span class="time">16:44</span></p>
								<div class="box">
									<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息</p>
									<i class="display_icon"></i>
								</div>
							</li>
							<li class="item">
								<p class="time_text"><span class="time">16:44</span></p>
								<div class="box">
									<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息</p>
									<i class="display_icon"></i>
								</div>
							</li>
							<li class="item">
								<p class="time_text"><span class="time">16:44</span></p>
								<div class="box">
									<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息</p>
									<i class="display_icon"></i>
								</div>
							</li>
						</ul>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="calendar_wrap">
						<h2>2018－05</h2>
						<div class="calendar_date">
							<ul class="date_list">
								<li>
									<p class="date">16</p>
									<p class="day">周一</p>
								</li>
								<li class="selected">
									<p class="date">16</p>
									<p class="day">周二</p>
								</li>
								<li>
									<p class="date">16</p>
									<p class="day">周三</p>
								</li>
								<li>
									<p class="date">16</p>
									<p class="day">周四</p>
								</li>
								<li>
									<p class="date">16</p>
									<p class="day">周五</p>
								</li>
								<li>
									<p class="date">16</p>
									<p class="day">周六</p>
								</li>
								<li>
									<p class="date">16</p>
									<p class="day">周日</p>
								</li>
							</ul>
						</div>
						<ul class="my_list">
							<li class="item">
								<div class="title_box">
									<div class="left">
										<span class="subscribe_icon_no"></span>
										<span class="time">06:30</span>
										<img src="../assets/images/discover/flag_china.png" alt="">
										<span class="country">中国</span>
									</div>
									<div class="right">
										<i class="star_icon"></i>
										<i class="star_icon star_red"></i>
										<i class="star_icon star_yellow"></i>
									</div>
								</div>	
								<div>
									<p class="text">中国公布三月M0货币供应年率</p>
								</div>
								<div class="number_box">
									<p>今值: <span>---</span></p>
									<p>预期: <span>0.20%</span></p>
									<p>前值: <span>2.00%</span></p>
								</div>
							</li>
							<li class="item">
								<div class="title_box">
									<div class="left">
										<span class="subscribe_icon_no subscribe_icon"></span>
										<span class="time">06:30</span>
										<img src="../assets/images/discover/flag_china.png" alt="">
										<span class="country">中国</span>
									</div>
									<div class="right">
										<i class="star_icon"></i>
										<i class="star_icon star_red"></i>
										<i class="star_icon star_yellow"></i>
									</div>
								</div>	
								<div>
									<p class="text">中国公布三月M0货币供应年率</p>
								</div>
								<div class="number_box">
									<p>今值: <span>---</span></p>
									<p>预期: <span>0.20%</span></p>
									<p>前值: <span>2.00%</span></p>
								</div>
							</li>
						</ul>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<div class="swipe_wrap">
						<mt-swipe>
							<mt-swipe-item>
								<img src="../assets/images/discover/solider_01.png" alt="01">
							</mt-swipe-item>
							<mt-swipe-item>
								<img src="../assets/images/discover/solider_02.png" alt="02">
							</mt-swipe-item>
							<mt-swipe-item>
								<img src="../assets/images/discover/solider_01.png" alt="03">
							</mt-swipe-item>
						</mt-swipe>
					</div>
					<div>
						<ul class="news_list">
							<li class="item">
								<img class="img" src="../assets/images/discover/img_01.png" alt="01">
								<div>
									<p>#华为轮值CEO：作为新的通用技术人工智能新一轮复兴才刚刚开始</p>
									<p class="time">1小时前</p>
								</div>
							</li>
							<li class="item">
								<img class="img" src="../assets/images/discover/img_01.png" alt="01">
								<div>
									<p>#华为轮值CEO：作为新的通用技术人工智能新一轮复兴才刚刚开始</p>
									<p class="time">1小时前</p>
								</div>
							</li>
							<li class="item">
								<img class="img" src="../assets/images/discover/img_01.png" alt="01">
								<div>
									<p>#华为轮值CEO：作为新的通用技术人工智能新一轮复兴才刚刚开始</p>
									<p class="time">1小时前</p>
								</div>
							</li>
						</ul>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
	
	
	
		</div>
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>
</template>

<script>
	import bottomTab from "../components/bottom_tab"
	export default {
		name: "discover",
		components: {
			bottomTab
		},
		data() {
			return {
				tabSelected: 'discover',
				selected: "1"
			}
		},
		methods: {
			goto (path) {
				this.$router.push({path:path})
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
	.wrap{
		h2{
			@include font($fs24,0.64rem,$graySimple);
			background-color: $bgDeep;
			border-bottom: 1px solid $bgDeep;
		}
		
		.list{
			padding: 0.25rem 0.3rem;
			.time_text{
				position: relative;
				&::before {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					content: '';
					width: 0.16rem;
					height: 0.16rem;
					background-color: $blueBall;
					border-radius: 50%;
				}
			}
			.time{
				display: inline-block;
				width: 1rem;
				height: 0.4rem;
				margin-left: 0.3rem;
				@include font($fs24,0.4rem,$graySimple);
				background-color: $bgGray;
				border-radius: 0.2rem;
			}
			.box{
				border-left: 0.04rem dashed #dadae6;
				padding: 0.3rem 0.2rem;
				margin: 0 0.05rem;
				p{
					@include font($fs30,0.46rem,$blcakThin,left);
					padding-bottom: 0.8rem; 
					border-bottom: 1px solid $bgDeep;
				}
			}
		}
	}
	.calendar_wrap{
		h2{
			@include font($fs24,0.64rem,$graySimple);
		}
		.date_list{
			@include flex(space-between);
			background-color: $bgGray;
			padding: 0.3rem 0.2rem;
			li{
				padding: 0 0.2rem;
			}
			.selected{
				p {
					color:$blueBall
				}
			}
			.date{
				@include font($fs40,0.5rem,$grayDeep);
			}
			.day{
				@include font($fs26,0.5rem,$grayDeep);
			}
		}
		.item{
			padding: 0.3rem;
			border-bottom: 1px solid $bgDeep;
			.title_box{
				@include flex(space-between);
				font-size: 0
			}
			.left{
				.time,.country{
					@include font($fs24,0.3rem,$grayMiddle);
					vertical-align: middle;
				}
				img{
					width: 0.45rem;
					height: 0.3rem;
					vertical-align: middle;
					margin: 0 0.2rem;

				}
			}
			.right{
				.star_icon{
					display: inline-block;
					width: 0.22rem;
					height: 0.2rem;	
					background: url('../assets/images/discover/star_gray.png') center no-repeat;
					background-size: 100%;
				}
				.star_red{
					background: url('../assets/images/discover/star_red.png') center no-repeat;
					background-size: 100%;
				}
				.star_yellow{
					background: url('../assets/images/discover/star_yellow.png') center no-repeat;
					background-size: 100%;
				}
			}
		}
		.subscribe_icon_no{
			display: inline-block;
			vertical-align: middle;
			width: 0.3rem;
			height: 0.3rem;
			margin-right: 0.1rem;
			background: url('../assets/images/discover/subscribe_icon_no.png') center no-repeat;
			background-size: 100%;
			
		}
		.subscribe_icon {
			background: url('../assets/images/discover/subscribe_icon.png') center no-repeat;
			background-size: 100%;
		}
		.text{
			@include font($fs30,0.8rem,$blcakThin,left);
		}
		.text_red{
			color: $redDeep
		}
		.number_box{
			@include flex(space-between);
			p{
				@include font($fs24,0.3rem,$graySimple,left);
				span{
					color:$blcakThin
				}
			}
		}
	}
	.swipe_wrap{
		width: 7.5rem;
		height: 2.4rem;
		padding: 0.3rem 0.3rem 0;
		box-sizing: content-box;
	}
	.news_list{
		
		.item{
			@include flex(space-between);
			padding: 0.3rem;
			border-bottom: 1px solid $bgDeep;
			.img{
				width: 1.2rem;
				height: 1.2rem;
				margin-right: 0.3rem;
			}
			p{
				@include font($fs28,0.44rem,$blcakThin,left);
			}
			.time{
				@include font($fs24,0.46rem,$grayMiddle,left);
			}

		}
	}
</style>