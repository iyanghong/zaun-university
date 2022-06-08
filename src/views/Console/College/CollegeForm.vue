<template>
  <div>
    <data-form
        v-if="op==='Edit'"
        :data="form"
        :loading="loading"
        @handleUpdate="handleUpdate"
        :defaultDataHandle="handleLoadData"
        op="Edit"
    ></data-form>
    <data-form
        v-else-if="op==='Create'"
        :data="form"
        :loading="loading"
        @handleCreate="handleCreate"
        op="Create"
    ></data-form>
  </div>
</template>

<script>
import {createCollege, getCollege, updateCollege} from "@/api/college";

export default {
  name: "CollegeForm",
  props: {
    data: {
      type: Object,
      required: null
    }
  },
  data() {
    return {
      op: 'Create',
      loading: false,
      form: {
        rows: [
          {field: 'collegeName', label: '学院名称', rule: 'required'},
        ]
      }
    }
  },
  created() {
    this.op = this.data == null ? 'Create' : 'Edit';
  },
  methods: {
    async handleLoadData() {
      let data = {};
      await getCollege(this.data.collegeId).then(response => {
        if (response.success === true) {
          data.collegeName = response.data.collegeName;
        }
      })
      return data;
    },
    handleCreate(data) {
      this.loading = true;
      createCollege(data).then(response => {
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
        collegeId: this.data.collegeId,
        ...data
      }
      this.loading = true;
      updateCollege(postData).then(response => {
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
