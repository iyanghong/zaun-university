/**
 * Created by yh on 2021/5/31
 */
// import {storeVisitor} from '@/api/statistic'

export default {
    created() {
        this.spoof();
        this.$store.dispatch('account/checkLogin');
        // this.storeVisitor();
    },
    methods: {
        spoof() {
            if (process.env.NODE_ENV !== 'development') {
                console.log('%c 一个人到底多无聊', 'color:green;font-size:28px');
                console.log('%c 才会把 console 当成玩具', 'color:green;font-size:28px');
                console.log('%c 加油！陌生人，只要相信光的存在，你我皆是奥特曼!', 'font-size:22px');
                // console.log("乾坤未定，你我皆是黑马\n众生皆苦,你也不能认输。\n彼竭我盈，胜负还未敲定。\n胜负难料，进退尚有余地。\n日月颠覆，江海共映光辉。\n东山未起，众生皆为英雄。\n大局在握，总是游戏人生。\n胜负未分，你我皆有可能。\n加油！陌生人，只要相信光的存在，你我皆是奥特曼!");
            }
        },
    }
}
