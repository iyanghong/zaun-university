<template>
    <console-layout></console-layout>
</template>

<script>
    import ConsoleLayout from '@/layout/Console'

    export default {
        name: 'Console',
        data() {
            return {}
        },
        watch: {
            // $_isLogin(){
            // 	this.checkLogin();
            // }
        },
        components: {
            ConsoleLayout
        },
        created() {
            this.checkLogin();
        },
        methods: {
            checkLogin() {
                this.$store.dispatch('account/checkLogin').then(() => {
                    if (!this.$_isLogin) {
                        this.$confirm('您未登录，请登录!', '系统信息', {
                            confirmButtonText: this.$tl('confirm', '确认'),
                            type: 'warning'
                        }).then(() => {
                            this.$toMap('/login');
                        }).catch(() => {
                            this.$toMap('/login');
                        });
                    }
                });

            }
        }
    }
</script>

<style scoped lang="scss">

</style>
