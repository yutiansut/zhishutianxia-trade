<template>
	<div id="matchDynamic ">
		<dynamicBar></dynamicBar>
	</div>
</template>

<script>
	import dynamicBar from"./dynamicBar.vue"
	export default{
		name:"matchDynamic",
		components:{ dynamicBar },
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	
</style>