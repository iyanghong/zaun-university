export default {
	/**
	 * 随机生成字符串
	 * @param {Number} min 字符串最小长度，默认32位 
	 * @param {Number} max 字符串最大长度，默认等于最小长度 
	 */
	handle(min = 32, max= 32) {
		min = min || 32;
		max = max || min;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var result = '';
		let range = min;
		if (min !== max) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (let i = 0; i < range; i++) {
			result += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return result;
	}
}
