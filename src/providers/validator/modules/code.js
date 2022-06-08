export default {
	msg : '${name}只能字母开头，字母数字下划线组成的3-20个字符',
	handle(value){
		return /^[a-zA-Z][a-zA-Z0-9_]{2,20}$/.test(value)
	}
}