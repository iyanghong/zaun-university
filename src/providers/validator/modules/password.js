export default{
	msg : '${name}不符合，应该以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
	handle(value){
		return /^[a-zA-Z]\w{5,17}$/.test(value)
	}
}