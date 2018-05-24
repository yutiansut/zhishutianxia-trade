<template>
	<div id="">
		
	</div>
</template>

<script>
	export default{
		name:"backHistory",
		data(){
			return{
				endData:[]
			}
		},
		computed:{
			
		},
		mounted:function(){
			
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#historyRecords{
			width: 7.5rem;
			.list_title{
				width: 100%;
				overflow-x: scroll;
				border-bottom: 1px solid $bgDeep;
				ul{
					width: 18.6rem;
					display: block;
					padding: 0 0.3rem;
					
					li{
						border-bottom: 1px solid $bgDeep;
						text-align: center;
						line-height: 0.4rem;
						height: 0.8rem;
						&:nth-child(1){
							line-height: 0.8rem;
							span{
								color: $fontBlue;
							}
						}
						span{
							float: left;
							width: 2rem;
							display: block;
							overflow: hidden;
							label{
								color:$fontBlue;
							}
						}
					}
				}
			}
		}
</style>