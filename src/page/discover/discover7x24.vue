<template>
	
		<div class="wrap">
			<h2>2018－05－01 星期五</h2>
			<ul class="list">
				<mt-loadmore :bottom-method="loadBottom"  :auto-fill="false" :top-method="loadTop" ref="loadmore">
						<template >
							<li class="list" v-for="k in newsInfo">
								<p class="time_text"><span class="time">{{k.createdAt | changTime }}</span></p>
								<div class="box">
									<p>{{k.liveTitle}}</p>
									<div class="icon_box">
										<i class="display_icon"></i>	
									</div>
									
								</div>
								<!-- <p :class="{textHeight:k.zhankai}" :style="{color:k.importance!=1?'#ff5533':''}">{{k.liveTitle}}</p>
								<p v-if="k.liveTitle.length>120" @click="showAll1(k)"><span>{{k.zhankai?'展开':'收起'}}</span></p> -->
							</li>
						</template>
				</mt-loadmore> 

				<li class="item">
					<p class="time_text"><span class="time">16:44</span></p>
					<div class="box">
						<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。</p>
						<i class="display_icon"></i>
					</div>
				</li>
				<li class="item">
					<p class="time_text"><span class="time">16:44</span></p>
					<div class="box">
						<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息</p>
						<i class="display_icon"></i>
					</div>
				</li>
				<li class="item">
					<p class="time_text"><span class="time">16:44</span></p>
					<div class="box">
						<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息</p>
						<i class="display_icon"></i>
					</div>
				</li>
				<li class="item">
					<p class="time_text"><span class="time">16:44</span></p>
					<div class="box">
						<p>GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息。GA统计代码随后将这些访客信息存储到Cookie中，Cookie是一段短小的文本，存放于本地，与访问的网站相关联，它被用来判断一个用户是初次访问还是多次访问，页面的推荐来源和随后的页面浏览信息</p>
						<i class="display_icon"></i>
					</div>
				</li>
			</ul>
		</div>
</template>

<script>
	import pro from '../../assets/js/common'
	export default {
		name: "discover7x24",
		data() {
			return {
				tabSelected: 'discover',
				selected: "1",
				startTime: '',
				endTime: '',
				newsInfo: []
			}
		},
		methods: {
			goto (...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({path:pathObj[0]})
				}else if (pathObj.length == 2) {
					this.$router.push({path:pathObj[0] ,query: {
						id:1,
						title:'比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
						time: '2018-02-10'
					}})
				}
				
			},
			getNewsInfo:function(pageNo){
		    	var data = {
		    		pageSize:20,
		    		pageNo:pageNo,
		    		// minTime:this.startTime,
					// maxTime:this.endTime,
					minTime: '2018-5-17',
		    		maxTime: '2018-5-18',
		    		keyword:""
		    	}
		    	this.$pro.fetch("post","/news/get7_24Live",data,"").then((res)=>{
					console.log(res)
		    		if(res.code == 1 && res.success == true){
						res.data.forEach((k) => {
							if(k.liveTitle.length>120){
								k.zhankai = true
							}							
						})
		    			this.newsInfo = res.data;
		    		}
		    	}).catch((err)=>{
//		    		console.log("err==="+err)
					// this.err(err)
		    	})
			},
			loadBottom () {

			},
			loadTop () {

			}
		},
		filters:{
			changTime:function(e){
				return  pro.getDate(e*1000,"h:m");
				
			},
		},
		created () {
			let today = new Date()
			let tomorrow =  today.setDate(today.getDate()+1)
			this.minTime = this.$pro.getDate(Date.parse(today),"y-m-d")
			this.maxTime = this.$pro.getDate(Date.parse(tomorrow),"y-m-d")
			this.getNewsInfo(0)
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.wrap{
		h2{
			@include font($fs24,0.64rem,$graySimple);
			background-color: $bgDeep;
			border-bottom: 1px solid $bgDeep;
		}	
		.list{
			padding: 0.25rem 0.3rem;
			.time_text{
				position: relative;
				&::before {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					content: '';
					width: 0.16rem;
					height: 0.16rem;
					background-color: $blueBall;
					border-radius: 50%;
				}
			}
			.time{
				display: inline-block;
				width: 1rem;
				height: 0.4rem;
				margin-left: 0.3rem;
				@include font($fs24,0.4rem,$graySimple);
				background-color: $bgGray;
				border-radius: 0.2rem;
			}
			.box{
				border-left: 0.04rem dashed #dadae6;
				padding: 0.3rem 0.2rem;
				margin: 0 0.05rem;
				p{
					@include font($fs30,0.46rem,$blcakThin,left);
					padding-bottom: 0.8rem; 
					border-bottom: 1px solid $bgDeep;
				}
			}
			.icon_box{
				position: absolute;
			}
			.display_icon{
				display: inline-block;
				width: 0.32rem;
				height: 0.32rem;
				background: url('../../assets/images/discover/display_icon_up.png') center no-repeat;
				background-size: cover;

			}
		}
	}
	
</style>