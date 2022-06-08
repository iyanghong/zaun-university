import layout from './layout.vue'
layout.install = function(Vue){
	Vue.component(layout.name,layout);
}
export default layout