<template>
	<div id="rank_indicators" @click.stop>
		<p class="r_i_title">
			<span>
				<label>
					<input type="checkbox"
						value="true"
						v-model="diagnose_switch"
					/>
					努金牛策诊股
				</label>
			</span>
			<span>：{{search_txt}}</span>
			<span class="gongzhognhao" @click="gongzhonghao">关注公众号</span>
			<div id="qrcode_ctn" v-show="gzh">
				<div class="clearfix title">
					<span>查看诊股结果</span>
					<span class="fr iconfont iconclose"
						 @click="gongzhonghao"
					>
					</span>
				</div>
				<div id="qrcode"></div>
			</div>
		</p>
		<div class="positive_negative">
			<div class="advice_head">
				<p v-if="userdata.username==='登录'"
				 :class="{blur_cover_tips:username===false}"
				>
					点击
					<router-link to="/login">登录</router-link>
					后点击下方查看更多策略！
				</p>
				
				<!-- <p class="advice_des"
				  v-if="userdata.username==='登录'"
					v-text="'['+styleDatas.advice_data.des+']'"
					:style="styleDatas.advice_data.styleobj"
				>
				</p> -->
				<p class="advice_des"
				  v-else
					v-text="styleDatas.advice_data.advice_des+'['+styleDatas.advice_data.des+']'"
					:style="styleDatas.advice_data.styleobj"
				>
				</p>
				<p style="font-size: 14px;color:gray;margin:4px 0">{{warning}}</p>
			</div>
			<div class="clearfix boxs advice_ctn" :style="{'width':is_PC===true?'100%':'100%'}">
			  <!-- 多空预测-->
			  <!-- <div :class="{blur_cover:username===false}"></div> -->
			  <!-- <div class="blur_cover"></div> -->
			  <div class="fl boxs"
					  title="点击查看看多策略"
			    :style="styleDatas.p_style"
					  @click.stop="handleIndicator('up')"
			  >
			    <span
			      v-text="'多'+style_obj.positive+'%'"
						v-if="(typeof style_obj.positive)==='number'"
			    >
			    </span>
					  <span v-else
						v-text="style_obj.positive"
					  > 
					  </span>
			  </div>
			  <div class="fl boxs"
						title="点击查看看空策略"
			    :style="styleDatas.n_style"
					  @click.stop="handleIndicator('down')"
			  >
			    <span
			      v-text="'空'+style_obj.negative+'%'"
						v-if="(typeof style_obj.negative)==='number'"
			    >
			    </span>
					  <span
						v-text="style_obj.negative"
						v-else
					  >  
					  </span>
			  </div>
			</div>
		</div>
		<div class="indicator_title boxs">
			<div v-for="(item,index) in indic_pool.list"
				:class="['indicator',{'active':item==indic_pool.type}]"
				:key="index"
				@click="toggleType(item)"
			>
				<span v-if="item==='综合评分'">
					综合排序
				</span>
				<span v-else>
					{{item}}
				</span>
			</div>
			<!-- <div class="more">
				<span class="gengduo">更多</span>
				<span class="boxs iconfont iconxiala"></span>
			</div> -->
		</div>
		<div class="t_head">
		  <table>
			<thead>
			  <tr>
				<th v-for="(item,name) in indicators.head">
				  <span v-if="item.txt==='综合评分'">
					  盈利率
				  </span>
				  <span
				    v-else
					v-text="item.txt"
				   ></span>
				</th>
			  </tr>
			</thead>
		  </table>
		</div>
		<div class="t_body">
		  <table>
			<tbody>
			  <tr v-for="(item,index) in indicators.tbody"
				:key="index"
				:class="item.type!=undefined?item.type:''"
				  v-show="index<indicators.show_item"
				@click="toggleComponent(item)"
			  >
				<td v-for="(key,i) in indicators.head_arr" :key="i">
				  <span v-if="key=='indicname'">
					  {{item[key]}}<i class="rank_des">购买</i>
				  </span>
				  <span v-else-if="key=='img'" :class="{'indicator_img':key=='img'}">
					<img :src="'https://data.nujin.com'+item[key]" v-if="item[key]!=undefined" style="width:97px" />
				  </span>
				  <span v-text="item[key]" v-else></span>
				</td>
			  </tr>
			</tbody>
		  </table>
		<div class="boxs more_indicators" @click="showAllIndicators">
			<span 
				v-if="indicators.show_item!==indicators.tbody.length"
				class="iconfont iconxiala"
			>
				展开策略
			</span>
			<span v-else
				class="iconfont iconshangla1"
			>
				隐藏策略
			</span>
		</div>
		</div>
	</div>
</template>
<script src="./rank_indicators.js"></script>
<style lang="less" src="./rank_indicators.less" scoped></style>
