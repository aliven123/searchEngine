const browserCheck=function(){
			/*浏览器检测*/
	const h = this.$createElement;
	const options={
			title: '提示',
			message: h('p', null, [
			   h('span', null, '对不起，您的浏览器过时啦，为了您能获得更好的使用体验，请点击确认下载谷歌浏览器~~ '),
			   h('i', { style: 'color: teal' }, '')
			]),
			showCancelButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
				  instance.confirmButtonLoading = true;
				  instance.confirmButtonText = '执行中...';
				  this.loadContract();
				  setTimeout(() => {
					done();
					setTimeout(() => {
					  instance.confirmButtonLoading = false;
					}, 300);
				  }, 1000);
				} else {
				  done();
				}
			}
		};
	const curBrowser=(function(){
		let ua = navigator.userAgent.toLocaleLowerCase();
		let browserType = null;
		let version=null;
		const version_exp={
			Chrome:/chrome\/[\d.]+/gi,
			"火狐":/firefox\/[\d.]+/gi
		};
		if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
			browserType = 'IE'
		} else if (ua.match(/firefox/) != null) {
			browserType = '火狐';
			version=ua.match(version_exp[browserType]);
			const part=/\/(\d{1,1000})./;
			version=part.exec(version)[1];
		} else if (ua.match(/ubrowser/) != null) {
			browserType = 'UC'
		} else if (ua.match(/opera/) != null) {
			browserType = '欧朋'
		} else if (ua.match(/bidubrowser/) != null) {
			browserType = '百度'
		} else if (ua.match(/metasr/) != null) {
			browserType = '搜狗'
		} else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
			browserType = 'QQ'
		} else if (ua.match(/maxthon/) != null) {
			browserType = '遨游'
		} else if (ua.match(/chrome/) != null) {
			let is360 = false
			let mimeTypes = navigator.mimeTypes
			for (var mt in mimeTypes) {
				if (mimeTypes[mt]['type'] === 'application/vnd.chromium.remoting-viewer') {
					return true
				}
			}
			if (is360) {
				browserType = '360'
			} else {
				browserType = 'Chrome';
				version=ua.match(version_exp[browserType]);
				const part=/\/(\d{1,1000})./;
				version=part.exec(version)[1];
			}
		} else if (ua.match(/safari/) != null) {
			browserType = 'Safari';
		};
		return {browserType,version}
	})();
	return curBrowser
};
		
export {browserCheck};
		