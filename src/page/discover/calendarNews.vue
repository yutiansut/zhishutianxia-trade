<template>
	<div class="calendar_wrap">
		<h2>{{showTime}}</h2>
		<div class="calendar_date">
			<ul class="date_list">
				<li v-for="item in weekDayList" :class="{'selected':item.time == showTime}" @click="changeDate(item)">
					<p class="date">{{item.day}}</p>
					<p class="day">{{item.weekday}}</p>
				</li>
			</ul>
		</div>
		<ul class="my_list">
			<li class="item">
				<div class="title_box">
					<div class="left">
						<span class="subscribe_icon_no"></span>
						<span class="time">06:30</span>
						<img src="../../assets/images/discover/flag_china.png" alt="">
						<span class="country">中国</span>
					</div>
					<div class="right">
						<i class="star_icon"></i>
						<i class="star_icon star_red"></i>
						<i class="star_icon star_yellow"></i>
					</div>
				</div>
				<div>
					<p class="text">中国公布三月M0货币供应年率</p>
				</div>
				<div class="number_box">
					<p>今值: <span>---</span></p>
					<p>预期: <span>0.20%</span></p>
					<p>前值: <span>2.00%</span></p>
				</div>
			</li>
			<li class="item">
				<div class="title_box">
					<div class="left">
						<span class="subscribe_icon_no subscribe_icon"></span>
						<span class="time">06:30</span>
						<img src="../../assets/images/discover/flag_china.png" alt="">
						<span class="country">中国</span>
					</div>
					<div class="right">
						<i class="star_icon"></i>
						<i class="star_icon star_red"></i>
						<i class="star_icon star_yellow"></i>
					</div>
				</div>
				<div>
					<p class="text">中国公布三月M0货币供应年率</p>
				</div>
				<div class="number_box">
					<p>今值: <span>---</span></p>
					<p>预期: <span>0.20%</span></p>
					<p>前值: <span>2.00%</span></p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "calendarNews",
		props: ['newDate'],
		data() {
			return {
				tabSelected: 'discover',
				selected: "1",
				today: '',
				weekday: [],
				weekDayList: [],
				showTime: '',
				list: []
			}
		},
		methods: {
			goto(...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({
						path: pathObj[0]
					})
				} else if (pathObj.length == 2) {
					this.$router.push({
						path: pathObj[0],
						query: {
							id: 1,
							title: '比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
							time: '2018-02-10'
						}
					})
				}
	
			},
			getWeekDay (time) {
				const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				return weekList[time]
			},
			mouthList (setTime= null) {
				/* 
					1. 取到当天时间的 年, 月, 日
					2. 判断本年,本月的天数
					3. 设置本月每天的星期数
					4. 渲染到页面
				*/
				let today;
				if (setTime) {
					today = new Date(setTime);
				}else{
					today = new Date();
				}
				
				let year = today.getFullYear();
				let mouth = today.getMonth();
				let date = today.getDate();
				let weekday = today.getDay();
				let mouthDayList = [];
				const mouthDayLength = [31,28,31,30,31,30,31,31,30,31,30,31]
				//判断当月的天数
				//处理闰年二月
				if (year%4 === 0 ) {
					mouthDayLength[1] = 29
				}
				let mouthDay = mouthDayLength[mouth];
				//当月第一天 
				for (let index = 1; index <= mouthDay; index++) {
					//循环遍历 得到每天的星期数   星期数 = |(天数差%7 + 当天星期数)%7|
					let indexDayWeekday = ((index - date)%7 + weekday)%7;
					//let isSelected = index===date;
					let indexDay = {
						time: year + '-' + (mouth + 1) + '-' + index,
						day: index,
						weekday: this.getWeekDay (Math.abs(indexDayWeekday)),
						//selected: isSelected
					}
					mouthDayList.push(indexDay)
					 	
				}
				this.showTime = mouthDayList[date - 1].time
				return mouthDayList


			},
			getTomorrow (todayString) {
				let todayList = todayString.split('-');
				todayList[2] = todayList[2]*1 + 1;
				return todayList.join("-");
				
			},
			changeDate (item) {
				if(item.time == this.showTime) return;
				//console.log(item.time)
				this.showTime = item.time
				let tomorrow = this.getTomorrow(this.showTime)
				if (this.userInfo) {
					this.getInfoList(item.time, tomorrow)
				}else{
					console.log(123)
				}

			},
			getInfoList (startTime,endTime) {
				const data = {
					startTime:startTime,
					endTime:endTime
				}
				const headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				this.$pro.fetch("post","/news/getCalendar",data,headers).then((res)=>{
//					console.log("res======"+JSON.stringify(res));
					if(res.success == true && res.code == 1){
						this.list = res.data;
						if(!this.list){
							this.showNoInfo = true
						}else{
							this.showNoInfo = false
						}
					}
				}).catch((err) => {
                    var data = err.data;
                    console.log(err)
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                            this.$router.push({
                                path: "/login"
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
			},

		},
		watch: {
			newDate (newValue, oldValue) {
				if (newValue&&newValue !== oldValue) {
					this.weekDayList = this.mouthList(newValue);
					//console.log(Date(newValue))
					let tomorrow = this.getTomorrow(newValue);
					if (this.userInfo) {
					this.getInfoList(newValue, tomorrow)
					}else{
						console.log(123)
					}
				}
			}	
		},
		created () {
			const local = this.$pro.local;
			this.userInfo = local.get('user');
			let today = new Date();
			this.today = today;
			this.weekDayList = this.mouthList()
		},
		
	
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
.calendar_wrap{
		h2{
			@include font($fs24,0.64rem,$graySimple);
		}
		.calendar_date{
			overflow: scroll;
			 -webkit-overflow-scrolling: touch;
		}
		.date_list{
			@include flex(space-between);
			width: 500%;
			background-color: $bgGray;
			padding: 0.3rem 0.2rem;
			li{
				padding: 0 0.2rem;
			}
			.selected{
				p {
					color:$blueBall
				}
			}
			.date{
				@include font($fs40,0.5rem,$grayDeep);
			}
			.day{
				@include font($fs26,0.5rem,$grayDeep);
			}
		}
		.item{
			padding: 0.3rem;
			border-bottom: 1px solid $bgDeep;
			.title_box{
				@include flex(space-between);
				font-size: 0
			}
			.left{
				.time,.country{
					@include font($fs24,0.3rem,$grayMiddle);
					vertical-align: middle;
				}
				img{
					width: 0.45rem;
					height: 0.3rem;
					vertical-align: middle;
					margin: 0 0.2rem;

				}
			}
			.right{
				.star_icon{
					display: inline-block;
					width: 0.22rem;
					height: 0.2rem;	
					background: url('../../assets/images/discover/star_gray.png') center no-repeat;
					background-size: 100%;
				}
				.star_red{
					background: url('../../assets/images/discover/star_red.png') center no-repeat;
					background-size: 100%;
				}
				.star_yellow{
					background: url('../../assets/images/discover/star_yellow.png') center no-repeat;
					background-size: 100%;
				}
			}
		}
		.subscribe_icon_no{
			display: inline-block;
			vertical-align: middle;
			width: 0.3rem;
			height: 0.3rem;
			margin-right: 0.1rem;
			background: url('../../assets/images/discover/subscribe_icon_no.png') center no-repeat;
			background-size: 100%;
			
		}
		.subscribe_icon {
			background: url('../../assets/images/discover/subscribe_icon.png') center no-repeat;
			background-size: 100%;
		}
		.text{
			@include font($fs30,0.8rem,$blcakThin,left);
		}
		.text_red{
			color: $redDeep
		}
		.number_box{
			@include flex(space-between);
			p{
				@include font($fs24,0.3rem,$graySimple,left);
				span{
					color:$blcakThin
				}
			}
		}
	}
</style>