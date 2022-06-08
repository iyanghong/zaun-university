import Upload from './src/Upload.vue';
Upload.install = (Vue) => {
	Vue.Upload(Upload.name, Upload)
}
// 导出组件
export default Upload
