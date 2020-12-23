export default {
	name:'global_lock',
	data:function(){
		return {
			init_data:{
				
			}
		}
	},
	props:{
		datas:{
			type:Object
		}
	},
	computed:{
		get_datas(){
			return this.datas;
		}
	},
	watch:{
		get_datas:{
			deep:true,
			immediate:true,
			handler(newval,oldval){
				console.log(newval);
				this.init_data=newval;
			}
		}
	},
	methods:{
		
	},
	mounted(){
	}
}