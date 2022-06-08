<template>
	<div class="select-header-body">
		<el-scrollbar ref="scrollContainer" wrap-class="scrollbar-wrapper"  class="select-header-wrapper">
			<el-image class="header-item" v-for="(item,index) in list" :key="index" :src="item | resources" @click="handleSelect(item)"></el-image>
		</el-scrollbar>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				list : []
			}
		},
		created() {
			for(let i = 1;i <= 100; i++){
				let url = 'global/header/'+ this.getRamdomIndex() + '.jpg';
				this.list.push(url);
			}
		},
		methods:{
			handleSelect(item){
				this.$emit('select',item);
			},
			getRamdomIndex(){
				let path = '000' + Math.floor((Math.random() * 100 + 1));
				return path.substr(-3);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-header-body{
		height: 500px;
		display: flex;
		padding: 10px;
		justify-content: space-between;
		flex-wrap: wrap;
		overflow: hidden;
	}
	.select-header-wrapper{
		height: calc(100% + 22px);
	}
	.header-item{
		width: 80px;
		height: 80px;
		cursor: pointer;
		margin-top: 3px;
		border: transparent 1px solid;
	}
	.header-item:hover{
		border: #1E9FFF 1px solid;
	}
	
</style>
