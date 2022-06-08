<template>
	<div><svg-icon :icon="icon" @click="handleFullScreen"/></div>
</template>

<script>
	export default{
		data(){
			return {
				fullScreen : false
			}
		},
		methods:{
			handleFullScreen(){
				this.fullScreen = !this.fullScreen;
				this.fullScreen ? this.setfullScreen() : this.breakFullScreen();
			},
			/* eslint-disable */
			/**进入全屏 */
			setfullScreen() {
				var docElm = document.documentElement;
				//W3C
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
				}
				//FireFox
				else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
				}
				//Chrome等
				else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
				}
				//IE11
				else if (elem.msRequestFullscreen) {
					elem.msRequestFullscreen();
				}
			},
			/**退出全屏 */
			breakFullScreen() {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			},
			/* eslint-ensable */
		},
		computed:{
			icon(){
				return this.fullScreen ? 'narrow' :'fullScreen';
			}
		}
	}
</script>

<style>
</style>
