<template>
	<div id="app_page">
		<router-view></router-view>
	</div>
</template>
<script>
	console.log(window.sjg_config);
	export default {
		name: 'Homelayer',
		data: function() {
			return {
				ip_test: null
			}
		},
		mounted() {
			this.ip_test = window.sjg_config.request_url.wb;
		}
	}
</script>
<style>
	#app_page {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	html,
	body,
	#app_page {
		width: 100%;
		height: 100%;
	}
</style>
