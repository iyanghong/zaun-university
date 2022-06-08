export default {
	msg : '${name}不是正确的英文格式',
	handle(value){
		return (/^[A-Za-z]+$/i).test(value)
	}
}