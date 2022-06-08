<template>
  <div class="console-professional panel-w">
    <data-table :data="table" ref="professionalTable"></data-table>
    <popup-layer :visible.sync="visibleCreate" title="新增教师" width="800px">
      <teacher-form v-if="visibleCreate" @hide="handleCreate"></teacher-form>
    </popup-layer>
    <popup-layer :visible.sync="visibleEdit" title="修改教师" width="800px">
      <teacher-form v-if="visibleEdit" :data="selectRow" @hide="handleUpdate"></teacher-form>
    </popup-layer>

    <popup-layer :visible.sync="visibleDetail" title="查看教师" width="800px">
      <teacher-form v-if="visibleDetail" :data="selectRow" :detail="true" @hide="handleDetail"></teacher-form>
    </popup-layer>
  </div>
</template>

<script>
import TeacherForm from './TeacherForm'
import {delUser, getTeacherList} from "@/api/user";
import {generateRandomTeacher} from "@/utils/generate-util";

export default {
  name: "Teacher",
  components: {TeacherForm},
  data() {
    return {
      visibleCreate: false,
      visibleEdit: false,
      selectRow: {},
      visibleDetail: false,
      table: {
        handleApi: getTeacherList,
        searchCols: [
          {field: 'name', title: '姓名', fast: true},
          {field: 'sex', title: '性别', fast: true, type: 'radio', data: [{value: '男'}, {value: '女'}]},
          {field: 'startAndEndTime', type: 'startAndEndTime', label: '创建时间'}
        ],
        toolbarButton: [
          {
            key: 'add',
            type: 'primary',
            handle: () => {
              this.visibleCreate = true
            }
          }, {
            label: '模拟若干个老师',
            type: 'success',
            handle: () => {
              generateRandomTeacher().then(() => {
                this.$refs.professionalTable.reload();
              })
              // console.log(row)
            }
          },
        ],
        cols: [
          {field: 'id', title: '编号', width: 60},
          {field: 'badgeNumber', title: '工号', width: 80},
          {field: 'name', title: '姓名', width: 80},
          {field: 'sex', title: '性别', width: 60},
          {field: 'job', title: '职位', width: 120},
          {field: 'idPhoto', title: '照片', type: 'avatar', width: 60},
          {field: 'phone', title: '手机号', width: 120},
          {field: 'email', title: '邮箱号'},
          {
            title: '操作',
            button: [
              {
                key: 'detail',
                handle: row => {
                  this.selectRow = row;
                  this.visibleDetail = true
                }
              },
              {
                key: 'edit',
                type: 'primary',
                handle: row => {
                  this.selectRow = row;
                  this.visibleEdit = true
                }
              },
              {
                key: 'del',
                type: 'danger',
                handle: row => {
                  this.handleDelete(row)
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleDelete(row) {
      //执行删除
      this.$confirm(`是否删除教师"${row.name}"?`, this.$tl('prompt', '提示'), {
        confirmButtonText: this.$tl('confirm', '确认'),
        cancelButtonText: this.$tl('cancel', '取消'),
        type: 'warning'
      }).then(() => {
        //执行删除
        delUser(row.id).then(response => {
          if (response.success === true) {
            this.$Toast('删除成功', 'success');
            this.$refs.professionalTable.reload();
          } else {
            this.$Toast(response.message, 'error');
          }
        });
      });
    },
    handleCreate(flag) {
      if (flag) {
        this.$refs.professionalTable.reload();
      }
      this.visibleCreate = false
    },
    handleUpdate(flag) {
      if (flag) {
        this.$refs.professionalTable.reload();
      }
      this.visibleEdit = false
    },
    handleDetail() {
      this.visibleDetail = false
    }
  }
}
</script>

<style scoped>

</style>
