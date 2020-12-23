<template>
	<div class="shade" :style="init_datas.styleObj">
		
	</div>
</template>
<script>
	export default{
		name:'shade',/* 遮罩层 */
		data:function(){
			return{
				init_datas:null
			}
		},
		props:{
			p_datas:{
				type:Object,
				default:function(){
					return {
						styleObj:{
						width:'100%',
						height:'100%',
						zIndex:1,
						background:'gray',
						opacity:'0.5'
						}
					}
				}
			}
			
		},
		methods:{
			
		},
		created(){
			this.init_datas=this.p_datas;
		}	
	}
</script>
<style lang="less" scoped>
	.shade{
		position: absolute;
	}
</style>