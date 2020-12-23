<template>
	<div class="toggle_header boxs clearfix" :style="header_list.style_obj">
		<table>
			<tbody>
				<tr v-for="(item,index) in header_list.list">
					<td v-for="(val,key) in item" 
					:class="[{'active':key==header_list.def}]"
					@click="toggleindic(key,val)"
					>
						<span v-text="val"></span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script src="./toggle_header.js"></script>
<style lang="less" src="./toggle_header.less" scoped></style>
