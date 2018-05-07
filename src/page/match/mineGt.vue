<template>
	<div id="mineGt">
		<topTitle title="我的跟投者" type="0" type1="2"></topTitle>
		<div id="container">
			<div class="tip">
				<ul>
					<li>
						<span class="span_gray">提取收益率：</span>
						<span class="span_black">12%</span>
					</li>
					<li>
						<span class="span_gray">跟投人数:</span>
						<span class="span_black">3</span>
					</li>
				</ul>
			</div>
			<div class="h_20"></div>
			<div class="details">
				<ul class="border_bottom" v-for="n in 5">
					<li>
						<i class="user"></i>
						<span class="span_gray">欧冠决赛</span>
					</li>
					<li>
						<span class="span_simp">2018-11-11-2018-11-11</span>
						<span class="color_red">正向</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	export default{
		name:"mineGt",
		components:{ topTitle },
		data(){
			return{
				
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#mineGt{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		width: 100%;
		.tip{
			ul{
				font-size: $fs28;
				padding: 0 0.3rem;
				height: 0.88rem;	
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.span_gray{
			color: $grayDeep;
		}
		.span_black{
			color: $blcakThin;
		}
		.span_simp{
			color: $graySimple;
		}
		.color_red{
			color: $redDeep;
			margin-left: 0.4rem;
		}
		.details{
			ul{
				font-size: $fs28;
				padding: 0 0.3rem;
				width: 100%;
				height: 0.88rem;
				display: flex;
				justify-content: space-between;
				li{
					display: inline-flex;
					align-items: center;
				}
			}
		}
		.user{
			width: 0.44rem;
			height: 0.44rem;
			display: inline-block;
			background: url(../../assets/images/match/userP.png) no-repeat;
			background-size: 0.44rem 0.44rem;
			margin-right: 0.2rem;
		}
	}
</style>