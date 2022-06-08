<template>
  <div>
    <data-form
        v-if="op==='Edit'"
        :data="form"
        :loading="loading"
        v-model="formData"
        @handleUpdate="handleUpdate"
        :defaultDataHandle="handleLoadData"
        op="Edit"
    ></data-form>
    <data-form
        v-else-if="op==='Create'"
        :data="form"
        :loading="loading"
        v-model="formData"
        @handleCreate="handleCreate"
        op="Create"
    ></data-form>
  </div>
</template>

<script>
import {getAllProfessional} from "@/api/professional";
import {createClassGrade, getClassGrade, updateClassGrade} from "@/api/classGrade";

export default {
  name: "ClassGradeForm",
  props: {
    data: {
      type: Object,
      required: null
    },
    pid: {
      required: null
    }
  },
  data() {
    return {
      op: 'Create',
      loading: false,
      formData: {grade: 2022},
      form: {
        rows: [
          {
            field: 'grade', label: '年级', rule: 'required', type: 'select', data: [
              {value: 2018, label: 2018},
              {value: 2019, label: 2019},
              {value: 2020, label: 2020},
              {value: 2021, label: 2021},
              {value: 2022, label: 2022},
            ]
          },
          {field: 'pid', label: '所属专业', rule: 'required', type: 'select', data: this.handleGetAllProfessional},
        ]
      }
    }
  },
  created() {
    this.op = this.data == null ? 'Create' : 'Edit';
    if (this.pid !== null) this.formData.pid = this.pid;
  },
  methods: {
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
    async handleLoadData() {
      let data = {};
      await getClassGrade(this.data.cid).then(response => {
        if (response.success === true) {
          data.grade = response.data.grade;
          data.pid = response.data.pid;
        }
      })
      return data;
    },
    handleCreate(data) {
      this.loading = true;
      let user = this.$store.state.account.user;
      if(user.role === 1){
        data.principal = user.id;
      }
      createClassGrade(data).then(response => {
        if (response.success === true) {
          this.$Toast('创建成功', 'success');
          this.$emit('hide', true);
        } else {
          this.$Toast(response.message, 'error');
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    handleUpdate(data) {
      let postData = {
        cid: this.data.cid,
        ...data
      }
      this.loading = true;
      updateClassGrade(postData).then(response => {
        if (response.success === true) {
          this.$Toast('修改成功', 'success');
          this.$emit('hide', true);
        } else {
          this.$Toast(response.message, 'error');
        }
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
