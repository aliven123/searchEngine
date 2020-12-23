export default {
	name:'display_ctn',//搜索明细和首页 涨幅搜索指数展示打赏和锁与文本混排的组件
	data:function(){
		return {
			display_data:{}
		}
	},
	props:{
		data_obj:{
			type:Object,
			default:function(){
				return {
					value:111,
					txt:'lock'
				}
			}
		}
	},
	methods:{
		handleDonate(){
			this.$emit('handleDonate',{txt:'打赏'})
		},
		visitLogin(){
			this.$emit('visitLogin',{action:'login'})
		}
	},
	computed:{
		getData(){
			return this.data_obj
		}
	},
	watch:{
		getData:{
			deep:true,
			immediate:true,
			handler(newval,oldval){
				this.display_data=newval;
			}
		}
	}
}