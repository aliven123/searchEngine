import QRCode from 'qrcodejs2';
import {
	Message
} from 'element-ui';
import {
	mapState
} from 'vuex';
import {
	negative_assets,
	promote_des
} from './promotion_des.js';
import mixin from '../list_board/mixin.js'

const chart_head = '收益图';
const def_SecurityID = '000001.SZ 平安银行'; //努金牛策诊股默认的股票
const SecurityID_regexp = /^\(?(\d{6})\)?(\.\w{2}$)?/i; //取出股票代码的正则
const s_indicname='s_indicname',s_indic_type='s_indic_type',s_SecurityID='s_SecurityID';
const warning='声明：此仅作为研究参考，不构成任何投资建议；依此入市，盈亏自负。';
export default {
	name: 'rank_indicators', //努金牛策诊股模块
	/* 股票切换到k线页面增加指标展示 */
	mixins:[mixin],
	data: function() {
		return {
			warning,
			username: false,
			is_PC: null,
			indicators: {
				head: {
					rate: {
						txt: '综合评分'
					},
					indicname: {
						txt: '策略'
					},
					img: {
						txt: chart_head
					}
				},
				head_arr: null,
				/* 根据head的key自动决定渲染多少列 */
				tbody: [{}],
				show_item:2, //策略排行默认显示的条数，点击更多，show_item的长度为数据的长度
			},
			show_item:2,
			indic_pool: {
				type: '综合评分',
				list: [
					'综合评分',
					'盈利率',
					'风险率',
					'同期涨幅',
					'最终权益',
					'标准离差',
					'夏普比例'
				]
			},
			code: null,
			positive_datas: { //多空数据条组件的数据
				code: null
			},
			wx_pay: {
				// 努金牛策诊股，购买微信二维码数据
				hishow: false,
				status: '微信扫码支付!'
			},
			style_obj: {
				positive: 50,
				negative: 50
			},
			gzh: false,
			diagnose_switch: ['true'], //努金牛策诊股前的复选框
			menus:{
				def:'diagnose',
				list:{
					diagnose:{
						txt:'努金牛策诊股'
					},
					rec_stock:{
						txt:'牛股排行'
					}
				}
			}
		}
	},
	computed: {
		...mapState(['userdata', 'zhenggu']),
		search_txt() {
			// 如果输入框传递过来的搜索内容不符合股票代码的格式，则证券代码置为默认值
			let search_txt = this.$store.state.search_txt;
			if (!SecurityID_regexp.test(search_txt)) {
				search_txt = def_SecurityID;
				return search_txt;
			};
			//如果证券匹配了正则，但是后缀部分不匹配，诊股的标的也需要重置为默认值
			if (search_txt.includes('.') && search_txt.match(SecurityID_regexp)[2] === undefined) {
				search_txt = def_SecurityID;
			};
			return search_txt;
		},
		styleDatas() {
			let {
				positive,
				negative
			} = this.style_obj;
			let advice_data = {
				des: '',
				styleobj: {
					'color': ''
				}
			};
			const setDes = function(advice_des, color = '') {
				// 根据positive是否有number值，以及大小写决定advice_data的描述和样式；
				const num = Number.parseInt((20 * Math.random()));
				return {
					advice_des,
					des: negative_assets[promote_des][num],
					styleobj: {
						'color': color
					}
				};
			};
			const _filterMinVal = function() {
				const limit = 22;
				let des = '',
					color = '';
				if ((typeof positive) !== 'number' || (typeof negative) !== 'number') {
					const init_des = positive;
					positive = 50;
					negative = 50;
					color = '';
					des = init_des;
				} else {
					if (positive < limit) {
						positive = limit;
						negative = 100 - limit;
					};
					if (negative < limit) {
						negative = limit;
						positive = 100 - limit;
					};
					if (positive > negative) {
						color = '#e46a5e';
						des = '多头走势，可买入、持有或加仓。'
					} else if (positive < negative) {
						color = '#7bd25f';
						des = '空头走势，可空仓、卖出或等待抄底'
					};
					if ((positive > 40 && positive < 60) || (negative > 40 && negative < 60)) {
						des = '多空相当，震荡走势，可以高抛低吸。'
						color = positive > negative ? '#e46a5e' : '#7bd25f';
						if (positive === negative) {
							color = ''
						};
					};
				};
				advice_data = setDes(des, color);
			};
			_filterMinVal();

			const style_obj = {
				p_style: {
					'width': `${positive}%`,
					'backgroundColor': '#e46a5e'
					// 'borderBottom': '2px solid #e46a5e',
					// 'color': '#e46a5e'
				},
				n_style: {
					'width': `${negative}%`,
					'backgroundColor': '#7bd25f'
					// 'borderBottom': '2px solid #7bd25f',
					// 'color': '#7bd25f'
				},
				advice_data
			};
			return style_obj
		}
	},
	watch: {
		'zhenggu.time_stamp': {
			handler(newval, oldval) {
				console.log(newval, oldval);
				if (newval != oldval && newval) {
					if (this.diagnose_switch[0] === 'true') {
						this.initIndicators();
					} else {
						this.handleData({
							error: '请勾选诊股'
						});
					}
				}
			}
		}
	},
	methods: {
		wxPaymentHandler() {
			// 微信支付成功的回调，重新刷新多头/口头策略的列表；
			this.wx_pay.hishow = false;
			this.$refs.positive_negative.investmentAdvice();
		},
		toggleType(type) {
			this.indic_pool.type = type;
			if (this.diagnose_switch[0] === 'true') {
				this.initIndicators();
			} else {
				this.handleData({
					error: '请勾选诊股'
				});
			}
		},
		getCode() {
			let code = this.search_txt.toUpperCase();
			// if (/^\((\d{6,}|\d{6}\.\w{2})\)/i.test(this.search_txt)) {
			if (SecurityID_regexp.test(this.search_txt)) {
				//‘(’+数字{6位以上} || 数字{6位以上}+'.'+字母后缀(2位)+‘)’
				//文本中含有带括号的文本，取出括号中的文本作为证券代码，进行诊股
				// code = this.search_txt.match(/\((.+)\)/i)[1];
				let reg_arr = this.search_txt.match(SecurityID_regexp);
				code = reg_arr[1];
				if (reg_arr[2]) {
					code += reg_arr[2]
				};
				console.log(reg_arr)
			};
			code = code.toUpperCase();
			
			if(!code.includes('.')){
				if(code[0]==='6'){
					code+='.SH'
				}else{
					code+='.SZ'
				}
			};
			// console.log(code);
			return code
		},
		initIndicators() {
			// 1.多空比例数据和策略数据函数，初始化，在positive_negative组件中被初始化后调用
			const url = '/indicator_profit/';
			const data = {
				code: this.getCode(),
				type: this.indic_pool.type
			};
			// this.userdata.username='lcs11';
			if (data.code === '') return;
			let username = this.userdata.username;
			if (username != '登录') {
				Object.assign(data, {
					username
				});
			};
			this.basefn.ajaxfn(`${this.host.lai_url}${url}`, "GET", "json", data, (res) => {
				console.log(res);
				// return;
				let {
					result,
					down_score,
					up_score,
					error
				} = res;
				// 1.加载策略数据/或重置策略数据
				this.indicators.head_arr = Object.keys(this.indicators.head);
				if (result instanceof Array && result.length >= 0) {
					/* result.map((item => {
						console.log(item, up_down);
						item.type = up_down;
					}); */
					this.indicators.tbody = result;

				} else {
					this.indicators.tbody = [];
					Message.info({
						message: result,
						customClass: 'info'
					});
				};
				//2.加载多空百分比数据
				if (down_score !== undefined) {
					down_score = down_score === '' ? up_score : down_score;
					this.resetDatas({
						down_score,
						up_score
					});
				} else {
					this.resetDatas({
						down_score: '点击查看空头策略',
						up_score: '点击查看多头策略'
					});
				};
				//3.提示错误信息
				if (error) {
					Message.info({
						message: '努金牛策诊股错误：' + error,
						customClass: 'info'
					});
				}
			})
		},
		async handleIndicator(up_down) {
			// 点击多空策略按钮，如果为null,值更新为点击按钮的up_down,
			//否则重置为null
			// this.btn_obj.active = !this.btn_obj.active ? up_down : null;
			// 获得多空比例和策略排行的数据
			// 点击多空策略按钮，如果为null,值更新为点击按钮的up_down,
			
			if (this.diagnose_switch[0] !== 'true') {
				this.handleData({
					error: '请勾选诊股'
				});
				return;
			};			
			
			let username= this.userdata.username;
			if(location.href.includes('localhost')||location.href.includes('127')){
				username='lcs11';
			};
			const status = await this.guanzhuStatus();
			if ((username !== '登录') || status === true) {
				const data = {
					code: this.getCode()
				};
				// 如果多空状态，也就是非null状态
				Object.assign(data, {
					username,
					param: up_down,
					type: this.indic_pool.type
				});
				const url = '/investment_advice/';
				const res_obj = await new Promise((resolve) => {
					this.basefn.ajaxfn(`${this.host.shuo_url}${url}`, "POST", "json", data, (res) => {
						console.log(res);
						resolve(res);
					})
				});
				this.handleData(res_obj, data.param);
			} else {
				let message = up_down === 'up' ? '请登录后查看多头策略' : '请登录后查看空头策略';
				this.indicators.tbody = [];
				Message.info({
					message,
					customClass: 'info'
				});
			};
		},
		handleData(res_obj, up_down) {
			// 1.处理多空比例数据
			if (res_obj.up_score != undefined) {
				this.style_obj = {
					positive: res_obj.up_score,
					negative: res_obj.down_score
				}
			};
			if (res_obj.list) {
				res_obj.list.map((item => {
					console.log(item, up_down);
					item.type = up_down;
				}));
				this.indicators.tbody = res_obj.list;
			} else {
				this.indicators.tbody = [];
				if (res_obj.error) {
					this.style_obj = {
						positive: res_obj.error,
						negative: res_obj.error
					}
				}
			};
			if (res_obj.result === '请开通vip或购买后查看' || res_obj.result === '已过期，请购买后查看') {
				// 3.购买需要展示的周期,价格数据;
				this.order_data = {
					def: 0,
					list: res_obj.data
				};
				alert(res_obj.result);
			} else {
				this.order_data = null;
			}
		},
		resetDatas(datas) {
			// 切换标的，重置多空百分比，隐藏购买按钮和价格；
			console.log(datas);
			const reset_score = {
				positive: '',
				negative: ''
			};
			if (datas !== undefined) {
				this.style_obj = {
					positive: datas.up_score,
					negative: datas.down_score
				}
			} else {
				this.style_obj = reset_score
			};
		},
		toggleComponent(item) {
			// 点击努金牛策诊股，具体策略，跳转到东财模板详情页，携带对应参数；
			let rank_href = "https://nujin.com/forum-2954-1.html";
			if (location.host.includes('localhost') || location.host.includes('127')) {
				rank_href = "http://localhost:666";
			};
			// console.log(location);return;
			//检测rank_href上是否有查询字符串，如果有，结尾拼接&，没有拼接？
			rank_href = rank_href.includes('=') ? `${rank_href}&` : `${rank_href}?`;
			let SecurityID = this.getCode();
			let s_code = this.basefn.queryToObj().s_code;
			let search_params =`
			${s_indicname}=${item.indicname}&${s_SecurityID}=${SecurityID}&${s_indic_type}=${this.indic_pool.type}
			`;
			if (s_code) {
				search_params += `&s_code=${s_code}`
			};
			/* console.log(search_params);
			console.log(item);
			return; */
			window.open(`${rank_href}${search_params}`, '_self');
		},
		guanzhuStatus() {
			// 公众号是关注与否的查询函数
			let status = new Promise((resolve) => {
				const data = {};
				const url = '/weixin_pay/ip_sign/';
				this.basefn.ajaxfn(`${this.host.lai_url}${url}`, "GET", "json", data, (res) => {
					// console.log(res);
					resolve(res.sign);
				})
			})
			return status;
		},
		async recursionStatus() {
			// 递归查询公众号扫码结果
			await this.basefn.sleep(2000);
			let status;
			try {
				status = await this.guanzhuStatus();
			} catch (e) {
				this.gzh = false;
			};
			if (status === false && this.gzh === true) {
				this.recursionStatus();
			} else {
				this.gzh = false;
				this.initIndicators();
			}
		},
		gongzhonghao(active_condition) {
			//active_condition标记是钩子函数中调用，还是手动触发
			// 关注公众号好点击事件
			clearTimeout(this.$el.gongzhonghao_timer);
			this.$el.gongzhonghao_timer = setTimeout(async () => {
				if (this.gzh) {
					this.gzh = false;
					return
				};
				const status = await this.guanzhuStatus();
				console.log(status);
				
				if (status === true) {
					if(active_condition==='activated'){return;}
					Message.info({
						message: '已经关注公众号！',
						customClass: 'info'
					});
					return;
				};
				const data = {};
				const url = '/weixin_pay/wechat_qrcode/';
				const res_obj = await new Promise((resolve) => {
					this.basefn.ajaxfn(`${this.host.lai_url}${url}`, "GET", "json", data, (res) => {
						resolve(res);
					})
				});
				console.log(res_obj);
				if (res_obj === '公众号维护中') {
					Message.info({
						message: res_obj,
						customClass: 'info'
					});
				} else {
					this.gzh = !this.gzh;
					this.$nextTick(() => {
						const qrcode_ctn = this.$el.querySelector("#qrcode");
						$(qrcode_ctn).empty();
						const datas = {
							text: res_obj, // 二维码地址
							width: 200,
							height: 165,
							colorDark: "#000",
							colorLight: "#fff"
						};
						new QRCode(qrcode_ctn, datas);
					});
					this.recursionStatus();
				}
			}, 1000)
		}
	},
	created() {
		this.is_PC = this.basefn.IsPC;
		this.initIndicators();
	},
	activated(){
		console.log('activated')
		this.gongzhonghao('activated');
	},
	beforeDestroy() {
		this.gzh = false;
	}
}
