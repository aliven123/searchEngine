import {
	Loading,Message
} from 'element-ui';
import * as Types from '../../store/types.js';
import pub from '../public.js';
let route_params = false; /* 路由传递过来的参数 */
const word_header={
	def:'rate',
	header_obj:{
		rate:'涨幅',
		index:'搜索指数'
	}
};
export default {
	name: "homelayer",
	/*搜金股首页*/
	data: function() {
		return {
			ip_test: null,
			search_txt: '',
			rank_indicators_host:false,//只有牛股热搜才会显示诊股模块的标记
			search_data: {
				c_page: 1,
				/* 当前页面 */
				page: 0,
				/* 总页码 */
				start: 1,
				/* 第一页的页码 */
				len: 10,
				/* 显示的页码数 */
				list: []

			},
			news: [],
			loading: {
				cse: "AJvRUv3t516eOjsdYDmjnoyJxDCK:1584007039661",
				name: "SouJinGu",
				SEO: "SouJinGu",
				websign: null,
				recordinfo: null,
				precordinfo: null,
				picsign: "image/eleps.png",
				logo: null,
				wechat: "image/weixin.png",
				alipay: "image/zhifubao.png",
				download: ""
			},
			pagination: {
				start: 1,
				/*最前一页 */
				c_page: 1,
				len: 10 /* 显示的页数 */
			},
			ipt_obj: {
				init_obj: {
					list_arr: ['1', '12'],
					ul_style: {
						background: 'white',
						display: 'block',
						border: '1px solid black',
						width: '100%',
						maxHeight: '120px',
						textAlign: 'left',
						top:'33px',
						boxShadow:'1px 1px 4px #71686b'
					}
				},
				ipt_txt: ''
			},
			is_PC: null,
			relevant:{
				list:[]
			},
			toggle_header:{
				hishow:false
			},
			global_lock_datas:{
				css:{
					'height':'0px'
				}
			},
			menus:{
				def:'rank_indicator',
				list:{
					rank_indicator:{
						txt:'努金牛策诊股'
					},
					rec_stock:{
						txt:'牛股排行'
					}
				}
			}
		}
	},
	components: {
		ipt_search: () => import('../ipt_search/input_search.vue'),
		display_ctn:()=>import('../display_ctn/display_ctn.vue'),
		toggle_header:()=>import('../toggle_header/toggle_header.vue'),
		global_lock:()=>import('../global_lock/global_lock.vue'),
		rank_indicator:()=>import('../rank_indicators/rank_indicators.vue'),
		rec_stock:()=>import('../rec_stock/rec_stock.vue')
	},
	computed: {
		pageList() {
			let {
				start,
				len
			} = this.search_data;
			// if(!this.is_PC)len=10;
			const list = [];
			for (let i = start; i < start + len; i++) {
				list.push(i)
			};
			return list;
		},
		open_target() {
			const is_PC = this.is_PC;
			let target = is_PC == true ? '_blank' : '_self';
			return target
		},
		news_data() {
			let news_data = this.$store.state.news_data;
			if (news_data.sort.length == 0) {
				/* 如果页面被刷新,且news_data有缓存的数据,则更新缓存的数据到news_data上 */
				if (sessionStorage.news_data != undefined) {
					news_data = JSON.parse(sessionStorage.news_data);
					this.$store.commit(Types.setNewsData, news_data);
				}
			};
			Object.assign(news_data,{word_header:pub.word_header});
			return news_data;
		},
		header_hishow(){
			// 控制热榜、关键词头部的显示与隐藏
			const header=this.$store.state.news_data.def;
			const show_list=['word','recom','zixuan','share'];
			console.log(this.$store.state.news_data.def);
			if(show_list.includes(header)){
				return true;
			}else{
				return false;
			}
		},
		global_hishow(){
			console.log(this.news_data);
			const news_data=this.news_data
			if(news_data){
				if(!news_data[news_data.def])return false;
				const str=news_data[news_data.def][0];
				// 如果str是字符串，且值是login或lock,就说明当前模块被锁定
				if(Object.prototype.toString.call(str).includes('String')&&/login|lock/.test(str)){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
	},
	props:{
		q:{
			type:String
		}
	},
	methods: {
		handleMenus(key){
			this.menus.def=key;
		},
		toggleOption(index){
			pub.getUptionalList.call(this,index);
		},
		shareOptional(){
			// 分享自选
			pub.shareOptional.call(this,Message);
		},
		handleDonate(self,data){
			//首页display组件中的打赏触发函数
			console.log(data);
			this.$router.push({
				name:'home',
				params:{
					txt:'打赏'
				}
			})
		},
		visitLogin(self,data){
			//如果搜索指数是login，则显示锁，点击路由跳转到登录界面
			this.$router.push({
				name:'login'
			})
		},
		handleMoreList(hishow){
			//涨幅，指数更多页面的切换
			this.toggle_header.hishow=hishow;
		},
		toggleindic(self,data){
			// 获得toggle_header中选中的指标，重新赋值
			console.log(data);
			const news_data=this.news_data;
			news_data.word_header.def=data.key;
			for(const key of Object.keys(news_data.word_header.header_obj)){
				Reflect.deleteProperty(news_data.word_header.header_obj,key)
			};
			news_data.word_header.header_obj[data.key]=data.des;
			news_data.orderby='searchnum';
			// pub.indicsort.call(this,Types);
		},
		indicsort(key,val){
			//如果是加锁状态就不进行排序
			const {word_header,def}=this.news_data;
			const one_data=this.news_data[def][0];
			const black_list=['lock','login'];
			if(black_list.includes(one_data[word_header.def].value)){
				return;
			};
			
			//点击指标进行排序，并重置当前模块的页码
			this.$store.state.news_data.orderby=key;
			pub.indicsort.call(this,Types);
		},
		toggleWordHeader(key){
			word_header.def=key;
		},
		initList() {
			pub.searchList.call(this);
		},
		getIptTxt(self, data) {
			console.log(data);
			// 根据下拉列表获得的搜索结果处理函数
			if(pub.routeToGuba.call(this,data))return;
			
			const str = data.split(' ')[0];
			console.log(this.ipt_obj.ipt_txt);
			if (str.length > 0) {
				this.ipt_obj.ipt_txt=str;
				// this.$store.state.search_txt=str;
				// let url=location.origin+location.pathname+`?q=${this.ipt_obj.ipt_txt}`;
				let url=location.origin+location.pathname+`?q=${str}`;
				window.history.replaceState({},'搜金股',url)
				this.getInfo();
			}
		},
		getcurrentTxt(self, data) {
			// 直接输入搜索，没有用下拉列表数据的处理函数
			const {
				search_now,
				input_txt
			} = data;
			this.ipt_obj.ipt_txt = input_txt;
			// console.log(this.ipt_obj.ipt_txt);
			if (search_now) {
				this.getInfo();
			}
		},
		getListData(datas_obj) {
			console.log(datas_obj);
			let {
				c_page,
				page,
				start,
				len,
				list,
				search_txt
			} = datas_obj;
			if (list.length == 0) {
				page = 0
			};
			this.search_data = {
				c_page,
				page,
				start,
				len,
				list
			};
			this.ipt_obj.ipt_txt = search_txt;
		},
		getInfo(reset = false) {
			let search_txt = this.ipt_obj.ipt_txt;
			// this.$store.state.search_txt=search_txt;
			if (search_txt == '') return;
			console.log(this.$store.state.zhenggu);
			const loadingInstance = Loading.service({
				fullscreen: true,
				text: '加载中......'
			});
			let current_url = window.location.host;
			// current_url=current_url.includes('localhost')?'test':current_url;
			current_url = current_url.includes('localhost') ? 'niuguresou.com' : current_url;
			const {
				cse
			} = this.loading;
			let {
				c_page,
				page,
				start,
				len
			} = this.search_data;
			if (reset)(this.search_data.c_page = 1);
			console.log(current_url);
			const data = {
				"q": search_txt,
				"sort": '',
				"start": c_page,
				cse,
				current_url
			};
			let url=location.origin+location.pathname+`?q=${search_txt}`;
			if(window.location.href.includes('plate')){
				url+=`&plate=${pub.getPlateId.call(this)}`
			};
			window.history.replaceState({},'搜金股',url)
			pub.clearCse.call(this,Types);
			// console.log(data);return;
			this.basefn.ajaxfn(`${this.ip_test}/get_data/`, "POST", "json", data, (res) => {
				console.log(res)
				loadingInstance.close();
				const {
					results,
					page,
					error,
					islogin,
				} = res;
				let search_data = null;
				let start = Math.floor(c_page / len) * len;
				if(islogin=='true'){
					console.log('用户已登录');
				}else{
					console.log('用户登录超时，已退出');
				};
				if (start == 0) start = 1;;
				if (results && results.length > 0) {
					search_data = {
						list: results,
						page: Number(page),
						c_page: Number(c_page),
						start,
						len,
						search_txt
					};
					/* 搜索到结果就缓存数据,刷新保存数据 */
					sessionStorage.search_data = JSON.stringify(search_data);
				} else {
					search_data = {
						list: [{
							title: `没有找到与
							<em style='color:red;font-size:18px'>${this.ipt_obj.ipt_txt}</em>
							相关的内容`,
							content: `请修改搜索内容再试!`
						}],
						page: 0,
						c_page: Number(c_page),
						start,
						len,
						search_txt
					};
				};
				console.log(search_data);
				this.$store.commit(Types.setSearchData, search_data);
				this.getListData(search_data);
				this.loadRelevant(search_txt);
				window.$list_ctn.scrollTop(0);
			})
		},
		toggleHotNav(val, index) {
			this.news_data.def = val;
			this.news_data.nav_index = index;
		},
		seachHot(item) {
			if(item instanceof Object){
				// 如果是对象，点击就重定向到股吧
				this.ipt_obj.ipt_txt =item.txt;
				pub.routeToGuba.call(this,`${item.txt} ${item.fid}`)
			}else{
				// 如果不是对象，重新刷新页面
				// 如果路由中含有plate,要拼接上plate
				let url=location.origin+location.pathname+`?q=${item}`;
				console.log(window.location);
				// return;
				if(window.location.href.includes('plate')){
					url+=`&plate=${pub.getPlateId.call(this)}`
				}
				this.ipt_obj.ipt_txt =item;
				window.history.replaceState({},'搜金股',url);
				this.getInfo(true);
			};
			
		},
		toGuba(item){
			// 切换到行情
			const str=`${item.title} 行情 ${item.fid}`;
			pub.routeToGuba.call(this,str);
		},
		handleParams() {
			/* 如果链接是通过其它平台打开，且带有参数，则从这个接口查询数据 */
			if(!route_params)return;
			this.ipt_obj.ipt_txt = route_params;
			let search_txt = this.ipt_obj.ipt_txt;
			if (search_txt == '') return;
			const loadingInstance = Loading.service({
				fullscreen: true,
				text: '加载中......'
			});
			const {cse} = this.loading;
			console.log(this.loading);
			console.log(this.$store.state.loading);
			let {
				c_page,
				page,
				start,
				len
			} = this.search_data;
			console.log(cse);
			const data = {
				"q": search_txt,
				"sort": '',
				"start": c_page,
				cse
			};
			pub.clearCse.call(this,Types);
			this.basefn.ajaxfn(`${this.ip_test}/get_data/`, "POST", "json", data, (res) => {
				console.log(res)
				loadingInstance.close();
				const {
					results,
					page,
					error
				} = res;
				let search_data = null;
				let start = Math.floor(c_page / len) * len;
				if (start == 0) start = 1;;
				if (results && results.length > 0) {
					search_data = {
						list: results,//相关热搜的数据
						page: Number(page),//数据的条数
						c_page: Number(c_page),//分页器当前页码
						start,//分页器开始的页码
						len,
						search_txt
					};
					/* 搜索到结果就缓存数据,刷新保存数据 */
					sessionStorage.search_data = JSON.stringify(search_data);
				} else {
					search_data = {
						list: [{
							title: `没有找到与
								<em style='color:red;font-size:18px'>${this.ipt_obj.ipt_txt}</em>
								相关的内容`,
							content: `请修改搜索内容再试!`
						}],
						page: 0,
						c_page: Number(c_page),
						start,
						len,
						search_txt
					};
				};
				console.log(search_data);
				this.$store.commit(Types.setSearchData, search_data);
				this.getListData(search_data);
				this.loadRelevant(search_txt);
				window.$list_ctn.scrollTop(0);
			})

		},
		loadNews() {
			/* 加载热词,热点新闻的数据 */
			pub.loadNews.call(this, Loading, Types);
		},
		replaceContent() {
			pub.replaceContent.call(this, Loading, Types);
			setTimeout(()=>{
				this.$nextTick(()=>{
					this.setHeight();
				})
			},10)
		},
		/* initDatas(fn) {
			pub.initDatas.call(this, Loading, Types).then(data=>{
				console.log(data);
				// this.loadNews();
			});
		}, */
		goHomelayer() {
			this.$router.push({
				name: 'home'
			})
		},
		currentChange(toggle_page) {
			console.log(toggle_page);
			let {
				c_page,
				start,
				len
			} = this.search_data;
			if (isNaN(toggle_page)) {
				/* 非数字 */
				if (toggle_page == 'prev') {
					c_page--;
					if (c_page < start && start == 1) {
						c_page = start;
					} else if (c_page < start && start != 1) {
						start = start - len;
					}
				} else {
					c_page++;
					if (c_page > start + len - 1) {
						c_page = start = start + len;
					}
				}
			} else {
				c_page = toggle_page;
			}
			this.search_data = Object.assign(this.search_data, {
				start,
				c_page,
				len
			});
			this.getInfo();
		},
		advertiseUrl(src) {
			if (!src.includes('http')) {
				src = `${this.ip_test}/${src}`
			};
			return src
		},
		countNews(index) { /* 统计热点新闻 */
			let current_url = window.location.host;
			current_url = current_url.includes('localhost') ? 'niuguresou.com' : current_url;
			console.log(this.search_data.list);
			console.log(index);
			const data = {
				current_url,
				newsword: JSON.stringify(this.search_data.list[index])
			};
			const promise = new Promise(resolve => {
				this.basefn.ajaxfn(`${this.ip_test}/countnews/`, "POST", "json", data, (res) => {
					console.log(res);
					resolve(true)
				})
			})
		},
		async mainListScroll(href, index) {
			/* 跳转页面到iframe组件,记录当前的滚动条位置,当前的路由,iframe需要的路由 */
			console.log(href, index);

			const count_news = await this.countNews(index);
			if (this.is_PC) return;
			const $list_ctn = $(this.$refs.soujingu_list);
			this.$store.commit(Types.setScroll, {
				scroll_top: $list_ctn.scrollTop(),
				url: href,
				current_route_name: 'list_board'
			});
			/* window.location.href=href;
			console.log(1); */
			this.$router.push({
				name: 'iframe_details'
			})
			console.log(2);
		},
		getScroll() { /* 滚动条定位函数 */
			const $list_ctn = window.$list_ctn;
			/* 这里的sessionStorage.scroll_top在mutation中的方法中定义了 */
			const scroll_top = sessionStorage.scroll_top;
			if (scroll_top) {
				$list_ctn.scrollTop(scroll_top);
			} else {
				$list_ctn.scrollTop(0);
			};
		},
		loadRelevant(q){
			// 相关搜索数据
			const data = {q};
			this.basefn.ajaxfn(`${this.ip_test}/loadrelevant/`, "POST", "json", data, (res) => {
				console.log(res);
				const {guba,result}=res;
				let relevant_arr=null;
				if(guba){
					//如果有guba这个字段，则过滤result里面的带股吧的字段，
					//把guba这个对象放到数组最前面
					relevant_arr=result.filter((c_val)=>{
						// console.log(c_val);
						if(!c_val.includes('行情')){
							return c_val
						}
					});
					relevant_arr.unshift(guba);
					this.relevant.list=relevant_arr;
				}else{
					this.relevant.list=result;
				};
			})
		},
		setHeight(){
			// 设置global_lock组件的高度
			const $new_list=$(this.$refs.new_list);
			const $title=$(this.$refs.title);
			this.global_lock_datas={
				css:{
					'height':$new_list.height()-$title.outerHeight(true)+'px'
				}
			}
		}
	},
	created() {
		console.log(location.host);
		console.log(['localhost:8082','127.0.0.1:8082','niuguresou.com'].includes(location.host));
		if(['localhost:8082','127.0.0.1:8082','niuguresou.com','niuresou.com'].includes(location.host)){
			this.rank_indicators_host=true;
		};
		route_params = this.$route.query.q;
		this.ip_test = window.sjg_config.request_url.wb;
		this.is_PC = this.basefn.IsPC;
		if (!this.is_PC) {
			this.pagination.len = 6;
		};
		this.loadNews();
		console.log(route_params);
		if(route_params){
			pub.initCse.call(this,Types).then(data=>{
				this.handleParams()
			})
		}else{
			let search_data = null;
			console.log(this.$store.state.search_data);
			if (sessionStorage.search_data) {
				search_data = JSON.parse(sessionStorage.search_data);
			} else {
				const {
					c_page,
					page,
					start,
					len,
					list,
					search_txt
				} = this.$store.state.search_data
				search_data = {
					c_page,
					page,
					start,
					len,
					list,
					search_txt
				};
			};
			// search_data和input的赋值
			this.getListData(search_data);
		};
		pub.initDatas.call(this, Loading, Types);
		pub.clearCse.call(this,Types);
	},
	mounted() {	
		const $list_ctn = $(this.$refs.soujingu_list);
		/* 保存dom节点到window对象上,
		方便beforeRouteEnter定位滚动条获取dom */
		window.$list_ctn = $list_ctn;
		window.getScroll = this.getScroll;

		/* 3.搜索框模糊查询需要的数据 */
		this.initList();
		this.setHeight();
	},
	beforeRouteEnter(to, from, next) {
		/* 从其它路由跳回的时候,
		判断如果是首页则不进行滚动条定位,
		否则调用window上的全局函数,
		利用定时器拿到dom,定位滚动条的位置
		 */
		console.log(from.name);
		/* if(from.name=='home'){
			next();
			return
		};
		setTimeout(()=>{
			window.getScroll();
		},50) */
		next();
	},
	beforeDestroy(){
		clearInterval(window.cseTimer);
	}
}
