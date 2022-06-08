import store from '@/store'
import config from '@/config/consoleLayout'

export default {
    computed: {
        user() {
            return store.state.account.user
        },
    },
    created() {
        let leftMenuData = store.state.consoleLayout.leftMenuData;
        if (leftMenuData.length === 0) {

            // leftMenuData = data;
            leftMenuData = [];
            for (let item of config.leftMenu) {
                if (!item.auth || item.auth.indexOf(this.user.role) > -1) {
                    leftMenuData.push(item)
                }
            }
            if (this.user.role === 0) {
                leftMenuData.push({
                    title: '我的班级',
                    view: '/console/class/' + this.user.cid,
                    icon: 'el-icon-s-flag',
                },)
            }
            if (!leftMenuData.some(v => v.title === '登出系统')) {
                leftMenuData.push({
                    title: '登出系统',
                    code: 'Logout',
                    icon: 'fa fa-arrow-circle-left',
                    callback: function () {
                        store.dispatch('account/logout');
                    }
                });
            }
            store.dispatch('consoleLayout/setLetfMenuData', leftMenuData);
        }
    }
}
