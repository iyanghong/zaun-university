export default [{
	name: 'number',
	/**
	 * 随机生成数字
	 * @param {Number} max 最大值
	 * @param {Number} base 最小值
	 */
	handle(max, base) {
		return Math.floor(Math.random() * max + (base ? base : 0));
	}
}]
