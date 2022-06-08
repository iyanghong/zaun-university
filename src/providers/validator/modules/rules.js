export default [
	{
		name : "ip",
		msg : "${name}不是正确的IP格式",
		handle(value){
			return /\d+\.\d+\.\d+\.\d+/.test(value);
		}
	},
	{
		name : "qq",
		msg : "${name}不是正确的qq格式",
		handle(value){
			return /[1-9][0-9]{4,}/.test(value);
		}
	},
	{
		name : "chinese",
		msg : "${name}必须为中文",
		handle(value){
			return /^[\u4e00-\u9fa5]{0,}$/.test(value);
		}
	},
	{
		name : "date",
		msg : "${name}是不可识别的日期格式",
		handle(value){
			return /^\d{4}-\d{1,2}-\d{1,2}/.test(value)
		}
	},
	{
		name : 'xml',
		msg : "${name}不是xml文件",
		handle(value){
			return /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/.test(value)
		}
	},
	{
		name : "number",
		msg : "${name}必须为纯数字",
		handle(value){
			return /^[0-9]*$/.test(value)
		}
	},
	{
		name : 'float',
		msg : "${name}必须为浮点数",
		handle(value){
			return /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/.test(value)
		}
	}
]