<template>
	<div id="tradeLogin">
		<header>
			<back @click.native="goBack" :type="type"></back>
			<div class="tab">
				<template v-for="(v, index) in tabList" >
					<span :class="{current: currentNum == index}" @click="switchover(index)">{{v}}</span>
				</template>
			</div>
		</header>
		<div class="cont">
			<div class="fm">
				<div class="row">
					<span>交易账号</span>
					<input type="text" placeholder="请输入交易账号" v-model="user" />
					<button @click="switchAccount">切换账号</button>
				</div>
				<div class="row">
					<span>交易密码</span>
					<input type="password" placeholder="请输入交易密码" readonly onfocus="this.removeAttribute('readonly');" v-model="pwd" @keyup.enter="tradeLogin" />
				</div>
				<btn name="交易登录" className="bluelg" class="mb30" @tap.native="tradeLogin"></btn>
				<btn name="配资方案申请" className="orangelg" class="mb30" @tap.native="tradeApply"></btn>
			</div>
			<h3>交易账号不等于注册登录账号</h3>
			<p><span>交易账号：</span>申请配资方案后系统会自动发放，用于实盘或者模拟盘交易的账号。可查询交易明细，结算后将会更换。</p>
			<p><span>登录账号：</span>使用手机注册后的平台账号，用户登录APP和网站，进行充值、查看资金明细等。</p>
			<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
		</div>
	</div>
</template>

