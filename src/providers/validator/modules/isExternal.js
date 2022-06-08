export default {
	msg : '${name}不是正确的External格式',
	handle(path) {
		return /^(https?:|mailto:|tel:)/.test(path)
	}
}
