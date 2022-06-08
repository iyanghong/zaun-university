/* eslint-disable */
import VueI18n from 'vue-i18n'

class locale {
	messages = {}
	locale = "zh-CN"
	constructor(locale) {
		if (locale) this.locale = locale;
		this.__initMessages()
	}
	__initMessages() {
		const modulesFiles = require.context('../lang', true, /\.js$/)

		this.messages = modulesFiles.keys().reduce((modules, modulePath) => {
			const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
			const value = modulesFiles(modulePath)
			modules[moduleName] = value.default
			return modules
		}, {})
	}
	install(Vue) {
		Vue.use(VueI18n);
		console.log(this.messages);
		const i18n = new VueI18n({
			locale: this.locale,
			messages: this.messages
		})
		// Vue.prototype.$i18n = i18n
		
	}
}

export default locale
