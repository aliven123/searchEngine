/*函数用es5的写法,否则call调用,修改this,指向会有问题  */
import { Loading} from 'element-ui';
import * as Types from '../store/types.js';
const _setLoading=function(loadingobj){
	for(const [key,value] of Object.entries(loadingobj)){
		this.loading[key]=value;
	}
};
/* const getPlateId=function(){
	// 如果查询字符串长度大于0，且包含plate这个字符，则找到自选股分享对应的plateid值；
	const search=window.location.search.substr(1);
	console.log(location);
	let param_arr=null;
	if(search.length>0&&search.includes('plate')){
		param_arr=search.split('=');
	}
	for(const [i,val] of Array.entries(param_arr)){
		console.log(i,val);
		if(param_arr[i-1]=='plate'){
			return val;
		}
	};
}; */
const getPlateId=function(){
	// 如果查询字符串长度大于0，且包含plate这个字符，则找到自选股分享对应的plateid值；
	const search=window.location.search.substr(1);
	console.log(location);
	let plate=undefined;
	const getPlateV=()=>{
		// 闭包和递归取plate;
		let plate='';
		const fn=(str,split_code='=')=>{
			let arr=str.split(split_code);
			for(let [i,val] of Array.entries(arr)){
				if(val.includes('=')){
					if(plate!=''){
						break;
					}
					fn(val);
				}else{
					if(arr[i-1]=='plate'){
						plate=val;
						break;
					}
				}
				
			};
			return plate
		};
		return fn
	};
	if(search.length>0&&search.includes('plate')){
		let fn=getPlateV();
		plate=fn(search,'&');
		fn=null;
		return plate;
	}else{
		return plate
	}
};
const replaceContent = function(Loading, Types,...res) {
	// 换一换触发函数
	// optional_datas是切换自选数据时传递过来到plate_id和c_page情况;
	console.log(this.news_data);
	let current_url = window.location.host;
	current_url = current_url.includes('localhost') ? 'niuguresou.com' : current_url;
	let {
		sort,
		def,
		nav_index,
		optional
	} = this.news_data;
	let c_page = null;
	for (let [i, item] of Array.entries(sort)) { /* 更新当前模块中c_page的页面 */
		if (item.val == def) {
			c_page = item.c_page += 1;
			break;
		};
	};
	const data = {
		current_url,
		/* 当前界面导航的键值:word,news */
		orderby:this.$store.state.news_data.orderby,
		c_nav: def,
		page: c_page,
		plateid:optional?optional.list[optional.def_i].plateid:-1
	};
	console.log(data);
	if(res[0]){
		// 自选模块切换，传递过来到plateid和page;
		Object.assign(data,res[0])
	};
	console.log(data);
	// const loadingInstance = Loading.service({
	// 	fullscreen: true,
	// 	text: '加载中......'
	// });
	this.basefn.ajaxfn(`${this.ip_test}/loadnews/`, "POST", "json", data, (res) => {
		// loadingInstance.close();
		console.log(res);
		/* 只需要模块的数据,页码和当前导航的菜单,需要用上面的,你返回需要更新模块的数据 */
		let update_target = res[def];
		// this.$store.commit(Types.setNewsData,{news,word,nav_index,sort,def});
		this.$store.commit(Types.setNewsData, {
			update_target,
			nav_index,
			sort,
			def
		});
	})
};
const loadNews = function(Loading, Types) {
	// 加载新闻，热词，推荐，自选，自选分类的数据，以及分类导航sort到信息
	let {
		nav_index,
		def
	} = this.$store.state.news_data;
	nav_index == undefined ? 0 : nav_index;
	const data = {
		// current_url,
		page: 0
	};
	const plateid=getPlateId();
	console.log(plateid);
	/* if(plateid){
		Object.assign(data,{
			plateid
		})
		
	}; */
	console.log(this.$store.state.news_data);
	const loadingInstance = Loading.service({
		fullscreen: true,
		text: '加载中......'
	});
	this.basefn.ajaxfn(`${this.ip_test}/loadnews/`, "POST", "json", data, (res) => {
		loadingInstance.close();
		console.log(res);
		const {sort,news,word,recom,zixuan,optional,share} = res;
		if (sort == undefined) return;
		sort.map((item) => {
			return item.c_page = 0;
		});
		const obj = {nav_index,sort,news,word,recom,zixuan,optional,share};
		if (def != undefined) {
			Object.assign(obj, {
				def
			})
		};
		this.$store.commit(Types.setNewsData,obj);
	})
};
/* const cnavPage=function(def){
	// 找到当前导航栏的页面，更新当前模块中c_page的页面；
	let c_page = null;
	for (let [i, item] of Array.entries(this.$store.state.sort)) {
		if (item.val == def) {
			c_page = item.c_page += 1;
			break;
		};
	};
	return c_page;
}; */
const indicsort = function(Types) {
	let {
		def
	} = this.$store.state.news_data;
	const {optional}=this.$store.state.news_data;
	const data = {
		// current_url,
		c_nav: def,
		orderby:this.$store.state.news_data.orderby,
		page: 0,
		plateid:optional?optional.list[optional.def_i].plateid:-1
	};
	// console.log(this.$store.state.news_data);
	this.basefn.ajaxfn(`${this.ip_test}/loadnews/`, "POST", "json", data, (res) => {
		console.log(res[def]);
		// return;
		this.$store.state.news_data[def]=res[def];
		this.$store.commit(Types.setBoardInfo, {
			board_datas:{
				[def]:res[def]
			},
			def
		});
		
	})
};
const initDatas = async function(Loading, Types) {
	const {loading} = this.$store.state;
	console.log(loading);
	return await new Promise(resolve => {
		if (loading.cse == null || loading.cse == '') {
			const data = {};
			const loadingInstance = Loading.service({
				fullscreen: true,
				text: '加载中......'
			});
			this.basefn.ajaxfn(`${this.ip_test}/loading/`, "POST", "json", data, (res) => {
				console.log(res);
				console.log(loading);
				if(res.islogin!='false'){
					// 如果登录，获取登录的用户名信息；
					this.$store.commit(Types.setUserdata,{username:res.islogin,img:'img2'});
				};
				loadingInstance.close();
				_setLoading.call(this,res);
				console.log(this.$store.state.userdata);
				this.$store.commit(Types.setLoading, res);
				resolve(true)
			})
		} else {
			console.log(loading);
			_setLoading.call(this,loading);
			resolve(true)
		}
	})

};
const clearCse=function(Types){
	//避免用户长期没有关闭浏览器，60*1000毫秒更新cse
	clearInterval(window.cseTimer);
	window.cseTimer=setInterval(()=>{
		this.basefn.ajaxfn(`${this.ip_test}/get_cse/`, "POST", "json", {}, (res) => {
			console.log(res);
			_setLoading.call(this,res);
			this.$store.commit(Types.setLoading, res);
		})
	},60*1000*30)
};
const initCse=async function(Types){
	// 如果有了cse这个参数，则不请求服务器数据
	const {loading}=this.$store.state;
	
	return await new Promise(resolve=>{
		console.log(loading);
		if (loading.cse == null || loading.cse == '') {
			const data = {};
			this.basefn.ajaxfn(`${this.ip_test}/get_cse/`, "POST", "json", data, (res) => {
				console.log(res);
				_setLoading.call(this,res);
				this.$store.commit(Types.setLoading, res);
				resolve(true)
			})
		}else{
			_setLoading.call(this,{cse:loading.cse,logo:loading.logo});
			resolve(true)
		};
	})
};
const searchList = function() {
	// 1.根据当前路由，取出search/后面的词，作为当前搜索引擎模糊查询缓存数据的key
	// 2.如果为匹配结果为null,则默认用list_arr,作为key;
	const href=window.location.href;
	const partern=/\w*\/search\/(\w*)\//;
	const arr=href.match(partern);
	let list_key='list_arr';
	console.log(arr);
	if(arr){
		list_key=arr[1];
	};
	if (sessionStorage[list_key] != undefined) {
		this.ipt_obj.init_obj.list_arr= JSON.parse(sessionStorage[list_key]);
		return;
	};
	const data = {};
	this.basefn.ajaxfn(`${this.ip_test}/get_search/`, "POST", "json", data, (res) => {
		const {
			result
		} = res;
		console.log(res);
		if (result.length > 0) {
			this.ipt_obj.init_obj.list_arr = result;
			sessionStorage[list_key]  = JSON.stringify(result);
		};
	});
}
const checkLogin=function(Types,islogin=this.$store.state.loading.islogin){
	// 是否登录的标记：islogin，更新接口为：loading;
	//被保存到state中的loading对象的islogin;
	console.log(islogin);
	if(islogin=='true'){
		if(localStorage.userdata){
			this.$store.commit(Types.setUserdata, JSON.parse(localStorage.userdata));
		}else{
			this.$store.commit(Types.setUserdata,{
				username:'登录',
				img:'img2'
			});
		}
	}else{
		this.$store.commit(Types.setUserdata,{
			username:'登录',
			img:'img2'
		});
	}
}
const routeToGuba=function(data){
	// 搜索到行情字段,切换到金池量化的k线行情页面
	// const match_test=data.match(/\((\d{6})\).+股吧/);
	const match_test=data.match(/\((\d{6})\).+行情\s+(\d+)/);
	const gubalink=this.$store.state.loading.gubalink;
	if(match_test!=null){
		let security_id=match_test[1]
		if(security_id[0]=='6'){
			security_id+='.SH'
		}else{
			security_id+='.SZ'
		};
		if(this.basefn.IsPC){
			window.open(`${gubalink}${match_test[2]}`,'_blank')
		}else{
			window.open(`${gubalink}${match_test[2]}`,'_self')
		};
		return true;
	}else{
		return false
	}
};
const word_header={
	def:'searchnum',
	header_obj:{
		searchnum:'搜索指数',
		// index:'搜索指数'
	},
	header_list:{
		searchnum:'搜索指数',
		huanbirate:'环比涨幅',
		tongbirate:'同比涨幅',
		searchrank:'搜指变动',
		huanbirank:'环幅变动',
		tongbirank:'同幅变动'
	}
};
const getUptionalList=function(index){
	// 更新自选股的list数据
	let {optional,optional:{list}}=this.$store.state.news_data;
	// 通过index，修改自选选中到模块，通过传递plateid和page,获取指定模块到数据；
	optional.def_i=index;
	replaceContent.call(this,Loading, Types,{
		plateid:list[index].plateid,
		page:1
	});
};
const shareOptional=function(Message){
	const {optional}=this.$store.state.news_data;
	const data = {
		plateid:optional.list[optional.def_i].plateid
	};
	this.basefn.ajaxfn(`${this.ip_test}/get_share_url/`, "POST", "json", data, (res) => {
		console.log(res);
		if(!res.error){
			// console.log(`${window.location.origin}?plate=${res.result}`);
			// 复制内容到剪切板；
			const input = document.createElement('input');
			input.setAttribute('value',`${window.location.origin}?plate=${res.result}`);
			document.body.appendChild(input);
			input.focus()//获取焦点
			input.select()//选中输入框
			document.execCommand('copy',true)//复制当前选中文本到前切板
			document.body.removeChild(input);
			Message.info({
				message:'分享成功,网址已复制！',
				customClass:'info'/* 自定义类名,自定义样式,在App.vue中 */
			})
						
		}else{
			Message.info({
				message:'分享失败！',
				customClass:'info'/* 自定义类名,自定义样式,在App.vue中 */
			})
		}
	});
};
export default {
	replaceContent,
	loadNews,
	initDatas,
	initCse,
	searchList,
	checkLogin,
	clearCse,
	routeToGuba,
	word_header,
	indicsort,
	getUptionalList,
	shareOptional,
	getPlateId
}