<script>
	import back from "../../components/back.vue"
	import btn from "../../components/btn.vue"
	import selectBox from "../../components/selectBox.vue"
	import pro from '../../assets/js/common.js'
	import { Toast, Indicator } from 'mint-ui'
	import { mapMutations,mapActions } from 'vuex'
	export default {
		name: 'index',
		components: { back, btn, selectBox},
		data(){
			return{
				currentNum: 0,
				tabList: ['融资交易登录', '融资交易申请'],
				user: '',
				pwd: '',
				type: 0,
				obj: '',
			}
		},
		computed: {
			tradeConfig(){
				return this.$store.state.market.tradeConfig;
			},
			loginStatus(){
				return this.$store.state.account.loginStatus;
			},
		},
		watch: {
			loginStatus: function(n, o){
				if(n && n == true){
					setTimeout(() => {
						Indicator.close();
						this.$router.push({path: '/trade'});
						this.user = '';
						this.pwd = '';
					}, 1000);
				}
			},
		},
		methods: {
			...mapActions([
				'initQuoteClient',
				'initTrade'
			]),
			goBack: function(){
				this.$router.push({path: '/index'});
			},
			switchover: function(index){
				if(index == 0){
					this.$router.push({path: '/tradeLogin'});
				}else{
					this.$router.push({path: '/tradeApply'});
				}
			},
			getTradeWsUrl: function(){   
				var data = {
					quoteVersion: this.$store.state.market.quoteConfig.version,
					tradeVersion: this.$store.state.market.tradeConfig.version
				};
				pro.fetch('post', '/others/getSocket', data, '').then((res) => {
					if(res.success == true && res.code == '1'){
						this.$store.state.market.tradeConfig.url_real = res.data.tradeUrl;
					}
				}).catch((err) => {
					var data = err.data;
					if(data) Toast({message: data.message, position: 'bottom', duration: 2000});
				});
			},
			tradeLogin: function(){
//				Toast({message: '交易功能正在内测中，敬请期待…', position: 'bottom', duration: 1500});return;
				if(this.user == '' || this.user == undefined || this.user == null){
					Toast({message: '请输入您的账号名', position: 'bottom', duration: 1500});
				}else if(this.pwd == '' || this.pwd == undefined || this.pwd == null){
					Toast({message: '请输入您的密码', position: 'bottom', duration: 1500});
				}else{
					if(this.tradeConfig.url_real == '' || this.tradeConfig.url_real == undefined){
						Toast({message: '获取交易地址失败', position: 'bottom', duration: 1500});
						return;
					}
					this.$store.state.market.tradeConfig.username = this.user;
					this.$store.state.market.tradeConfig.password = Base64.encode(this.pwd);
					var userData = {'username': this.user, 'password': Base64.encode(this.pwd)};  
					localStorage.tradeUser = JSON.stringify(userData);
					this.initTrade();
					Indicator.open({spinnerType: 'fading-circle'});
					setTimeout(() => {
						if(this.loginStatus && this.loginStatus == false){
							Indicator.close();
							Toast({message: '网络不给力，请稍后再试', position: 'bottom', duration: 1500});
						}
					}, 5000);
				}
			},
			tradeApply: function(){
				this.$router.push({path: '/tradeApply'});
			},
			switchAccount: function(){
				if(this.tradeAccounts.length <= 0){
					Toast({message: '暂无交易账号可切换', position: 'bottom', duration: 1500});
					return;
				}
				this.obj = this.tradeAccounts;
				this.type = 'accounts';
				$(".select_cont").css({bottom: 0});
				this.$refs.selectBox.shadeShow = true;
			},
			getTradeAccounts: function(){
				this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(this.userInfo == ''){
					Toast({message: '请先登录平台账号', position: 'bottom', duration: 1500}); 
					return;
				}
				let headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret,
				}
				pro.fetch('post', '/futureManage/getAccounts', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						this.tradeAccounts = res.data;
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		created: function(){
			if(this.$store.state.account.quoteStatus == false){
				//获取所有可交易合约
				pro.fetch("post", "/futureManage/getApplyData", "", "").then((res)=>{
					if(res.success == true && res.code == 1){
						this.$store.state.account.tradableCommodity = res.data.tradableList;
						this.$store.state.market.commodityOrder = res.data.tradableList;
						//初始化行情
						if(this.$store.state.market.commodityOrder){
							this.initQuoteClient();
						}
					}
				}).catch((err)=>{
					Toast({message: err.data.message, duration: 2000});
				});
			}
		},
		beforeMount: function(){
			//获取交易账号
			this.getTradeAccounts();
			//获取交易ws地址
			this.getTradeWsUrl();
		},
		mounted: function(){},
		activated: function(){
			//获取交易账号
			this.getTradeAccounts();
			//URL是否带参
			let query = this.$route.query;
			if(query){
				this.user = query.tradeAccount;
				this.pwd = query.password;
			}
			//判断是否需要刷新
			if(sessionStorage.isSwitchAccount == 'true'){
				sessionStorage.removeItem("isSwitchAccount");
				window.location.reload();
				this.user = '';
				this.pwd = '';
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		z-index:1000;
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 1rem;
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		margin: auto;
		.tab{
			width: 4rem;
			height: 0.56rem;
			margin: 0.22rem auto;
			span{
				display: inline-block;
				float: left;
				width: 2rem;
				height: 0.56rem;
				line-height: 0.56rem;
				text-align: center;
				background: $lightBlue;
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_back{
			width: 0.24rem;
			height: 1rem;
			background: url(../../assets/images/quote/back_icon.png) no-repeat center 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0.3rem;
		}
	}
	.fm{
		margin-top: 1.01rem;
		padding: 0.3rem 0.3rem 0 0.3rem;
		.row{
			width: 6.9rem;
			height: 0.88rem;
			background: #1b1f26;
			border: 0.01rem solid $black;
			border-radius: 0.1rem;
			margin-bottom: 0.3rem;
			span{
				float: left;
				line-height: 0.88rem;
				font-size: $fs28;
				margin: 0 0.2rem 0 0.3rem;
			}
			input{
				float: left;
				width: 3.4rem;
				height: 0.84rem;
				line-height: 0.84rem;
				color: $white;
			}
			button{
				float: right;
				width: 1.74rem;
				height: 0.86rem;
				line-height: 0.86rem;
				background: $titleBlue;
				color: $white;
				margin: 0 0.01rem 0 0;
				padding: 0;
				border-bottom-right-radius: 0.1rem;
				border-top-right-radius: 0.1rem;
			}
		}
		.mb30{
			margin-bottom: 0.3rem;
		}
	}
	h3{
		width: 7.5rem;
		height: 0.64rem;
		line-height: 0.64rem;
		padding: 0 0.3rem;
		background: $titleBlue;
		border-top: 0.01rem solid $black;
		border-bottom: 0.01rem solid $black;
		margin-bottom: 0.2rem;
	}
	p{
		padding: 0 0.3rem;
		line-height: 0.4rem;
		color: $white;
		span{
			color: $fontBlue;
		}
	}
</style>