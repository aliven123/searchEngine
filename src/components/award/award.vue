<template>
	<div class="award boxs">
		<nav class="box clearfix">
			<span class="fl title" v-text="init_data.title"></span>
			<span class="iconfont iconclose fr close" @click="close"></span>
		</nav>
		<h4>感谢您的支持，我会继续努力的</h4>
		<template v-if="init_data.title=='打赏'">
			<div class="erweima boxs">
				<img :src="img_src" />
			</div>
			<ul>
				<li v-for="(item,name) in init_data.award.list">
					<input type="radio"
						:id="'award'+item.value"
						:value="item.value"
						v-model="init_data.award.def"
					 />
					<label :for="'award'+item.value"
						v-text="item.txt"
					>
					</label>
				</li>
			</ul>
			<p>扫一扫二维码，即可进行扫码打赏哦</p>
		</template>
		<!--公众号 -->
		<template v-else>
			<div class="erweima boxs">
				<img :src="init_data.wx_gongzh" />
			</div>
			<p>扫一扫二维码，即可关注微信公众号哦</p>
		</template>
	</div>
</template>
<script src="./award.js"></script>
<style lang="less" scoped src="./award.less"></style>
