<template>
    <div class="date-time-scop flex-sb">
        <el-date-picker
                v-model="startTime"
                type="datetime"
                placeholder="开始时间"
                align="left"
                :format="format"
                :value-format="valueFormat"
                :picker-options="pickerOptionsStart"
                class="date-time-scop-start"
        ></el-date-picker>
        <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="结束时间"
                align="right"
                :format="format"
                :value-format="valueFormat"
                :picker-options="pickerOptionsEnd"
                class="date-time-scop-end"
        ></el-date-picker>
    </div>
</template>

<script>
    export default {
        name: 'DateTimeScope',
        props: {
            defaultStart: {
                type: String,
                default: () => {
                    return '';
                }
            },
            defaultEnd: {
                type: String,
                default: () => {
                    return '';
                }
            },
            valueFormat: {
                name: 'valueFormat',
                type: String,
                default: () => {
                    return 'timestamp';
                }
            },
            format: {
                type: String,
                default: () => {
                    return 'yyyy-MM-dd';
                }
            }
        },
        created() {
        },
        data() {
            return {
                value: {
                    startTime: '',
                    endTime: ''
                },
                startTime: '',
                endTime: '',
                pickerOptionsStart: {
                    disabledDate: date => {
                        let time = new Date(this.endTime).getTime();
                        if (time) {
                            return date.getTime() > time;
                        }
                    },
                    shortcuts: shortcuts
                },
                pickerOptionsEnd: {
                    disabledDate: date => {
                        let time = new Date(this.startTime).getTime();
                        if (time) {
                            return date.getTime() < time;
                        }
                    },
                    shortcuts: shortcuts
                }
            };
        },
        watch: {
            startTime(value) {
                if (this.valueFormat == 'timestamp') {
                    value = parseInt(value / 1000);
                }
                this.value.startTime = value;
                this.$emit('update:start', value);
            },
            endTime(value) {
                if (this.valueFormat == 'timestamp') {
                    value = parseInt(value / 1000);
                }
                this.value.endTime = value;
                this.$emit('update:end', value);
            },
            value() {
                this.$emit('update:data', this.value);
            }
        }
    };
    const shortcuts = [
        {
            text: '今天',
            onClick(picker) {
                picker.$emit('pick', new Date());
            }
        },
        {
            text: '昨天',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
            }
        },
        {
            text: '一周前',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
            }
        },
        {
            text: '一月前',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', date);
            }
        },
        {
            text: '三月前',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', date);
            }
        }
    ];
</script>

<style lang="scss" scoped>
    .date-time-scop {
        .date-time-scop-start {
            margin-right: 5px;
        }
    }
</style>
