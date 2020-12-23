export default{
	name:'log_reg',/* 登录注册公共界面 */
	data:function(){
		return {
			nav:{
				def:'login',
				list:[{
					route:'login',
					txt:'登录'
				},{
					route:'register',
					txt:'注册'
				},{
					route:'forget_pwd',
					txt:'忘记密码'
				}]
			},
			loading:null
		}
	},
	methods:{
		toggleAction(oneself,{index}){
			this.nav.def=this.nav.list[index].route;
		},
		goHomelayer(){
			this.$router.push({name:'home'})
		},
		advertiseUrl(src){
			if(!src.includes('http')){
				src=`${this.ip_test}/${src}`
			};
			return src
		}
	},
	created(){
		this.ip_test=window.sjg_config.request_url.wb;
		this.loading=this.$store.state.loading;
		this.nav.def=this.$route.name;
	}
}