<template>
	<div id="dynamicAll">
		<div class="container">
			<div class="details">
				<div class="user border_bottom">
					<ul>
						<li><i class="userP"></i><span class="username">哈哈哈</span></li>
						<li><span class="income">收益：</span><span class="count">1.86%</span></li>
					</ul>
				</div>
			</div>
			<div class="h_20">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"dynamicAll",
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#dynamicAll{
		width: $w;
	}
	.details{
		height: 2.76rem;
		width: 100%;
		padding-left: 0.3rem;
	}
	.user{
		ul{
			height: 0.88rem;
			display: flex;
			justify-content: space-between;
			li{
				display: inline-flex;
				align-items: center;
			}
		}
	}
	.userP{
		display: inline-block;
		width: 0.44rem;
		height: 0.44rem;
		background: url(../../assets/images/match/userP.png) no-repeat;
		background-size: 0.44rem 0.44rem;
		margin-right: 0.2rem;
	}
	.username{
		font-size:$fs28;
		color: $grayDeep;
	}
	.income{
		font-size: $fs24;
		color: $grayDeep;
	}
	.count{
		font-size: $fs24;
		color: $greenDeep;
		margin-right: 0.3rem;
	}
</style>