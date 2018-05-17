<template>
	<div id="discover_search">
		<mt-header fixed title="搜索">
			<mt-button slot="left" icon="back" @click="goBack"></mt-button>
		</mt-header>
		<div class="search-wrap">
			<input id="keyword" placeholder="搜索" type="search" v-model="searchValue">
			<span class="close">取消</span>
		</div>
		<div class="hot_search_wrap">
			<h2>热门搜索</h2>
			<ul>
				<li>黄金</li>
				<li>布伦特原油</li>
				<li>美国原油</li>
				<li>美元</li>
				<li>纳斯达克</li>
				<li>上证指数</li>
				<li>黄金</li>
				<li>黄金</li>
				<li>上证指数</li>
			</ul>
		</div>
		<div class="">
			<div class="title_box">7x24</div>
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
	</div>
</template>

<script>
	export default {
		name: "discover",
		data() {
			return {
				tabSelected: 'discover',
				selected: "1",
				searchValue: ''
			}
		},
		methods: {
			goBack() {
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.search-wrap {
		position: relative;
		width: 7.5rem;
		padding-top: 0.96rem;
		text-align: center;
		input {
			width: 6.9rem;
			height: 0.64rem;
			margin: 0.16rem 0;
			border-radius: 0.08rem;
			text-indent: 0.66rem;
			vertical-align: middle;
			border: $bgDeep 1px solid;
			color: #000;
			background: url('../../assets/images/account/search_icon.png') 0.3rem center no-repeat;
			background-size: 0.26rem 0.26rem;
		}
		input[type=search]::-webkit-search-cancel-button {
			-webkit-appearance: none;
		}
		.close {
			position: absolute;
			bottom: 0.2rem;
			right: 0.5rem;
			display: inline-block;
			width: 0.7rem;
			height: 0.5rem;
			color: $grayDeep;
			line-height: 0.5rem;
		}
	}
	.hot_search_wrap{
		h2{
			@include font($fs24,0.8rem,$grayMiddle,left);
			background-color: $bgGray;
			padding: 0 0.3rem;
		}	
		ul{
			@include flex(space-between);
			flex-wrap: wrap;
			li{
				width: 33.3%;
				@include font($fs24,0.8rem,$grayMiddle);
			}
		}

	}
	.title_box{
		@include font($fs24,0.8rem,$grayMiddle,left);
		background-color: $bgGray;
		padding: 0 0.3rem;
	}
	
	.list {
		padding: 0.25rem 0.3rem;
		.time_text {
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
		.time {
			display: inline-block;
			width: 1rem;
			height: 0.4rem;
			margin-left: 0.3rem;
			@include font($fs24,
			0.4rem,
			$graySimple);
			background-color: $bgGray;
			border-radius: 0.2rem;
		}
		.box {
			border-left: 0.04rem dashed #dadae6;
			padding: 0.3rem 0.2rem;
			margin: 0 0.05rem;
			p {
				@include font($fs30,
				0.46rem,
				$blcakThin,
				left);
				padding-bottom: 0.8rem;
				border-bottom: 1px solid $bgDeep;
			}
		}
	}
</style>