import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/styles/variables.scss"
import '@/styles/ts-icon.css'
import '@/styles/ts-service-icon.scss'
import '@/icons'

//引入国际化语言包
import i18n from './locale/index.js'

/*//导入字体图标库
import "font-awesome/css/font-awesome.min.css"*/

//导入全局css样式
import './assets/css/main.css'

Vue.prototype.$bus = new Vue();



//导入错误代码
/*import errorCode from "@/providers/errorCode";
Vue.prototype.$errorCode = errorCode;*/

//自动加载驱动
import autoload from './vendor/autoload'

Vue.use(autoload)


//导入ElementUI框架
import ElementUI from 'element-ui'

if (process.env.NODE_ENV !== 'production') {
    require('element-ui/lib/theme-chalk/index.css');
}
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});


import * as filters from './filters' //全局过滤器
// import './plugins/element.js'
// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

//全局EventBus
const eventBus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return eventBus;
    }
});

//注册全局弹出层
import PopupLayer from "@/components/PopupLayer"

Vue.use(PopupLayer);

//加载全局混入
import globalMixins from '@/mixins/global';

Vue.mixin(globalMixins);

router.translationTitle = function (name) {
    return i18n.t(`router.${name}`)
}


Vue.config.productionTip = false
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
