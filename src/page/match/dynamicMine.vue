<template>
	<div id="dynamicMine">
		<div class="container" v-for="n in 5">
			<div class="buyDetails">
				<ul>
					<li>卖出：<span>国际原油</span>cl1820</li>
					<li>价格：<span>152.5</span></li>
				</ul>
				<ul>
					<li>10分钟前</li>
				</ul>
			</div>
			<div class="h_20"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"dynamicMine",
		data(){
			return{
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#dynamicMine{
		width: $w;
	}
	.buyDetails{
		width: 100%;
		height: 1.88rem;
		padding-left: 0.3rem;
		color: $grayDeep;
		font-size: $fs28;
		ul{
			&:nth-child(1){
				margin-top: 0.3rem;
				height: 0.75rem;
				line-height: 0.4rem;
			}
			&:nth-child(2){
				margin-top: 0.4rem;
				font-size: $fs24;
			}
		}
		span{
			color:$blcakThin ;
		}
	}
</style>