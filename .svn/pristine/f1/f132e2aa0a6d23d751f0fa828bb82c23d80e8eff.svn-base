import * as Types from '../../store/types.js';
import pub from '../public.js';
export default {
	name:'navbar',
	data:function(){
		return {
			nav_data:{
				def:null,
				list:{
					back:{
						cs:'iconfont iconfanhui-yuanshijituantubiao',
						txt:'返回',
						fn:'goBack'
					},
					home:{
						cs:'iconfont iconhoempage',
						txt:'首页',
						fn:'goHome'
					},
					login:{
						cs:'iconfont iconadmin',
						txt:'我的',
						fn:'operateAdmin'
					}
				}
				
			}
		}
	},
	methods:{
		navAction(fn){
			/* li点击触发函数 */
			console.log(fn);
			this[fn]();
		},
		operateAdmin(hishow){
			/* 触发我的模块,登录,或者查看个人登录信息 */
			// pub.checkLogin.call(this,Types);
			this.$emit('getAdmin',{hishow:true});
		},
		goHome(){
			/* 首页触发函数 */
			this.$router.push({
				name:'home'
			})
		},
		goBack(){
			/* 从iframe外跳返回列表页 */
			const {current_route_name}=this.$store.state.iframe_data;
			this.$router.push({
				name:current_route_name
			})
		}
	},
	created(){
		// this.nav_data.def=this.nav_data.list.home;
	}
}