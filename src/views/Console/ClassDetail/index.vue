<template>
  <div class="class-detail">
    <div class="panel-w">
      <span
          class="title-l"
          v-if="classGrade.professionalName">
        <span>{{ classGrade.professionalName }} {{ classGrade.cid }}班</span>
        <div v-if="user.role !== 0">
          <el-button
              type="warning"
              size="mini"
              v-if=" this.$_user.role === -1"
              @click="visiblePrincipal = true"
          >任命班主任</el-button>
          <el-button type="success" size="mini" @click="visibleCreate = true">添加学生</el-button>
          <el-button type="primary" size="mini" @click="handleGenerateStudent">模拟10个学生</el-button>
          <el-button type="default" size="mini" @click="handleBack">返回</el-button>
        </div>
      </span>
      <card-detail v-if="principal" :data="principal" :now-user-id="user.id"></card-detail>
    </div>

    <span class="title-l panel-w" style="margin-top: 10px;font-size: 14px;line-height: 30px"
          v-if="classGrade.studentTotal">共{{ classGrade.studentTotal }}个学生</span>
    <div class="student-list">
      <card-detail v-for="(item,index) in studentList" :key="index" :data="item" :now-user-id="user.id"></card-detail>
    </div>


    <popup-layer :visible.sync="visibleCreate" title="新增学生" width="800px">
      <student-form v-if="visibleCreate" :cid="classGrade.cid" @hide="handleCreate"></student-form>
    </popup-layer>
    <popup-layer :visible.sync="visibleEdit" title="修改学生" width="800px">
      <student-form v-if="visibleEdit" :data="selectRow" @hide="handleUpdate"></student-form>
    </popup-layer>

    <popup-layer :visible.sync="visibleDetail" title="查看学生" width="800px">
      <student-form v-if="visibleDetail" :data="selectRow" :detail="true" @hide="handleDetail"></student-form>
    </popup-layer>
    <popup-layer :visible.sync="visiblePrincipal" title="班主任" width="400px">
      <class-principal-form v-if="visiblePrincipal" :data="classGrade"
                            @hide="handleHidePrincipal"></class-principal-form>
    </popup-layer>
  </div>
</template>

<script>
import CardDetail from './CardDetail'
import StudentForm from '../Student/StudentForm'
import {getClassGradeDetail} from "@/api/classGrade";
import {getStudentByClass, getTeacher} from "@/api/user";
import {generateStudent} from "@/utils/generate-util";
import ClassPrincipalForm from '../ClassPrincipalForm'

export default {
  name: "ClassDetail",
  components: {CardDetail, StudentForm, ClassPrincipalForm},
  data() {
    return {
      classGrade: {},
      principal: null,
      studentList: [],
      visibleCreate: false,
      visibleEdit: false,
      selectRow: {},
      visibleDetail: false,
      visiblePrincipal: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.account.user
    },
  },
  created() {
    let params = this.$route.params;
    this.classGrade.cid = params.id
    this.handleLoadClass();
  },
  methods: {
    handleLoadClass() {
      getClassGradeDetail(this.classGrade.cid).then(response => {
        if (response.success === true) {
          this.classGrade = response.data;
          this.handleLoadPrincipal();
          this.handleGetStudentList();
        } else {
          this.$message.error('班级不存在')
          this.$router.push('/console/class');
        }
      })
    },
    handleLoadPrincipal() {
      if (!this.classGrade.principal) return;
      getTeacher(this.classGrade.principal).then(response => {
        if (response.success === true) {
          this.$set(this, 'principal', response.data);
        }
      })
    },
    handleGetStudentList() {
      if (!this.classGrade.cid) return;
      getStudentByClass(this.classGrade.cid).then(response => {
        if (response.success === true) {
          this.studentList = response.data
        }
      })
    },
    handleCreate(flag) {
      if (flag) {
        this.handleGetStudentList();
      }
      this.visibleCreate = false
    },
    handleUpdate(flag) {
      if (flag) {
        this.handleGetStudentList();
      }
      this.visibleEdit = false
    },
    handleDetail() {
      this.visibleDetail = false
    },
    handleGenerateStudent() {
      generateStudent(10, this.classGrade.cid).then(() => {
        this.handleGetStudentList();
      })
    },
    handleHidePrincipal(flag) {
      if (flag) {
        this.handleLoadClass();
      }
      this.visiblePrincipal = false;
    },
    handleBack() {
      this.$_close('/console/class')
    }
  }
}
</script>

<style lang="scss" scoped>
.class-detail {
  .title-l {
    display: flex;
    justify-content: space-between;
  }

  .student-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
