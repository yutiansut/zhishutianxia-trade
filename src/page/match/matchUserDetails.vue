<template>
	<div id="matchUserDetails">
		<topTitle title="模拟比赛详情" type="0" type1="2"></topTitle>
		<div id="container">
			<ul class="dis_flex2 border_bottom">
				<li>
					<i class="userP"></i>
					<span class="span_gray">这里是名字</span>
				</li>
				<li>
					<span class="span_gray">报名时间：2018-11-11-2018-11-11</span>
				</li>
			</ul>
			<div class="details border_bottom">
				<ul class=" dis_flex1">
					<li>
						<span class="span_gray">今权益：</span>
						<span class="span_black">+131115</span>
					</li>
					<li>
						<span class="span_gray">初始资金：</span>
						<span class="span_black">12151.020</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">总收益：</span>
						<span class="span_red">+212.212</span>
					</li>
					<li>
						<span class="span_gray">排名:</span>
						<span class="span_black">11</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">跟投收益：</span>
						<span class="span_green">+212.212</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">跟投人数：</span>
						<span class="span_black">暂无</span>
					</li>
					<li>
						<span class="span_gray">排名:</span>
						<span class="span_black">11</span>
					</li>
				</ul>
				<ul class="dis_flex border_bottom">
					<li>
						<span class="span_gray">分成比例：</span>
						<span class="span_black">50%</span>
					</li>
				</ul>
			</div>
			<div class="h_20"></div>
			<div class="p_left border_bottom">
				<span>成交记录</span>	
			</div>
			
		</div>
	</div>	
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	export default{
		name:"matchUserDetails",
		components:{ topTitle },
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchUserDetails{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		.userP{
			width: 0.44rem;
			height: 0.44rem;
			display: inline-block;
			background: url(../../assets/images/match/userP.png) no-repeat;
			background-size: 0.44rem 0.44rem;
			margin-right: 0.2rem;
		}
		.details{
			width: 100%;
			height: 5rem;
			
		}
		.dis_flex2{
			display: flex;
			justify-content: space-between;
			padding: 0 0.3rem;
			width: 100%;
			height: 0.88rem;
			li{
				display: inline-flex;
				align-items: center;
			}
		}
		.dis_flex1{
			height: 1.48rem;
			padding: 0 0.3rem;
			width: 100%;
			li{
				height: 0.74rem;
				line-height: 0.74rem;
			}
		}
		.dis_flex{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.3rem;
			width: 100%;
			height: 0.88rem;
		}
		.span_gray{
			color:$grayDeep ;
		}
		.span_black{
			color: $blcakThin;
		}
		.span_red{
			color: $redDeep;
		}
		.span_green{
			color: $greenDeep;
		}
		.p_left{
			height: 0.64rem;
			width: 100%;
			line-height: 0.64rem;
			padding: 0 0.3rem;
			span{
				border-left: 0.04rem solid $redDeep;
				padding-left: 0.1rem;
			}
		}
	}
</style>