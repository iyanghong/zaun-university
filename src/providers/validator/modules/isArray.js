export default {
	msg: "${name}不是正确的Array格式",
	handle(arg) {
		if (typeof Array.isArray === 'undefined') {
			return Object.prototype.toString.call(arg) === '[object Array]'
		}
		return Array.isArray(arg) 
	}
}
