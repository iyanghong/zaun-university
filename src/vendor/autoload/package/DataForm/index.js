import DataForm from './src/main.vue'

DataForm.install = function(Vue){
	Vue.component(DataForm.name,DataForm)
}

export default DataForm