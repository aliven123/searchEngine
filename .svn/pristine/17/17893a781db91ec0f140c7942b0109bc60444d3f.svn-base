let ajaxfn=function(url,type,datatype,data,fn){	/*异步调用函数*/
	$.ajax({
		"url":url,
		"type":type,
		"async":true,
		"dataType":datatype,
		"xhrFields": {
			withCredentials: true
		},
		"crossDomain": true,
		"data":data,
		"success":function(res,...rest){
			/* rest包含status和其它信息 */
			fn(res,rest);
		},
		"error":function(XMLHttpRequest, textStatus, errorThrown) {
			 var result=XMLHttpRequest.status+","+XMLHttpRequest.readyState+","+textStatus;
			 fn(result);
			/* error事件返回的第一个参数XMLHttpRequest：
				XMLHttpRequest.readyState: 状态码的意思
				0 － （未初始化）还没有调用send()方法
				1 － （载入）已调用send()方法，正在发送请求
				2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
				3 － （交互）正在解析响应内容
				4 － （完成）响应内容解析完成，可以在客户端调用了*/
		 }
	});
};
const onAttach=function(element,type,callback){
  /*事件的监听*/
  if(element.addEventListener){
    element.addEventListener(type, callback, false);
  }else if(element.attachEvent){
    element.attachEvent('on' + type, callback);
  }else {
    element['on' + type] = callback;
  }
};
const offAttach=function(element,type,callback){
  /*// 解除事件监听*/
  if(element.addEventListener){
    element.removeEventListener(type, callback, false);
  }else if(element.attachEvent){
    element.detachEvent('on' + type, callback);
  }else {
    element['on' + type] = callback;
  }
};
const IsPC=function() {
   var userAgentInfo = navigator.userAgent;
   var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
   var flag = true;/* pc端是true,手机端是false */
   for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
         flag = false;
         break;
      }
   }
   return flag;
}();
const queryToObj=function(){
	const res={};
	const search=location.search.substr(1);
	search.split('&').forEach(paramStr=>{
		const arr=paramStr.split('=');
		const key=arr[0];
		const val=arr[1];
		res[key]=val;
	});
	return res;
};
const sleep=function(interval){
	// 睡眠函数
	return new Promise(resolve=>{
		setTimeout(resolve,interval);
	})
};
export default {
	ajaxfn,
	onAttach,
	offAttach,
	IsPC,
	queryToObj,
	sleep
};
