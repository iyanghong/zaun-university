import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store";
import {scrollToTop} from "@/utils/scroll";
// import permission from '../providers/permission'
import crypt from '../providers/crypt'
import {
    Message
} from 'element-ui' //提示框
import config from '@/config/router.js'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

/**
 * @param {String} title 即时更新标题
 */
function changeTitle(title) {
    if (title) {
        document.title = title;
    } else {
        document.title = process.env.VUE_APP_TITLE;
    }
}

NProgress.configure({showSpinner: false}) // NProgress Configuration

router.changeTitle = changeTitle;
/**
 * 路由权限拦截
 */
router.beforeEach((to, from, next) => {
    NProgress.start()
    //当存在路径形式参数时，截取原始路径
    if (to.meta.lang && to.name) {
        if (typeof router.translationTitle === 'function') {
            changeTitle(router.translationTitle(to.name));
        }
    } else {
        changeTitle(to.meta.title)
    }
    next();

});
router.afterEach((to) => {
    NProgress.done();
    scrollToTop();
    //process.env.NODE_ENV === 'production' &&
})
export default router
