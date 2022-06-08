/**
 * Created by yh on 2021/5/31
 */
import config from '@/config/app.js'
import store from '@/store'
export default {
    created() {
        this.$_resizeHandle();
        window.onresize = () => {
            this.$_resizeHandle();
        };
    },
    methods: {
        $_isMobileHandle() {
            return this.$store.getters.clientWidth < config.mobileWidth
        },
        $_resizeHandle() {
            let w = document.documentElement.clientWidth - 20,
                h = document.documentElement.clientHeight;
            store.dispatch('app/changeClientSize', {
                w: w,
                h: h
            });
            if (!document.hidden) {
                const isMobile = this.$_isMobileHandle();
                store.dispatch('app/updateMobile', isMobile);
                store.dispatch('app/updateDrives', isMobile ? 'mobile' : 'desktop');
            }
        }
    },
}
