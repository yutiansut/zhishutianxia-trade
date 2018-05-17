<template>
	<div id="index">
		<TabBar></TabBar>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: selectNum == index}">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search"></i>
		</header>
		<nav>
			<span class="current">商品</span>
			<span>股指期货</span>
			<span>外汇</span>
			<span>LME金属</span>
			<span>债券期货</span>
			<span>ETF</span>
		</nav>
		<div class="recommend">
			<div class="col">
				<span class="name">美原油</span>
				<span class="red">52.49<i class="icon icon_arrow up"></i></span>
				<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
			</div>
			<div class="col">
				<span class="name">美黄金</span>
				<span class="green">52.49<i class="icon icon_arrow down"></i></span>
				<span class="green">+0.05%&nbsp;&nbsp;+0.69</span>
			</div>
			<div class="col">
				<span class="name">美铜</span>
				<span class="red">1036.49<i class="icon icon_arrow up"></i></span>
				<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
			</div>
		</div>
		<div class="title">
			<i></i>
			<span>亚太</span>
		</div>
		<div class="list">
			<ul>
				<li>
					<div class="name"><span>名称</span></div>
					<span>价格</span>
					<span>成交量</span>
					<span>涨跌幅<i class="icon icon_switch"></i></span>
				</li>
				<li>
					<div class="name">
						<em>小原油</em>
						<em>QM1801</em>
					</div>
					<span class="red">50.15</span>
					<span>1500</span>
					<span class="red">+0.03%</span>
				</li>
				<li>
					<div class="name">
						<em>小原油</em>
						<em>QM1801</em>
					</div>
					<span class="green">50.15</span>
					<span>1500</span>
					<span class="green">+0.03%</span>
				</li>
				<li>
					<div class="name">
						<em>小原油</em>
						<em>QM1801</em>
					</div>
					<span class="red">50.15</span>
					<span>1500</span>
					<span class="red">+0.03%</span>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import TabBar from "../../components/TabBar.vue"
	export default {
		name: 'index',
		components: {
			TabBar
		},
		data(){
			return{
				selectNum: 1,
				tabList: ['自选', '市场'],
				selectTypeNum: 0,
				TypeList: [],
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 1rem;
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		margin: auto;
		.tab{
			width: 2rem;
			height: 0.6rem;
			margin: 0.2rem auto;
			span{
				display: inline-block;
				float: left;
				width: 1rem;
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background: $lightBlue;
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_search{
			width: 0.6rem;
			height: 1rem;
			background: url(../../assets/images/quote/search.png) no-repeat right 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.3rem;
		}
	}
	nav{
		position: fixed;
		top: 1.01rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		span{
			display: inline-block;
			height: 0.75rem;
			line-height: 0.75rem;
			border-bottom: 0.04rem solid $bg;
			font-size: $fs28;
			margin-left: 0.3rem;
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $blue;
				border-color: $blue;
			}
		}
	}
	.recommend{
		position: fixed;
		top: 1.82rem;
		left: 0;
		width: 7.5rem;
		height: 1.6rem;
		border-bottom: 0.01rem solid $black;
		.col{
			float: left;
			width: 2.5rem;
			height: 1.6rem;
			border-right: 0.01rem solid $black;
			span{
				display: block;
				text-align: center;
				font-size: $fs32;
				&.name{
					color: $white;
					margin-top: 0.25rem;
				}
				&:last-child{
					font-size: 0.2rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
					padding-top: 0;
				}
				&:nth-child(2){
					height: 0.6rem;
					line-height: 0.6rem;
					.icon_arrow{
						width: 0.13rem;
						height: 0.27rem;
						margin: 0.1rem 0 0 0.1rem;
						&.up{
							background: url(../../assets/images/quote/arrow_up.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
						&.down{
							background: url(../../assets/images/quote/arrow_down.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
					}
				}
			}
		}
	}
	.title{
		width: 7.5rem;
		height: 0.8rem;
		overflow: hidden;
		margin-top: 3.42rem;
		border-bottom: 0.01rem solid $black;
		i{
			display: inline-block;
			width: 0.2rem;
			height: 0.2rem;
			overflow: hidden;
			background: #00a1f2;
			margin: 0.3rem 0.05rem 0 0;
		}
	}
	.list{
		width: 7.5rem;
		/*margin-top: 4.22rem;*/
		li{
			height: 0.96rem;
			line-height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			&:first-child{
				height: 0.64rem;
				line-height: 0.64rem;
				span{
					color: $fontBlue !important;
				}
			}
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
				text-align: right;
				&:nth-child(1){
					width: 3rem;
					text-align: left;
				}
				&:nth-child(2){
					width: 1.25rem;
				}
				&:nth-child(3){
					width: 1.25rem;
					color: $white;
				}
				&:nth-child(4){
					width: 1.4rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
				.icon_switch{
					width: 0.2rem;
					height: 0.24rem;
					background: url(../../assets/images/quote/switch.png) no-repeat center center;
					background-size: 0.18rem 0.24rem;
					margin-left: 0.05rem;
					margin-top: 0.1rem;
				}
			}
			.name{
				float: left;
				width: 3rem;
				em{
					display: block;
					line-height: 0.36rem;
					&:first-child{
						margin-top: 0.1rem;
						font-size: $fs32;
						color: $white;
					}
				}
			}
		}
	}
	
	
</style>