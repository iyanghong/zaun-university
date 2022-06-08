<template>
	<div :class="{'show' : show}" class="header-search">
		<svg-icon iconClass="search-icon" icon="search" @click.stop="click" />
		<el-select ref="headerSearchSelect" v-model="search" filterable default-first-option
		remote placeholder="Search" class="header-search-select" @change="change">
			<!-- <el-option></el-option> -->
		</el-select>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				search: '',
				options: []
			}
		},
		watch: {
			show(value) {
				if (value) {
					document.body.addEventListener('click', this.close)
				} else {
					document.body.removeEventListener('click', this.close)
				}
			}
		},
		methods: {
			click() {
				this.show = !this.show
				if (this.show) {
					this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
				}
			},
			close() {
				this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
				this.options = []
				this.show = false
			},
			change() {
				this.search = ''
				this.options = [];
				this.$nextTick(() => {
					this.show = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.header-search {
  /*font-size: 0 !important;*/

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
