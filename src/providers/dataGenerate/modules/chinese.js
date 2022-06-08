export default {
	/**
	 * 随机生成中文
	 * @param {String} len 生成中文字数，默认为1个中文
	 */
	handle(len) {
		var chineseLen = len || 1;
		var i = 0;
		var result = "";
		var _base = 20000;
		var _range = 1000;
		while (i < chineseLen) {
			i++;
			var _lower = parseInt(Math.random() * _range);
			result += String.fromCharCode(_base + _lower);
		}
		return result;
	}
}
