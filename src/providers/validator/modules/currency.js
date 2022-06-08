export default {
	msg : '${name}不是正确的货币格式',
	handle(value){
		return /^\d+(\.\d+)?$/i.test(value)
	}
}