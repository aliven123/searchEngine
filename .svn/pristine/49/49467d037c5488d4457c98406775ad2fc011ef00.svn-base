const style_obj={
	top:'29px',
	right:'0',
	background:'white',
	boxShadow: '0 0 5px gray'
};
let initobj=null;
export default {
	//1.涨幅，指数更多切换的公共组件，
	//2.样式不传值是默认样式；
	//3.把数据源对象转化成对象数组，利用图表渲染；
	name:'toggle_header',
	data:function(){
		return {
			header_list:{}
		}
	},
	props:{
		p_datas:{
			type:Object,
			default:function(){
				return {
					def:'rate',
					header_obj:{
						index:'搜索指数',
						rate:'涨幅',
						fae:'搜索指数',
						dfe:'涨幅',
						gew:'搜索指数',
						gewr:'涨幅'
					},
					style_obj
				}
			}
		}
	},
	computed:{
		getPdatas(){
			return this.p_datas;
		}
	},
	methods:{
		objToArr(obj){
			const obj_list=[];
			const td_num=3;//一行放3列数据
			const header_list=Object.keys(obj);
			let tr_index=0;//创建对象，在数组中的index
			let key='';
			for(let i=0;i<header_list.length;i++){
				tr_index=Number.parseInt(i/td_num);
				key=header_list[i];
				//如果当前index下没有对象，就创建一个对象，放置当前行的数据
				if(obj_list[tr_index]==undefined){
					obj_list.push({})
				};
				//把遍历的对象数据，放入指定行对象中；
				Object.assign(obj_list[tr_index],{
					[key]:obj[key]
				})
			};
			return obj_list;
		},
		toggleindic(key,des){
			this.$emit('toggleindic',{key,des});
		}
	},
	watch:{
		getPdatas:{
			deep:true,
			immediate:true,
			handler(newval,oldval){
				console.log(newval);
				initobj=JSON.parse(JSON.stringify(newval));
				if(!initobj.style_obj){
					Object.assign(initobj,{style_obj})
				};
				Object.assign(initobj,{list:this.objToArr(initobj.header_list)});
				Reflect.deleteProperty(initobj,'header_list');
				Reflect.deleteProperty(initobj,'header_obj');
				console.log(initobj);
				this.header_list=initobj;
			}
		}
	}
}