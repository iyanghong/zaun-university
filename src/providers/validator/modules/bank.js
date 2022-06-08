export default {
	msg : "${name}不是正确的银行卡号",
	handle(value) {
		var lastNum = value.substr(value.length - 1, 1); //取出最后一位（与luhn进行比较）
		var first15Num = value.substr(0, value.length - 1); //前15或18位
		var newArr = new Array();
		for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
			newArr.push(first15Num.substr(i, 1));
		}
		var arrOddNumber = new Array(); //奇数位*2的积 <9
		var arrOddNumber2 = new Array(); //奇数位*2的积 >9
		var arrEvenNumber = new Array(); //偶数位数组
		for (var j = 0; j < newArr.length; j++) {
			if ((j + 1) % 2 == 1) { //奇数位
				if (parseInt(newArr[j]) * 2 < 9) arrOddNumber.push(parseInt(newArr[j]) * 2);
				else arrOddNumber2.push(parseInt(newArr[j]) * 2);
			} else //偶数位
				arrEvenNumber.push(newArr[j]);
		}

		var OddNumber_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
		var OddNumber_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
		for (var h = 0; h < arrOddNumber2.length; h++) {
			OddNumber_child1.push(parseInt(arrOddNumber2[h]) % 10);
			OddNumber_child2.push(parseInt(arrOddNumber2[h]) / 10);
		}

		var sumOddNumber = 0; //奇数位*2 < 9 的数组之和
		var sumEvenNumber = 0; //偶数位数组之和
		var sumOddNumberChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumOddNumberChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal = 0;
		for (var m = 0; m < arrOddNumber.length; m++) {
			sumOddNumber = sumOddNumber + parseInt(arrOddNumber[m]);
		}

		for (var n = 0; n < arrEvenNumber.length; n++) {
			sumEvenNumber = sumEvenNumber + parseInt(arrEvenNumber[n]);
		}

		for (var p = 0; p < OddNumber_child1.length; p++) {
			sumOddNumberChild1 = sumOddNumberChild1 + parseInt(OddNumber_child1[p]);
			sumOddNumberChild2 = sumOddNumberChild2 + parseInt(OddNumber_child2[p]);
		}
		//计算总和
		sumTotal = parseInt(sumOddNumber) + parseInt(sumEvenNumber) + parseInt(sumOddNumberChild1) + parseInt(
			sumOddNumberChild2);

		//计算luhn值
		var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
		var luhn = 10 - k;

		if (lastNum != luhn) {
			return false;
		}
		return true
	}
}
