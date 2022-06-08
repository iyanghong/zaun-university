import routerHop from "@/mixins/routerHop";

/**
 * 全局混入
 * Created by yh on 2021/5/31
 */
export default {
    mixins: [routerHop],
    computed: {
        $_isMobile() {
            return this.$store.state.app.isMobile
        },
        $_width() {
            return this.$store.state.app.clientWidth
        },
        $_height() {
            return this.$store.state.app.clientHeight
        },
        $_isLogin() {
            return this.$store.state.account.isLogin
        },
        $_lang() {
            return this.$store.state.app.lang;
        },
        $_isNightTheme() {
            return this.$store.state.app.isNightTheme;
        },
        $_user(){
            return this.$store.state.account.user
        }
    },
    methods: {
        $_close(redirect) {
            this.$store.dispatch('consoleLayout/delView', this.$route);
            if (redirect) this.$toMap(redirect);
        },
        $_goLogin(query) {
            let params = query ? query : {};
            params.history = this.$route.path;
            this.$toMap({
                name: 'signIn',
                query: params
            });
        }
    }
}
