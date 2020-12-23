const result='__';
const get_code='获取验证码';
let second=1*60;
export default{
	name:'forget_pwd',/* 密码找回界面 */
	data:function(){
		return {
			is_PC:null,/* pc端是true,手机端是false */
			forget_obj:{
				password:{
					txt:'重置密码',
					type:'password',
					val:'',
					status:'*',
					placeholder:'请输入密码',/* 5-20位英文、数字、下划线，区分大小写 */
					regexp:/^[_a-zA-Z0-9_]{5,20}$/
				},
				repasswd:{
					txt:'确认密码',
					type:'password',
					val:'',
					status:'*',
					placeholder:'请输入确认密码',/* 5-20位英文、数字、下划线，区分大小写 */
					regexp:/^[_a-zA-Z0-9_]{5,20}$/
				},
				email:{
					txt:'邮箱',
					type:'email',
					val:'',
					placeholder:'请输入邮箱',
					status:'*',
					regexp:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				},
				randcode:{
					txt:'验证码',
					type:'text',
					val:'',
					placeholder:'请输入验证码',
					status:'*',
					regexp:/^[A-Za-z0-9]{6}$/,
				}
			},
			randcodeobj:{
				width:'80px'
			},
			get_code:get_code,
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
		resetPwd(){/* 重置密码 */
			const forget_obj=this.forget_obj;
			const data={};
			for(const [key,item] of Object.entries(forget_obj)){
				if(item.val==''||item.status=='*'){
					this.notice(`${item.txt}填写不正确!`);
					return;
				}else{
					Object.assign(data,{
						[key]:item.val
					})
				}
			};
			this.basefn.ajaxfn(`${this.ip_test}/resetpwd/`,"POST","json",data,(res)=>{
				console.log(res);
				const {result,reason}=res;
				if(result=='false'){
					this.notice(reason);
				}else if(result=='ok'){
					this.notice('重置密码成功');
					setTimeout(()=>{
						this.$emit('toggleAction',{
							index:0
						})
						this.$router.push({
							name:'login'
						});
					},2000);
				}
			})
		},
		countTime(){
			this.get_code=`${second}s`;
			window.countTime=setInterval(()=>{
				if(Number.parseInt(this.get_code)==0){
					clearInterval(window.countTime);
					this.get_code=get_code;
				}else{
					this.get_code=(Number.parseInt(this.get_code)-1)+'s';
				};
			},1000)
		},
		getRandcode(){/* 获得邮箱验证码函数 */
			const {email}=this.forget_obj;
			const data={};
			if(this.get_code!=get_code){
				this.notice('请稍后再试!');
				return;
			};
			this.countTime();
			if(email.val==''||email.status=='*'){
				this.notice(`请填写正确的邮箱地址!`);
				return;
			}else{
				data.email=email.val
			};
			this.basefn.ajaxfn(`${this.ip_test}/resetpwdemail/`,"POST","json",data,(res)=>{
				console.log(res);
				const {result}=res;
				this.notice(res.result);
				
			})
		},
		checkIpt(name){/* keyup检测函数 */
			console.log(name);
			let {val,status,regexp}=this.forget_obj[name];
			if(regexp.test(val)){
				this.forget_obj[name].status='√'
			}else{
				this.forget_obj[name].status='*'
			};
		}
	},
	created(){
		this.ip_test=window.sjg_config.request_url.wb;
		this.is_PC=this.basefn.IsPC;
		clearInterval(window.countTime);
	},
	beforeDestroy(){
		clearInterval(window.countTime);
	}
}