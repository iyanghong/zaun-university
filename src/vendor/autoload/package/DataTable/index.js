import DataTable from './src/main.vue'

DataTable.install = function(Vue){
	Vue.component(DataTable.name,DataTable);
}
export default DataTable