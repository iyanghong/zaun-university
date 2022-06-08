import main from './src/main.js'

const modulesFiles = require.context('@/facade', true, /\.js$/);
var aliasesList = {};
var directlyList = [];

const assignAliasesList = function(facade, moduleName) {
	if (typeof facade.handle == 'function') {
		aliasesList[moduleName] = facade
	} else {
		Object.assign(aliasesList, facade)
	}
}

modulesFiles.keys().forEach(modulePath => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const facade = modulesFiles(modulePath).default
	if (facade instanceof Array) {
		directlyList = directlyList.concat(facade)
	} else if (Object.prototype.toString.call(facade) === '[object Object]' && facade.aliases == undefined) {
		assignAliasesList(facade, moduleName);
	} else {
		if (facade.directly && facade.directly instanceof Array) {
			directlyList = directlyList.concat(facade.directly)
		}
		if (facade.aliases && Object.prototype.toString.call(facade.aliases) === '[object Object]') {
			assignAliasesList(facade.aliases, moduleName);
		}
	}

});

const facader = new main({
	aliases: aliasesList,
	directly: directlyList
})

export default facader
