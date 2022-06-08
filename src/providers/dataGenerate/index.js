

const modulesFiles = require.context('./modules', true, /\.js$/)


const generate = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath).default
	if (value && typeof value.handle == 'function') {
		modules[moduleName] = value.handle
	}
	return modules
}, {})

generate.getGenerateList = function(){
	let list = Object.keys(generate);
	list.splice(list.indexOf('getGenerateList'),1);
	return list
}

export default generate

