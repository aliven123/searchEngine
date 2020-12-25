import {
	Message
} from 'element-ui';
import {
	mapState
} from 'vuex';
import mixin from '../list_board/mixin.js'
const chart_head = '收益图';
const s_indicname='s_indicname',s_indic_type='s_indic_type',s_SecurityID='s_SecurityID';
export default {
	name: "ng_search",
	/*牛股*/
	mixins:[mixin],
	data: function() {
		return {
			current_url: '',
			order_data: null,
			indicators: {
				head: {
					code: {
						txt: '代码'
					},
					codename: {
						txt: '名称'
					},
					img: {
						txt: chart_head
					}
				},
				head_arr: null,
				/* 根据head的key自动决定渲染多少列 */
				tbody: [{}],
				weixin: {
					code_url: null,
					out_trade_no: null
				},
				show_item:2, //牛股排行默认显示的条数，点击更多，show_item的长度为数据的长度
			},
			show_item:2,
			indic_pool: {
				type: '综合排序',
				list: [
					'综合排序',
					'盈利率',
					'风险率',
					'最终权益',
					'标准离差',
					'夏普比率',
					'同期涨幅',
					'权益最大回撤',
					'空仓周期数',
					'理想仓位',
					'年化复利收益率'
				]
			}
		}
	},
	computed: {
		...mapState(['userdata'])
	},
	watch: {
		indic_pool: {
			// 策略排行，下拉列表默认项切换，触发策略排行初始化函数
			deep: true,
			handler(newval, oldval) {
				// 修改rate的txt值
				// console.log(newval);
				// this.toggleType(newval.type);
				// this.indicators.head.code.txt=newval.type;
				this.initData();
				// this.handlePositiveNegative();
			}
		}
	},
	methods: {
		/* showAllIndicators() {
			// 策略排行展示行数是否全部显示的切换；
			if (this.indicators.show_item === show_item) {
				this.indicators.show_item = this.indicators.tbody.length;
			} else {
				this.indicators.show_item = show_item;
			}
		}, */
		toggleComponent(item) {
			// 点击专家诊股，具体策略，跳转到东财模板详情页，携带对应参数；
			let rank_href = "https://nujin.com/forum-2954-1.html";
			if (location.host.includes('localhost') || location.host.includes('127')) {
				rank_href = "http://localhost:666";
			};
			// console.log(location,item);return;
			//检测rank_href上是否有查询字符串，如果有，结尾拼接&，没有拼接？
			rank_href = rank_href.includes('=') ? `${rank_href}&` : `${rank_href}?`;
			let s_code = this.basefn.queryToObj().s_code;
			let search_params =
				`
			${s_indicname}=${item.indicname}&${s_SecurityID}=${item.code}&${s_indic_type}=${this.indic_pool.type}
				`;
			if (s_code) {
				search_params += `&s_code=${s_code}`
			};
			// console.log(item);
			// console.log(search_params);
			// return;
			window.open(`${rank_href}&${search_params}`, '_self');
		},
		initData() {
			this.indicators.head_arr = Object.keys(this.indicators.head);
			const username = this.userdata.username;
			let type = this.indic_pool.type;
			if (type === '综合排序') {
				type = '综合评分'
			};
			const data = {
					username,
					type
				},
				src = '/ng_search/';
			//    		console.log(data);return;
			this.basefn.ajaxfn(`${this.host.lai_url}${src}`, 'POST', 'json', data, (res) => {
				console.log(res);
				let {
					result
				} = res;
				if (result instanceof Array && result.length > 0) {
					this.indicators.tbody = result;
				} else {
					this.indicators.tbody = [];
					Message.info({
						message:'牛股排行,'+result,
						customClass:'info'
					})
				};
			})
		}
	},
	created() {
		if (this.host.lai_url.includes('10.88.71.83')) {
			this.current_url = 'http://10.88.71.83';
		} else {
			this.current_url = 'https://data.aupool.cn'
		};
	},
	activated(){
		this.initData();
	}
}
