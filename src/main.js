import 'babel-polyfill'/* 写在vue,vuex前面,为了兼容ie */
import Vue from 'vue'
import App from './App'
import Homelayer from './pages/main.vue'
import router from './router'
import './assets/common.css'/*引入公共类*/
import './assets/icon_font/iconfont.css'/*引入全局的iconfont图标*/
import $ from 'jquery' /*引入jquery*/
/*common.js引入开始*/
import basefn from './assets/common.js'
import {host} from '../static/config.js'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MetaInfo from 'vue-meta-info'

/* 全局组件 */
import shade from './components/public/index.js'
/* 全局组件 */
Vue.prototype.basefn=basefn;
Vue.config.productionTip = false
Vue.prototype.host=host;
Vue.use(ElementUI);
Vue.use(MetaInfo);
Vue.use(shade);
Vue.directive('elfocus',{/*全局自定义指令*/
	inserted(el){
		el.focus()
	}
});
new Vue({
  el: '#app',
  store,
  router,
  components: { Homelayer },
  template: '<Homelayer/>',
  render:createElement=>createElement(App)
})
