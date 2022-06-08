import config from '@/config/app.js'
import cache from "@/providers/cache";
import crypt from '@/providers/crypt'
const state = {
    clientWidth: 0,
    clientHeight: 0,
    network: true,
    isMobile: false,
    drives: '',
    lang: cache.get('lang') || config.lang,
    isFirstEnterPage: 1,
    isNightTheme: cache.get('night-theme') === 'true'
};

const mutations = {
    CHANGE_CLIENT_SIZE(state, data) {
        state.clientWidth = data.w;
        state.clientHeight = data.h;
    },
    CHANGE_NETWORK(state, network) {
        state.network = network;
    },
    SET_IS_MOBILE(state, isMobile) {
        state.isMobile = isMobile;
    },
    SET_DRIVES(state, drives) {
        state.drives = drives;
    },
    SET_LANG(state, lang) {
        state.lang = lang
    },
    SET_FIRST_ENTER_PAGE(state, isFirstEnterPage) {
        state.isFirstEnterPage = isFirstEnterPage
    },
    SET_NIGHT_THEME(state, isNightTheme) {
        state.isNightTheme = isNightTheme;
    }
};

const actions = {
    /**
     * 更新页面宽高
     */
    changeClientSize({
        commit
    }, data) {
        commit('CHANGE_CLIENT_SIZE', data);
    },
    /**
     * 切换网络状态
     */
    changeNetWork({
        commit
    }, network) {
        commit('CHANGE_NETWORK', network);
    },
    updateMobile({
        commit
    }, isMobile) {
        commit('SET_IS_MOBILE', isMobile);
    },
    changeNightTheme({
        commit
    }, flag) {
        commit('SET_NIGHT_THEME', flag);
        document.querySelector('html').setAttribute('night', flag);
        cache.set('night-theme', flag.toString());
    },
    updateDrives({
        commit
    }, drives) {
        commit('SET_DRIVES', drives);
    },
    /**
     * 切换语言
     * @param commit
     * @param lang
     */
    changeLang({
        commit
    }, lang) {
        cache.set('lang', lang);
        commit('SET_LANG', lang)
    },
};


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
