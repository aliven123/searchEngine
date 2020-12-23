<template>
	<div class="display_ctn">
		<!-- {{display_data}} -->
		<template v-if="display_data.txt=='lock'">
			<!-- 解锁跳转的链接地址，直接在当前页打开，回退自动刷新了状态 -->
			<a class='iconfont iconsuo' :href='this.$store.state.loading.buyvip'></a>
		</template>
		<template v-else-if="display_data.txt=='login'">
			<!-- 解锁跳转的链接地址，直接在当前页打开，回退自动刷新了状态 -->
			<a class='iconfont iconsuo' @click="visitLogin"></a>
			<!-- <span v-text="display_data.txt"></span> -->
		</template>
		<template v-else-if="display_data.txt=='recom'">
			<span v-text="display_data.value"></span>
			<span class='iconfont iconhongbao' title="打赏" @click="handleDonate"></span>
		</template>
		<template v-else-if="display_data.txt==''">
			<span v-text="display_data.value"></span>
		</template>
	</div>
</template>
<script src="./display_ctn.js"></script>
<style src="./display_ctn.less" scoped lang="less"></style>
