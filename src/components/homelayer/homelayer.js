import { Loading,MessageBox,Message} from 'element-ui';
import * as Types from '../../store/types.js';
import pub from '../public.js';
const shareObj={
	title:`${document.title}--行业搜索引擎`,
	desc:`${document.title}，海量行业资源任您选......`
};
// const metaInfo=window.metaInfo;
export default{
	name:"list_board",/*搜索结果列表项*/
	data:function(){
		return {
			ip_test:null,
			search_txt:'',
			loading:{
				cse: "AJvRUv3t516eOjsdYDmjnoyJxDCK:1584007039661",
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
			is_PC:null/* pc端是true,手机端是false */,
			shade:{
				hishow:false
			},
			award:{
				hishow:false,
				datas:{
					title:'',
					award:{
						def:'wx',
						list:{
							wx:{
								value:'wx',
								txt:'微信',
								src:''
							},
							zfb:{
								value:'zfb',
								txt:'支付宝',
								src:''
							}
						}
					}
				}
			},
			/* admin:{
				hishow:false
			}, */
			user:{
				txt:'我的'
			},
			scroll_top:0,/* 滚动条的位置 */
			ipt_obj:{
				init_obj:{
					list_arr:['1','12'],
					ul_style:{
						background:'white',
					    display: 'block',
						border:'1px solid black',
					    width:'100%',
					    maxHeight:'120px',
					    textAlign:'left',
						top:'33px',
						boxShadow:'1px 1px 4px #71686b'
					}
				},
				ipt_txt:''
			},
			toggle_header:{
				hishow:false
			},
			disclaimer:{
				hishow:false,
				txt:''
			},
			global_lock_datas:{
				css:{
					'height':'0px'
				}
			}
		}
	},
	components:{
		award:()=>import('../award/award.vue'),
		help_board:()=>import('../help_board/help_board.vue'),
		ipt_search:()=>import('../ipt_search/input_search.vue'),
		display_ctn:()=>import('../display_ctn/display_ctn.vue'),
		toggle_header:()=>import('../toggle_header/toggle_header.vue'),
		global_lock:()=>import('../global_lock/global_lock.vue')
	},
	computed:{
		date(){
			const date=new Date();
			const year=date.getFullYear();
			const month=date.getMonth();
			const day=date.getDate();
			return `
			 GMT+8,${year}-${month+1}-${day}
			`
		},
		getUserStatus(){
			console.log(this.$store.state.userdata);
			const username=this.$store.state.userdata.username;

			/* if(userdata.username!='登录'){
				this.log_reg='';
			}else{
				this.log_reg='/log_reg';
			}; */
			return username
		},
		open_target(){
			const is_PC=this.is_PC;
			let target=is_PC==true?'_blank':'_self';
			return target
		},
		news_data(){
			let news_data=this.$store.state.news_data;
			 console.log(news_data);
			if(news_data.sort.length==0){
				/* 如果页面被刷新,且news_data有缓存的数据,则更新缓存的数据到news_data上 */
				if(sessionStorage.news_data!=undefined){
					news_data=JSON.parse(sessionStorage.news_data);
					this.$store.commit(Types.setNewsData,news_data);
				}
			};
			Object.assign(news_data,{word_header:pub.word_header});
			console.log(news_data);
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
				const str=news_data[news_data.def][0];
				// 如果str是字符串，且值是login或lock,就说明当前模块被锁定
				if(Object.prototype.toString.call(str).includes('String')&&/login|lock/.test(str)){
					return true;
				}{
					return false;
				}
			}else{
				return false;
			}
		}
	},
	methods:{
		toggleOption(index){
			// 自选模块的切换函数
			pub.getUptionalList.call(this,index);
		},
		shareOptional(){
			// 分享自选
			pub.shareOptional.call(this,Message);
		},
		getDisclaimer(){
			if(this.disclaimer==true){
				this.disclaimer.hishow=false
				return;
			};
			this.basefn.ajaxfn(`${this.ip_test}/get_disclaimer/`,"POST","json",{},(res)=>{
				this.disclaimer={
					hishow:true,
					txt:res.result
				}
			})
		},
		handleMoreList(hishow){
			//涨幅，指数更多页面的切换
			console.log(hishow)
			this.toggle_header.hishow=hishow;
			this.disclaimer.hishow=false;
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
			console.log(key,val);
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
		txtStatus(txtobj){
			// console.log(txtobj);
			const render_data={
				value:'',//渲染的文本
				cls:''//要添加的类名
			};
			if(txtobj.txt=='lock'){
				render_data.cls='iconfont iconsuo';
			}else if(txtobj.txt=='recom'){
				render_data.cls='iconfont icondashang';
				render_data.value=txtobj.value;
			}else{
				render_data.cls='';
				render_data.value=txtobj.value;
			}
			return render_data;
		},
		userswitch(){
			this.$store.commit(Types.setUserboard,{hishow:true});
			// pub.checkLogin.call(this,Types);
		},
		initSearch(){
			pub.searchList.call(this);
		},
		/* donate(d_type){
			// 捐赠
			const ip_test=this.ip_test;
			const title=d_type=='wechat'?'微信捐赠':'支付宝捐赠';
			MessageBox.alert(`
				<img src=\'${ip_test}/${this.loading[d_type]}\' />
			`,title,{
				dangerouslyUseHTMLString:true
			})
		}, */
		donate(self,datas){/* 打赏 */
			console.log(datas);
			const $el=$(this.$el),$main=$el.children('.main_ctn').eq(0);
			if(datas&&datas.hishow==false){
				this.award.hishow=this.shade.hishow=false;
				$main.css({
					overflow:''
				})
				return;
			};
			const {wechat,alipay,gongzhonghao}=this.loading;
			const ip_test=this.ip_test;
			console.log(this.loading);

			this.award.datas.title=self;
			this.award.datas.award.list.wx.src=`${ip_test}/${wechat}`;
			this.award.datas.award.list.zfb.src=`${ip_test}/${alipay}`;
			this.award.datas.award.list.zfb.src=`${ip_test}/${alipay}`;
			this.award.datas.wx_gongzh=`${ip_test}/${gongzhonghao}`;
			this.award.hishow=this.shade.hishow=true;

			$main.css({
				overflow:'hidden'
			})
		},
		handleDonate(self,data){
			//首页display组件中的打赏触发函数
			this.donate(data.txt);
		},
		visitLogin(self,data){
			//如果搜索指数是login，则显示锁，点击路由跳转到登录界面
			this.$router.push({
				name:'login'
			})
		},
		getIptTxt(self,data){
			// 根据下拉列表获得的搜索结果处理函数
			if(pub.routeToGuba.call(this,data)){
				// 搜索到行情字段,切换到金池量化的k线行情页面
				return;
			};
			if(data.toLowerCase().includes('http')){
				const arr=data.split(' ');
				let hrefArr='';
				hrefArr=arr.filter((c_value)=>{
					if(c_value.includes('http')){
						return c_value
					}
				});
				window.open(hrefArr[0]);
				return;
			};
			const str = data.split(' ')[0];
			if(str.length>0){
				this.search_txt=str;
				this.$router.push({
					path:'/list',
					query:{q:this.search_txt}
				})
			}
		},
		getcurrentTxt(self,data){
			// 直接输入搜索，没有用下拉列表数据的处理函数
			console.log(data);
			const {search_now,input_txt}=data;
			this.search_txt=input_txt;
			console.log(this.search_txt);
			/* if(search_now){
				// this.getInfo();
			} */
		},
		/* getInfo(){
			const search_txt=this.search_txt;
			console.log(this.search_txt);
			if(search_txt=='')return;
			const loadingInstance=Loading.service({
				fullscreen:true,
				text:'加载中......'
			});
			let len=!this.is_PC?6:10;
			const {cse}=this.loading;
			// console.log(current_url);
			const data={
				"q":search_txt,
				"sort":'',
				"start":1,
				cse
			};
			this.basefn.ajaxfn(`${this.ip_test}/get_data/`,"POST","json",data,(res)=>{
				console.log(res)
				loadingInstance.close();
				const {results,page,error}=res;
				let search_data=null;

				if(results&&results.length>0){
					search_data={
						list:results,
						page:Number(page),
						c_page:1,
						start:1,
						len,
						search_txt
					};
					// 搜索到结果就缓存数据,刷新保存数据
					sessionStorage.search_data=JSON.stringify(search_data);
				}else{
					search_data={
						list:[{
							title:`没有找到与
							<em style='color:red;font-size:18px'>${this.search_txt}</em>
							相关的内容`,
							content:`请修改搜索内容再试!`
						}],
						page:0,
						c_page:1,
						start:1,
						len,
						search_txt
					};
				};
				this.$store.commit(Types.setSearchData,search_data);
				console.log(13);
				this.$router.push({name:'list_board'});
			})
		},
		 */
		mainListScroll(href){
			/* 跳转页面在iframe组件显示 */
			if(this.is_PC){
				/* 默认新窗口打开 */
				window.open(href);
				return;
			};
			/* 记录当前滚动条的位置,iframe需要接收的url和当前的路由 */
			const scroll_top=$('#homelayer').scrollTop();
			console.log(scroll_top);
			this.$store.commit(Types.setScroll,{
					scroll_top,
					url:href,
					current_route_name:'home'
			});
			/* 记录当前热词热点新闻等的状态,是哪个选中 */
			this.$store.commit(Types.setNavLocation,{
					def:this.news_data.def,
					nav_index:this.news_data.nav_index
			});
			/* 跳转到iframe组件 */
			this.$router.push({
				name:'iframe_details'
			})
		},
		getScroll(){/* 从iframe返回定位滚动条定位函数 */
			const $homelayer=$('#homelayer');
			$homelayer.scrollTop(this.scroll_top);
		},
		advertiseUrl(src){
			if(!src.includes('http')){
				src=`${this.ip_test}/${src}`
			};
			return src
		},
		loadNews(){
			/* 加载热词,热点新闻的数据 */
			pub.loadNews.call(this,Loading,Types);
		},
		replaceContent(){
			// 换一换
			pub.replaceContent.call(this,Loading,Types);
		},
		toggleHotNav(val,index){
			// 热词和热点新闻导航的切换
			console.log(val,this.news_data);
			this.news_data.def=val;
			this.news_data.nav_index=index;
			setTimeout(()=>{
				this.$nextTick(()=>{
					this.setHeight();
				})
			},10)
		},
		seachHot(txt){
			// 热词点击触发搜索事件
			let ipt_txt=txt;
			let q=ipt_txt;
			this.search_txt=ipt_txt;
			// this.getInfo();
			// 如果路由里面含有分享的参数，则跳转要拼接上plate
			if(window.location.href.includes('plate')){
				const plate=pub.getPlateId.call(this);
				this.$router.push({
					path:'/list',
					query:{
						q,plate
					}
				});
			}else{
				this.$router.push({
					path:'/list',
					query:{
						q
					}
				});
			}			
		},
		toGuba(item){
			// 切换到股吧
			console.log(item);
			const str=`${item.title} 行情 ${item.fid}`;
			pub.routeToGuba.call(this,str);
		},
		initDatas(fn){
			// 初始化loading数据，初始化热词等数据；
			pub.initDatas.call(this, Loading, Types).then(data=>{
				console.log(data);
				// pub.checkLogin.call(this,Types);
				this.loadNews();
			});
		},
		shareToQQ(){
			/* 分享到qq */
		      //此处分享链接内无法携带图片
			if(!this.is_PC){
				Message.info({
					message:'移动端正在升级中...',
					customClass:'info'/* 自定义类名,自定义样式,在App.vue中 */
				})
				return
			};
		    const share = {
				title: shareObj.title,
				desc: shareObj.desc,
				share_url: window.location.href
		    };
		    window.open(
		        "https://connect.qq.com/widget/shareqq/index.html?url=" +
		          encodeURIComponent(share.share_url) +
		          "&title=" +
		          share.title +
		          "&desc=" +
		          share.desc
		    );
		},
		shareToRoom() {
			/* 分享到空间 */
		  if(!this.is_PC){
		  	Message.info({
		  		message:'移动端正在升级中...',
		  		customClass:'info'/* 自定义类名,自定义样式,在App.vue中 */
		  	})
		  	return
		  };
		  const share = {
			title: shareObj.title,
			desc: shareObj.desc,
			image_urls: [this.ip_test+'/'+this.loading.logo],
			share_url: window.location.href
		  };
		  let image_urls = share.image_urls.map(function(image) {
			return encodeURIComponent(image);
		  });
		   //跳转地址
		  window.open(
			"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
			  encodeURIComponent(share.share_url) +
			  "&title=" +
			  share.title +
			  "&pics=" +
			  image_urls.join("|") +
			  "&summary=" +
			  share.desc
		  );
		},
		shareToMicroblog() {
		  //分享到微博(可用)
		  if(!this.is_PC){
		  	Message.info({
		  		message:'移动端正在升级中...',
		  		customClass:'info'/* 自定义类名,自定义样式,在App.vue中 */
		  	})
		  	return
		  };
		  const share = {
			title: shareObj.title,
			image_url: [this.ip_test+'/'+this.loading.logo],
			share_url: window.location.href
		  };
		  //跳转地址
		  window.open(
			"https://service.weibo.com/share/share.php?url=" +
			  encodeURIComponent(share.share_url) +
			  "&title=" +
			  share.title +
			  "&pic=" +
			  share.image_url[0] +
			  "&searchPic=true"
		  );
		},
		pushHistory(){
			const state={'title':'搜金股首页','url':window.location.href};
			console.log(window.location.href);
			if(window.history.pushState){
				window.history.pushState(state,state.title,'');
			}
		},
		goBack(){/* 回退函数 */
			window.history.go(0);
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
	beforeRouteEnter(to,from,next){
		console.log(from);
		const {name:from_board_route}=from;
		if(from_board_route=='iframe_details'){
			/*从首页离开时进入iframe组件时记录的原始滚轮位置,
			在当前钩子,无法获取store中的数据,所以把进入的路径写在了window上;
			 */
			window.from_board_route=from_board_route;
		};
		next();
	},
	created(){
		this.ip_test=window.sjg_config.request_url.wb;
		this.is_PC=this.basefn.IsPC;
		this.initDatas();
		this.initSearch();
		this.pushHistory();
		pub.initCse.call(this,Types);
		pub.clearCse.call(this,Types);
	},
	mounted(){
		this.basefn.onAttach(window,'popstate',this.goBack);
		this.$nextTick(()=>{
			if(window.from_board_route=='iframe_details'){
				window.from_board_route=null;
				this.scroll_top=this.$store.state.scroll_top;
				this.getScroll();
			}
		});
		console.log(this.$route.params);
		if(this.$route.params.txt=='打赏'){
			this.donate('打赏');
		};
		this.setHeight();
	},
	beforeDestroy(){
		this.basefn.offAttach(window,'popstate',this.goBack)
		clearInterval(window.cseTimer);
	}
}
