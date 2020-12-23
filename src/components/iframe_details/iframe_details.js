import { Loading } from 'element-ui';
export default{
	name:"iframe_details",/*搜索结果列表,点击详情页,iframe内嵌*/
	data:function(){
		return {
			/* 控制iframe页面中底部导航是否显示
			pc端nav_bar为空,
			 
			 */
			nav_bar:'g_nav_active'
		}
	},
	components:{
		nav_bar:()=>import('../nav_bar/nav_bar.vue')
	},
	computed:{
		iframeData(){
			console.log(this.$store.state.iframe_data);
			const data=this.$store.state.iframe_data;
			if(data.url.includes('http')){
				data.url=data.url.replace(/^(http:)|(https:)/,'');
			};
			console.log(data.url);
			return data;
		}
	},
	/* methods:{
		goBack(){
			const {current_route_name}=this.$store.state.iframe_data;
			this.$router.push({
				name:current_route_name
			})
		}
	}, */
	created(){
		if(this.basefn.IsPC){
			this.nav_bar='';
		}
	},
	mounted(){
		
		$(document ).ready(function(){
		    $("a" ).attr("target" , "_parent" );
		});
	}
}
