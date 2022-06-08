<template>
  <div class="console-professional panel-w">
    <data-table :data="table" ref="professionalTable"></data-table>
    <popup-layer :visible.sync="visibleCreate" title="新增学生" width="800px">
      <student-form v-if="visibleCreate" @hide="handleCreate"></student-form>
    </popup-layer>
    <popup-layer :visible.sync="visibleEdit" title="修改学生" width="800px">
      <student-form v-if="visibleEdit" :data="selectRow" @hide="handleUpdate"></student-form>
    </popup-layer>

    <popup-layer :visible.sync="visibleDetail" title="查看学生" width="800px">
      <student-form v-if="visibleDetail" :data="selectRow" :detail="true" @hide="handleDetail"></student-form>
    </popup-layer>
  </div>
</template>

<script>
import {delProfessional, getAllProfessional, getProfessionalList} from "@/api/professional";
import StudentForm from './StudentForm'
import {delUser, getStudentList, getTeacherList} from "@/api/user";

export default {
  name: "Teacher",
  components: {StudentForm},
  data() {
    return {
      visibleCreate: false,
      visibleEdit: false,
      selectRow: {},
      visibleDetail: false,
      table: {
        handleApi: this.getStudentList,
        searchCols: [
          {field: 'name', title: '学生名称', fast: true},
          {field: 'pid', title: '专业', fast: true, type: 'select', data: this.handleGetAllProfessional},
          {field: 'startAndEndTime', type: 'startAndEndTime', label: '创建时间'}
        ],
        toolbarButton: [
          {
            key: 'add',
            type: 'primary',
            handle: () => {
              this.visibleCreate = true
            }
          }
        ],
        cols: [
          {field: 'id', title: '编号', width: 60},
          {field: 'grade', title: '年级', width: 80},
          {field: 'badgeNumber', title: '学号', width: 120},
          {field: 'name', title: '姓名', width: 80},
          {field: 'sex', title: '性别', width: 60},
          {field: 'professionalName', title: '专业', width: 150},
          {field: 'cid', title: '班级', width: 100},
          {field: 'idPhoto', title: '照片', type: 'avatar', width: 60},
          {field: 'phone', title: '手机号', width: 120},

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
    getStudentList(data){
      if(this.$_user.role === 1){
        data.principal = this.$_user.id;
      }
      return getStudentList(data);
    },
    async handleGetAllProfessional() {
      let data = [];
      await getAllProfessional().then(response => {
        if (response.success === true) {
          for (let item of response.data) {
            data.push({
              value: item.pid,
              label: item.professionalName
            })
          }
        }
      })
      return data;
    },
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
