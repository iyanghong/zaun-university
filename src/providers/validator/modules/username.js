export default{
	msg : '${name}不符合，应为字母开头，允许5-16字节，允许字母数字下划线',
	handle(value){
		return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)
	}
}