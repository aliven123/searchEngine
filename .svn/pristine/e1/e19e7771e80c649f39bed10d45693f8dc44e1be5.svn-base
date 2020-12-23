// window.sjg_config是在index.html定义的接口
const state=sessionStorage.getItem('state')?JSON.parse(sessionStorage.getItem('state')):{
	search_data:{
		c_page:1,
		page:1,/* 总页码 */
		start:1,/* 第一页的页码 */
		len:10,/* 显示的页码数 */
		list:[]
	},
	news_data:{/* 热词的数据 */
		nav_index:0,/* 热词和新闻等导航的index,
				点击换一换的时候,用sort中当前对象的c_page;
			*/
		orderby:'searchnum',//降序或者无排序
		sort:[],
		news:[],
		word:[]
	},
	search_txt:'',/* 搜索的文本 */
	scroll_top:0,/* 搜索结果的滚轮位置 */
	iframe_data:{/* 搜索列表数据,点击之后跳转到iframe页需要的数据 */
		current_route_name:null,/* 从iframe返回应该跳转的路由 */
		url:null/* iframe接收的url */
		
	},
	/* pc端控制登录弹窗的开关 */
	userswitch:false,
	userdata:{
		username:'登录'
	},
	loading:{
		cse: null,
		name: "SouJinGu",
		SEO: "SouJinGu",
		websign: null,
		recordinfo: null,
		precordinfo: null,
		picsign: "",
		logo: "",
		wechat: "image/weixin.png",
		alipay: "image/zhifubao.png",
		download: ""
	},
	zhenggu:{
		time_stamp:null
	}
};
export default state;