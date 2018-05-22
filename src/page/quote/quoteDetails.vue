<template>
	<div id="quoteDetails">
		<template v-for="(v, index) in parameters">
		<div v-if="v.CommodityNo == currentNo">
			<header>
				<i class="icon icon_back" @tap="goBackEvent"></i>
				<div class="title" @tap="switchEvent">
					<div class="name fl">
						<span>{{v.CommodityName}}</span>
						<span>{{v.CommodityNo + v.MainContract}}</span>
					</div>
					<i class="icon icon_triangle"></i>
				</div>
				<button @tap="toRole">规则</button>
			</header>
			<div class="main">
				<div class="details">
					<div class="cont">
						<p class="name"><span>{{v.CommodityName}}</span>&nbsp;&nbsp;{{v.CommodityNo + v.MainContract}}</p>
						<p class="price" :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
						<p class="change" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}&nbsp;&nbsp;<em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</p>
						<div class="row">
							<div class="col">
								<span>现手</span>
								<span>{{v.LastQuotation.LastVolume}}</span>
							</div>
							<div class="col">
								<span>买价</span>
								<span class="default" :class="{red: v.LastQuotation.BidPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>卖价</span>
								<span class="default" :class="{red: v.LastQuotation.AskPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<span>买量</span>
								<span>{{v.LastQuotation.BidQty1}}</span>
							</div>
							<div class="col">
								<span>卖量</span>
								<span>{{v.LastQuotation.AskQty1}}</span>
							</div>
							<div class="col">
								<span>成交量</span>
								<span>{{v.LastQuotation.TotalVolume}}</span>
							</div>
							<div class="col">
								<span>持仓量</span>
								<span>{{v.LastQuotation.Position}}</span>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<span>开盘</span>
								<span class="default" :class="{red: v.LastQuotation.OpenPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.OpenPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>昨结</span>
								<span>{{v.LastQuotation.PreSettlePrice | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>最高价</span>
								<span class="default" :class="{red: v.LastQuotation.HighPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.HighPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.HighPrice | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>最低价</span>
								<span class="default" :class="{red: v.LastQuotation.LowPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LowPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LowPrice | fixNum(v.DotSize)}}</span>
							</div>
						</div>
					</div>
					<div class="contrast">
						<div class="title">
							<!--<i class="icon icon_contrast fl"></i>-->
							<span v-for="(val,index) in changeContrast" :class="{currentContrast:currentContrast == index}" @click="changeContrastList(index)">{{val}}</span>
						</div>
						<div class="contrast_list" v-show="showContrast">
							<div class="empty" v-if="noContrast">
								<p>无对比合约</p>
							</div>
							<ul v-show="!noContrast">
								<template v-for="(v, index) in parameters">
									<li :class="{current: v.check == 1}" @tap="addContrast(v.CommodityNo)" v-if="v.CommodityNo != currentNo">
										<div class="name fl">
											<span>{{v.CommodityName}}</span>
											<span>{{v.CommodityNo + v.MainContract}}</span>
										</div>
										<p class="price" :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}<i class="icon icon_arrow" :class="{up: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, down: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i></p>
										<p :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</p>
										<i class="icon" :class="{icon_check: v.check == 0, icon_checked: v.check == 1}"></i>
									</li>
								</template>
							</ul>
						</div>
						<div v-show="backProbe" class="strategy_list">
							<div v-for="(val,k,index) in strategyList" class="choseStrategyClass" :class="{choseStrategyClass1:currentss==index}">
								<span @click="choseStrategy(k,index)">{{val}}</span>
								<button @click="toBackProbe(val,k)">回测</button>
							</div>
							<div v-show="showNoneStrategy" style="font-size: 0.36rem;text-align: center;margin-top: 40%;">
								无可用策略
							</div>
						</div>
					</div>
				</div>
				<div class="chart_box">
					<div class="title">
						<div class="title_box">
							<template v-for="(key,index) in chartsList">
								<span :class="{current: currentChartsNum == index}" @tap="menuEvent(index)">{{key}}</span>
							</template>
							<span class="fr" :class="{current: currentChartsNum == 8}" @click="openSelectBox">更多</span>
						</div>
					</div>
					<div class="cont">
						<div class="chart fl">
							<components :is="currentChartsView" v-if="chartsShow"></components>
						</div>
						<div class="cont_right fl">
							<div class="tab_title">
								<template v-for="(o, index) in tabList">
									<span :class="{current: currentNum == index}" @tap="tabEvent(index)">{{o}}</span>
								</template>
							</div>
							<div class="tab_cont">
								<div class="five_quote" v-show="tabShow">
									<h3>卖五档</h3>
									<ul>
										<li>
											<span>卖五</span>
											<span :class="{red: v.LastQuotation.AskPrice5 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice5 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice5 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty5}}</span>
										</li>
										<li>
											<span>卖四</span>
											<span :class="{red: v.LastQuotation.AskPrice4 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice4 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice4 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty4}}</span>
										</li>
										<li>
											<span>卖三</span>
											<span :class="{red: v.LastQuotation.AskPrice3 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice3 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice3 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty3}}</span>
										</li>
										<li>
											<span>卖二</span>
											<span :class="{red: v.LastQuotation.AskPrice2 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice2 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice2 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty2}}</span>
										</li>
										<li>
											<span>卖一</span>
											<span :class="{red: v.LastQuotation.AskPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty1}}</span>
										</li>
									</ul>
									<h3 class="border_top">买五档</h3>
									<ul>
										<li>
											<span>买一</span>
											<span :class="{red: v.LastQuotation.BidPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty1}}</span>
										</li>
										<li>
											<span>买二</span>
											<span :class="{red: v.LastQuotation.BidPrice2 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice2 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice2 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty2}}</span>
										</li>
										<li>
											<span>买三</span>
											<span :class="{red: v.LastQuotation.BidPrice3 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice3 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice3 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty3}}</span>
										</li>
										<li>
											<span>买四</span>
											<span :class="{red: v.LastQuotation.BidPrice4 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice4 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice4 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty4}}</span>
										</li>
										<li>
											<span>买五</span>
											<span :class="{red: v.LastQuotation.BidPrice5 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice5 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice5 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty5}}</span>
										</li>
									</ul>
								</div>
								<div class="trade_log" v-show="!tabShow">
									<ul>
										<template v-for="k in tradeParameters[0].data">
											<li>
												<span>{{k.time | operateTime}}</span>
												<span>{{k.price}}</span>
												<span>{{k.volume}}</span>
											</li>
										</template>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</template>
		<div class="select_box">
			<div class="bg" v-show="shadeShow" @tap="closeSelectEvent"></div>
			<div class="select_conts">
				<ul>
					<li><span>切换合约</span></li>
					<template v-for="(v, index) in commodityAll">
						<li @click.stop="selectEvent(v)">
							<span>{{v.commodityName}}&nbsp;&nbsp;{{v.commodityNo + v.contractNo}}</span>
						</li>
					</template>
				</ul>
			</div>
		</div>
		<mt-tabbar fixed class="menu">
      		<mt-tab-item class="col" @tap.native="addRemind" >
		        <img slot="icon" v-show="!remindShow" src="../../assets/images/quote/remind.png">
		        <img slot="icon" v-show="remindShow" src="../../assets/images/quote/remind_01.png">
		        <span :class="{current: remindShow == true}">提醒</span>
		    </mt-tab-item>
		    <mt-tab-item class="col" @click.native="toTradeCenter" >  
			    <img slot="icon" src="../../assets/images/account/trade_tab_icon_checked.png">  
			    <span>模拟交易</span>
			</mt-tab-item>
      		<mt-tab-item class="col" @click.native="addOptional" >  
		        <img slot="icon" v-show="!optionalIconShow" src="../../assets/images/quote/add_optional.png">
		        <img slot="icon" v-show="optionalIconShow" src="../../assets/images/quote/add_optional_01.png">
		        <span :class="{current: optionalIconShow == true}">{{optionalName}}</span>
		    </mt-tab-item>
      		<!--<mt-tab-item class="col" v-show="isTradeLogin" style="background-color:#2d3340;">  
		        <img slot="icon" src="../../assets/images/position.png">  
		         <span>持仓</span>
	      	</mt-tab-item>-->
		</mt-tabbar>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import pro from '../../assets/js/common.js'
	import { Toast,MessageBox,Indicator} from 'mint-ui';
	import fens from './fens.vue'
	import light from './light.vue'
	import klineOne from './klineOne.vue'
	import klineFive from './klineFive.vue'
	import klineFifteen from './klineFifteen.vue'
	import klineThirty from './klineThirty.vue'
	import klineDay from './klineDay.vue'
	import klineOneHour from './klineOneHour.vue'
	import klineTwoHour from './klineTwoHour.vue'
	import klineFourHour from './klineFourHour.vue'
	import klineTwelveHour from './klineTwelveHour.vue'
	import selectBox from "../../components/selectBox.vue"
	export default {
		name: 'quoteDetails',
		components: {selectBox, fens, light, klineOne, klineFive, klineFifteen, klineThirty, klineDay, klineOneHour, klineTwoHour, klineFourHour, klineTwelveHour},
		data(){
			return{
				currentNo: '',
				currentNum: 0,
				tabList: ['五档','明细'],
				tabShow: true,
				chartsList: ['闪电图','分时','1分','5分','15分','30分','1小时','日K'],
				currentChartsNum: 1,
				currentChartsView: 'fens',
				noContrast: false,
				chartsHight: 5.4,
				isTradeLogin: true,
				chartsShow: false,
				optionalIconShow: false,
				optionalName: '添加自选',
				optionalList: [],
				optionalId: '',
				remindShow: false,
				shadeShow: false,
				id: {
					id1: 'fens',
					id2: 'volume'	
				},
				userInfo: localStorage.user ? JSON.parse(localStorage.user) : '',
				isClick: false,
				changeContrast: ["对比合约","可用策略"],
				currentContrast: 0,
				showContrast: true,
				backProbe: false,
				strategyName: "",
				strategyList: "",
				chooseKline: "分时",
				strategyData: [],
				id1:{
					id1: 'kline',
					id2: 'kline_volume'
				},
				currentss: -1,
				intervalTime: '',
				CommodityNoK: '',
				strategyData1: [],
				strategyK: "",
				timeing: "",
				obj: ['2小时','4小时','12小时'],
				type: '',
				ContractNo:""
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			quoteInitStep(){
				return this.$store.state.market.quoteInitStep;
			},
			tradeUserInfo(){
				if(localStorage.tradeUser) return JSON.parse(localStorage.tradeUser);
			},
			tradeParameters(){
				return this.$store.state.market.tradeParameters;
			},
			jsonData(){
				return this.$store.state.market.jsonData;
			},
			commodityAll(){
				return this.$store.state.account.commodityAll;
			},
			jsonDataKline(){
				return this.$store.state.market.jsonDataKline;
			},
			tradableCommodity(){
				return this.$store.state.account.tradableCommodity;
			},
			physhonUrl(){
				return this.$store.state.market.physhon.url
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			},
			operateTime: function(val){
				return val.split(':')[0] + ':' + val.split(':')[1];
			}
		},
		watch: {
			parameters: function(n, o){
				if(n && n.length == 1){
					this.parameters.forEach((o, i) => {
						if(o.CommodityNo == this.currentNo){
							this.$store.state.market.currentdetail = o;
							this.$store.state.market.currentNo = o.CommodityNo;
							return;
						}
					});
				}
			},
			chooseKline(e){
				clearInterval(this.timeing);
				if(e == "分时" && this.strategyK !=''){
					this.$toast({message:"分时图不能查看策略",duration: 1000});
				}else if(e == "闪电" && this.strategyK !=''){
						this.$toast({message:"闪电图不能查看策略",duration: 1000});
				}else if(this.strategyK !=''){
					Indicator.open({spinnerType: 'fading-circle'});
					//第一步回测拿到打点数据
					this.backProbeAjax();
					//第二步实时
					this.backProbeInterval();
				}
			}
		},
		methods: {
			...mapMutations([
				'setfensoption', 'drawfens','setklineoption','drawkline'
			]),
			toBackProbe:function(val,k){
				this.setklineoption("");
				this.$store.state.market.strategyData= "";
				this.drawkline(this.id1);
				this.chooseKline = "分时";
				this.strategyK = "";
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$router.push({path:"/backProbe",query:{strategyName:val,strategyK:k,CommodityNoK:this.CommodityNoK,ContractNo:this.ContractNo}});
			},
			//选择策略
			choseStrategy:function(k,index){
				if(this.chooseKline == "闪电"){
					this.$toast({message:"闪电图不能查看策略",duration: 1000});
				}else if(this.chooseKline == "分时"){
					this.$toast({message:"分时图不能查看策略",duration: 1000});
				}else{
					this.currentss = index;
					this.strategyK = k;
					clearInterval(this.timeing);
					this.strategyData1 = [];
					this.setklineoption(this.strategyData1),
					this.$store.state.market.strategyData= this.strategyData1;
					this.drawkline(this.id1);
					Indicator.open({spinnerType: 'fading-circle'});
					//第一步回测拿到打点数据
					this.setklineoption("")
					this.$store.state.market.strategyData= "";
					this.drawkline(this.id1);
					this.backProbeAjax();
					//第二步实时
					this.backProbeInterval();
				}
			},
			changeContrastList:function(index){
				this.currentContrast = index;
				this.currentss = -1;
				if(index == 0){
					this.showContrast = true;
					this.backProbe = false;
					this.setklineoption("")
					this.$store.state.market.strategyData= "";
					this.drawkline(this.id1);
					this.strategyK = ""
				}else if(index == 1){
					this.showContrast = false;
					this.backProbe = true;
				}
			},
			goBackEvent: function(){
				if(this.chooseKline != "分时" && this.chooseKline!= "闪电"){
					this.setklineoption("");
					this.$store.state.market.strategyData= "";
					this.drawkline(this.id1);
				}
				this.$router.go(-1);
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.strategyK = "";
			},
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.tabShow = true;
				}else{
					this.tabShow = false;
				}
			},
			switchEvent: function(){   //打开切换合约下拉框
				if(this.chooseKline != "分时" && this.chooseKline!= "闪电"){
					this.setklineoption("");
					this.$store.state.market.strategyData= "";
					this.drawkline(this.id1);
				}
				this.shadeShow = true;
				this.currentss = -1;
				this.chooseKline = "分时";
				$(".select_conts").css({bottom: 0});
				this.strategyK = "";
			},
			closeSelectEvent: function(){   //关闭切换合约下拉框
				this.shadeShow = false;
				$(".select_conts").css({bottom: -5.3 + 'rem'});
			},
			openSelectBox: function(){    //打开echarts更多选项
				this.type = 'echarts';
				$(".select_cont").css({bottom: -2.7 + 'rem'});
				this.$refs.selectBox.shadeShow = true;		
			},
			selectEvent: function(obj){    //选择合约进行切换
				this.shadeShow = false;
				$(".select_conts").css({bottom: -5.3 + 'rem'});
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				let _obj = {
					"commodityNo": obj.commodityNo,
					"contrast": obj.contrast,
					"exchangeNo": obj.exchangeNo,
					"mainContract": obj.contractNo
				}
				this.operateData(_obj);
				//判断是否自选
				this.getUserCommodityList();
			},
			toRole: function(){
				if(this.currentNo){
					var p = this.currentNo.toString().toLowerCase();
				}
				let arr = ['cl','cn','es','fdax','fdxm','gc','hg','hhi','hsi','mch','mhi','ng','nk','nq','qm','si','ym'];
				if(arr.indexOf(p) != -1){
					this.$router.push({path: '/' + p});
				}else{
					Toast({message: '该合约暂无规则', position: 'bottom', duration: 1500});return;
				}
			},
			toTradeCenter: function(){   //跳转至交易中心
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				let tradeUser = localStorage.tradeUser ? JSON.parse(localStorage.tradeUser) : '';
				if(tradeUser){
					let arr = [];
					this.tradableCommodity.forEach((o, i) => {
						arr.push(o.commodityNo);
					});
					let bol = pro.objIsInArray(arr, this.currentNo);
					if(bol == true){
						this.$router.push({path: '/trade', query: {currentNo: this.currentNo}});
					}else{
						Toast({message: '该合约暂时无法交易', position: 'bottom', duration: 1500});
					}
				}else{
					this.$router.push({path: '/tradeLogin'});
				}
			},
			addRemind: function(){
				if(this.isClick == false){
					Toast({message: '页面正在加载，请稍后再试', position: 'bottom', duration: 1500});return;
				}
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
//				let userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
				let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
				if(stateLogin.issavepsd == false){
					this.$router.push({path: '/login'});
				}else{
					this.$router.push({path: '/remind', query: {isOptional: this.optionalIconShow}});
				}
			},
			addContrast: function(index){
				if(this.currentChartsNum != 1){
					Toast({message: '只能在分时添加对比', position: 'bottom', duration: 1500});
					return;
				}
				var currentOrderPrice, contrastOrderPrice, scale;
				this.parameters.forEach((o, i) => {
					if(o.CommodityNo == index){
						if(o.check == 0){
							o.check = 1;
						}else{
							o.check = 0;
						}
					}
					
				});
				let color = ['#5ca1e6', '#d9b816', '#e66b2e', '#b673e6', '#d99a6c'];
				let arr = [];
				this.$store.state.market.scale = [];
				var time;
				this.parameters.forEach((o, i) => {
					if(o.check == 1){
						let price = [], len = '';
						time = this.jsonData[o.CommodityNo].Parameters.Data[0][0];
						contrastOrderPrice = this.jsonData[o.CommodityNo].Parameters.Data[0][1];
						this.jsonData[this.currentNo].Parameters.Data.forEach((j, h) => {
							price.push('');
							if(j[0] == time){
								currentOrderPrice = j[1];
							}
						});
						o.scale = parseFloat(contrastOrderPrice/currentOrderPrice).toFixed(10);
						this.jsonData[this.currentNo].Parameters.Data.forEach((j, h) => {
							this.jsonData[o.CommodityNo].Parameters.Data.forEach((v) => {
								if(j[0] == v[0]){
									price[h] = parseFloat(v[1]/o.scale);
//									price.push(parseFloat(v[1]/o.scale).toFixed(this.orderTemplist[this.currentNo].DotSize));
								}
							});
						});
						let obj = {
							name: o.CommodityNo,
							type: 'line',
				            data: price,
				            lineStyle: {normal: {width: 1, color: color[i - 1]}},
				            itemStyle: {normal: {color: color[i - 1]}},
							symbolSize: 2,
						}
						arr.push(obj);
						let scale = {
							commodityNo: o.CommodityNo,
							scale: o.scale
						}
						this.$store.state.market.scale.push(scale);
					}
				});
				this.$store.state.market.contrastData = arr;
				this.setfensoption(arr);
				this.drawfens(this.id);
			},
			//选择画图类型
			menuEvent: function(index){
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				this.currentChartsNum = index;
				switch(index){
					case 0:
						this.currentChartsView = 'light';
						this.chooseKline = "闪电";
						this.$store.state.market.contrastData = [];
						break;
					case 1:
						this.currentChartsView = 'fens';
						this.chooseKline = "分时";
						break;
					case 2:
						this.currentChartsView = 'klineOne';
						this.$store.state.market.contrastData = [];
						this.chooseKline = "1min";
						this.intervalTime = 60000;
						break;
					case 3:
						this.currentChartsView = 'klineFive';
						this.$store.state.market.contrastData = [];
						this.chooseKline = "5min";
						this.intervalTime = 300000;
						break;
					case 4:
						this.currentChartsView = 'klineFifteen';
						this.$store.state.market.contrastData = [];
						this.chooseKline = "15min";
						this.intervalTime = 900000;
						break;
					case 5:
						this.currentChartsView = 'klineThirty';
						this.$store.state.market.contrastData = [];
						this.chooseKline = "30min";
						this.intervalTime = 1800000;
						break;
					case 6:
						this.currentChartsView = 'klineOneHour';
						this.$store.state.market.contrastData = [];
						this.chooseKline = "1hour";
						this.intervalTime = 3600000;
						break;
					case 7:
						this.currentChartsView = 'klineDay';
						this.$store.state.market.contrastData = [];
						this.chooseKline = "1day";
						this.intervalTime = 86400000;
						break;
				}
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
				this.parameters.forEach((o, i) => {
					o.check = 0;
				});
			},
			addOptional: function(){
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
				if(stateLogin.issavepsd == false){
					this.$router.push({path: '/login'}); return;
				}
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				if(this.optionalIconShow == true){   //删除自选
					var _datas = {id: this.optionalId};
					MessageBox.confirm("确定删除自选？","提示").then(action=>{
						pro.fetch('post', '/quoteTrader/userRemoveCommodity', _datas, headers).then((res) => {
							if(res.success == true && res.code == 1){
								Toast({message: '自选删除成功', position: 'bottom', duration: 1000});
								this.optionalName = '添加自选';
								this.optionalIconShow = false;
							}
						}).catch((err) => {
							Toast({message: err.data.message, position: 'bottom', duration: 1000});
						});
					}).catch(err=>{});
				}else{   //添加自选
					var datas = {
						'exchangeNo': this.orderTemplist[this.currentNo].ExchangeNo,
						'commodityNo': this.currentNo,
						'contractNo': this.orderTemplist[this.currentNo].MainContract,
					}
					pro.fetch('post', '/quoteTrader/userAddCommodity', datas, headers).then((res) => {
						if(res.success == true && res.code == 1){
							this.optionalIconShow = true;
							this.optionalName = '已添加自选';
							Toast({message: '自选添加成功', position: 'bottom', duration: 1500});
							this.optionalId = res.data.id;
						}
					}).catch((err) => {
						Toast({message: err.data.message, position: 'bottom', duration: 1500});
					});
				}
			},
			getUserCommodityList: function(){
				this.optionalName = '添加自选';
				this.optionalIconShow = false;
				let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
				if(stateLogin.issavepsd == false) return;
				if(this.userInfo == undefined || this.userInfo == '' || this.userInfo == null) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data && res.data.length > 0){
							this.optionalList = res.data;
							this.optionalList.forEach((o, i) => {
								if(o.commodityNo == this.currentNo){
									this.optionalName = '已添加自选';
									this.optionalIconShow = true;
									this.optionalId = o.id;
								}
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 1500});
				});
			},
			getRemindInfo: function(){
				this.remindShow = false;
				let stateLogin = localStorage.stateLogin ? JSON.parse(localStorage.stateLogin) : '';
				if(stateLogin.issavepsd == false) return;
				if(this.userInfo == undefined || this.userInfo == '' || this.userInfo == null) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				var datas = {
					'commodityNo': this.currentNo,
				}
				pro.fetch('post', '/quoteTrader/getByIdAndCommodityNo', datas, headers).then((res) => {
					if(res.success == true){
						if(res.code == 1){
							if(res.data.lastPriceOverSomePrice != '' && res.data.lastPriceOverSomePrice != undefined
								|| res.data.lastPriceUnderSomePrice != '' && res.data.lastPriceUnderSomePrice != undefined
								|| res.data.todayRiseRangePoint != '' && res.data.todayRiseRangePoint != undefined
								|| res.data.todayFallRangePoint != '' &&  res.data.todayFallRangePoint != undefined
								|| res.data.todayBreakHighestPriceIsOpen != '0' 
								|| res.data.todayBreakLowestPriceIsOpen != '0'){
									this.remindShow = true;
							}else{
								this.remindShow = false;
							}
						}else{
							this.remindShow = false;
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 1500});
				});
			},
			operateData: function(val){
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				//清空对比合约数据
				this.$store.state.market.contrastData = [];
				//渲染画图
				this.chartsShow = true;
				this.currentChartsNum = 1;
				this.currentChartsView = 'fens';
				//重组数据
				let arr = [];
				let obj;
				if(val){
					obj = val;
				}else{
					obj = this.$route.query;
				}
				arr.push(obj);
				this.currentNo = obj.commodityNo;    //当前合约
				this.$store.state.market.currentNo = obj.commodityNo;
				//对比合约
				let contrast = obj.contrast;
				if(contrast == '' || contrast == undefined){
					this.noContrast = true;
				}else{
					this.noContrast = false;
					contrast = contrast.split(',');
					contrast.forEach((o, i) => {
						if(o == obj.commodityNo) return;
						if(o != ''){
							let a = {
								commodityNo: o,
								exchangeNo: this.orderTemplist[o].ExchangeNo,
								mainContract: this.orderTemplist[o].MainContract
							}
							arr.push(a);
						}
					});
				}
				this.$store.state.market.Parameters = [];
				this.$store.state.market.tradeParameters = [];
				this.$store.state.market.commodityOrder = [];
				this.$store.state.market.commodityOrder = arr;
				arr.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.mainContract +'"}}');
				});
				this.isClick = true;
			},
			//获取可用策略信息
			getStrategy:function(){
				pro.fetch("post","/others/getStrategys","","").then((res)=>{
					if(res.code == 1 && res.success == true){
						this.strategyList = res.data;
						if(this.strategyList == "" || this.strategyList == null){
							this.showNoneStrategy = true;
						}else{
							this.showNoneStrategy = false;
						}
					}
				}).catch((err)=>{
					
				})
			},
			//回测
			backProbeAjax:function(k){
				this.strategyData1 = [];
				var timeData = this.jsonDataKline.Parameters.Data;
				this.ContractNo = this.jsonDataKline.Parameters.ContractNo;
				var TimeStart = timeData[0][0];
				var CommodityNo = this.jsonDataKline.Parameters.CommodityNo;
				this.CommodityNoK = CommodityNo;
				var TimeEnd = timeData[timeData.length-1][0];
				let obj = {
					"strategy":this.strategyK,
					"commodity":CommodityNo,
					"frequency":this.chooseKline,
					"timeStart":TimeStart,
					"timeEnd":TimeEnd,
					"initialAccount":1000000,
					"commodityNumber":this.ContractNo
				}
				$.ajax({
					type:"POST",
					url:this.physhonUrl+"/back_test",
					async:true,
					data: JSON.stringify(obj),
					timeout:5000,
					dataType:"json",
					success:function(res){
						var tradeInfo = res.tradeInfo;
                		for(var i of tradeInfo){
                			var strategyObj = {};
                			if(res.backtestIndex.frequency == "1day"){
                				strategyObj.coord = [i[1].substring(0,10),i[4]];
                			}else{
                				strategyObj.coord = [i[1],i[4]];
                			}
                			strategyObj.symbolSize = [7,14];
	                		switch (i[3]){
	                			case "BP":
	                			strategyObj.name = "开空";
								strategyObj.symbol = "image://static/lib/images/BP.png";
	                				break;
	                			case "BK":
	                			strategyObj.name = "开多";
								strategyObj.symbol = "image://static/lib/images/BK.png";
	                				break;
	                			case "SP":
	                			strategyObj.name = "平空";
								strategyObj.symbol = "image://static/lib/images/SP.png";
	                				break;
	                			case "SK":
	                			strategyObj.name = "平多";
								strategyObj.symbol = "image://static/lib/images/SK.png";
	                				break;
	                			case "SF":
	                			strategyObj.name = "反卖";
								strategyObj.symbol = "image://static/lib/images/BF.png";
	                				break;
	                			case "BF":
	                			strategyObj.name = "反买";
								strategyObj.symbol = "image://static/lib/images/SF.png";
	                				break;
	                		}
	                		this.strategyData1.push(strategyObj);
		                }
						this.setklineoption(this.strategyData1);
						this.$store.state.market.strategyData= this.strategyData1;
						this.drawkline(this.id1);
						Indicator.close();
					}.bind(this),
					error:function(err){
						console.log("err====="+JSON.stringify(err));
						Indicator.close();
						if(err.statusText == "timeout"){
							this.$toast({message:"连接超时，请重新选择类型或策略！",duration: 1000})
						}else{
							this.$toast({message:"网络不给力，请稍后再试!",duration: 1000});
						}
					}.bind(this)
				});
			},
			backProbeInterval:function(k){
				this.timeing = setInterval(()=>{
					var infoArr = [];//最后30个总数据
					var closeArr = [];//收盘价30个
					var highArr = [];//最高价30个
					var lowArr = [];//最低价30个
					var volumeArr = [];//成交量30个
					var position = '' //持仓
					var accountMoney = ''//资金量
					var openArr = [];//开盘价30个
					infoArr = this.$store.state.market.jsonDataKline.Parameters.Data.slice(-30);
					var position = infoArr[infoArr.length-1][5];
					var lastTrade=infoArr[infoArr.length-1][1];
					var lastTradeTime = infoArr[0][0].substring(11,16);
//					console.log(JSON.stringify(infoArr));
					for(var i of infoArr){
						closeArr.push(i[1]);
						openArr.push(i[2]);
						lowArr.push(i[3]);
						highArr.push(i[4]);
						volumeArr.push(i[6])
					}
					let obj1 = {
						"close":closeArr,
						"open":openArr,
						"high":highArr,
						"low":lowArr,
						"volume":volumeArr,
						"position":position,
						"lastTrade":lastTrade,
						"strategy":this.strategyK
//						"account":1000000
					}
					$.ajax({
						type:"POST",
						url:this.physhonUrl+"/calc_strategy_signal",
						async:true,
						data: JSON.stringify(obj1),
						dataType:"json",
						success:function(res){
							var strategy_signal_obj={};
//							strategyObj.coord = [i[1].substring(11,16),i[4]];
							var strategy_signal_time = pro.getDate("h:m",Date.parse(new Date()));
							strategy_signal_obj.coord = [strategy_signal_time,res.last_trade];
	                		strategy_signal_obj.symbolSize = [7,14];
							switch (res.action){
								case null:
								strategy_signal_obj.coord = [];
								strategy_signal_obj.symbolSize = [];
									break;
								case "BP":
		                			strategyObj.name = "开空";
									strategyObj.symbol = "image://static/lib/images/BP.png";
		                				break;
		                			case "BK":
		                			strategyObj.name = "开多";
									strategyObj.symbol = "image://static/lib/images/BK.png";
		                				break;
		                			case "SP":
		                			strategyObj.name = "平空";
									strategyObj.symbol = "image://static/lib/images/SP.png";
		                				break;
		                			case "SK":
		                			strategyObj.name = "平多";
									strategyObj.symbol = "image://static/lib/images/SK.png";
		                				break;
		                			case "SF":
		                			strategyObj.name = "反卖";
									strategyObj.symbol = "image://static/lib/images/BF.png";
		                				break;
		                			case "BF":
		                			strategyObj.name = "反买";
									strategyObj.symbol = "image://static/lib/images/SF.png";
		                				break;
							}
							this.strategyData1.push(strategy_signal_obj);
							this.strategyData1 = this.strategyData1.slice(-40);
							this.$store.state.market.strategyData= this.strategyData1;
							this.drawkline(this.id1);
						}.bind(this),
						error:function(err){
							Indicator.close();
							this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
						}.bind(this)
					})
				},this.intervalTime);
			}
		},
		mounted: function(){
			//判断交易是否登录
			if(this.tradeUserInfo != undefined && this.tradeUserInfo != null && this.tradeUserInfo != ''){
				this.isTradeUser = true;
			}
		},
		activated: function(){
			this.showNoneStrategy = false;
			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.islightshow = false;
			this.$store.state.isshow.isklineshow = false;
			//重组数据
			this.operateData();
			//判断是否自选
			this.getUserCommodityList();
			//判断是否设置提醒
			this.getRemindInfo();
			//获取策略
			this.getStrategy();
			this.currentContrast = 0;
			this.showContrast = true;
			this.backProbe = false;
			this.chooseKline = "分时";
		},
		beforeRouteLeave (to,from,next) {
			next();
			clearInterval(this.timeing);
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 7.5rem;
		height: 1rem;
		background: $blcakThin;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		box-sizing: border-box;
		.icon_back{
			width: 0.64rem;
			height: 1rem;
			background: url(../../assets/images/quote/back_icon.png) no-repeat 0.3rem 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0;
		}
		.title{
			margin: auto;
			.name{
				height: 1rem;
				text-align: center;
			}
			span{
				color: $white;
				display: block;
				&:first-child{
					font-size: $fs32;
					margin: 0.2rem 0 0.05rem 0;
				}
			}
			.icon_triangle{
				float: left;
				width: 0.3rem;
				height: 1rem;
				background: url(../../assets/images/quote/triangle.png) no-repeat right 0.46rem;
				background-size: 0.16rem 0.08rem;
			}
		}
		button{
			width: 0.64rem;
			height: 0.36rem;
			line-height: 0.36rem;
			text-align: center;
			background: $redDeep;
			font-size: 0.2rem;
			color: $bg;
			border-radius: 0.08rem;
			padding: 0;
			position: fixed;
			top: 0.3rem;
			right: 1.8rem;
		}
	}
	.menu{
		.col{
			overflow: hidden;
			background: $bg;
			border-top: 0.01rem solid $bgDeep;
			border-left: 0.01rem solid $bgDeep;
			&:first-child{
				border-left: none;
			}
			span{
				color: $fontBlue;
				&.current{
					color: $blue;
				}
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		padding-bottom: 1.5rem;
		.details{
			background-color: $bg;
			width: 7.5rem;
			height: 3.85rem;
			border-bottom: 0.01rem solid $bgDeep;
			.cont{
				float: left;
				width: 4.2rem;
				height: 3.65rem;
				background: $bg;
				border-bottom: 0.01rem solid $bgDeep;
				border-right: 0.01rem solid $bgDeep;
				padding-left: 0.29rem;
				.name{
					height: 0.5rem;
					line-height: 0.55rem;
				}
				.price{
					font-size: 0.64rem;
					font-weight: 500;
					margin-bottom: 0.05rem;
					&.red{
						color: $red;
					}
					&.green{
						color: $green;
					}
				}
				.change{
					font-size: $fs28;
					margin-bottom: 0.2rem;
					&.red{
						color: $red;
					}
					&.green{
						color: $green;
					}
				}
				.row{
					height: 0.4rem;
					margin-bottom: 0.2rem;
					.col{
						float: left;
						width: 0.95rem;
						span{
							display: block;
							font-size: 0.2rem;
							&:last-child{
								margin-top: 0.05rem;
							}
							&.default{
								&.red{
									color: $red;
								}
								&.green{
									color: $green;
								}
							}
						}
					}
				}
			}
			.contrast{
				float: left;
				width: 3.3rem;
				height: 3.65rem;
				background: $bg;
				.title{
					height: 0.49rem;
					line-height: 0.49rem;
					text-align: center;
					border-bottom: 0.01rem solid $bgDeep;
					span{
						display: inline-block;
						width: 50%;
						&:nth-child(1){
							border-right: 0.01rem solid $bgDeep ;
						}
					}
				}
				.currentContrast{
					color: $redDeep;
				}
				.contrast_list{
					height: 3.16rem;
					overflow-y: auto;
					.empty{
						height: 3.16rem;
						line-height: 3.16rem;
						text-align: center;
						color: #525866;
						font-size: 0.36rem;
						font-weight: bold;
						border-bottom: 0.01rem solid $bgDeep;
					}
					li{
						/*height: 0.63rem;*/
						overflow: hidden;
						border-bottom: 0.01rem solid $bgDeep;
						padding: 0.05rem;
						&.current{
							background: $bgDeep;
						}
						.name{
							width: 1.15rem;
							overflow: hidden;
							span{
								display: block;
								font-size: 0.2rem;
								&:first-child{
									margin: 0.05rem 0;
								}
							}
						}
						p{
							float: left;
							display: flex;
							align-items: center;
							width: 0.7rem;
							line-height: 0.64rem;
							font-size: 0.2rem;
							&.price{
								width: 0.9rem;
							}
							&.red{
								color: $red;
							}
							&.green{
								color: $green;
							}
						}
						.icon{
							float: right;
							width: 0.24rem;
							height: 0.64rem;
							margin-right: 0.05rem;
							&.icon_check{
								background: url(../../assets/images/quote/check.png) no-repeat center 0.2rem;
								background-size: 0.24rem 0.24rem;
							}
							&.icon_checked{
								background: url(../../assets/images/quote/checked.png) no-repeat center 0.2rem;
								background-size: 0.24rem 0.24rem;
							}
						}
					}
				}
				.strategy_list{
					height: 3.16rem;
					overflow-y: auto;
					.choseStrategyClass{
						width: 100%;
						height: 0.64rem;
						border-bottom: 0.01rem solid $bgDeep;
						line-height: 0.64rem;
						font-size: 0.2rem;
						text-align: center;
						span{
							margin-left: 0.3rem;
						}
						button{
							display: none;
						}
					}
					.choseStrategyClass1{
						position: relative;
						background-color: $bgDeep;
						span{
							float: left;
						}
						button{
							display: block;
							background-color: #00A1F2;
							color: $white;
							width: 0.9rem;
							height: 0.4rem;
							line-height: 0.4rem;
							font-size: 0.18rem;
							border-radius: 0.05rem;
							position: absolute;
							top: 0.12rem;
							right: 0.3rem;
						}
					}
					.strategy_hidden{
						display: none;
					}
					.strategy_show{
						display: block;
					}
				}
			}
		}
		.chart_box{
			width: 7.5rem;
			height: 6.2rem;
			.title{
				height: 0.8rem;
				padding: 0 0.3rem;
				border-bottom: 0.01rem solid $bgDeep;
				overflow-x: scroll;
				span{
					float: left;
					display: inline-block;
					height: 0.8rem;
					line-height: 0.8rem;
					font-size: $fs28;
					margin-left: 0.2rem;
					&:first-child{
						margin: 0;
					}
					&.current{
						color:$redDeep;
						border-bottom: 0.05rem solid $redDeep;
					}
				}
			}
			.cont{
				height: 5.4rem;
				border-bottom: 0.01rem solid $bgDeep;
				.chart{
					width: 5.7rem;
					height: 5.4rem;
					border-right: 0.01rem solid $bgDeep;
				}
				.cont_right{
					width: 1.8rem;
					height: 5.4rem;
					.tab_title{
						height: 0.8rem;
						line-height: 0.8rem;
						background: $bg;
						border-bottom: 0.01rem solid $bgDeep;
						span{
							float: left;
							display: inline-block;
							width: 50%;
							text-align: center;
							border-left: 0.01rem solid $bgDeep;
							&.current{
								color: $blue;
							}
							&:first-child{
								border: none;
							}
						}
					}
					.tab_cont{
						.five_quote{
							h3{
								height: 0.48rem;
								line-height: 0.48rem;
								background: $bg;
								padding: 0 0.1rem;
								border-bottom: 0.01rem solid $bgDeep;
								&.border_top{
									border-top: 0.01rem solid $bgDeep;
								}
							}
							li{
								height: 0.36rem;
								line-height: 0.36rem;
								display: flex;
								justify-content: space-around;
								padding: 0 0.1rem;
								span{
									display: inline-block;
									font-size: 0.2rem;
									&:first-child{
										width: 0.5rem;
									}
									&:nth-child(2){
										width: 1rem;
										text-align: center;
									}
									&.red{
										color: $red;
									}
									&.green{
										color: $green;
									}
									&:last-child{
										color: $white;
										width: 0.3rem;
										text-align: right;
									}
								}
							}
						}
						.trade_log{
							li{
								height: 0.38rem;
								line-height: 0.38rem;
								display: flex;
								justify-content: space-around;
								span{
									font-size: 0.2rem;
									&:nth-child(2){
										color: $yellow;
									}
									&:nth-child(3){
										color: $white;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.select_box{
		.select_conts{
			position: fixed;
			bottom: -5.3rem;
			left: 0;
			z-index: 100;
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
				&:first-child{
					span{
						font-weight: bold;
					}
				}
				span{
					color: #1a1a1a;
					font-size: $fs28;
				}
			}
		}
	}
	/*适配*/
	@media (min-width:371px) and (max-width:410px) {
		.main .chart_box .cont .cont_right .tab_cont .five_quote li span:first-child{
			width: 0.6rem;
		}
	}
</style> 
