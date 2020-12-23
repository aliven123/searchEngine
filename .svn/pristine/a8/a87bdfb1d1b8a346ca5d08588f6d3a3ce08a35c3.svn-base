let MIXIN={
	data(){
		return {
			show_item:10
		}
	},
	methods:{
		showAllIndicators() {
			// 策略排行展示行数是否全部显示的切换；
			if (this.indicators.show_item !== this.indicators.tbody.length) {
				this.indicators.show_item = this.indicators.tbody.length;
			} else {
				this.indicators.show_item = this.show_item;
			}
		}
	}
};
export default MIXIN;