export default [{
	name: 'min',
	msg: '${name}长度不能少于${length}个字符',
	handle(value, rule) {
		rule = rule.split(':');
		if (!rule[1]) return true;
		rule[1] = parseInt(rule[1]);
		if (value.toString().length >= rule[1]) {
			return true;
		}
		this.msg = '${name}长度不能少于' + rule[1] + '个字符'
		return false;
	}
}, {
	name: 'max',
	msg: '${name}长度不能大于${length}个字符',
	handle(value, rule) {
		if (!rule[1]) return true;
		rule[1] = parseInt(rule[1]);
		if (typeof rule[1] !== 'number') return true;
		if (value.toString().length <= rule[1]) {
			return true;
		}
		this.msg = '${name}长度不能大于' + rule[1] + '个字符'
		return false;
	}
}]
