<template>
	<div id="topBar">
		<h1>{{name}}</h1>
	</div>
</template>

<script>
	export default{
		name: 'topBar',
		props: ['name'],
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	h1{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		font-size: $fs32;
	}
</style>
