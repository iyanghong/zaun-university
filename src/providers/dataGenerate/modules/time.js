export default{
	/**
	 * 模拟年龄时间戳
	 * @param {Number} min	最低
	 * @param {Number} max	最高
	 */
	handle(min = 0, max = 0) {
		
		let date = new Date().getTime();
		min = 60 * 60 * 24 * 365 * min * 1000;
		if (!max) max = 60;
		max = 60 * 60 * 24 * 365 * max * 1000;
		let betweenYear = Math.floor(Math.random() * max + min);
		return date - betweenYear;
	}
}