<template>
    <div class="international">
        <el-dropdown>
            <div class="el-dropdown-link">
                <svg-icon v-if="lang==='zh-CN'" icon="lang-cn"></svg-icon>
                <svg-icon v-else-if="lang==='en'" icon="lang-en"></svg-icon>
                <svg-icon v-else icon="international"></svg-icon>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="lang === 'zh-CN'">
                    <span class="lang-item" @click="handleChange('zh-CN')">简体中文</span>
                </el-dropdown-item>
                <el-dropdown-item disabled>
                    <span class="lang-item">繁体中文</span>
                </el-dropdown-item>
                <el-dropdown-item :disabled="lang === 'en'">
                    <span class="lang-item" @click="handleChange('en')">English</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "international",
        data() {
            return {}
        },
        methods: {
            handleChange(lang) {
                this.$i18n.locale = lang;
                this.$store.dispatch('app/changeLang', lang);
                if (this.$config.app.internationalization && this.$route.meta.lang && this.$route.name) {
                    document.title = this.$t(`router.${this.$route.name}`);
                }

            }
        },
        computed: {
            lang() {
                return this.$store.state.app.lang
            }
        }
    }
</script>

<style lang="scss" scoped>
    .international {
        .lang-item {
            display: block;
            width: 100%;
            height: 100%;
        }

        .svg-icon {
            font-size: 1.5em;
        }
    }
</style>