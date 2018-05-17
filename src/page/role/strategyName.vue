<template>
	<div id="strategyName">
		<mt-header :title="strategyName" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;line-height: 1rem;">
		 	<router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div id="container">
			<div class="info" v-if="this.strategyName == '金肯特纳策略'">
				<p class="title">肯特钠通道（KC）是一个移动平均通道，有三条线组合而成，若价格突破边界，则表示出现开仓机会</p>
				<p><span>1.</span> 计算最高价，收盘价，最低价的平均值: Three = (High + Close + Low)/3</p>
				<p><span>2.</span> 计算Three的20日移动平均MovThree</p>
				<p><span>3.</span> 计算真实波幅ATR</p>
				<p><span>开仓：</span>当本周期的MovThree > 上一周期的MovThree 并且 价格> 20日移动平均+ 2*ATR时，多头开仓。</p>
				<p>当本周期的MovThree < 上一周期的MovThree 并且 价格<20日移动平均- 2*ATR时，空头开仓。</p>
				<p><span>平仓：</span> 当价格< MovThree 时，持多头平仓；当价格> MovThree 时，持空头平仓。</p>
			</div>
			<div class="info" v-else-if="this.strategyName == '移动平均策略'">
				<p class="title">均线突破策略是一种最简单，也是最常用的趋势跟踪的策略。在其之上有非常多的止盈、止损点的变化以及不同参数的设置。 </p>
				<p><span>策略构建步骤:</span></p>
				<p><span>1.</span> 计算5周期以及10周期的移动均线（移动均线周期参数可设置）/p>
				<p><span>2.</span> 当5周期移动均线上穿10周期移动均线，多头开仓；反之当5周期移动均线下穿10周期移动均线，空头开仓。</p>
			</div>
			<div class="info" v-else-if="this.strategyName == '布林通道策略'">
				<p class="title">BOLL指标是美国股市分析家约翰·布林根据统计学中的 标准差原理设计出来的一种非常简单实用的技术分析指标。 由于它具有灵活性、直观性和趋势性的特点，BOLL指标是投资者广为应用的市场上热门指标。</p>
				<p><span>计算方法:</span></p>
				<p>布林中轨 = 20日移动平均</p>
				<p>布林上轨 = 20日移动均线 + 2*标准差</p>
				<p>布林下轨 = 20日移动均线 - 2*标准差</p>
				<p>当价格由下向上突破上轨时，多头开仓；当价格由上向下突破下轨道时，空头开仓</p>
			</div>
			<div class="info" v-else-if="this.strategyName == '海龟交易策略'">
				<p class="title">海龟交易创始人Riachard Dennis是七八十年代著名的期货投机商，是一位具有传奇色彩的人物，在多年的投机生涯中，Dennis出尽风头，给人的感觉是常常可以在最低点买进，然后在最高峰反手卖空。</p>
				<p class="title">他相信优秀的交易员是后天培养而非天生的。他在1983年12月招聘了23名新人，昵称为海龟，并对这些交易员进行了一个趋势跟踪交易策略培训。随后给予每个新人100万美元的初始资金。经5年的运作，大部分“海龟”的业绩非常惊人，其中最好的业绩达到1.72亿美元。</p>
				<p><span>步骤：</span></p>
				<p>唐安奇通道：当价格高于前20个交易周期内的最高值时多头入场，当价格低于前20个交易周期内的最低值时空头入场</p>
				<p>真实波幅TrueRange</p>
				<p>然后计算TrueRange 的20日移动平均值ATR</p>
				<p>买入的手数Unit= 总资金1% /（ATR*标的合约每手乘数）</p>
				<p>加仓：若当前持仓为多头：目标价格在上一次买入（或加仓）的基础上上涨了0.5ATR，则加仓一个Unit；若当前持仓为空头：目标价格在上一次买入（或加仓）的基础上下跌了0.5ATR，则加仓一个Unit</p>
				<p>平仓止损：当价格比最后一次买入价格下跌2*ATR时，则卖出全部头寸止损。空头同理</p>
				<p>平仓止盈：当价格跌破10日唐奇安通道下沿，清空头寸结束本次交易；空头同理</p>
			</div>
			<div class="info" v-else-if="this.strategyName == 'DualThrust'">
				<p class="title">Dual Thrust是一个趋势跟踪系统，由Michael Chalek在20世纪80年代开发，曾被Future Thruth杂志评为最赚钱的策略之一。Dual Thrust系统具有简单易用、适用度广的特点，其思路简单、参数很少，配合不同的参数、止盈止损和仓位管理，可以为投资者带来长期稳定的收益，被投资者广泛应用于股票、货币、贵金属、债券、能源及股指期货市场等</p>
				<p class="title">在Dual Thrust交易系统中，对于震荡区间的定义非常关键，这也是该交易系统的核心和精髓。Dual Thrust系统使用Range = Max(HH-LC,HC-LL)来描述震荡区间的大小。其中HH是N日High的最高价，LC是N日Close的最低价，HC是N日Close的最高价，LL是N日Low的最低价</p>
				<p><span>步骤：</span></p>
				<p><span>1、首先计算:</span></p>
				<p>(1)N日High的最高价HH, N日Close的最低价LC;</p>
				<p>(2)N日Close的最高价HC，N日Low的最低价LL;</p>
				<p>(3)Range = Max(HH-LC,HC-LL)</p>
				<p>(4)BuyLine = Open + K1*Range</p>
				<p>(5)SellLine = Open + K2*Range</p>
				<p><span>2.构造系统</span></p>
				<p>(1)当价格向上突破上轨时，如果当时持有空仓，则先平仓，再开多仓；如果没有仓位，则直接开多仓</p>
				<p>(2)当价格向下突破下轨时，如果当时持有多仓，则先平仓，再开空仓；如果没有仓位，则直接开空仓</p>
			</div>
			<div class="info" v-else-if="this.strategyName == 'RBreaker'">
				<p class="title">R-Breaker是一种短线交易策略，它结合了趋势和反转两种交易方式。曾14年排名Future Trust杂志年度前10最赚钱的策略。</p>
				<p><span>交易系统的基本原理如下：</span></p>
				<p><span>1、首先计算:</span></p>
				<p><span>1:</span>根据前一个交易日的收盘价、最高价和最低价数据通过一定方式计算出六个价位，从大到小依次为：突破买入价、观察卖出价、反转卖出价、反转买入价、观察买入价、突破卖出价。以此来形成当前交易日盘中交易的触发条件。通过对计算方式的调整，可以调节六个价格间的距离，进一步改变触发条件。</p>
				<p><span>2.</span> 追踪盘中价格走势，实时判断触发条件。具体条件如下：</p>
				<p>当日内最高价超过观察卖出价后，盘中价格出现回落，且进一步跌破反转卖出价构成的支撑线时，采取反转策略，即在该点位（反手、开仓）做空</p>
				<p>当日内最低价低于观察买入价后，盘中价格出现反弹，且进一步超过反转买入价构成的阻力线时，采取反转策略，即在该点位（反手、开仓）做多</p>
				<p>在空仓的情况下，如果盘中价格超过突破买入价，则采取趋势策略，即在该点位开仓做多</p>
				<p>在空仓的情况下，如果盘中价格跌破突破卖出价，则采取趋势策略，即在该点位开仓做空</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"strategyName",
		data(){
			return{
				strategyName:''
			}
		},
		activated:function(){
			this.strategyName = this.$route.query.strategyName;
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#strategyName{
		width: 7.5rem;
		#container{
			width:7.5rem;
			margin-top:1rem;
			.info{
				width: 100%;
				padding: 0.3rem 0.3rem 0 0.3rem;
				p{
					color: $fontBlue;
					font-size:0.24rem;
					line-height: 0.4rem;
				}
				span{
					color:#ffd400 ;
				}
				.title{
					color: $fontBlueTitle;
					font-size:0.28rem;
				}
			}
		}
	}
	
</style>