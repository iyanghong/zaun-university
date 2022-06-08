import Vue from 'vue'
//全局EventBus
const eventBus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
	get() {
		return eventBus;
	}
});

export default eventBus