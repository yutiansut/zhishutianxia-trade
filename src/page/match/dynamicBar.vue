<template>
	<div id="dynamicBar">
		<div id="container" class="border_bottom">
			<div class="tab" v-for="(n,index) in list" :class="{current:current == index}"  @click="switchTab(index)">
				<span>{{n}}</span>
			</div>
		</div>
		<components :is="currentView"></components>
	</div>
</template>

<script>
	import dynamicAll from "./dynamicAll.vue"
	import dynamicPassivity from "./dynamicPassivity.vue"
	import dynamicMine from "./dynamicMine.vue"
	export default{
		name:"",
		components:{dynamicAll,dynamicPassivity,dynamicMine}, 
		data(){
			return{
				list:["全部动态","被跟投动态","我的动态"],
				current:0,
				currentView:'dynamicAll'
			}
		},
		methods:{
			switchTab(index){
				this.current = index;
				switch (index){
					case 0:
					this.currentView = 'dynamicAll'
						break;
					case 1:
					this.currentView = 'dynamicPassivity'
						break;
					case 2:
					this.currentView = 'dynamicMine'
						break;

				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#dynamicBar{
		width: $w;
	}
	#container{
		padding: 0 0.3rem;
		width: 100%;
		display: flex;
		height: 0.8rem;
		justify-content:flex-start;
		.tab{
			margin-right: 0.4rem;
			line-height: 0.8rem;
			text-align: center;
		}
		span{
			font-size: $fs28;
			color:$blcakThin;
		}
		.current{
			span{
				color: $redDeep;
			}
		}
	}
</style>