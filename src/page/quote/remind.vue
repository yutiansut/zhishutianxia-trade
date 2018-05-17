<template>
	<div id="remind">
		<template v-for="(v, index) in parameters">
		<div v-if="v.CommodityNo == currentNo">
		<header class="head">
			<i class="icon icon_back" @tap="goBackEvent"></i>
			<div class="title head_title">
				<span>{{v.CommodityName}}</span>
				<span>{{v.CommodityNo + v.MainContract}}</span>
			</div>
		</header>
		<div class="main">
			<div class="title">
				<div class="row">
					<em :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</em>
					<em :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><i v-show="v.LastQuotation.ChangeRate > 0">+</i>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</em>
					<em :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><i v-show="v.LastQuotation.ChangeRate > 0">+</i>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</em>
				</div>
				<div class="row">
					<span>提醒方式</span>
					<template v-for="(v, index) in remindWays">
						<div class="reminda_ways fl" @tap="checkEvent(index)">
							<i class="icon" :class="{icon_checked: v.status == 1, icon_check: v.status == 0}"></i>
							<span>{{v.name}}</span>
						</div>
					</template>
				</div>
				<div class="row">
					<p>实时智能盯盘，免费短信预警，不再担心错过行情，价格波动实时短信提醒，现已免费提供。</p>
				</div>
			</div>
			<div class="cont">
				<div class="row">
					<span class="type">价格上涨到</span>
					<input type="text" class="ipt_lg" v-model="risePoint" v-show="risePointSwitch == 1" />
					<input type="text" class="ipt_lg" v-model="risePoint" readonly="readonly" v-show="risePointSwitch == 0" />
					<div class="switch lastPriceUp" @tap="switchEvent" :class="{current: risePointSwitch == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最近</span>
					<input type="text" class="ipt_sm" v-model="daysHight" />
					<span>天最高价</span>
					<b>{{hightPrice}}</b>
				</div>
				<div class="row">
					<span class="type">价格下跌到</span>
					<input type="text" class="ipt_lg" v-model="losePoint" v-show="losePointSwitch == 1" />
					<input type="text" class="ipt_lg" v-model="losePoint" readonly="readonly" v-show="losePointSwitch == 0" />
					<div class="switch lastPriceDown" @tap="switchEvent" :class="{current: losePointSwitch == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最近</span>
					<input type="text" class="ipt_sm" v-model="daysLow" />
					<span>天最低价</span>
					<b>{{lowPrice}}</b>
				</div>
				<div class="row">
					<span class="type">当日涨幅超过</span>
					<input type="text" class="ipt_sm" v-model="increase" v-show="increaseSwitch == 1" />
					<input type="text" class="ipt_sm" v-model="increase" readonly="readonly" v-show="increaseSwitch == 0" />
					<span>%</span>
					<div class="switch changeUp" @tap="switchEvent" :class="{current: increaseSwitch == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">当日跌幅超过</span>
					<input type="text" class="ipt_sm" v-model="decrease" v-show="decreaseSwitch == 1" />
					<input type="text" class="ipt_sm" v-model="decrease" readonly="readonly" v-show="decreaseSwitch == 0" />
					<span>%</span>
					<div class="switch changeDown" @tap="switchEvent" :class="{current: decreaseSwitch == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">突破当日最高价</span>
					<div class="switch breakHightPrice" @tap="switchEvent" :class="{current: isBreakHighestPriceSwitch == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">突破当日最低价</span>
					<div class="switch breakLowPrice" @tap="switchEvent" :class="{current: isBreakLowestPriceSwitch == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">提醒频率</span>
					<div class="fr" @click="setRemindEvent">
						<span>{{defaultFrequency | operateFrequency}}</span>
						<img src="../../assets/images/quote/arrow.png"/>
					</div>
				</div>
				<div class="row">
					<p>价格提醒服务，依赖于网络，可能出现通知延迟状况，请保持网络通畅。</p>
				</div>
			</div>
			<div class="btn_box">
				<btn name="完成" className="bluelg" @click.native="saveEvent"></btn>
			</div>
		</div>
		</div>
		</template>
		<div class="select_box">
			<div class="bg" v-show="shadeShow" @tap="hideSelectBox"></div>
			<div class="select_cont">
				<ul>
					<li><span>提醒频率</span></li>
					<template v-for="v in remindFrequency">
						<li :class="{current: v.status == defaultFrequency}" @click="chooseRemindEvent(v.status)"><span>{{v.name}}</span></li>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'remind',
		components: {btn, },
		data(){
			return{
				commodityName: '',
				remindList: {},
				remindFrequency: [{
					name: '每日一次',
					status: '2'
				},{
					name: '仅一次',
					status: '1'
				},{
					name: '持续提醒',
					status: '3'
				}],
				remindWays: [{
					name: '短信提醒',
					status: 1,
				},{
					name: '通知提醒',
					status: 1,
				}],
				defaultFrequency: '1',
				shadeShow: false,
				isOptional: false,
				daysHight: '',
				hightPrice: '--',
				daysLow: '',
				lowPrice: '--',
				remindId: '',
				intReg: /^[1-9]\d*$/,
				floatReg: /^(([1-9]\d*)|0)(\.\d{1,4})?$/,
				risePoint: '',   //上涨位
				risePointSwitch: 0,   //上涨位开关
				losePoint: '',   //下跌位
				losePointSwitch: 0,   //下跌位开关
				increase: '',   //涨幅
				increaseSwitch: 0,    //涨幅开关
				decrease: '',   //跌幅
				decreaseSwitch: 0,  //跌幅开关
				isBreakHighestPriceSwitch: 0,   //突破当日最高价开关
				isBreakLowestPriceSwitch: 0,    //突破当日最低价开关
				remindMsg: '是否添加提醒？',
				remindMsgSuccess: '提醒设置成功',
				
			}
		},
		computed: {
			parameters(){
				return this.$store.state.market.Parameters;
			},
			currentNo(){
				return this.$store.state.market.currentNo;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			jsonData(){
				return this.$store.state.market.jsonDataKline.Parameters.Data;
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			},
			operateFrequency: function(val){
				if(val == '1'){
					return '仅一次';
				}else if(val == '2'){
					return '每日一次';
				}else if(val == '3'){
					return '持续提醒';
				}
			}
		},
		watch: {
			risePointSwitch: function(n, o){
				if(n && n == 0) this.risePoint = '';
			},
			losePointSwitch: function(n, o){
				if(n && n == 0) this.losePoint = '';
			},
			increaseSwitch: function(n, o){
				if(n && n == 0) this.increase = '';
			},
			decreaseSwitch: function(n, o){
				if(n && n == 0) this.decrease = '';
			},
			daysHight: function(n, o){
				if(n == '') return;
				if(this.intReg.test(n) == false){
					Toast({message: '请输入天数', position: 'bottom', duration: 1000});
					this.daysHight = '';
					this.hightPrice = '--';
				}else if(n > 30){
					Toast({message: '天数最多为30天', position: 'bottom', duration: 1000});
					this.hightPrice = '--';
					this.daysHight = '';
				}else{
					let _arr = [], arr = [];
					for(let i = 1; i <= n; i++){
						_arr.push(this.jsonData[this.jsonData.length - i]);
					}
					_arr.forEach((o, i) => {
						if(o == undefined) return;
						arr.push(o[4]);
					});
					this.hightPrice = pro.getMaximin(arr, "max");
				}
			},
			daysLow: function(n, o){
				if(n == '') return;
				if(this.intReg.test(n) == false){
					Toast({message: '请输入天数', position: 'bottom', duration: 1000});
					this.daysLow = '';
					this.lowPrice = '--';
				}else if(n > 30){
					Toast({message: '天数最多为30天', position: 'bottom', duration: 1000});
					this.lowPrice = '--';
					this.daysLow = '';
				}else{
					let _arr = [], arr = [];
					for(let i = 1; i <= n; i++){
						_arr.push(this.jsonData[this.jsonData.length - i]);
					}
					_arr.forEach((o, i) => {
						if(o == undefined) return;
						arr.push(o[3]);
					});
					this.lowPrice = pro.getMaximin(arr, "min");
				}
			}
		},
		methods: {
			goBackEvent: function(){
				this.$router.go(-1);
				this.daysHight = '';
				this.hightPrice = '--';
				this.daysLow = '';
				this.lowPrice = '--';
				this.remindId = '';
				this.risePoint = '';
				this.risePointSwitch = 0;
				this.losePoint = '';
				this.losePointSwitch = 0;
				this.increase = ''; 
				this.increaseSwitch = 0;  
				this.decrease = '';
				this.decreaseSwitch = 0;
				this.isBreakHighestPriceSwitch = 0;
				this.isBreakLowestPriceSwitch = 0;
			},
			checkEvent: function(index){
				this.remindWays.forEach((o, i) => {
					if(i == index){
						if(o.status == 1){
							o.status = 0;
						}else{
							o.status = 1;
						}
					}
				});
			},
			setRemindEvent: function(){
				$(".select_cont").css({bottom: 0});
				this.shadeShow = true;
			},
			chooseRemindEvent: function(val){
				$(".select_cont").css({bottom: -3.5 + 'rem'});
				this.shadeShow = false;
				this.defaultFrequency = val;
			},
			hideSelectBox: function(){
				$(".select_cont").css({bottom: -3.5 + 'rem'});
				this.shadeShow = false;
			},
			getPriceByKline: function(){
				let data = {
					Method: "QryHistory",
					Parameters:{
						ExchangeNo: this.orderTemplist[this.currentNo].ExchangeNo,
						CommodityNo: this.currentNo,
						ContractNo: this.orderTemplist[this.currentNo].MainContract,
						HisQuoteType: 1440,
						BeginTime: '',
						EndTime: '',
						Count: 0
					}
				};
				this.quoteSocket.send(JSON.stringify(data));
			},
			switchEvent: function(e){
				let obj = $(e.currentTarget).find('.icon_zero');
				if(obj.hasClass('current')){
					obj.removeClass('current');
					obj.css({'left': 0, 'background': '#525866'});
					if($(e.currentTarget).hasClass('lastPriceUp')){
						this.risePointSwitch = '0';
					}else if($(e.currentTarget).hasClass('lastPriceDown')){
						this.losePointSwitch = '0';
					}else if($(e.currentTarget).hasClass('changeUp')){
						this.increaseSwitch = '0';
					}else if($(e.currentTarget).hasClass('changeDown')){
						this.decreaseSwitch = '0';
					}else if($(e.currentTarget).hasClass('breakHightPrice')){
						this.isBreakHighestPriceSwitch = '0';
					}else if($(e.currentTarget).hasClass('breakLowPrice')){
						this.isBreakLowestPriceSwitch = '0';
					}
				}else{
					obj.addClass('current');
					obj.css({'left': 0.48+'rem', 'background': '#00a1f2'});
					if($(e.currentTarget).hasClass('lastPriceUp')){
						this.risePointSwitch = '1';
					}else if($(e.currentTarget).hasClass('lastPriceDown')){
						this.losePointSwitch = '1';
					}else if($(e.currentTarget).hasClass('changeUp')){
						this.increaseSwitch = '1';
					}else if($(e.currentTarget).hasClass('changeDown')){
						this.decreaseSwitch = '1';
					}else if($(e.currentTarget).hasClass('breakHightPrice')){
						this.isBreakHighestPriceSwitch = '1';
					}else if($(e.currentTarget).hasClass('breakLowPrice')){
						this.isBreakLowestPriceSwitch = '1';
					}
				}
			},
			saveEvent: function(e){
				let msg = pro.openMessages();
				if(msg == 0 && msg != ''){
					mui.alert( "消息推送已关闭，无法接收通知，请在【设置】-【通知中心】-【应用名称】中开启");return;
				}
				if(this.risePoint != undefined && this.risePoint != 0 && this.floatReg.test(this.risePoint) == false){
					Toast({message: '请输入上涨价格', position: 'bottom', duration: 1000});
					this.risePoint = ''; return;
				}
				if(this.losePoint != undefined && this.losePoint != 0  && this.floatReg.test(this.losePoint) == false){
					Toast({message: '请输入下跌价格', position: 'bottom', duration: 1000});
					this.losePoint = ''; return;
				}
				if(this.increase != undefined && this.increase != 0  && this.floatReg.test(this.increase) == false){
					Toast({message: '请输入涨幅', position: 'bottom', duration: 1000});
					this.increase = ''; return;
				}
				if(this.decrease != undefined && this.decrease != 0  && this.floatReg.test(this.decrease) == false){
					Toast({message: '请输入跌幅', position: 'bottom', duration: 1000});
					this.decrease = ''; return;
				}
				if(this.daysHight != '' && this.intReg.test(this.daysHight) == false){
					Toast({message: '天数格式错误', position: 'bottom', duration: 1000});
					this.daysHight = ''; return;
				}
				if(this.daysLow != '' && this.intReg.test(this.daysLow) == false){
					Toast({message: '天数格式错误', position: 'bottom', duration: 1000});
					this.daysLow = ''; return;
				}
				if(this.risePoint == '' || this.risePoint == undefined
					&& this.losePoint == '' || this.losePoint == undefined
					&& this.increase == '' || this.increase == undefined
					&& this.decrease == '' || this.decrease == undefined
					&& this.isBreakHighestPriceSwitch == '0' 
					&& this.isBreakLowestPriceSwitch == '0'){
					this.remindMsg = '提醒内容已设置完毕，确认添加？';
					this.remindMsgSuccess = '提醒删除成功';
				}
				if(msg == false){
					this.remindMsg = '提醒功能当前只支持移动端， 是否添加？';
					this.remindWays.forEach((o, i) => {
						if(o.name == '通知提醒'){
							o.status = 0;
						}
					});
				}
				//是否自选
				this.isOptional = this.$route.query.isOptional;
				//提醒方式
				let _remindWays = [];
				this.remindWays.forEach((o, i) => {
					if(o.name == '短信提醒' && o.status == 1){
						_remindWays.push(1);
					}
					if(o.name == '通知提醒' && o.status == 1){
						_remindWays.push(2);
					}
				});
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				var datas = {
					'id': this.remindId,
					'commodityNo': this.currentNo,
					'commodityName': this.orderTemplist[this.currentNo].CommodityName,
					'remindType': _remindWays.join(','),
					'risePoint': this.risePoint,
					'risePointSwitch': this.risePointSwitch,
					'losePoint': this.losePoint,
					'losePointSwitch': this.losePointSwitch,
					'increase': this.increase,
					'increaseSwitch': this.increaseSwitch,
					'decrease': -this.decrease,
					'decreaseSwitch': this.decreaseSwitch,
					'isBreakHighestPriceSwitch': this.isBreakHighestPriceSwitch,
					'isBreakLowestPriceSwitch': this.isBreakLowestPriceSwitch,
					'remindFrequency': this.defaultFrequency,
					
				}
				MessageBox.confirm(this.remindMsg,"提示").then(action=>{
					pro.fetch('post', '/quoteTrader/saveRemindInfo', datas, headers).then((res) => {
						if(res.success == true && res.code == 1){
							if(this.isOptional == true){
								Toast({message: '提醒设置成功', position: 'bottom', duration: 1000});
								setTimeout(() => {
									this.$router.go(-1);
								}, 1000);
							}else{
								let info = {
									'exchangeNo': this.orderTemplist[this.currentNo].ExchangeNo,
									'commodityNo': this.currentNo,
									'contractNo': this.orderTemplist[this.currentNo].MainContract,
								}
								pro.fetch('post', '/quoteTrader/userAddCommodity', info, headers).then((res) => {
									if(res.success == true && res.code == 1){
										Toast({message: '提醒设置成功，已将该合约添加到自选', position: 'bottom', duration: 1000});
										setTimeout(() => {
											this.$router.go(-1);
										}, 1000);
									}
								}).catch((err) => {
									Toast({message: err.data.message, position: 'bottom', duration: 1000});
								});
							}
						}
					}).catch((err) => {
						Toast({message: err.data.message, position: 'bottom', duration: 2000});
					});
				}).catch(err=>{});
			},
			getRemindInfo: function(){
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
							this.remindList = res.data;
							this.remindId = this.remindList.id;
							//提醒方式
							let rmindWays = this.remindList.remindWay.split(',');
							if(rmindWays.length >= 1){
								this.remindWays[0].status = 0;
								this.remindWays[1].status = 0;
							}
							rmindWays.forEach((o, i) => {
								if(o == '1'){
									this.remindWays[0].status = 1;
								}else if(o == '2'){
									this.remindWays[1].status = 1;
								}
							});
							//提醒频率
							this.defaultFrequency = this.remindList.remindFrequency;
							//上涨位
							this.risePoint = this.remindList.lastPriceOverSomePrice;
							//上涨位开关
							this.risePointSwitch = this.remindList.lastPriceOverSomePriceIsOpen;
							//下跌位
							this.losePoint = this.remindList.lastPriceUnderSomePrice;
							//下跌位开关
							this.losePointSwitch = this.remindList.lastPriceUnderSomePriceIsOpen;
							//涨幅
							this.increase = this.remindList.todayRiseRangePoint;
							//涨幅开关
							this.increaseSwitch = this.remindList.todayRiseRangePointIsOpen;
							//跌幅
							if(this.remindList.todayFallRangePoint < 0){
								this.decrease = -this.remindList.todayFallRangePoint;
							}
							//跌幅开关
							this.decreaseSwitch = this.remindList.todayFallRangePointIsOpen;
							//突破当日最高价开关
							this.isBreakHighestPriceSwitch = this.remindList.todayBreakHighestPriceIsOpen;
							//突破当日最低价开关
							this.isBreakLowestPriceSwitch = this.remindList.todayBreakLowestPriceIsOpen;
						}else{
							this.remindId = '';
							this.risePoint = '';
							this.risePointSwitch = 0;
							this.losePoint = '';
							this.losePointSwitch = 0;
							this.increase = ''; 
							this.increaseSwitch = 0;  
							this.decrease = '';
							this.decreaseSwitch = 0;
							this.isBreakHighestPriceSwitch = 0;
							this.isBreakLowestPriceSwitch = 0;
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		mounted: function(){
			$("input").bind('focus',function(){  
	            $('.head').css('position','static');
	            $('.main').css({'margin-top': 0});
	            //或者$('#viewport').height($(window).height()+'px');  
	        }).bind('blur',function(){ 
	            $('.head').css({'position':'fixed','top':'0'});
	            $('.main').css({'margin-top': 1.01 + 'rem'});
	            //或者$('#viewport').height('auto');  
	        });
		},
		activated: function(){
			//获取提醒相关信息
			this.getRemindInfo();
			//获取最新价与最低价
			this.getPriceByKline();
			//判断就是否开启消息通知
			pro.isOpenMessage();
//			pro.isOpenMessages();
		}
		
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.head{
		position: fixed;
		top: 0;
		left: 0;
		width: 7.5rem;
		height: 1rem;
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		box-sizing: border-box;
		.icon_back{
			width: 0.64rem;
			height: 1rem;
			background: url(../../assets/images/quote/back_icon.png) no-repeat 0.3rem 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: absolute;
			left: 0;
			z-index: 1;
		}
		.title{
			position: absolute;
			left: 0;
			width: 7.5rem;
			height: 1rem;
			overflow: hidden;
			text-align: center;
			span{
				width: 7.5rem;
				display: block;
				&:first-child{
					color: $white;
					font-size: $fs32;
					margin: 0.2rem 0 0.05rem 0;
				}
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.title{
			width: 7.5rem;
			height: 3rem;
			border-bottom: 0.15rem solid $black;
		}
		.cont{
			.type{
				width: 2rem;
			}
		}
		.btn_box{
			padding: 0.98rem 0.3rem 0.3rem 0.3rem;
		}
		.row{
			height: 0.96rem;
			overflow: hidden;
			background: $bg;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			span{
				float: left;
				display: inline-block;
				line-height: 0.96rem;
				font-size: $fs28;
			}
			input{
				float: left;
				display: inline-block;
				height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.16rem 0;
				padding: 0 0.1rem;
				color: $white;
				font-size: $fs28;
				&.ipt_lg{
					width: 2rem;
				}
				&.ipt_sm{
					width: 1rem;
					margin-right: 0.15rem;
				}
				&:focus{
					border-color: $blue;
				}
			}
			em{
				line-height: 0.96rem;
				margin-right: 0.15rem;
				&:first-child{
					font-size: 0.48rem;
					margin-right: 0.3rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			b{
				color: $white;
				font-weight: bold;
				line-height: 0.96rem;
				margin-left: 0.05rem;
			}
			img{
				float: left;
				display: inline-block;
				width: 0.15rem;
				height: 0.24rem;
				margin: 0.36rem 0 0.36rem 0.2rem;
			}
			.switch{
				float: right;
				width: 0.96rem;
				height: 0.48rem;
				background: #1b1f26;
				border-radius: 0.24rem;
				border: 0.01rem solid $black;
				margin: 0.24rem 0;
				position: relative;
				.icon_zero{
					width: 0.4rem;
					height: 0.4rem;
					background: #525866;
					border-radius: 100%;
					position: absolute;
					top: 0.04rem;
					left: 0.04rem;
					transition: all .2s;
				}
				&.current{
					.icon_zero{
						left: 0.48rem;
						background: $blue;
					}
				}
			}
			.reminda_ways{
				float: right;
				margin-left: 0.3rem;
				span{
					font-size: $fs24;
				}
				.icon{
					float: left;
					width: 0.24rem;
					height: 0.96rem;
					margin: 0 0.1rem 0 0;
					&.icon_check{
						background: url(../../assets/images/quote/check.png) no-repeat center 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
					&.icon_checked{
						background: url(../../assets/images/quote/checked.png) no-repeat center 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
				}
			}
			p{
				line-height: 0.38rem;
				color: $white;
				margin-top: 0.1rem;
			}
		}
	}
	.select_box{
		.select_cont{
			position: fixed;
			bottom: -3.5rem;
			left: 0;
			z-index: 100;
			width: 7.5rem;
			height: 3.5rem;
			overflow: hidden;
			background: $white;
			transition: all 0.3s;
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
				&.current{
					span{
						color: $blue;
					}
				}
				span{
					color: #1a1a1a;
					font-size: $fs28;
				}
			}
		}
	}
</style> 