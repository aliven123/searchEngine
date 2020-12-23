<template>
	<div class="login">
		<ul class="content boxs">
			<li v-for="(item,name) in login_obj">
				<span v-text="item.txt" class="des"></span><br v-if="!is_PC">
				
				<!-- 非验证码的input -->
				<input v-if="name!='randcode'" :type="item.type"
					:placeholder="item.placeholder"
					v-model.trim="item.val"
					@keyup="checkIpt(name)"
				/>				
				
				<!-- 状态码 -->
				<span v-text="item.status"
					class="status">
				</span>
			</li>
		</ul>
		<div class="operation boxs">
			<span v-text="result"></span>
			<input type="button" @click="login" value="登录" />
		</div>
	</div>
</template>
<script src="./login.js"></script>
<style lang="less" scoped src="./login.less"></style>
