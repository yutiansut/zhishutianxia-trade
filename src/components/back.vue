<template>
	<div id="back" @tap="goback">
		<i class="icon icon_back"></i>
	</div>
</template>

<script>
	export default{
		name: 'back',
		computed: {},
		props: ['type'],
		methods:{
			goback: function(){
				if(this.type == 0) return;
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped lang="scss">
	.icon_back{
		width: 0.64rem;
		height: 1rem;
		background: url(../assets/images/quote/back_icon.png) no-repeat 0.3rem 0.34rem;
		background-size: 0.24rem 0.32rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}
</style>
