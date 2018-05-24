<template>
	<div id="">
		
	</div>
</template>

<script>
	export default{
		name:"backDetails",
		data(){
			return{
//				backtestIndex:""
				testDays:"",//测试天数
				testZhouqi:'',//测试周期
				finalReturn:"",//最终受益
				winTimes:'',//交易胜率
				tradeTimes:"",//交易次数
				winRate:"",//盈利次数
				tradeFrequency:"",//交易平率
				maxDrawndown:"",//最大回测
				finalPortfolio:"",//最终权益
				loseTimes:"",//亏损次数
				commission:"",//总手续费
				yearlyReturn:"",//年化收益率
				sharpeRatio:'',//夏普率
				timeend:"",//结束时间
				timestart:"",//开始时间
				port:"",//合约
				initialaccount:"",//初始资金
				frequency:""//k线类型
			}
		},
		computed:{
			backtestIndexArr:function(){
				return this.$store._modules.root.state.account.backtestIndexArr
			}
		},
		activated:function(){
			
		},
		mounted:function(){
//			console.log("this.backtestIndex==========="+JSON.stringify(this.backtestIndex))
		},
		filters:{
			changPoint:function(e){
				var str=Number(e*100).toFixed(2);
			    str+="%";
			    return str;
			},
			changPoint1:function(e){
				return Number(e).toFixed(2);
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#backDetails{
		width: 7.5rem;
		.title_left{
			padding-left:0.3rem;
			width:100%;
			height:0.65rem;
			border-bottom: 1px solid $bgDeep;
			border-top: 1px solid $bgDeep;
			background-color:#f2f2f2;
			line-height:0.65rem;
		}
		.detailsInfo{
			height: 0.9rem;
			line-height: 0.9rem;
			font-size: 0.28rem;
			padding: 0 0.3rem;
			span{
				&:nth-child(2){
					color: #ff4c4c;
					margin-left: 0.1rem;
				}
				&:nth-child(3){
					margin-left: 0.3rem;
				}
				&:nth-child(4){
					color: #12b362;
					margin-left: 0.1rem;
				}
			}
		}
		.describe{
			height: 4.5rem;
		}
		.span_bwt{
			li{
				padding: 0 0.3rem;
				height:0.5rem ;
				line-height: 0.5rem;
				display: flex;
				justify-content: space-between;
				font-size: 0.28rem;
			}
		}
		.Assessment{
			height: 1.5rem;
		}
		.Statistics{
			height: 1.5rem;
		}
		.Notice{
			border-top: 1px solid $bgDeep;
			padding: 0 0.3rem;
			width: 100%;
			height: 1rem;
			line-height: 1rem;
			span{
				&:nth-child(2){
					color: $redDeep;
				}
			}
		}
	}
	
</style>