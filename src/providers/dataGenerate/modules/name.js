export default {
	/**
	 * 随机生成一个姓名
	 * @param {Number} len 姓名的名长度，默认1-2随机
	 */
	handle(len) {
		len = len || parseInt(Math.random() * 2 + 1);
		var prefixArr = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭", "马",
			"罗", "梁", "宋", "郑", "谢", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕", "苏",
			"卢", "蒋", "蔡", "贾", "丁", "魏", "薛", "叶", "阎", "余", "潘", "杜", "戴", "夏", "钟", "汪", "田", "任", "姜", "范", "方", "石",
			"姚", "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔", "白", "崔", "康", "毛", "邱", "秦", "江", "史", "顾", "侯", "邵", "孟", "龙",
			"万", "段", "章", "钱", "汤", "尹", "黎", "易", "常", "武", "乔", "贺", "赖", "龚", "文", "庞", "樊", "兰", "殷", "施", "陶", "洪",
			"翟", "安", "颜", "倪", "严", "牛", "温", "芦", "季", "俞", "章", "鲁", "葛", "伍", "韦", "申", "尤", "毕", "聂", "丛", "焦", "向",
			"柳", "邢", "路", "岳", "齐", "沿", "梅", "莫", "庄", "辛", "管", "祝", "左", "涂", "谷", "祁", "时", "舒", "耿", "牟", "卜", "路",
			"詹", "关", "苗", "凌", "费", "纪", "靳", "盛", "童", "欧", "甄", "项", "曲", "成", "游", "阳", "裴", "席", "卫", "查", "屈", "鲍",
			"位", "覃", "霍", "翁", "隋", "植", "甘", "景", "薄", "单", "包", "司", "柏", "宁", "柯", "阮", "桂", "闵", "欧阳", "解", "强", "柴",
			"华", "车", "冉", "房", "边", "辜", "吉", "饶", "刁", "瞿", "戚", "丘", "古", "米", "池", "滕", "晋", "苑", "邬", "臧", "畅", "宫",
			"来", "嵺", "苟", "全", "褚", "廉", "简", "娄", "盖", "符", "奚", "木", "穆", "党", "燕", "郎", "邸", "冀", "谈", "姬", "屠", "连",
			"郜", "晏", "栾", "郁", "商", "蒙", "计", "喻", "揭", "窦", "迟", "宇", "敖", "糜", "鄢", "冷", "卓", "花", "仇", "艾", "蓝", "都",
			"巩", "稽", "井", "练", "仲", "乐", "虞", "卞", "封", "竺", "冼", "原", "官", "衣", "楚", "佟", "栗", "匡", "宗", "应", "台", "巫",
			"鞠", "僧", "桑", "荆", "谌", "银", "扬", "明", "沙", "薄", "伏", "岑", "习", "胥", "保", "和", "蔺"
		];
		var suffixArr =
			"张吉惟林国瑞玟书雅南江奕云刘柏宏阮建安子帆夏志豪茹定李中冰黄文隆谢彦傅智翔洪振霞姿婷荣康吕致盈方一强黎芸贵郑伊雯雷进宝吴美心真王珠郭芳天惠陈曹敏侑依婉璇玉蔡昌梦家纶丽昆育泉欢韵如肇芬卢木仲成白兆翊丁汉臻佳舒绿珮周芷妤虹伦琼倪怡妃杨佩旺盛玫青许孟涵小爱恩龙朱政廷邓诗倩俊伯馨学翁思翰玲海来武淑金琪赖宜霖仪湖民刚慧颖沈君伶高咏钰儒潘欣祯叶洁启梁哲宇晓萍铭茂以瑜逸采竹水乐蓉韩健毓士杰萱珍苏素达何琳俞幸秋维筠玮信峰培查舜易徐紫富博柯乔喜胡睿纯月百菁娥珊必辰耀华彭郁秀罗静蓁绍韦宁蒋毛展廖伟元映超莉火邱枝大雪升瑶柔治妹简昀秦娇仁和贤晴桦辛坤涂琬凯修赵吟裕忠石春右星冠钟庭茜薇昭祥宋合圣军溥冯轩嘉劭甄威勋亚东姵钧连礼忆孝淳岳平若承姚姜鸿德任骏生蕙意琇碧懿凡靖琴温宗其泰财筑正燕雨世人友群戎台阙贞扬顺唐福荆璋均詹允坚亭余袁杜力于纬汪英永桂谕清俐立麟柳娟崇得梅宛宪益绮全远毅凤明戴予名萧媛卿乃亦菱颜奇侯慈峻香芝山魏龚景皓善莹莲源佑诚敬项崔筱丰季旭弘翠施琦希童曲阳雄尧法冷怀千男钱品添孙容原骆苹沛欧良介诸胜行瑄弓曾花克程旻田巧念陆斌谦勇辉陶井上羽义晋左松祖恭湘马游庾协彬葛汤兰登敖谈光刁邬与妙齐阚皇秉庄发蓝孜冉蒙彰庆新嵇羊牛晏仕又镇章卫郦泓薛语巫房重翟古杭柴宥艾竺呈鞠岚聂巩鲁焦浩尚卞宣阿万寇奚长甫支昱夙竣常贲甘段暴毕幼路闵初巴伍关屈谚朝昝娄顾尹兴伏裴权喻经范利茅曜少岑鄂可瞿熊璩米滕边史穆庞甯解淩扈钮曼婕霍屠阎仇车狄郎之宓耿单严蒯祁铃贝纪栾符湛於戈农贾席贡索禹樊苗褚祝宫荀管别司那";
		var surnameIndex = parseInt(Math.random() * prefixArr.length - 1);
		var name = prefixArr[surnameIndex];
		for (let i = 0; i < len; i++) {
			name += suffixArr[parseInt(Math.random() * suffixArr.length - 1)];
		}
		return name;
	}
}
