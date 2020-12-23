export const getDatas=function(c_componentFn,getDataFn,ref_name){
	//1.c_componentFn是当前组件收集数据的函数名;
	//2.如果getDataFn存在就通过当前函数获取其它组件的数据
		//2.1.如果有ref_name就通过ref_name获取子组件的数据，
		//2.2如果没有ref_name就通过$parent获取父组件的数据
	//3.如果不存在直接获取当前组件需要收集的数据返回;
	const obj={};
	Object.assign(obj,this[c_componentFn]());
	if(getDataFn){
		if(ref_name!==undefined){
			const callBack=this.$refs[ref_name][getDataFn];
		}else{
			const callBack=this.$parent[getDataFn];
		}
	};
	Object.assign(obj,callBack())
	return obj();
}