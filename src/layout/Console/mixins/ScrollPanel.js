export default {
	data() {
		return {
			left: 0
		}
	},
	computed: {
		scrollWrapper() {
			return this.$refs.scrollContainer.$refs.wrap
		}
	},
	methods: {
		handleScroll(e) {
			const eventDelta = e.wheelDelta || -e.deltaY * 40
			const $scrollWrapper = this.scrollWrapper
			$scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
		},
	}
}
