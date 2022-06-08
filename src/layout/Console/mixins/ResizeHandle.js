export default {
	computed: {
		consoleBodyWidth() {
			return parseInt(this.width) - this.sidebarWidth + 'px';
		},
		width() {
			return this.$store.getters.clientWidth + 'px';
		},
		height() {
			return this.$store.getters.clientHeight + 'px';
		},
		sidebarWidth() {
			return this.$store.state.consoleLayout.sidebarCover ? 200 : 40
		},
		sidebarCover(){
			return this.$store.state.consoleLayout.sidebarCover;
		},
		isMobile() {
			return this.$store.state.app.isMobile;
		},
		consoleBodyWitdh(){
			return this.$store.state.app.isMobile ? this.$store.getters.clientWidth : this.$store.getters.clientWidth - this.sidebarWidth;
		},
	},
}
