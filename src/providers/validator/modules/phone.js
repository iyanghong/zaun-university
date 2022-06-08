export default {
	msg : "${name}不是正确的手机号码格式",
	handle(value){
		/** 11位数手机号码 */
		var regPhone = /^0?(13\d|14[5,7]|15[0-3,5-9]|17[0,6-8]|18\d)\d{8}$/,
			/** 座机号码 */
			landLineReg = /^0\d{2,3}-?\d{7,8}$/;
		if (!regPhone.test(value)) {
			if (!landLineReg.test(value)) {
				return false;
			}
		}
		return true
	}
}