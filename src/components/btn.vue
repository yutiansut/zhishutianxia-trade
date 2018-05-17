<template>
	<div id="btn">
		<button class="btn" :class="colors" @touchstart="lontap" @touchend="levtap">{{name}}</button>
	</div>
</template>

<script>
	export default{
		name: 'btn',
		props: ['name','className'],
		computed: {
			colors: function(){
				switch(this.className){
					case 'bluelg':
						return 'bluelg';
						break;
					case 'orangelg':
						return 'orangelg';
						break;
					case 'redlg':
						return 'redlg';
						break;
					case 'bluemd':
						return 'bluemd';
						break;
					case 'orangemd':
						return 'orangemd';
						break;
					case 'redmd':
						return 'redmd';
						break;
					case 'greenmd':
						return 'greenmd';
						break;
					case 'orangesm':
						return 'orangesm';
						break;
					case 'bluesm':
						return 'bluesm';
						break;
					case 'greensm':
						return 'greensm';
						break;
				}
				
			}
		},
		methods: {
			lontap:function(e){
				$(e.currentTarget).addClass("current");
			},
			levtap:function(e){
				$(e.currentTarget).removeClass("current");
			}
		}
	}	
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	.btn{
    	height: 0.88rem;
    	line-height: 0.88rem;
    	overflow: hidden;
    	border-radius: 0.1rem;
    	color: $white;
    	font-size: $fs32;
    	text-align: center;
    	padding: 0;
    	&.bluelg{
    		width: 6.9rem;
    		background: $blue;
    		&.current{
    			background: #30b2f2;
    		}
    	}
    	&.orangelg{
    		width: 6.9rem;
    		background: $orange;
    		&.current{
    			background: #ff6a4c;
    		}
    	}
    	&.redlg{
    		width: 6.9rem;
    		background: $red;
    		&.current{
    			background: #fc6f6f;
    		}
    	}
    	&.bluemd{
    		width: 3.3rem;
    		background: $blue;
    		&.current{
    			background: #ff6a4c;
    		}
    	}
    	&.orangemd{
    		width: 3.3rem;
    		background: $orange;
    		&.current{
    			background: #ff6a4c;
    		}
    	}
    	&.redmd{
    		width: 3.3rem;
    		background: $red;
    		&.current{
    			background: #fc6f6f;
    		}
    	}
    	&.greenmd{
    		width: 3.3rem;
    		background: $green;
    		&.current{
    			background: #3dcc85;
    		}
    	}
    	&.orangesm{
    		width: 1.28rem;
    		height: 0.64rem;
    		line-height: 0.64rem;
    		background: #cc7727;
    		font-size: $fs24;
    		&.current{
    			background: #cc833f;
    		}
    	}
    	&.bluesm{
    		width: 1.28rem;
    		height: 0.64rem;
    		line-height: 0.64rem;
    		background: #4d5e80;
    		font-size: $fs24;
    		&.current{
    			background: #56647f;
    		}
    	}
    	&.greensm{
    		width: 1.28rem;
    		height: 0.64rem;
    		line-height: 0.64rem;
    		background: #6f7d52;
    		font-size: $fs24;
    		&.current{
    			background: #88966b;
    		}
    	}
    }
</style>