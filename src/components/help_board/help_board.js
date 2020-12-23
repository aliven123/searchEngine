const s_card='s_card',b_card='b_card';
export default{
	data:function(){
		return {
			ip_test:null,
			help_data:null,
			is_PC:null/* pc端是true,手机端是false */,
		}
	},
	computed:{
		renderTxt(){
			const {tag,details}=this.help_data;
			return details[tag];
		}
	},
	methods:{
		initData(){
			const help_data={
				tag:this.is_PC?b_card:s_card,
				details:{
					[s_card]:{
						title:'联系我们',/* 和切换按钮同级的提示文字 */
					},
					[b_card]:{
						request_lock:true,/* 是否请求的开关 */
						title:'',/* 和切换按钮同级的提示文字 */
						QQ:'',
						text:'',/* 用户自定义提示模板 */
						TD_code:{
							index:0,
							nav_list:['联系我们','下载APP'],
							image_list:[{
								src:'',
								des:'微信扫一扫,私享最新原创实用干货'
							},{
								src:'',
								des:'微信扫一扫,下载APP'
							}]
						}
					}
				}
			};
			this.help_data=help_data;
		},
		getWxImg(){
			if(this.help_data.details[b_card].request_lock){
				let current_url=window.location.host;
				current_url=current_url.includes('localhost')?'niuguresou.com':current_url;
				const data={
					url:current_url
				};
				this.basefn.ajaxfn(`${this.ip_test}/get_customer/`,"POST","json",data,(res)=>{
					console.log(res)
					const {text,qq,jpg,text1}=res;
					console.log(this.$store.state.loading.download);
					this.help_data.details[b_card]={
						title:'',
						QQ:qq,
						text,
						TD_code:{
							index:0,
							nav_list:['联系我们','下载APP'],
							image_list:[{
								src:jpg,
								des:text1
							},{
								src:this.$store.state.loading.download,
								des:'微信扫一扫,下载APP'
							}]
						}
					}
				})
			}
		},
		toggleHS(card_stype){
			this.help_data.tag=card_stype;
			if(card_stype==b_card){
				this.getWxImg();
			}
		},
		handleNav(index){
			this.help_data.details[b_card].TD_code.index=index;
		}
	},
	created(){
		this.ip_test=window.sjg_config.request_url.wb;
		this.is_PC=this.basefn.IsPC;
		this.initData();
	},
	mounted(){
		if(this.is_PC){
			this.getWxImg();
		}
	}
}