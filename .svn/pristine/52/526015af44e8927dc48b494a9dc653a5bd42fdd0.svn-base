export default{
	name:'award',/* 打赏页面 */
	data:function(){
		return {
			init_data:{}
		}
	},
	computed:{
		img_src(){
			console.log(this.init_data);
			const {def,list}=this.init_data.award;
			return list[def].src;
		}
	},
	props:{
		p_datas:{
			type:Object,
			default:function(){
				return {
					title:'头部',
					award:{
						def:'wx',
						list:{
							wx:{
								value:'wx',
								txt:'微信',
								src:''
							},
							zfb:{
								value:'zfb',
								txt:'支付宝',
								src:''
							}
						}
					},
					wx_gongzh:''
				}
			}
		}
	},
	methods:{
		initPos(){
			const win_w=$(window).width(),win_h=$(window).height();
			const $el=$(this.$el);;
			console.log($el.outerWidth(true));
			$el.css({
				left:(win_w-$el.outerWidth(true))/2+'px',
				top:(win_h-$el.outerHeight(true))/2+'px'
			})
		},
		close(){
			this.$emit('donate',{hishow:false})
		}
	},
	created(){
		this.init_data=this.p_datas;
		console.log(this.init_data);
	},
	mounted(){
		this.initPos();
	}
}