<template>
    <div>
        <el-submenu :index="resolvePath(data)" v-if="data.child && data.child.length > 0">
            <template slot="title">
                <i v-if="data.icon" :class="data.icon"></i>
                <span slot="title" v-text="getTitle()"></span>
            </template>
            <sidebar-item v-for="(item, index) in data.child" :key="index" :data="item"
                          :baseIndex="getItemIndex(index)"/>
        </el-submenu>
        <el-menu-item :index="resolvePath(data)" v-else @click="doAction(data)">
            <i v-if="data.icon" :class="data.icon"></i>
            <span slot="title" v-text="getTitle()"></span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            data: {
                type: Object,
                required: true
            },
            baseIndex: {
                type: String
            }
        },
        data() {
            return {};
        },
        methods: {
            resolvePath() {
                let index = this.data.view || this.baseIndex;
                return index.toString();
            },
            getItemIndex(index) {
                if (this.baseIndex) {
                    return this.baseIndex + '-' + index;
                }
                return index.toString();
            },
            doAction(item) {
                //如果是在手机端则关闭遮罩层并收缩菜单栏
                if (this.$store.state.app.isMobile) {
                    this.$store.dispatch('consoleLayout/changeSidebarCover', false);
                }
                if (item.view) {
                    if (item.view === this.$route.path) {
                        this.$router.replace({path: '/redirect' + item.view});
                    } else {
                        this.$router.push(item.view);
                    }
                    return;
                }
                if (typeof item.callback == 'function') {
                    item.callback(this);
                }
            },
            getTitle() {
                if (this.data.code) {
                    return this.$tl(`menu.${this.data.code}`,this.data.title);
                }
                return this.data.title
            },
        }
    };
</script>

<style></style>
