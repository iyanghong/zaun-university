import {scrollToTop} from "@/utils/scroll";

export default {
    handle(url = '/', scrollTop = false) {
        return new Promise((resolve, reject) => {
            try {
                let path = this.$route.path;
                if (typeof url == 'string') {
                    if (url === path) {
                        this.$router.replace({path: '/redirect' + url})
                    } else {
                        this.$router.push({
                            path: url
                        });
                    }
                } else {
                    let router = url,
                        name = this.$route.name;
                    if (router.name === name || router.path === path) {
                        this.$router.replace({
                            name: 'redirect',
                            params: {
                                path: 'router',
                                router
                            }
                        })
                    } else {
                        this.$router.push(router);
                    }
                }
                this.$nextTick(() => {
                    if (scrollTop) {
                        scrollToTop();
                    }
                    resolve();
                });

            } catch (e) {
                console.log(e);
                reject(e);
            }
        });


    }
}
