export default {
	msg: "${name}不是正确的字符串格式",
	handle(value) {
		if (typeof value === 'string' || value instanceof String) {
			return true
		}
		return false
	}
}
