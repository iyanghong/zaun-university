export default {
	/**
	 * 随机生成个性签名、个人说明
	 */
	handle() {
		var Infoarr = ["某段风景，未必就一辈子都不变，那些以为会一直相伴的，原来早已放了手。", "我知道有一天我们会分开，但是我并不害怕，只是舍不得。", "与你擦肩而过的遗忘，是一生的惊涛骇浪。",
			"铁皮公车是坚硬的，柔软的我们要去哪里呢？", "我的关心不过是你看来卑微的讨好，凭什么无怨无悔为你把青春当掉？", "不要以为你晒黑了，就能掩盖你是白痴的事实。",
			"浮华的化妆舞会，散场以后，一个落寞而黯淡的女子，是烟花一样虚空的美丽。", "我不知道，我已经付出的我所有的微笑。", "不要拿爱情做比较，不要计较谁付出的更多。",
			"微笑，不是因为快乐的太久，是太久的时间里忘记去悲伤。", "如果能感受到简简单单的幸福，便不会再次沉溺。", "我们常常讲缘分，但其实是缘分让我们错过了彼此。",
			"再长的路，一步步也能走完，再短的路，不迈开双脚也无法到达。", "当我想装纯的时候，才发现一切都晚了。", "迩，是否已寻到那没有永恒的永恒。", "经过时间旳推移，涐旳心只剩下回忆。",
			"爱，和爱过，相差不多，只是成为了过去时。", "是你把我推下深渊，却责怪我不爱惜自己。", "什么时候，雨水把眼泪悄悄覆盖，回忆在心里开始残落。", "放下过往的沉痛，方能拥抱未来的精彩。",
			"雨后的城市寂寞又狼狈，路边的座位空着在等谁。", "我们在对的时间遇到对的人，才会拥有属于自己幸福的爱情。", "你可以掐掉鲜花，却无法消灭整个春天。", "宿命中的游离和破碎的激情，精致的美丽，可是易碎且易逝。",
			"我知道我们之间不是不适合，只是彼此放手会比较好过。", "姐要让你知道，姐是天生丽质的，是不加任何防腐剂的。", "睡眠是一门艺术——谁也无法阻挡我追求艺术的脚步！", "知识就像内裤，看不到看很重要。",
			"记忆是一张挂满风铃的卷帘，藏匿不了回味里一丝缱绻的痕迹。", "我不是不懂，只是不想懂而已。", "唐僧骑的是神马，悟空腾的是浮云，八戒爱的是小月月，沙僧装的是犀利哥。",
			"化妆前他说借过，化妆后他说美女，我们是否见过。", "诠释不了的悲伤，怎能用文字形容。", "妈，你说的对", "我就是要等到撞的头破血流才知道错。", "分手后还能做朋友吗，想分手就不要再回头。",
			"结局太悲伤，是因为过程太过伤感。", "分手后，打不打伞心都是湿的。", "幸福是什么，幸福就是每天早晨醒来一看表，竟然还能再睡半个小时。", "亲爱的，请给这段爱一个开始，我会用心去写下属于我们的故事。",
			"我们是不是都输给了时间，败给了一个等字？", "在心中旋转的疯狂，抑制住无尽的悲伤。", "飞蛾在投入火焰的瞬间，哪还顾得上什么天长地久？",
			"止不住的痛，就像自己嘴巴里流着血一样，即使再疼，却只能一个人尝这浓浓的血腥味。", "不用花时间在一个不会花时间在你身上的人。", "夏天，肉隐肉现的季节又来了。", "他说的对我们这个年纪谈恋爱只是玩玩而已。",
			"只想安静的生活，安静到谁都遗忘我。", "女人，长得漂亮是优势，活得漂亮才是本事。", "法官问：你为什么印假钞，罪犯说：“真钞我不会印”。", "我一直坚信，忍痛放手过后我们会很会狠幸福。",
			"快乐时装给别人看的另一种痛楚，狂欢是留给自己痛的另一种寂寞。", "纠结在内心的秘密，曾经是不能说出口的话，让人几乎不敢去触碰，只能惶恐不安地日夜躲避。", "曾经试着用微笑细数你给的伤，无奈最后泪却随微笑流出眼眶。",
			"如果我死了，我的第一句话是：老子终于不用怕鬼了……", "如果忘不了你，就让阳光晒干回忆。", "照镜子时，我一般不敢多看，怕自己会爱上自己。", "爱一个人就像是呆在荆棘丛里，心动则人动，动则痛其筋伤其骨。",
			"渐渐疲惫的羽翼，为你披上了勇气。", "迩唱的那首情歌，我用悲伤和。", "不管我过得多么的好，那段伤人的记忆还是不停的在心中打滚。", "没有不变的承诺，只有说不完的谎言。", "我离开迩之后，不会有人比我更爱迩。",
			"爱上内心萌动时，偏在擦身而过后。", "宁愿坐在上笑，也不愿坐在架子车上哭。", "风好大，好大，吹乱了我的秀发，吹落了你的假发。", "再次回头守望，才发现这一切已经走远，我们都在等待花的凋谢，爱的降临。",
			"我们都有一道别人看不见的伤痕。", "其实幸福很简单，美美的吃一餐，也是一种幸福。", "面对心爱的人，你的心跳会加速，然而面对喜欢的人，你只会兴高采烈。", "你就如同秒针转了几个轮回却依然是与我擦肩而过。",
			"我若爱定，生死契阔。", "一切都是自己一心以为，又有什么理由让别人来做。", "生命本是一场漂泊的漫旅，遇见了谁都是一场美丽的意外。", "念了十几年书，想起来还是幼儿园比较好混。",
			"在痛不过前尘往事，在聚首弹指已陌路。", "是情话太美，还是我们太傻。", "扔硬币：正面就去上网", "反面就去睡觉，立起来就去写作业。", "时间，改变了容貌，改变了性格", "改变了一切，却没改变你会继续爱我。",
			"酒味儿有些淡淡的苦涩，幻彩灯光下的酒杯与自己，透彻的耀眼。", "你不喜欢我，这是病，很严重的病哇，得治，一定要治！", "我一直不懂家长们说的集体和全民是啥意思。",
			"爱上你，只用了一瞬间，忘记你却用了一辈子，甚至还不够。", "你以为放手可以成全我的幸福，可你不知道我最大的幸福就是和你手牵手。", "原来我们小时候真的好性感，连裤衩都不穿。",
			"日子像首不押韵的歌，节奏有些凌乱。",
			"眼泪，是我夜晚唯一一个陪在我身边的朋友。", "青春如同奔流的江河，一点一滴的流淌着。", "我看见你第一眼就想咬你一口，但是我嫌你脏。",
			"个女人都是被种种牵绊舒服在滚滚红尘里，以哀伤的心，慢慢独到年华老去，终此一生。", "我想去丹麦亲眼见识一段，安徒生所谓的爱情。", "倘若我放手，你会不会挽留，怕是自欺欺人。",
			"这个社会什么都可以是假的，但是，我唯一不能容忍的就是：钱的假的。", "我像走入死角绝路，不知道转身后就是海阔天空，偏偏一味执着地去战战兢兢面对黑暗，无止无休。", "心总是在最痛时，复苏；爱总是在最深时，落下帷幕。",
			"当眼泪滑落，我才知道，原来我那么惦念你。", "男人最反感老婆喋喋不休，女人最讨厌老公默默无语。", "回忆千丝万缕，思念缱倦流年，昨日种种，红叶黄花，一恍如烟霞。", "女生应该骄傲的活着，而不是卑微的恋爱。",
			"原来，很多时候，最让人疼痛的，是孤独。", "个有个是脑残，剩下的那个是先天性白痴。", "男人长的帅有个屁用呀？到银行能用脸刷卡吗？", "没有一种生命的轮回是命中注定的，就像，隔夜的狂欢。", "挤公交是包含散打",
			"瑜珈", "柔道", "平衡木等多种体育和健身项目于一体的综合性运动。", "我想要一份简简单单的爱情，我不会要求你太多，只爱我一个，虽然我不是最好的，但却是最爱你的那个。",
			"独自一人走在街上时常会寂寞，寂寞时便会想起往事，想起往事便会泪流而下。", "总有一天我们学会不再忧伤，因为我们已经像蝴蝶一样，完成了既定的相聚。", "我的泪变成雨，也舍不得淋湿你。",
			"不想个网名，对不起俺的会员。",
			"丿每一种喜欢都有一种理由！但每一种伤感却是莫明的。", "我在漫天风雪的回忆里披荆斩棘，你却在哪一个的字典里演绎皈依。", "高傲不止是高跟和红唇，我什么都不缺，只是少个人爱我摆了。",
			"无法诠释自己的心情，或许不应该存在的。", "我现在只吃素不吃荤，天天烧香拜佛，还常常行善积德，为的是什么，不就是期考不挂科么。", "是不是只有努力，我才不会成为代替品。",
			"男人感情就是这样，像水龙头一样说关就关了。", "相遇是为了邂逅，还是为了给彼此都留下回忆？", "尓就一颗心，所以哦必须要占据全部。", "戴上面具，我们继续假装快乐。(www.lz.cn)",
			"看到你的脸，就觉得你爸妈在制造你的时候没认真。", "行单影支，拉斜的身影，显落寂寞。", "怎样的一个冬天，我看见烟火幸福满天。又怎样的一个冬天，冷得让我泪流满面。",
			"我这人不懂音乐，所以时而不靠谱，时而不着调。",
			"不要说别人脑子有病，脑子有病的前提是必须有个脑子。", "她的忧伤，只为一些在颓废中荒废的年华。", "天若有情天亦老，女人多情死的早。", "所有的失敗，與失去自己的失敗比起來，更是微不足道。",
			"夏天就是不好，穷的时候我连西北风都没有喝。", "擦干眼泪，抬起头，莪依然拥有最坚强的笑容。", "感情是没有公式，没有原则没有道理可循的，可是人们至死都还在执著与追求。", "喝白开水的人，不一定很纯。"
		];
		var index = parseInt(Math.random() * Infoarr.length - 1);
		return Infoarr[index];
	}
}