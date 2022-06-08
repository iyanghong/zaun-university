export default {
	msg : '${name}不是正确的电子邮箱格式',
	handle(value){
		/* eslint-disable */
		if (!(/^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$/i).test(value)) {
			return false;
		}
		return true
		/* eslint-enable */
	}
}