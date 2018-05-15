<template>
	<div id="home">
		<p>哈哈哈</p>
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>
</template>

<script>
	import bottomTab from "../components/bottom_tab"
	export default{
		name:"home",
			components:{ bottomTab},
		data(){
			return{
				tabSelected:"home"
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#home{
		width: $w;
		// overflow: hidden;
		// position: fixed;
		// top: 0;
		// left: 0;
	}
</style>