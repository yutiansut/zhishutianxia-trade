<template>
	<div id="loginHeader">
		<mt-tabbar v-model="tabSelected">
			<template v-for="(item,index) in tabList">
				<mt-tab-item :id="item.path" :key="item.path">
					<span class="icon" :class="['icon'+(index+1),{'icon-checked':item.path === tabSelected}]"  slot="icon"></span>
					{{item.name}}
				</mt-tab-item>
			</template>
		</mt-tabbar>
	</div>
</template>

<script>
	export default{
		name:"bottom_tab",
		props:['tabSelect',"type"],
		data(){
			return{
				tabSelected: this.tabSelect,
				tabList: [
					{
						name: '首页',
						path: 'home'
					},
					{
						name: '行情',
						path: 'quote'
					},
					{
						name: '交易',
						path: 'trade'
					},
					{
						name: '比赛',
						path: 'match'
					},
					{
						name: '发现',
						path: 'discover'
					}

				],
			}
		},
		methods:{
			
		},
		watch: {
			tabSelected (value ,oldValue) {
				this.$router.push({path: `/${value}`})
				//value = this.tabSelect
				// //console.log(value)
				// let path = this.$router.path.slice(1);
				// if(path === this.tabSelect){
				// 	value = path
				// }
				
			},
		},
		// updated () {
		// 	console.log(this.tabSelected)
		// 	this.tabSelect = 
		// 	this.tabSelected = this.tabSelect
		// }
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#loginHeader{
		width: $w;
		position: fixed;
		top: 0;
		z-index: 1;
	}
.icon{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  //background: url('../assets/img/icon_colour.png') top center no-repeat;
  background-size: cover;
}

@for $i from 1 through 5 {
  $img: ("index", "quotation", "trade", "match", "discover");
  .icon#{$i}{
	background: url('../assets/images/account/#{nth($img,$i)}_tab_icon.png') center no-repeat;
	background-size: cover;
  }
  .icon#{$i}.icon-checked{
	background-image: url('../assets/images/account/#{nth($img,$i)}_tab_icon_checked.png')
  }	
}
	
	
</style>