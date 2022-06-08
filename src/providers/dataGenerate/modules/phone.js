export default {
	/**
	 * 随机生成一个手机号码
	 */
	handle(suffix) {
		var numPrefixArr = new Array("139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152",
			"188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153",
			"189", "180", "181", "177");
		var phone = '';
		if(suffix){
			phone = suffix
		}else{
			phone += numPrefixArr[parseInt(Math.random() * numPrefixArr.length - 1)];
		}
		for (var i = 0; i < 8; i++) {
			phone += parseInt(Math.random() * 9 + 1);
		}
		return phone;
	}
}
