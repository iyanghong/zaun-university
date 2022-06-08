export default {
	/**
	 * 随机生成一个邮箱
	 * @param {bool} lowerCase 是否小写
	 */
	handle(lowerCase) {
		function getString(min,max) {
			min = min || 8;
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
		lowerCase = lowerCase || false;
		var emailSuffixArr = ["@qq.com", "@gmail.com", "@163.com", "@yahoo.com", "@msn.com", "@hotmail.com", "@aol.com",
			"@ask.com", "@live.com", "@0355.net", "@163.net", "@263.net", "@3721.net", "@139.com", "@189.com", "@126.com"
		];
		var emailSuffix = emailSuffixArr[parseInt(Math.random() * emailSuffixArr.length - 1)];
		var emailPrefix = getString(3,10);
		emailPrefix = lowerCase ? emailPrefix.toLowerCase() : emailPrefix;
		var email = emailPrefix + emailSuffix;
		return email;
	}
}
