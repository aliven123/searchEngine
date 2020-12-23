<template>
	<div class="register">
		<ul class="content boxs">
			<li v-for="(item,name) in register_obj">
				<span v-text="item.txt" class="des"></span><br v-if="!is_PC">
				
				<!-- 非验证码的input -->
				<input v-if="name!='randcode'" :type="item.type"
					:placeholder="item.placeholder"
					v-model.trim="item.val"
					@keyup="checkIpt(name)"
				/>
				
				<!-- 验证码的input -->
				<input v-if="name=='randcode'" :type="item.type"
					:placeholder="item.placeholder"
					:style="randcodeobj"
					@keyup="checkIpt(name)"
					v-model.trim="item.val"
				/>				
				
				<!-- 发送验证码 -->
				<span v-if="name=='randcode'"
					v-text="get_code"
					class="get_code"
					@click="getRandcode"
				></span>
				<!-- 状态码 -->
				<span v-text="item.status"
					class="status">
				</span>
			</li>
		</ul>
		<div class="operation boxs">
			<span v-text="result"></span>
			<input type="button"
				@click="register"
				value="注册"
			/>
		</div>
	</div>
</template>
<script src="./register"></script>
<style lang="less" scoped src="./register.less"></style>
