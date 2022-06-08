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
import {createProfessional, getProfessional, updateProfessional} from "@/api/professional";
import {getAllCollege} from "@/api/college";

export default {
  name: "ProfessionalForm",
  props: {
    data: {
      type: Object,
      required: null
    },
    collegeId: {
      required: null
    }
  },
  data() {
    return {
      op: 'Create',
      loading: false,
      formData:{},
      form: {
        rows: [
          {field: 'professionalName', label: '专业名称', rule: 'required'},
          {
            field: 'collegeId',
            label: '所属学院',
            rule: 'required',
            type: 'select',
            data: this.handleGetAllCollege,
            search: true
          },
        ]
      }
    }
  },
  created() {
    this.op = this.data == null ? 'Create' : 'Edit';
    if (this.collegeId) {
      this.formData.collegeId = this.collegeId;
    }
  },
  methods: {
    async handleGetAllCollege() {
      let data = [];
      await getAllCollege().then(response => {
        if (response.success === true) {
          for (let item of response.data) {
            data.push({
              value: item.collegeId,
              label: item.collegeName
            })
          }
        }
      })
      return data;
    },
    async handleLoadData() {
      let data = {};
      await getProfessional(this.data.pid).then(response => {
        if (response.success === true) {
          data.professionalName = response.data.professionalName;
        }
      })
      return data;
    },
    handleCreate(data) {
      this.loading = true;
      createProfessional(data).then(response => {
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
        pid: this.data.pid,
        ...data
      }
      this.loading = true;
      updateProfessional(postData).then(response => {
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
