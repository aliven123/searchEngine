<template>
	<div id="help_board" class="boxs">
		<!-- 头部 -->
		<ul v-if="help_data.tag=='s_card'" class="s_card">
			<li class="pic clearfix">
				<span class="iconfont iconfangda fr"
				@click="toggleHS('b_card')">
				</span>
			</li>
			<li v-text="renderTxt.title" class="content">
			</li>
		</ul>
		<ul v-else class="b_card">
			<li class="pic clearfix">
				<span v-text="renderTxt.title" class="fl">weuo </span>
				<span class="iconfont iconclose fr"
				@click="toggleHS('s_card')">
				</span>
			</li>
			<!-- 主体 -->
			<li class="content">
				<div v-for="(nav_des,index) in renderTxt.TD_code.nav_list" 
					v-text="nav_des"
					@click="handleNav(index)"
					:class="['upper_txt',{'active':index==renderTxt.TD_code.index}]">
				</div>
				<div v-text="renderTxt.QQ"></div>
				<div v-text="renderTxt.text"></div>
				<div class="boxs wx_gzh">
					<img v-if="renderTxt.TD_code.image_list[renderTxt.TD_code.index].src"
					 :src="ip_test+'/'+renderTxt.TD_code.image_list[renderTxt.TD_code.index].src" />
					<p v-text="renderTxt.TD_code.image_list[renderTxt.TD_code.index].des"></p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script src="./help_board.js"></script>
<style lang="less" scoped src="./help_board.less"></style>
