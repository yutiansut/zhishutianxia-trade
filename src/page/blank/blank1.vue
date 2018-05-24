<template>
	<div id="">
		
	</div>
</template>

<script>
	export default{
		name:"agreement",
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#back{
		background: url(../../assets/images/quote/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#agreement{
    	width: 7.5rem;
    	overflow: hidden;
    	padding-top: 1rem;
    	.page_cont{
    		overflow: hidden;
    		h3{
    			font-size: 0.26rem;
    			text-align: center;
    			height: 0.42rem;
    			line-height: 0.42rem;
    			border-bottom:1px solid $black;
    			padding: 0 0.3rem;
    			color: $yellow;
    		}
    		p{
    			line-height: 0.26rem;
    			color: $fontBlueTitle;
    			padding: 0.08rem 0.3rem;
    		}
    	}
    }
	
	
</style>