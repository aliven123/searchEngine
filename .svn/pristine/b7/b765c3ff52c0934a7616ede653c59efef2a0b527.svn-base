import Vue from 'vue'
import Router from 'vue-router'
/* import homelayer from '@/components/homelayer/homelayer.vue'
import list_board from '@/components/list_board/list_board.vue' */

Vue.use(Router)
function getAbsolutePath () {
 let path = location.pathname
 return path.substring(0, path.lastIndexOf('/') + 1)
};
const router=new Router({
	// 去掉路由的#号
  mode:'history',
  base:getAbsolutePath(),
  routes: [
    {
      path: '/',
      name: 'home',
      component:resolve=>require(['@/components/homelayer/homelayer.vue'],resolve)
    },{
		path:'/list',
		name:"list_board",
		props:(route)=>({
			/* 路由参数配置,在组件内通过this.route.query获得参数的键值对 */
			q:route.query.q
		}),
		component:resolve=>require(['@/components/list_board/list_board.vue'],resolve)
	},{
		path:'/log_reg',
		name:"log_reg",
		component:resolve=>require(['@/components/log_reg/log_reg.vue'],resolve),
		redirect:'/login',
		children:[{
			path:'/login',
			name:'login',
			component:resolve=>require(['@/components/log_reg/login/login.vue'],resolve)
		},{
			path:'/register',
			name:'register',
			component:resolve=>require(['@/components/log_reg/register/register.vue'],resolve)
		},{
			path:'/forget_pwd',
			name:'forget_pwd',
			component:resolve=>require(['@/components/log_reg/forget_pwd/forget_pwd.vue'],resolve)
		}]
	},{
		path:'/details',
		name:"iframe_details",
		component:resolve=>require(['@/components/iframe_details/iframe_details.vue'],resolve)
	}]
});
export default router;
