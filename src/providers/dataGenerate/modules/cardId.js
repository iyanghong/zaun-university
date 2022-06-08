export default {
	/**
	 * 随机生成一个身份证
	 */
	handle() {
		function getRandomNumber(max, base) {
			return Math.floor(Math.random() * max + (base ? base : 0));
		}
		var cardId = '';
		var provinceArr = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51,
			52,
			53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91
		];
		cardId += provinceArr[parseInt(Math.random() * provinceArr.length - 1)]; //省份
		cardId += Math.floor(Math.random() * (10000 - 1000) + 1000);
		cardId += getRandomNumber(2, 1); //年份第一位仅支持1和2
		cardId += cardId[6] == '1' ? 9 : 0; //两位年份规则，仅支持19和20
		cardId += cardId[6] == '1' ? getRandomNumber(7, 3) : getRandomNumber(2); //三位年份规则，仅支持193-199、200、201这些值
		cardId += getRandomNumber(10); //四位年份规则,0-9
		cardId += getRandomNumber(2); //首位月份规则
		cardId += cardId[10] == '0' ? getRandomNumber(9, 1) : getRandomNumber(3); //末位月份规则
		if (cardId.substr(8, 2) % 4 != 0) { //首位日期规则，闰年没有30几号
			cardId += getRandomNumber(4, 0);
		} else {
			cardId += getRandomNumber(3, 0);
		}
		if (cardId[12] == 0) { //末位日期规则
			cardId += getRandomNumber(9, 1);
		} else if (cardId[12] > 0 && cardId[12] < 3) {
			if (cardId.substr(8, 2) % 4 != 0 && cardId.substr(10, 2) == '02') { // 判断闰年2月没有29号
				cardId += getRandomNumber(9, 1);
			} else {
				cardId += getRandomNumber(10);
			}
		} else {

			cardId += getRandomNumber(2);
		}
		cardId += Math.floor(Math.random() * (1000 - 100) + 100);
		var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
		var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
		var sum = 0;
		for (var j = 0; j < 17; j++) {
			// 对前17位数字与权值乘积求和
			sum += parseInt(cardId[j], 10) * arrExp[j];
		}
		cardId += arrValid[sum % 11].toString();
		return cardId;
	}
}
