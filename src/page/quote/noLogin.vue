<template>
	<div id="index">
		<div class="main">
			<p>你还未登录指数天下账号哟</p>
			<div class="btn_box">
				<btn name="注册" className="bluemd" @tap.native="toRegister"></btn>
				<btn name="登录" className="orangemd" @tap.native="toLogin"></btn>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default {
		name: 'index',
		components: {btn},
		data(){
			return{
				selectNum: 0,
				tabList: ['自选', '市场'],
			}
		},
		methods: {
			toRegister: function(){
				this.$router.push({path: '/regisiter'});
			},
			toLogin: function(){
				this.$router.push({path: '/login'});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.main{
		margin-top: 1.01rem;
		p{
			font-size: 0.36rem;
			color: #525866;
			text-align: center;
			margin: 3.75rem 0 0.85rem 0;			
		}
		.btn_box{
			display: flex;
			#btn{
				margin-left: 0.3rem;
			}
		}
	}
	
	
</style>