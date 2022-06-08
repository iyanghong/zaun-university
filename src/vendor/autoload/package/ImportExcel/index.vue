<template>
    <div class="import-excel">
        <el-dialog title="导入" v-if="mode === 'upload'" :visible.sync="show" width="400px">
            <upload-excel :on-success="handleUploadSuccess"></upload-excel>
            <div class="checkbox-panel" v-if="excelData !== null">
                <el-checkbox v-model="force">发现错误往下执行</el-checkbox>
            </div>
            <div class="btn-action" v-if="excelData !== null">
                <el-button size="mini" type="primary" @click="handleSuccess">开始导入</el-button>
                <el-button size="mini" type="success" @click="renderUploadTable">查看数据</el-button>
            </div>
        </el-dialog>

        <el-dialog title="导入数据展示" v-if="mode === 'tableView' && excelData !== null" :visible.sync="show" width="600px">
            <div class="btn-action">
                <el-button size="mini" type="success" @click="showUploadBox">返回</el-button>
                <el-button size="mini" type="primary" @click="handleSuccess">开始导入</el-button>
                <el-checkbox style="margin-left: 10px" v-model="force">发现错误往下执行</el-checkbox>
            </div>
            <el-table :data="excelData.results" border highlight-current-row style="width: 100%;margin-top:20px;">
                <el-table-column v-for="item of excelData.header" :key="item" :prop="item" :label="item"/>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import UploadExcel from "./UploadExcel";

    export default {
        name: "ImportExcel",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        components: {
            UploadExcel
        },
        data() {
            return {
                excelData: null,
                show: false,   //展示
                mode: 'upload',//方式
                force: false,
            }
        },
        created() {

        },
        watch: {
            visible(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.show = newValue;
                }
            },
            show(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.$emit('update:visible', newValue);
                }
            },
        },
        methods: {
            handleUploadSuccess(data) {
                this.excelData = data;
            },
            /**
             * 渲染上传表格
             */
            renderUploadTable() {
                this.mode = 'tableView';
            },
            showUploadBox() {
                this.mode = 'upload';
            },
            handleSuccess() {
                this.$emit('success', {data: this.excelData.results, header: this.excelData.header, force: this.force});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .import-excel {
        .checkbox-panel, .btn-action {
            text-align: center;
            margin-top: 10px;
        }

        .btn-action {

        }
    }
</style>