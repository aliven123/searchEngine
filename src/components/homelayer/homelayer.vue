<template>
	<div id="homelayer" ref='homelayer'
		class="boxs"
		@click="handleMoreList(false)"
	>
		<shade v-if="shade.hishow" />
		<award
			v-if="award.hishow"
			:p_datas=award.datas
			@donate="donate('seft',$event)"
		></award>
		<help_board class="help_board boxs" />
		<!-- <nav_bar id="nav_bar" /> -->
		<div class="main_ctn">
			<div class="header clearfix">
				<ul class="aside boxs fr">
					<li class="logo" v-if="loading.logo">
						<!-- <img src="../../assets/image/logo.png" /> -->
						<img
						:src="ip_test+'/'+loading.logo" />
					</li>
					<li>
						<span class="award iconfont iconhongbao"
							title="打赏"
							@click="donate('打赏')"
						>
						</span>
						<span class="iconfont iconWeChat"
							title="关注微信公众号"
							@click="donate(loading.gongzhonghaoname)"
							>
						</span>
						<!-- <span class="iconfont iconyueliang"></span> -->
						<a class="ask iconfont iconwentijieda"
							@click="mainListScroll(loading.quesreport)"
						>
						</a>
						<!-- 登录状态切换标签 -->
						<span v-if="is_PC" class="user"
						v-text="getUserStatus"
						@click="userswitch"></span>
					</li>
					<li class="share" v-if="is_PC">
						<!-- <span>订阅号</span><span class="iconfont icondouban"></span>
						<span>分享到空间</span>
						<span>分享到新浪微博</span>
						<span>分享到豆瓣</span> -->

						<!-- <span class="iconfont iconweixin" title="订阅号"></span>
						 -->
						<span class="iconfont iconfenxiangqqhaoyou"
							@click="shareToQQ"
							title="分享QQ好友">
						</span>
						<span class="iconfont iconkongjian"
							@click="shareToRoom"
							title="分享到空间">
						</span>
						<span class="iconfont iconweibo"
							@click="shareToMicroblog"
							title="分享到新浪微博">
						</span>
					</li>
				</ul>
			</div>
			<div class="search_part">
				<div class="outer_ctn">
					<!-- <img src="../../assets/image/promote.png" alt=""> -->
					<img v-if="loading.picsign" :src="ip_test+'/'+loading.picsign" alt="">
				</div>
				<div class="outer_ctn">
					<!-- <input type="text"
						v-elfocus
						v-model="search_txt"
						class="search_word"
						@keyup.enter="getInfo"
					 /> -->
					<!-- <input type="button"
						@click="getInfo"
						class="search_btn"
						value="搜索"
					/> -->
					<ipt_search
						:init_obj="ipt_obj.init_obj"
						:ipt_txt="ipt_obj.ipt_txt"
						class="search_word"
						@mouseover="initSearch"
						@current_txt="getcurrentTxt('self',$event)"
						@targetSecurity="getIptTxt('self',$event)"
					 />
					<!-- <button
						@click="getInfo"
						class="search_btn iconfont iconsearch"
					>
					</button> -->
					<button
						@click="getIptTxt('self',search_txt)"
						class="search_btn iconfont iconsearch"
					>
					</button>
				</div>
			</div>
			<ul class="friends boxs">
				<li v-for="item in loading.friend" class="one-txt-cut">
					<span v-if="item.logo">
						<img :src="ip_test+'/'+item.logo" alt="">
					</span>
					<a @click="mainListScroll(item.url)" v-text="item.name"></a>
				</li>
			</ul>
			<ul class="new_list boxs" 
				v-if="news_data.sort.length>0"
				ref='new_list'
			>
				<li class="title boxs" ref='title'>
					<!-- 热点新闻,热词的切换 换一换 -->
					<div class="board_des clearfix boxs">
						<span v-for="(item,index) in news_data.sort"
							:class="['boxs',{active:item.val==news_data.def}]"
							v-text="item.txt"
							@click="toggleHotNav(item.val,index)"
						></span>
					</div>
					<div class="toggle_btn boxs">
						<span class="iconfont iconhuanyihuan replace_ct"
							@click="replaceContent"
						>换一换</span>
					</div>
				</li>
				<!-- 模块锁定组件 -->
				<li class="boxs global_lock_ctn" v-if="global_hishow">
					<global_lock :datas="global_lock_datas"></global_lock>
				</li>
				<!-- 展示数据的头部 -->
				<li class="header boxs" v-show="header_hishow" >
					<span class="num boxs">
						热榜
					</span><span class="details boxs">
						关键词
					</span><span class="lastindic boxs">
						<!-- 涨幅/搜索指数 -->
						<i v-for="(val,key) in news_data.word_header.header_obj"
							:class="{'active':key==news_data.word_header.def}"
							@click="indicsort(key,val)">
							{{val}}
							<span
							:class="['iconfont',{'iconpaixu-jiangxu':true}]">
							</span>
						</i>
					</span>
					<!-- 更多的按钮和模板，数据是news_data.word_header,word_header在public.js中定义-->
					<span class="more_indic" @click.stop="handleMoreList(true)">更多</span>
					<toggle_header :p_datas="news_data.word_header"
						@toggleindic="toggleindic('self',$event)"
					 v-if="toggle_header.hishow" />
				</li>

				<!-- 热词模块-->
				<li v-if="news_data.def=='word'"
					v-for="(item,index) in news_data.word"
					:key="item.title"
					class="hot_words boxs"
				>
					<span v-text="item.num" class="num boxs">

					</span><span class="details boxs one-txt-cut" >
						<!-- 跳转到股吧 -->
						<i class="iconfont iconguba"
						 @click.stop="toGuba(item)"
						 title="股吧"
						 v-if="item.fid!=0">
						</i>
						<i @click="seachHot(item.title)" v-text="item.title">
						</i>
					</span><span class="boxs lastindic">
						 <display_ctn
						 :data_obj="item[news_data.word_header.def]"
						 @handleDonate="handleDonate('self',$event)"
						 @visitLogin="visitLogin('self',$event)"
						   />
					</span>
				</li>

				<!-- 热点新闻 -->
				<li  class="news boxs"
					v-if="news_data.def=='news'"
					v-for="(item,index) in news_data.news"
				>
					<h4 class="one-txt-cut">
						<a v-if="is_PC==true"
						:href="item.unescapedUrl"
						v-html="item.title" :target="open_target"
						></a>
						<a v-else
						v-html="item.title"
						@click="mainListScroll(item.unescapedUrl)"
						></a>
					</h4>
					<div>
						<p v-html="item.content"></p>
						<img v-if="item.richSnippet!=undefined&&item.richSnippet.cseImage!=undefined"
							:src="advertiseUrl(item.richSnippet.cseImage.src)"
							alt="" />
						<template>
							<span v-text="item.formattedUrl"></span>
						</template>

					</div>
				</li>

			<!-- 自选股板块 -->
				<!-- 先选的模块 -->
				<li 
					v-if="news_data.def=='zixuan'"
					class="hot_words boxs optional">
					<div class="toggle_zx">
						<span v-for="(item,index) in news_data.optional.list"
							v-text="item.name"
							:class="[{'active':index==news_data.optional.def_i}]"
							@click.stop="toggleOption(index)"
						>
						</span>
					</div>
					<div class="share boxs" @click="shareOptional">
						分享
					</div>
				</li>
				<!-- 自选内容显示 -->
				<li v-if="news_data.def=='zixuan'"
					v-for="(item,index) in news_data.zixuan"
					:key="item.title"
					class="hot_words boxs"
				>
					<span v-text="item.num" class="num boxs">
				
					</span><span class="details boxs one-txt-cut" >
						<!-- 跳转到股吧 -->
						<i class="iconfont iconguba"
						 @click="toGuba(item)"
						 title="股吧"
						 v-if="item.fid!=0">
						</i>
						<i @click="seachHot(item.title)" v-text="item.title">
						</i>
					</span><span class="boxs lastindic">
						 <display_ctn
						 :data_obj="item[news_data.word_header.def]"
						 @handleDonate="handleDonate('self',$event)"
						 @visitLogin="visitLogin('self',$event)"
						   />
					</span>
				</li>
				<!-- 分享板块 -->
				<li v-if="news_data.def=='share'"
					v-for="(item,index) in news_data.share"
					:key="item.title"
					class="hot_words boxs"
				>
					<span v-text="item.num" class="num boxs">
				
					</span><span class="details boxs one-txt-cut" >
						<!-- 跳转到股吧 -->
						<i class="iconfont iconguba"
						 @click="toGuba(item)"
						 title="股吧"
						 v-if="item.fid!=0">
						</i>
						<i @click="seachHot(item.title)" v-text="item.title">
						</i>
					</span><span class="boxs lastindic">
						 <display_ctn
						 :data_obj="item[news_data.word_header.def]"
						 @handleDonate="handleDonate('self',$event)"
						 @visitLogin="visitLogin('self',$event)"
						   />
					</span>
				</li>
        
				<!-- 推荐模块-->
				<li v-if="news_data.def=='recom'"
					v-for="(item,index) in news_data.recom"
					class="hot_words boxs"
				>
					<span v-text="item.num" class="num boxs">
					</span><span class="details boxs one-txt-cut" >
						<!-- 跳转到股吧 -->
						<i class="iconfont iconguba"
						 @click="toGuba(item)"
						 title="股吧"
						 v-if="item.fid!=0">
						</i>
						<i @click="seachHot(item.title)" v-text="item.title">
						</i>
					</span><span class="boxs lastindic">
						 <display_ctn
							:data_obj="item[news_data.word_header.def]"
							@handleDonate="handleDonate('self',$event)"
							@visitLogin="visitLogin('self,$event')"
						  />
					</span>
				</li>
			</ul>
		</div>
		<ul class="footer">
			<li>
				<a v-text="loading.websign">@2019 使用搜金股前必读</a>
				<!-- <a>Powered by NiuGuReSou.com</a>	 -->
			</li>
			<li>
				<a v-text="loading.precordinfo">@2019 使用搜金股前必读</a>
			</li>
			<li class="jinhui">
				<a @click="mainListScroll(loading.recordurl)"
				v-text="loading.recordinfo">沪ICP备18003883号</a>
				<!-- <span></span> -->
			</li>
			<li v-if="loading.disclaimersign" @click="getDisclaimer">
				<a>免责声明</a>
			</li>
			<li>
				<a v-text="date"></a>
			</li>
		</ul>
		<div class="disclaimer boxs" v-if="disclaimer.hishow"
		 @click.stop
		v-text="disclaimer.txt">
		</div>
	</div>
</template>
<script src='./homelayer.js'></script>
<style lang="less" scoped src="./homelayer.less"></style>
