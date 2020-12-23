const env=process.env.NODE_ENV;
let host=null;
if(env=='development'){
	host={
		lai_url:'http://10.88.71.83:8006',
		shuo_url:'http://10.88.71.83:8008'
	};
}else if(env=='production'){
	host={
		lai_url:'https://data.aupool.cn',
		bin_url:'https://data.aupool.cn',
		shuo_url:'https://data.aupool.cn'
	};
};
export {host}