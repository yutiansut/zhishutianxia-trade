<template>
	<div id="codeDialog" v-show="ishow">
		<div class="bg"></div>
		<div class="codeDialog">
			<div class="page_cont">
				<h3 class="title">请先输入图形 验证码</h3>
				<div class="code_box">
					<input type="tel" class="fl" v-model="code" />
					<a href="javascript:void(0);" class="fr"><img :src="imgPath"/></a>
				</div>
				<div class="black"></div>
				<div class="btn_box">
					<span>确认</span>
					<span @click="cancel">取消</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../assets/js/common.js'
	import axios from "axios"
	export default{
		name: 'codeDialog',
		data(){
			return{
				ishow: false,
				code: '',
				msg: '',
				token: '',
				secret: '',
				phone: '',
				pwd: '',
				path: ''
			}
		},
		props: ['objstr','type'],
		computed: {
			info: function(){
				if(this.objstr){
					return JSON.parse(this.objstr);
				}
			},
			imgPath: function(){
				if(this.path) return this.path;
			},
			PATH: function(){
				return this.$store.getters.PATH;
			},
			version: function(){
				return '1.1';
			},
		},
		methods: {
			cancel:function(){
				this.ishow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	.bg {
		z-index: 101;
		background-color: rgba(51, 51, 64, 0.6);
		opacity: 0.6;
	}
	#codeDialog{
		width: 7.5rem;
	}
	.codeDialog {
		top: 50%;
		left: 50%;
		width: 6rem;
		height: 3.2rem;
		position: fixed;
		margin: -1.6rem 0 0 -3rem;
		border-radius:0.1rem;
		text-align: center;
		background-color: $bg;
		z-index: 105;
		.title {
			height: 0.88rem;
			border-radius: 0.1rem 0.1rem 0 0;
			line-height: 0.88rem;
			background-color: $blcakThin;
		}
		.code_box{
			width: 100%;
			position: relative;
			height: 1.48rem;
			line-height:1.48rem;
			border-bottom: 0.01rem solid $bgDeep;
			.fl{
				position: absolute;
				left: 0.2rem;
				top: 0.2rem;
				width: 2.7rem;
				height: 0.88rem;
				border: 0.01rem solid $bgDeep;
				border-radius: 0.1rem;
				color: $blackBold;
				font-size: $fs32;
				text-indent: 0.1rem;
			}
			.fr{
				position: absolute;
				top: 0.2rem;
				right: 0.2rem;
				border-radius: 0.1rem;
				border: 0.01rem solid $bgDeep;
				img{
					display: block;
					width: 2.7rem;
					height: 0.88rem;
					border-radius: 0.1rem;
				}
			}
		}
		.btn_box{
			width: 100%;
			height: 0.88rem;
			line-height: 0.88rem;
			border-radius: 0 0 0.1rem 0.1rem;
			padding: 0.1rem 0;
			span{
				float: left;
				display: block;
				width: 50%;
				height: 100%;
				font-size:$fs28; 
				color:$grayDeep; 
				&:nth-child(1){
					border-radius: 0 0 0 0.1rem;
					border-right: 0.01rem solid $bgDeep;
				}
				&:nth-child(2){
					border-radius: 0 0 0.1rem 0;
				}
			}
		}
	}
	
	
</style>



