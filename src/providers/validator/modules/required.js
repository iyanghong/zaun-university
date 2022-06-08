export default {
	name: "required",
	msg: "${name}不能为空",
	handle(value, rule, type) {
		if (value === "" || value === null || value === undefined) {

			if (type) {
				let selectArray = ["date", "radio", "select", "date:timestamp"];
				let inputArray = ["input", "password", "textarea"];
				if (inputArray.indexOf(type) > -1) {
					this.msg = "请输入${name}";
				} else if (selectArray.indexOf(type) > -1) {
					this.msg = "请选择${name}";
				} else if (type.indexOf('upload') > -1) {
					this.msg = "请上传${name}";
				}
			}
			return false
		}
		return true
	}
}
