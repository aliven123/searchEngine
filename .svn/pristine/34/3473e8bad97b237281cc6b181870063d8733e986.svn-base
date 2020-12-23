import {setUserboard} from '../../store/types.js';
import {Message} from 'element-ui';
import * as Types from '../../store/types.js';
console.log(setUserboard);
export default{
	name:'admin',/* 首页登录,注册,设置菜单的抽屉模块 */
	data:function(){
		return {
			drawer: false,
			direction:'ltr',
			nav_list:{
				shareTo:{
					txt:'邀请注册',
					cls:''
				},
				applyVip:{
					txt:'购买VIP',
					cls:''
				},
				userFB:{
					txt:'用户反馈',
					cls:''
				}
			},
			loginout:{
				txt:'退出',
				// cls:'iconfont iconsearch'
				cls:''
			},
			log_reg:'/log_reg'
		}
	},
	computed:{
		getUserStatus(){
			const userdata=this.$store.state.userdata;
			console.log(userdata);
			if(userdata.username!='登录'){
				this.log_reg='';
			}else{
				this.log_reg='/log_reg';
			};
			return userdata
		}
	},
	methods:{
		operateDrawer(hishow){
			console.log(hishow);
			this.drawer=hishow;
			this.$store.commit(setUserboard,{hishow:false});
		},
		loginOut(){
			const data={};
			this.basefn.ajaxfn(`${this.ip_test}/logoutout/`,"POST","json",data,(res)=>{
				console.log(res);
				const {result}=res;
				if(result=='退出成功'){
					console.log(this.$store.state);
					this.$store.commit(Types.setUserdata,{username:'登录'});
					this.$store.commit(Types.clearZixuan);
				}
			})
		},
		applyVip(){
			// 购买VIP
			
			this.basefn.ajaxfn(`${this.ip_test}/apply/`,"POST","json",{},(res)=>{
				console.log(res);
				const {result}=res;
				const buyvip=this.$store.state.loading.buyvip;
				if(result!='用户未登录'&&this.$store.state.loading.buyvip){
					this.windowOpen(this.$store.state.loading.buyvip,'_blank');
					return;
				};
				Message.info({
					message:result,
					customClass:'info'
				})
			})
		},
		shareTo(){
			//邀请注册
			if(this.$store.state.loading.invitationlink==''){
				Message.info({
					message:'未找到分享地址！',
					customClass:'info'
				});
				return;
			};
			this.windowOpen(this.$store.state.loading.invitationlink);
		},
		windowOpen(url,target='_self'){//target 控制pc端新开页的方式
			if(this.basefn.IsPC){//pc端是true
				window.open(url,target)
			}else{
				window.open(url,'_self')
			}
		},
		userFB(){
			this.windowOpen(this.$store.state.loading.quesreport,'_blank');
		},
		operation(name){/* navlist中菜单的命令 */
			console.log(name);
			const action={
				// 注册触发函数；
				loginout:this.loginOut,
				applyVip:this.applyVip,
				shareTo:this.shareTo,
				userFB:this.userFB
			};
			if(action[name]){
				action[name]();
			}
		}
	},
	created(){
		this.ip_test=window.sjg_config.request_url.wb;
		console.log(4646)
	}
}