import Vue from 'vue';
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'

import store from "@/store";

Vue.use(VueI18n);

//加载自定义国际化语言包
const modulesFiles = require.context('./lang', true, /\.js$/)
const messages = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {});


//加载element-ui国际化语言包
const elementUIModulesFiles = require.context('element-ui/lib/locale/lang', true, /\.js$/)
const elementUIMessages = elementUIModulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = elementUIModulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {});


//合并国际化语言包
for (let key in elementUIMessages) {
    if (messages[key]) {
        Object.assign(messages[key], elementUIMessages[key])
    } else {
        messages[key] = elementUIMessages[key]
    }
}
//匹配不到项是否控制台打印waring警告
const silentTranslationWarn = process.env.NODE_ENV !== 'development';
const i18n = new VueI18n({
    locale: store.state.app.lang,
    messages: messages,
    silentTranslationWarn : silentTranslationWarn
});
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
