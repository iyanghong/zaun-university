export default {
	msg : "${name}不是正确的身份证格式",
	handle(value) {
		var regCarId = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
			/** 加权因子 */
			factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
			/** 校检码 */
			parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2],
			code = value.substring(17);
		if (regCarId.test(value)) {
			var sum = 0;
			/** 对前17位数与加权值乘积求和 */
			for (var i = 0; i < 17; i++) {
				sum += value[i] * factor[i];
			}
			/** 前17位数与加权值乘积求和求模11的结果应等于第18个字符 */
			if (parity[sum % 11] != code.toUpperCase()) {
				return false;
			}
		} else {
			return false;
		}
		var dateStr = value.substring(6, 14);
		var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
		if (pattern.test(dateStr)) {
			var year = dateStr.substring(0, 4);
			var month = dateStr.substring(4, 6);
			var day = dateStr.substring(6, 8);
			var date = new Date(year + "-" + month + "-" + day);
			if (date && date.getMonth() != (parseInt(month) - 1)) {
				return false;
			}
		} else {
			return false;
		}

		var province = value.substring(0, 2);
		var provinceArr = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江 ",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北 ",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏 ",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门"
		};
		if ((/^[1-9][0-9]/).test(province)) {
			if (!provinceArr[province]) {
				return false;
			}
		}
		return true
	}
}
