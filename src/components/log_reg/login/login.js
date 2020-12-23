const result='__';
export default{
	name:'login',/* 登录界面 */
	data:function(){
		return {
			is_PC:null,/* pc端是true,手机端是false */
			login_obj:{
				username:{
					txt:'用户名',
					type:'text',
					val:'',
					placeholder:'请输入用户名',/* '中、英文均可，最长18个英文或9个汉字或者邮箱' */
					status:'*',
					regexp:/^[\u4E00-\u9FA50-9]{1,9}$|^[a-zA-Z0-9]{1,18}$|^[\u4E00-\u9FA5a-zA-Z]{1,9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				},
				password:{
					txt:'密码',
					type:'password',
					val:'',
					status:'*',
					placeholder:'请输入密码',/* 5-20位英文、数字、下划线，区分大小写 */
					regexp:/^[_a-zA-Z0-9_]{5,20}$/
				}
			},
			result:result
		}
	},
	methods:{
		notice(txt){/* 通知函数 */
			this.result=txt;
			setTimeout(()=>{
				this.result=result;
			},4000);
		},
		checkIpt(name){/* keyup检测函数 */
			console.log(name);
			let {val,status,regexp}=this.login_obj[name];
			if(regexp.test(val)){
				this.login_obj[name].status='√'
			}else{
				this.login_obj[name].status='*'
			};
		},
		login(){
			const login_obj=this.login_obj;
			const data={};
			for(const [key,item] of Object.entries(login_obj)){
				if(item.val==''||item.status=='*'){
					this.notice(`${item.txt}填写不正确!`);
					return;
				}else{
					Object.assign(data,{
						[key]:item.val
					})
				}
			};
			this.basefn.ajaxfn(`${this.ip_test}/loginup/`,"POST","json",data,(res,rest)=>{
				console.log(res,rest);
				const {result,reason}=res;
				// return;
				if(result=='false'){
					this.notice(reason);
				}else if(result=='ok'){
					this.notice('登录成功');
					this.$store.commit('setUserdata',{username:res.data.username,img:'img2'})
					this.$router.push({
						name:'home'
					})
				}
			});
		}
	},
	created(){
		this.ip_test=window.sjg_config.request_url.wb;
		this.is_PC=this.basefn.IsPC;
	}
}