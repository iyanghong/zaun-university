<template>
	<el-tooltip effect="dark" :content="formatData(content || text)" placement="top-start">
		<span class="text-panel" v-text="formatData(text || content)" @click="handleClick"></span>
	</el-tooltip>
</template>

<script>
	export default {
		name: 'ToolTip',
		props: ['content','text'],
		methods:{
			formatData(value){
				if(value === null || value === undefined) return '';
				
				return value.toString();
			},
			handleClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	.text-panel {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
</style>
