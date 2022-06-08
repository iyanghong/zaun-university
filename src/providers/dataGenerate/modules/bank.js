export default {
	/**
	 * 生成一个银行卡号
	 * @param {Number} len 
	 */
	handle(len = 19) {
		var bankCompany = [436742, 436745, 622280, 458123, 521899, 622260, 402674, 622892, 622188, 602969, 622760,
			409666,
			438088, 622752, 427020, 427030, 530990, 622230, 622235, 622210, 622215, 622200, 955880, 622568, 520152, 520382,
			911121, 548844, 512431, 520194, 622318, 622778, 622282, 407405, 517636, 512466, 415599, 421870, 622622, 528948,
			552288, 556610, 622600, 622601, 622602, 622603, 421869, 421871, 628258, 418152, 456418, 622521, 404738, 404739,
			498451, 622517, 622518, 515672, 517650, 525998, 356850, 356851, 356852, 406254, 622655, 622650, 622658, 356839,
			486497, 481699, 543159, 425862, 406252, 356837, 356838, 356840, 622161, 628201, 628202, 622155, 622156, 528020,
			526855, 539867, 528709, 523959, 622637, 622636, 528708, 539868, 518710, 518718, 622588, 622575, 545947, 521302,
			439229, 552534, 622577, 622579, 439227, 479229, 356890, 356889, 356885, 439188, 545948, 545623, 552580, 552581,
			552582, 552583, 552584, 552585, 552586, 552588, 552589, 645621, 545619, 356886, 622578, 622576, 622581, 439228,
			439225, 439226, 628262, 628362, 628362, 628262, 376968, 376966, 622918, 622916, 518212, 622690, 520108, 376969,
			622919, 556617, 622680, 403391, 558916, 514906, 400360, 433669, 433667, 433666, 404173, 404172, 404159, 404158,
			403393, 403392, 622689, 622688, 433668, 404157, 404171, 404174, 628209, 628208, 628206, 451289, 622902, 622901,
			527414, 524070, 486493, 486494, 451290, 523036, 486861, 622922, 552599, 404119, 404121, 519412, 403361, 558730,
			520083, 520082, 519413, 49102, 404120, 404118, 53591, 404117, 622836, 622837, 622848
		];
		var bankId = bankCompany[parseInt(Math.random() * bankCompany.length - 1)].toString();
		for (var j = 0; j < len - 7; j++) {
			bankId += Math.floor(Math.random() * 10);
		}
		var newArr = new Array();
		for (var i = bankId.length - 1; i > -1; i--) { //前15或18位倒序存进数组
			newArr.push(bankId.substr(i, 1));
		}
		var arrOddNumber = new Array(); //奇数位*2的积 <9
		var arrOddNumber2 = new Array(); //奇数位*2的积 >9
		var arrEvenNumber = new Array(); //偶数位数组
		for (let j = 0; j < newArr.length; j++) {
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
		bankId += luhn;
		return bankId;
	}
}
