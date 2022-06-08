import ToolTip from './src/main.vue'

ToolTip.install = function(Vue){
	Vue.component(ToolTip.name, ToolTip);
}

export default ToolTip;