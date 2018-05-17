<template>
	<div id="moneyDetails">
		<div class="title">
			<li><span>币种</span></li>
			<li><span>昨结存</span></li>
			<li><span>今权益</span></li>
			<li><span>今可用</span></li>
			<li><span>保证金</span></li>
			<li><span>冻结资金</span></li>
			<li><span>逐笔浮盈</span></li>
			<li><span>平仓盈亏</span></li>
			<li><span>入金</span></li>
			<li><span>出金</span></li>
		</div>
		<div class="cont">
			<ul>
				<li>
					<span>美元</span>
					<span>人民币</span>
					<span>欧元</span>
					<span>港币</span>
					<span>日元</span>
				</li>
				<template v-for="key in moneyDetailList">
					<li>
						<span>{{key.val[0]}}</span>
						<span>{{key.val[4]}}</span>
						<span>{{key.val[2]}}</span>
						<span>{{key.val[1]}}</span>
						<span>{{key.val[3]}}</span>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: "moneyDetails",
		components: {},
		data(){
			return{
				status: 0,
				moneyDetailList: []
			}
		},
		computed: {
			moneyDetail: function(){
				return this.$store.state.market.CacheAccount.moneyDetail;
			},
			jCacheAccount(){
				return this.$store.state.market.CacheAccount.jCacheAccount;
			}
		},
		watch: {
			moneyDetail: function(n, o){
				this.status = 1;
				this.moneyDetailList = [];
				var OldAmount = {title: '昨结存', val: []}, 
					TodayBalance = {title: '今权益', val: []}, 
					TodayCanUse = {title: '今可用', val: []},  
					Deposit = {title: '保证金', val: []},  
					FrozenMoney = {title: '冻结资金', val: []}, 
					FloatingProfit = {title: '逐笔浮盈', val: []},
					CloseProfit = {title: '平仓盈亏', val: []},
					InMoney = {title: '入金', val: []},
					OutMoney = {title: '出金', val: []};
				n.forEach(function(o, i){
					if(o.AccountNo == 'USD'){
						OldAmount.val[0] = parseFloat(o.OldAmount).toFixed(2);
						TodayBalance.val[0] = parseFloat(o.TodayBalance).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit).toFixed(2) : parseFloat(o.TodayBalance).toFixed(2);//今权益
						TodayCanUse.val[0] = parseFloat(o.TodayCanUse).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit-o.Deposit-o.FrozenMoney).toFixed(2):parseFloat(o.TodayCanUse).toFixed(2);//今可用
						Deposit.val[0] = parseFloat(o.Deposit).toFixed(2);//保证金
						FrozenMoney.val[0] = parseFloat(o.FrozenMoney).toFixed(2);//冻结资金
						FloatingProfit.val[0] = parseFloat(o.FloatingProfit).toFixed(2);//逐笔浮盈
						CloseProfit.val[0] = parseFloat(o.CloseProfit).toFixed(2);//平仓盈亏
						InMoney.val[0] = parseFloat(o.InMoney).toFixed(2); //入金
						OutMoney.val[0] = parseFloat(o.OutMoney).toFixed(2);//出金
					}else if(o.AccountNo == 'HKD-HKFE'){
						OldAmount.val[1] = parseFloat(o.OldAmount).toFixed(2);
						TodayBalance.val[1] = parseFloat(o.TodayBalance).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit).toFixed(2) : parseFloat(o.TodayBalance).toFixed(2);//今权益
						TodayCanUse.val[1] = parseFloat(o.TodayCanUse).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit-o.Deposit-o.FrozenMoney).toFixed(2):parseFloat(o.TodayCanUse).toFixed(2);//今可用
						Deposit.val[1] = parseFloat(o.Deposit).toFixed(2);//保证金
						FrozenMoney.val[1] = parseFloat(o.FrozenMoney).toFixed(2);//冻结资金
						FloatingProfit.val[1] = parseFloat(o.FloatingProfit).toFixed(2);//逐笔浮盈
						CloseProfit.val[1] = parseFloat(o.CloseProfit).toFixed(2);//平仓盈亏
						InMoney.val[1] = parseFloat(o.InMoney).toFixed(2); //入金
						OutMoney.val[1] = parseFloat(o.OutMoney).toFixed(2);//出金
					}else if(o.AccountNo == 'EUR'){
						OldAmount.val[2] = parseFloat(o.OldAmount).toFixed(2);
						TodayBalance.val[2] = parseFloat(o.TodayBalance).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit).toFixed(2) : parseFloat(o.TodayBalance).toFixed(2);//今权益
						TodayCanUse.val[2] = parseFloat(o.TodayCanUse).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit-o.Deposit-o.FrozenMoney).toFixed(2):parseFloat(o.TodayCanUse).toFixed(2);//今可用
						Deposit.val[2] = parseFloat(o.Deposit).toFixed(2);//保证金
						FrozenMoney.val[2] = parseFloat(o.FrozenMoney).toFixed(2);//冻结资金
						FloatingProfit.val[2] = parseFloat(o.FloatingProfit).toFixed(2);//逐笔浮盈
						CloseProfit.val[2] = parseFloat(o.CloseProfit).toFixed(2);//平仓盈亏
						InMoney.val[2] = parseFloat(o.InMoney).toFixed(2); //入金
						OutMoney.val[2] = parseFloat(o.OutMoney).toFixed(2);//出金
					}else if(o.AccountNo == 'JPY'){
						OldAmount.val[3] = parseFloat(o.OldAmount).toFixed(2);
						TodayBalance.val[3] = parseFloat(o.TodayBalance).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit).toFixed(2) : parseFloat(o.TodayBalance).toFixed(2);//今权益
						TodayCanUse.val[3] = parseFloat(o.TodayCanUse).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit-o.Deposit-o.FrozenMoney).toFixed(2):parseFloat(o.TodayCanUse).toFixed(2);//今可用
						Deposit.val[3] = parseFloat(o.Deposit).toFixed(2);//保证金
						FrozenMoney.val[3] = parseFloat(o.FrozenMoney).toFixed(2);//冻结资金
						FloatingProfit.val[3] = parseFloat(o.FloatingProfit).toFixed(2);//逐笔浮盈
						CloseProfit.val[3] = parseFloat(o.CloseProfit).toFixed(2);//平仓盈亏
						InMoney.val[3] = parseFloat(o.InMoney).toFixed(2); //入金
						OutMoney.val[3] = parseFloat(o.OutMoney).toFixed(2);//出金
					}else if(o.AccountNo == 'CNY'){
						OldAmount.val[4] = parseFloat(o.OldAmount).toFixed(2);
						TodayBalance.val[4] = parseFloat(o.TodayBalance).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit).toFixed(2) : parseFloat(o.TodayBalance).toFixed(2);//今权益
						TodayCanUse.val[4] = parseFloat(o.TodayCanUse).toFixed(2)==0?parseFloat(o.TodayAmount+o.FloatingProfit-o.Deposit-o.FrozenMoney).toFixed(2):parseFloat(o.TodayCanUse).toFixed(2);//今可用
						Deposit.val[4] = parseFloat(o.Deposit).toFixed(2);//保证金
						FrozenMoney.val[4] = parseFloat(o.FrozenMoney).toFixed(2);//冻结资金
						FloatingProfit.val[4] = parseFloat(o.FloatingProfit).toFixed(2);//逐笔浮盈
						CloseProfit.val[4] = parseFloat(o.CloseProfit).toFixed(2);//平仓盈亏
						InMoney.val[4] = parseFloat(o.InMoney).toFixed(2); //入金
						OutMoney.val[4] = parseFloat(o.OutMoney).toFixed(2);//出金
					}
				}.bind(this));
				this.moneyDetailList.push(OldAmount);
				this.moneyDetailList.push(TodayBalance);
				this.moneyDetailList.push(TodayCanUse);
				this.moneyDetailList.push(Deposit);
				this.moneyDetailList.push(FrozenMoney);
				this.moneyDetailList.push(FloatingProfit);
				this.moneyDetailList.push(CloseProfit);
				this.moneyDetailList.push(InMoney);
				this.moneyDetailList.push(OutMoney);
			}
		},
		mounted: function(){
			//初始化页面数据
			if(this.status == 0){
				let TodayCanUse = parseFloat(this.jCacheAccount['USD'].TodayAmount) - parseFloat(this.jCacheAccount['USD'].Deposit) - parseFloat(this.jCacheAccount['USD'].FrozenMoney);//HKD-HKFE--JPY
				let TodayCanUse1 = parseFloat(this.jCacheAccount['CNY'].TodayAmount) - parseFloat(this.jCacheAccount['CNY'].Deposit) - parseFloat(this.jCacheAccount['CNY'].FrozenMoney);//HKD-HKFE--JPY
				let TodayCanUse2 = parseFloat(this.jCacheAccount['EUR'].TodayAmount) - parseFloat(this.jCacheAccount['EUR'].Deposit) - parseFloat(this.jCacheAccount['EUR'].FrozenMoney);//HKD-HKFE--JPY
				let TodayCanUse3 = parseFloat(this.jCacheAccount['HKD-HKFE'].TodayAmount) - parseFloat(this.jCacheAccount['HKD-HKFE'].Deposit) - parseFloat(this.jCacheAccount['HKD-HKFE'].FrozenMoney);//HKD-HKFE--JPY
				let TodayCanUse4 = parseFloat(this.jCacheAccount['JPY'].TodayAmount) - parseFloat(this.jCacheAccount['JPY'].Deposit) - parseFloat(this.jCacheAccount['JPY'].FrozenMoney);//HKD-HKFE--JPY
				this.moneyDetailList.push({title: '昨结存', val: [parseFloat(this.jCacheAccount['USD'].OldAmount).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].OldAmount).toFixed(2),parseFloat(this.jCacheAccount['EUR'].OldAmount).toFixed(2),parseFloat(this.jCacheAccount['JPY'].OldAmount).toFixed(2),parseFloat(this.jCacheAccount['CNY'].OldAmount).toFixed(2)]});
				this.moneyDetailList.push({title: '今权益', val: [parseFloat(this.jCacheAccount['USD'].TodayAmount).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].TodayAmount).toFixed(2),parseFloat(this.jCacheAccount['EUR'].TodayAmount).toFixed(2),parseFloat(this.jCacheAccount['JPY'].TodayAmount).toFixed(2),parseFloat(this.jCacheAccount['CNY'].TodayAmount).toFixed(2)]});
				this.moneyDetailList.push({title: '今可用', val: [parseFloat(TodayCanUse).toFixed(2),parseFloat(TodayCanUse3).toFixed(2),parseFloat(TodayCanUse2).toFixed(2),parseFloat(TodayCanUse4).toFixed(2),parseFloat(TodayCanUse1).toFixed(2)]});
				this.moneyDetailList.push({title: '保证金', val: [parseFloat(this.jCacheAccount['USD'].Deposit).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].Deposit).toFixed(2),parseFloat(this.jCacheAccount['EUR'].Deposit).toFixed(2),parseFloat(this.jCacheAccount['JPY'].Deposit).toFixed(2),parseFloat(this.jCacheAccount['CNY'].Deposit).toFixed(2)]});
				this.moneyDetailList.push({title: '冻结资金', val: [parseFloat(this.jCacheAccount['USD'].FrozenMoney).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].FrozenMoney).toFixed(2),parseFloat(this.jCacheAccount['EUR'].FrozenMoney).toFixed(2),parseFloat(this.jCacheAccount['JPY'].FrozenMoney).toFixed(2),parseFloat(this.jCacheAccount['CNY'].FrozenMoney).toFixed(2)]});
				this.moneyDetailList.push({title: '逐笔浮盈', val: [parseFloat(this.jCacheAccount['USD'].FloatingProfit).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].FloatingProfit).toFixed(2),parseFloat(this.jCacheAccount['EUR'].FloatingProfit).toFixed(2),parseFloat(this.jCacheAccount['JPY'].FloatingProfit).toFixed(2),parseFloat(this.jCacheAccount['CNY'].FloatingProfit).toFixed(2)]});
				this.moneyDetailList.push({title: '平仓盈亏', val: [parseFloat(this.jCacheAccount['USD'].CloseProfit).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].CloseProfit).toFixed(2),parseFloat(this.jCacheAccount['EUR'].CloseProfit).toFixed(2),parseFloat(this.jCacheAccount['JPY'].CloseProfit).toFixed(2),parseFloat(this.jCacheAccount['CNY'].CloseProfit).toFixed(2)]});
				this.moneyDetailList.push({title: '入金', val: [parseFloat(this.jCacheAccount['USD'].InMoney).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].InMoney).toFixed(2),parseFloat(this.jCacheAccount['EUR'].InMoney).toFixed(2),parseFloat(this.jCacheAccount['JPY'].InMoney).toFixed(2),parseFloat(this.jCacheAccount['CNY'].InMoney).toFixed(2)]});
				this.moneyDetailList.push({title: '出金', val: [parseFloat(this.jCacheAccount['USD'].OutMoney).toFixed(2),parseFloat(this.jCacheAccount['HKD-HKFE'].OutMoney).toFixed(2),parseFloat(this.jCacheAccount['EUR'].OutMoney).toFixed(2),parseFloat(this.jCacheAccount['JPY'].OutMoney).toFixed(2),parseFloat(this.jCacheAccount['CNY'].OutMoney).toFixed(2)]});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.title{
		float: left;
		width: 1.6rem;
		overflow: hidden;
		li{
			width: 1.6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			background: $titleBlue;
			border-bottom: 0.01rem solid $black;
			border-right: 0.01rem solid $black;
			padding-left: 0.3rem;
		}
		span{
			color: $fontBlue;
			font-size: $fs28;
			
		}
	}
	.cont{
		float: left;
		width: 5.9rem;
		overflow-x: auto;
		li{
			width: 8.7rem;
			height: 0.88rem;
			line-height: 0.88rem;
			border-bottom: 0.01rem solid $black;
			padding-left: 0.3rem;
			span{
				display: inline-block;
				width: 1.6rem;
				height: 0.88rem;
				text-align: left;
				color: $fontBlue;
				font-size: $fs24;
				
			}
		}
	}
</style>