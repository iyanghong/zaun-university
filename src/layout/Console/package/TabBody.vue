<template>
	<section class="layout-console-body">
		<transition name="tab-view-fade" mode="out-in">
			<keep-alive :include="cachedViews"><router-view :key="key" /></keep-alive>
		</transition>
	</section>
</template>

<script>
export default {
	computed: {
		cachedViews() {
			return this.$store.state.consoleLayout.cachedViews;
		},
		key() {
			return this.$route.path;
		}
	}
};
</script>

<style scoped>
.layout-console-body {
	margin-top: 100px;
	box-sizing: border-box;
	padding: 12px 12px 12px 12px;
	width: 100%;
	position: relative;
	overflow: hidden;
	transition: width 0.28s;
}
/* tab-view-fade */
.tab-view-fade-leave-active,
.tab-view-fade-enter-active {
	transition: all 0.28s;
	transition-property:all;
}

.tab-view-fade-enter {
	opacity: 0;
	transform: translateX(-36px);
}

.tab-view-fade-leave-to {
	opacity: 0;
	transform: translateX(36px);
}
</style>
