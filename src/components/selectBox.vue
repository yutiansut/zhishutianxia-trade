<template>
	<div id="selectBox" class="select_box">
		<div class="bg" v-show="shadeShow" @click.stop="closeSelectEvent"></div>
		<div class="select_cont">
			<ul>
				<li v-if="type == 'order'" v-for="v in obj" @click.stop="selectEvent(v.commodityNo)">
					<span>{{v.commodityName}}&nbsp;&nbsp;{{v.commodityNo + orderTemplist[v.commodityNo].MainContract}}</span>
				</li>
				<li v-if="type == 'price'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v}}</span>
				</li>
				<li v-if="type == 'condition'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v | conditionTypeSwitch}}</span>
				</li>
				<li v-if="type == 'additionalCondition'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v | conditionTypeSwitch}}</span>
				</li>
				<li v-if="type == 'direction'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v | directionTypeSwitch}}</span>
				</li>
				<li v-if="type == 'conditionPrice'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v | priceTypeSwitch}}</span>
				</li>
				<li v-if="type == 'accounts'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v.account}}</span>
				</li>
				<li v-if="type == 'echarts'" v-for="v in obj" @click.stop="selectEvent(v)">
					<span>{{v}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'selectBox',
		props: ['obj', 'type'],
		data(){
			return{
				shadeShow: false,
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
		},
		filters: {
			conditionTypeSwitch: function(e){
				if(e == '0'){
					return '>';
				}else if(e == '1'){
					return '<';
				}else if(e == '2'){
					return '>=';
				}else if(e == '3'){
					return '<=';
				}
			},
			directionTypeSwitch: function(e){
				if(e == 0){
					return '买入';
				}else if(e == 1){
					return '卖出';
				}
			},
			priceTypeSwitch: function(e){
				if(e == 1){
					return '市价';
				}else if(e == 2){
					return '对手价';
				}
			}
		},
		methods: {
			closeSelectEvent: function(){
				this.shadeShow = false;
				$(".select_cont").css({bottom: -5.3 + 'rem'});
			},
			selectEvent: function(str){
				if(this.type == 'order'){
					this.$parent.$parent.currentNo = str;
					this.$store.state.market.currentNo = str;
				}else if(this.type == 'price'){
					this.$parent.priceType = str;
				}else if(this.type == 'condition'){
					this.$parent.selectType = str;
				}else if(this.type == 'additionalCondition'){
					this.$parent.selectAdditionalType = str;
				}else if(this.type == 'direction'){
					this.$parent.directionType = str;
				}else if(this.type == 'conditionPrice'){
					this.$parent.priceType = str;
				}else if(this.type == 'accounts'){
					this.$parent.user = str.account;
					this.$parent.pwd = str.pwd;
				}else if(this.type == 'echarts'){
					this.$store.state.isshow.isfensshow = false;
					this.$store.state.isshow.islightshow = false;
					this.$store.state.isshow.isklineshow = false;
					this.$parent.currentChartsNum = 8;
					if(str == '2小时'){
						this.$parent.currentChartsView = 'klineTwoHour';
						this.$parent.chooseKline = "2hour";
						this.$parent.intervalTime = 7200000;
					}else if(str == '4小时'){
						this.$parent.currentChartsView = 'klineFourHour';
						this.$parent.chooseKline = "4hour";
						this.$parent.intervalTime = 14400000;
					}else if(str == '12小时'){
						this.$parent.currentChartsView = 'klineTwelveHour';
						this.$parent.chooseKline = "12hour";
						this.$parent.intervalTime = 43200000;
					}
				}
				this.shadeShow = false;
				$(".select_cont").css({bottom: -5.3 + 'rem'});
			}
		},
		mounted: function(){
//			console.log(this.obj);
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	.bg{
		z-index: 101;
	}
	.select_box{
		.select_cont{
			position: fixed;
			bottom: -5.3rem;
			left: 0;
			z-index: 102;
			width: 7.5rem;
			height: 5.3rem;
			overflow-y: auto;
			background: $white;
			transition: all .3s;
			li{
				width: 7.5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-bottom: 0.01rem solid #e6e6e6;
				/*&:first-child{
					span{
						font-weight: bold;
					}
				}*/
				span{
					color: #1a1a1a;
					font-size: $fs28;
				}
			}
		}
	}
</style>
