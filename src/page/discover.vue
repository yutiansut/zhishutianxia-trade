<template>
	<div id="discover">
		 <mt-header fixed title="指数天下">           
            <mt-button slot="left" @click="goLast">
				<span class="icon_account"></span>
			</mt-button>
			<mt-button slot="right" @click="goto('/information')">
				<span class="icon_search"></span>
			</mt-button>
        </mt-header>
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>
</template>

<script>
import bottomTab from "../components/bottom_tab"	
	export default{
		name:"discover",
			components:{ bottomTab},
		data(){
			return{
				tabSelected:'discover'
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#discover{
		width: $w;
		
	}
	.icon_account,.icon_search {
	display: inline-block;
	width: 0.32rem;
	height: 0.32rem;
	background: url("../assets/images/account/account_user.png") center
		no-repeat;
	background-size: cover;
	}
	.icon_search{
		background: url("../assets/images/account/account_user.png") center
		no-repeat;
		background-size: cover;
	}
</style>