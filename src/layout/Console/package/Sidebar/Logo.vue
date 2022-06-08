<template>
	<div :class="{ 'sidebar-logo-panel': true, collapse: collapse }">
		<transition name="sidebarLogoFade">
			<router-link v-if="collapse" key="collapse" class="sidebar-logo-link" :to="homePath">
				<el-image v-if="logo" :src="logo" class="sidebar-logo"></el-image>
				<h1 v-else class="sidebar-title">{{ title }}</h1>
			</router-link>
			<router-link v-else key="expand" class="sidebar-logo-link" to="/">
				<img v-if="logo" :src="logo" class="sidebar-logo" />
				<h1 class="sidebar-title">{{ title }}</h1>
			</router-link>
		</transition>
	</div>
</template>

<script>
import logo from '@/assets/images/logo.png';
export default {
	name: 'Logo',
	props: {
		collapse: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			homePath: '/',
			logo: logo,
			title: '孤鸿渺影'
		};
	}
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
	transition: opacity 1s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}

.sidebar-logo-panel {
	position: relative;
	width: 100%;
	height: 50px;
	line-height: 50px;
	// background: #2b2f3a;
	text-align: center;
	overflow: hidden;

	& .sidebar-logo-link {
		height: 100%;
		width: 100%;
		// display: flex;
		// flex-wrap: nowrap;
		& .sidebar-logo {
			width: 32px;
			height: 32px;
			vertical-align: middle;
			margin-right: 12px;
		}

		& .sidebar-title {
			display: inline-block;
			margin: 0;
			color: #303133;
			font-weight: 600;
			line-height: 50px;
			font-size: 20px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
			max-width: 130px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	&.collapse {
		.sidebar-logo {
			margin-right: 0px;
		}
	}
}
</style>
