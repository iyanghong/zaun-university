class VerifyCode {
	#option = {
		id: '',
		type: 'blend',
		canvasId: '',
		width: '0',
		height: '0'
	}
	#code = ''
	constructor(option) {
		if (typeof option == 'object' && Object.prototype.toString.call(option).toLowerCase() == "[object object]") {
			if (option.id == null || option.id == undefined || option == '') {
				return;
			}
			for (var key in option) {
				this.#option[key] = option[key];
			}
		} else {
			this.#option.id = option;
		}
		
		if(this.init()){
			this.refresh();
		}	
	}
	init() {
		var fatherElem = null
		if (typeof this.#option.id == 'object') {
			fatherElem = this.#option.id;
		} else {
			fatherElem = document.querySelector(this.#option.id);
		}

		if (fatherElem == null) {
			console.log('无该元素');
			return false;
		}
		if (this.#option.canvasId == '' || !this.#option.canvasId) {
			this.#option.canvasId = "ts_Verify_Code_" + new Date().getTime();
		}
		var canvas = document.createElement('canvas');
		canvas.id = this.#option.canvasId;
		canvas.width = this.#option.width > 0 ? this.#option.width : fatherElem.offsetWidth;
		canvas.height = this.#option.height > 0 ? this.#option.height : fatherElem.offsetHeight;
		canvas.style.cursor = 'pointer';

		try {
			fatherElem.innerHTML = '';
			fatherElem.appendChild(canvas);
			var _this = this;
			canvas.addEventListener('tap', () => {
				_this.refresh();
			});
			canvas.onclick = function() {
				_this.refresh();
			}
		} catch (e) {
			console.log(e);
		}
		return true;
	}
	randomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	/**随机颜色 */
	randomColor(min, max) {
		var r = this.randomNum(min, max),
			g = this.randomNum(min, max),
			b = this.randomNum(min, max);
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	}
	/**随机获取验证码单个字 */
	getCodeStr() {
		var codeStr = '',
			blendArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			],
			string = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
				'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
				'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];
		switch (this.#option.type) {
			case 'blend':
				codeStr = blendArr[this.randomNum(0, blendArr.length)];
				break;
			case 'number':
				codeStr = this.randomNum(0, 10);
				break;
			case 'string':
				codeStr = string[this.randomNum(0, string.length)];
				break;
			case 'chinese':
				codeStr = String.fromCharCode(20000 + parseInt(Math.random() * 1000));
				break;
			default:
				codeStr = blendArr[this.randomNum(0, blendArr.length)];
				break;
		}
		return codeStr;
	}
	/* 刷新验证码 */
	refresh() {
		return new Promise((resolve) => {
			var canvas = document.getElementById(this.#option.canvasId);
			if (canvas == null) return;
			try {
				var width = canvas.width,
					height = canvas.height;
				//获取该canvas的2D绘图环境 
				var ctx = canvas.getContext('2d');
				ctx.textBaseline = 'bottom';
				/**绘制背景色**/
				ctx.fillStyle = this.randomColor(180, 240);
				//颜色若太深可能导致看不清
				ctx.fillRect(0, 0, width, height);
				//生成四个验证码
				var code = '';
				for (var i = 1; i <= 4; i++) {
					var txt = this.getCodeStr();
					code = code + txt;
					//随机生成字体颜色
					ctx.fillStyle = this.randomColor(50, 160);
					//随机生成字体大小
					ctx.font = this.randomNum(parseInt(width / 6), parseInt(width / 4)) + 'px SimHei';


					var x = 5 + i * parseInt(width / 6);
					var y = this.randomNum(30, 35);
					var deg = this.randomNum(-10, 10);
					//修改坐标原点和旋转角度
					ctx.translate(x, y);
					ctx.rotate(deg * Math.PI / 180);
					ctx.fillText(txt, 0, 0);
					//恢复坐标原点和旋转角度
					ctx.rotate(-deg * Math.PI / 180);
					ctx.translate(-x, -y);
				}
				/**绘制干扰线**/
				for (let i = 0; i < 3; i++) {
					ctx.strokeStyle = this.randomColor(40, 180);
					ctx.beginPath();
					ctx.moveTo(this.randomNum(0, width / 2), this.randomNum(0, height / 2));
					ctx.lineTo(this.randomNum(0, width / 2), this.randomNum(0, height));
					ctx.stroke();
				}
				/**绘制干扰点**/
				for (let i = 0; i < 50; i++) {
					ctx.fillStyle = this.randomColor(255);
					ctx.beginPath();
					ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 1 * Math.PI);
					ctx.fill();
				}
			} catch (e) {
				console.log(e);
			}
			this.#code = code.toLowerCase();
			resolve(this.#code)
		});
	}

	/**
	 *  获取验证码 
	 * */
	getCode() {
		return this.#code;
	}
	/** 验证验证码 */
	check(value) {
		return this.#code == value.toLowerCase() ? true : false;
	}
}

export default VerifyCode;
