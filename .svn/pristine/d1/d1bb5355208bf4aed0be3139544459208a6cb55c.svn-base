<template>
	<div class="admin boxs">
		<el-drawer
		  title="我是标题"
		  :visible.sync="drawer"
		  :direction="direction"
		  size="50%"
		  :with-header="false">
		  <div class="admin_ctn">
			  <ul>
				  <li class="user boxs">
					  <span class="iconfont iconadmin">
						  <img src="" alt="">
					  </span>
					  <span>
						  <router-link :to="log_reg" v-text="getUserStatus.username">
							  登录
						  </router-link>
					  </span>
				  </li>
				  <li v-for="(item,name) in nav_list"
					class="operate boxs"
				  >
					  <span :class="item.cls"></span>
					  <span v-text="item.txt" class="action"
						@click="operation(name)"
					  ></span>
				  </li>
				  <li class="operate boxs loginout" v-if="getUserStatus.username!='登录'">
					  <span :class="loginout.cls"></span>
					  <span v-text="loginout.txt" class="action"
					  		@click="operation('loginout')"
					  ></span>
				  </li>
			  </ul>
		  </div>
		</el-drawer>
	</div>
</template>
<script src="./admin.js"></script>
<style lang="less" scoped src="./admin.less"></style>
