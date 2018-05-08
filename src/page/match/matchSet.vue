<template>
	<div id="matchSet">
		<topTitle title="跟投设置" type="0" type1="2"></topTitle>
		<div id="container">
			<ul class="dis_flex">
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	export default{
		name:'matchSet',
		components:{ topTitle },
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#matchSet{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		width: 100%;
	}
	
	
</style>