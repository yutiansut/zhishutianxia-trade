<template>
	<div id="home">
		<p>哈哈哈</p>
		<bottomTab :tabSelect="tabSelected" href></bottomTab>
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

<style>
</style>