// import facade from './service/facades.js'
import facade from './facades'
// import directive from './service/directive.js'
import config from './service/config.js'
import { reduceArray } from '@/utils/reduce.js'


import autoComponents from './autoload-components.js'

// console.log(autoComponents)
const components = reduceArray(autoComponents)


const install = function(Vue, opts = {}) {
	components.forEach(component => {
		Vue.component(component.name, component);
	});
	Vue.prototype.$config = config

	const disableFacade = opts.facade || config.app.facade || false;
	// const disableAutoLoadDirective = opts.autoLoadDirective || config.app.autoLoadDirective || false;

	if (disableFacade) {
		Vue.use(facade)
	}

	/*if (disableAutoLoadDirective === true) {
		const directiver = new directive()
		Vue.use(directiver)
	}*/
}


export default {
	install
}
