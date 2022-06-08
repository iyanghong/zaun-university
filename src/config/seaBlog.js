import authorBackgroud from "@/assets/images/bg-info.jpg";

/**
 * Created by yh on 2021/5/18
 */
export default {
    saying: '愿以一朵花的姿态行走世间，看得清世间繁杂却不在心中留下痕迹。花开成景，花落成诗。',
    sayingLangKey: 'seaBlog.saying',
    authorBackground: authorBackgroud,
    author: {
        header: 'https://i-ts.oss-cn-shenzhen.aliyuncs.com/users/10000/data/header.jpg',
        name: '孤鸿渺影',
        nameLangKey: 'seaBlog.author.name',
        info: '樱花已灿，雾尽风暖',
        infoLangKey: 'seaBlog.author.info',
        github: 'https://github.com/iyanghong',
        sina: 'https://weibo.com/5136853061',
        qqQrCode: 'https://i-ts.oss-cn-shenzhen.aliyuncs.com/global/qq-qrcode.png'
    },
    effects:{
        ribbons : true,//丝带特效
        rain:false,//雨滴特效
        sakura:false,//樱花特效
    },
    hotArticleCount: 6,
    showTagCount: 50,
    recommendArticlesCount: 7,
    navigationBar: [
        {
            title: '首页',
            link: '/',
            icon: 'fa fa-home',
            code: 'SeaBlogIndex',
            langKey: 'SeaBlogIndex'
        },
        {
            "title": "分类",
            "icon": "fa fa-folder-open",
            "link": "/articles.html",
            "code": "SeaThemeBlogArticleListNoFilter",
            "langKey": "SeaThemeBlogArticleListNoFilter",
        },
        /*{
            "title": "分类",
            "icon": "fa fa-folder-open",
            "link": "",
            "code": "SeaThemeBlogCategories:list",
            "langKey": "SeaThemeBlogCategories",
        },
        {
            "title": "标签",
            "icon": "fa fa-edit",
            "link": "",
            "code": "SeaThemeBlogLabels:list",
            "langKey": "SeaThemeBlogLabels",
        },*/
        {
            "title": "留言",
            "link": "/leaves",
            "icon": "fa fa-pencil",
            "code": "SeaThemeBlogLeaves",
            "langKey": "SeaThemeBlogLeaves",
        },
        {
            "title": "工具",
            "link": "/tools",
            "icon": "el-icon-s-tools",
            "code": "ToolList",
            "langKey": "SeaThemeBlogTools",
        },
        {
            "title": "关于",
            "icon": "fa fa-user-o",
            "link": "/about",
            "code": "SeaThemeBlogAbout",
            "langKey": "SeaThemeBlogAbout",
        },
    ],
}
