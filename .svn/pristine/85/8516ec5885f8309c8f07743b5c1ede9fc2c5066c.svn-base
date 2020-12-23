<template>
	<div class="log_reg boxs">
		<div class="nav">
			<a class="logo" @click="goHomelayer">
				<!-- <img src="../../assets/image/logo.png" alt=""> -->
				<img v-if="loading.logo" :src="advertiseUrl(loading.logo)" alt="">
			</a>
			<span v-for="(item,index) in nav.list"
			@click="toggleAction(null,{index})"
			:class="{active:nav.def==item.route}">
				<router-link v-text="item.txt" :to="item.route">
				</router-link>
			</span>
		</div>
		<router-view @toggleAction="toggleAction('oneself',$event)"></router-view>
	</div>
</template>
<script src="./log_reg.js"></script>
<style lang="less" scoped src="./log_reg.less"></style>
