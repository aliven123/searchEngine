<template>
	<div class="ng_search boxs">
		<div class="title boxs">
			<span>策略排行</span>
			<select v-model="indic_pool.type">
				<option v-for="(item,index) in indic_pool.list" :key="index" :value="item" v-text="item">
				</option>
			</select>
		</div>
		<div class="t_head">
			<table>
				<thead>
					<tr>
						<th v-for="(item,name) in
                indicators.head" :key="name">
							<span v-if="item.txt==='综合排序'">盈利率</span>
							<span v-else v-text="item.txt"></span>
						</th>
					</tr>
				</thead>
			</table>
		</div>
		<div class="t_body">
			<table>
				<tbody>
					<tr v-for="(item,index) in indicators.tbody"
					 :key="index" :class="item.type!=undefined?item.type:''" 
					 v-show="index<indicators.show_item && index<=20"
					 @click="toggleComponent(item)">
						<td v-for="(key,i) in indicators.head_arr" :key="i">
							<span v-text="item[key]" v-if="key!='img'"></span>
							<span v-else-if="key=='img'">
								<img :src="current_url+item[key]" v-if="item[key]!=undefined" />
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="boxs more_indicators" @click="showAllIndicators">
			<span v-if="indicators.show_item!==indicators.tbody.length" class="iconfont iconxiala">
				展开牛股
			</span>
			<span v-else class="iconfont iconshangla1">
				隐藏牛股
			</span>
		</div>
	</div>
</template>
<script src="./rec_stock.js"></script>
<style lang="less" scoped src="./rec_stock.less">
