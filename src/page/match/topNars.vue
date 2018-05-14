<template>
	<div id="topNars">
		<topTitle title="模拟比赛" type="0" type1="0" :matchid="matchid"></topTitle>
		<div id="container">
			<div class="tab" v-for="(n,index) in list" :class="{current:current == index}"  @click="switchTab(index)">
				<span>{{n}}</span>
			</div>
		</div>
		<components :is="currentView" :matchid="matchid" @getStatus="getStatus"></components>
	</div>
</template>

<script>
	import topTitle from "../../components/topTitle.vue"
	import matchRules from "./matchRules.vue"
	import matchRanking from "./matchRanking.vue"
	import matchDynamic from "./matchDynamic.vue"
	export default {
		name:"topNars",
		components:{ topTitle,matchRules,matchRanking,matchDynamic },
		data(){
			return{
				selected:"1",
				list:["比赛规则","排行榜","比赛动态"],
				current:0,
				currentView:'matchRules',
				matchid:"",
				status:""
			}
		},
		methods:{
			getStatus(...data){
				this.status = data[0].status;
				console.log(typeof this.status);
			},
			switchTab(index){
				switch (index){
					case 0:
						this.current = index;
						this.currentView = 'matchRules'
						break;
					case 1:
						if(this.status == 1 || this.status == 2){
							this.$toast({message: '比赛未开始，不能查看排行榜',duration: 2000});
							console.log("1111")
						}else{
							this.current = index;
							this.currentView = 'matchRanking'
						}
						
						break;
					case 2:
						if(this.status == 1 || this.status == 2){
							this.$toast({message: '比赛未开始，不能查看排行榜',duration: 2000});
							console.log("1111")
						}else{
							this.current = index;
							this.currentView = 'matchDynamic'
						}
						break;

				}
			}
		},
		mounted:function(){
			this.current = 0;
			this.currentView = 'matchRules';
		},
		activated:function(){
			this.current = 0;
			this.currentView = 'matchRules';
			this.matchid = this.$route.query.matchId
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#topNars{
		width: $w;
	}
	#container{
		margin-top: 0.96rem;
		width: 100%;
		display: flex;
		height: 0.8rem;
		justify-content: space-between;
		.tab{
			line-height: 0.8rem;
			text-align: center;
			flex: 1;
		}
		span{
			font-size: $fs28;
			color:$blcakThin;
		}
		.current{
			color: $redDeep;
			border-bottom: 0.03rem solid $redDeep;
			span{
				color: $redDeep;
			}
		}
	}
</style>