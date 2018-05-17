<template>
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
						<img src="../../assets/images/discover/flag_china.png" alt="">
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
						<img src="../../assets/images/discover/flag_china.png" alt="">
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
</template>

<script>
	export default {
		name: "7x24",
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
					background: url('../../assets/images/discover/star_gray.png') center no-repeat;
					background-size: 100%;
				}
				.star_red{
					background: url('../../assets/images/discover/star_red.png') center no-repeat;
					background-size: 100%;
				}
				.star_yellow{
					background: url('../../assets/images/discover/star_yellow.png') center no-repeat;
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
			background: url('../../assets/images/discover/subscribe_icon_no.png') center no-repeat;
			background-size: 100%;
			
		}
		.subscribe_icon {
			background: url('../../assets/images/discover/subscribe_icon.png') center no-repeat;
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
</style>