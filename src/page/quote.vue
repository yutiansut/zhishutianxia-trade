<template>
    <div>
        <!-- 选项卡 -->
		<bottomTab :tabSelect="tabSelected"></bottomTab>
    </div>
</template>


<script>
import bottomTab from "../components/bottom_tab"
	export default{
		name: 'match',
		components:{  bottomTab},
		data(){
			return{
				selected:"1",
				tabSelected: 'quote'
			}
			
		},
		
	}
</script>

<style>
</style>