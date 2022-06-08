<template>
	<div class="console-header">
		<span class="btn-show-sidebar" @click="changeSidebarCover"><i :class="{'el-icon-s-fold' : cover,'el-icon-s-unfold':!cover}"></i></span>
		<div class="header-right">
			<search />
			<fullScreen v-if="!isMobile" />
			<international />
			<author />
		</div>
	</div>
</template>

<script>
	import fullScreen from './fullScreen.vue'
	import Search from './search.vue'
	import Author from './author.vue'
	import International from "./international";
	export default {
		components:{
			fullScreen,
			Search,
			Author,
			International
		},
		computed:{
			cover() {
				return this.$store.state.consoleLayout.sidebarCover
			},
			
			isMobile() {
				return this.$store.state.app.isMobile;
			}
		},
		data() {
			return {

			}
		},
		created() {

		},
		methods: {
			/**
			 * 切换左侧菜单栏拉开
			 */
			changeSidebarCover() {		
				this.$store.dispatch('consoleLayout/changeSidebarCover', !this.cover);
			},
			
		},
	}
</script>

<style>
</style>
<style lang="scss">
	.console-header {
		height: 50px;
		line-height: 50px;
		background: var(--background);
		.btn-show-sidebar {
			display: block;
			width: 50px;
			height: 50px;
			line-height: 50px;
			cursor: pointer;
			margin-left: 10px;
			font-size: 18px;
			float: left;
		}

		.header-right {
			float: right;
			display: flex;
			flex-wrap: nowrap;
		}

		.header-right .svg-icon {
			cursor: pointer;
			transition: transform .3s;
			margin: 0 5px;
			

			&:hover {
				color: #1E9FFF;
				transition: transform .3s;
				transform: scale(1.5);
			}
		}
	}
</style>
