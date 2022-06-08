import Vue from 'vue'
/**
facade 格式：
{
	delay : false, //延迟加载
	handle(){		//门面钩子函数
		
	}
}
或：
name : path		//这种方式默认延迟加载

 */
class facade {
	#list = {}
	#suffix = "$"
	//构造函数，用于初始化门面列表
	constructor(facades) {
		if(typeof facades !== 'object') return
		
		let aliasesList = typeof facades.aliases == 'object' ? facades.aliases : facades,
			directlyList = typeof facades.directly == 'object' ? facades.directly : [];
			
		for (let key in aliasesList) {
			if (typeof aliasesList[key] == 'string') {
				this.register(key, aliasesList[key], true);
			} else {
				let suffix = typeof aliasesList[key].suffix == 'undefined' ? this.#suffix : aliasesList[key].suffix
				this.register(aliasesList[key].name || key, aliasesList[key].handle, aliasesList.delay || false, suffix)
			}
		}
		
		directlyList.forEach(item => {
			try{
				
				require("@/"+item)
				
			}catch(e){
				console.log(e);
				console.log(`引入"${item}"失败`);
			}
			
		});
	}
	/**
	 * 注册一个门面
	 * @param {String} name	门面的名称
	 * @param {String|Object} module 门面的指向，如果类型为字符串则会延迟加载
	 * @param {Bool} delay	是否延迟加载
	 */
	register(name, module, delay = false, suffix) {
		return new Promise((resolve, reject) => {
			if (!name || !module) {
				reject({
					error: '注册facade参数错误'
				});
				return new Error('注册facade参数错误')
			}
			this.#list[name] = {
				handle: module,
				delay: delay
			};
			this.__inject(name, module, delay, suffix);
		});
	}
	/**
	 * 获取当前已加载的门面列表
	 */
	getFacadeList() {
		return Object.keys(this.#list);
	}
	/**
	 * 门面注入
	 * @param {String} name	门面的名称
	 * @param {String|Object} module 门面的指向，如果类型为字符串则会延迟加载
	 * @param {Bool} delay	是否延迟加载
	 */
	__inject(name, module, delay = false, suffix) {
		if (!name || !module) return;
		Object.defineProperty(Vue.prototype, suffix + name, {
			get() {
				if (delay === true && typeof module == 'string') {
					try {
						module = require("@/" + module).default
					} catch (e) {
						console.error(`${name}模块文件不存在`);
					}
				}
				return module
			}
		})
	}
	install(Vue) {
		Vue.prototype.$facade = this
	}
}
export default facade
