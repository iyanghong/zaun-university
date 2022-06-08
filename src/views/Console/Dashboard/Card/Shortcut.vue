<template>
    <div class="shortcut panel-w">
        <span class="title-l">快捷入口</span>
        <div class="shortcut-list">
            <div  v-for="(item,index) in shortcuts" :key="index" :class="{'shortcut-item':true,'no-first-row' : index > 3}">
                <svg-icon :icon="item.icon" @click="goShortcut(item)"/>
                <span class="shortcut-title" v-text="item.title"></span>
            </div>
            <div class="shortcut-item-fill" v-for="(item,index) in fillBox" :key="index"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Shortcut",
        data() {
            return {
                shortcuts: [],
                /**
                 * 占位box
                 */
                fillBox: {}
            }
        },
        created() {
            this.shortcuts = this.$config.dashboard.shortcuts;
            let fillNum = this.shortcuts.length > 4 ? this.shortcuts.length % 4 : 4 - this.shortcuts.length;
            for (let i = 0; i < fillNum; i++) {
                this.fillBox['fill' + i] = i;
            }
        },
        methods: {
            goShortcut(shortcut) {
                this.$router.push(shortcut.view);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shortcut {
        width: 400px;
        min-height: 200px;
        .shortcut-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 15px 10px 10px 10px;
            .shortcut-item-fill, .shortcut-item {
                width: 20%;
                padding: 5px;
            }
            .shortcut-item.no-first-row{
                margin-top: 15px;
            }

            .shortcut-item {
                height: 55px;
                text-align: center;
                box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
                border-radius: 3px;
                transition: all 0.6s;
                cursor: pointer;
                overflow: hidden;

                &:hover{
                    .shortcut-title{
                        transform: translateY(30px);
                        transition: all 0.6s;
                    }
                    .svg-icon{
                        width: 80%;
                        height: 80%;
                        transform: translateY(12%);
                        vertical-align: middle;
                        transition: all 0.6s;
                    }
                }
                .shortcut-title {
                    display: block;
                    width: 100%;
                    transition: all 0.6s;
                }

                .svg-icon {
                    width: 2em;
                    height: 2em;
                }
            }
        }
    }

</style>