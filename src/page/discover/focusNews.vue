<template>
	<div>
		<div class="swipe_wrap">
			<mt-swipe>
				<mt-swipe-item>
					<img src="../../assets/images/discover/solider_01.png" alt="01">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../assets/images/discover/solider_02.png" alt="02">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../assets/images/discover/solider_01.png" alt="03">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div>
			<ul class="news_list">
				<li class="item" @click="goto('/importantDetails','test')">
					<img class="img" src="../../assets/images/discover/img_01.png" alt="01">
					<div>
						<p>#华为轮值CEO：作为新的通用技术人工智能新一轮复兴才刚刚开始</p>
						<p class="time">1小时前</p>
					</div>
				</li>
				<li class="item">
					<img class="img" src="../../assets/images/discover/img_01.png" alt="01">
					<div>
						<p>#华为轮值CEO：作为新的通用技术人工智能新一轮复兴才刚刚开始</p>
						<p class="time">1小时前</p>
					</div>
				</li>
				<li class="item">
					<img class="img" src="../../assets/images/discover/img_01.png" alt="01">
					<div>
						<p>#华为轮值CEO：作为新的通用技术人工智能新一轮复兴才刚刚开始</p>
						<p class="time">1小时前</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "focusNews",
		data() {
			return {
				tabSelected: 'discover',
				selected: "1"
			}
		},
		methods: {
			goto(...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({
						path: pathObj[0]
					})
				} else if (pathObj.length == 2) {
					this.$router.push({
						path: pathObj[0],
						query: {
							id: 1,
							title: '比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
							time: '2018-02-10'
						}
					})
				}
	
			}
		}
	
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.swipe_wrap {
		width: 7.5rem;
		height: 2.4rem;
		padding: 0.3rem 0.3rem 0;
		box-sizing: content-box;
	}
	
	.news_list {
		.item {
			@include flex(space-between);
			padding: 0.3rem;
			border-bottom: 1px solid $bgDeep;
			.img {
				width: 1.2rem;
				height: 1.2rem;
				margin-right: 0.3rem;
			}
			p {
				@include font($fs28, 0.44rem, $blcakThin, left);
			}
			.time {
				@include font($fs24, 0.46rem, $grayMiddle, left);
			}
		}
	}
</style>