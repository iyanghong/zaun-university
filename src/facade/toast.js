export default {
	name : 'Toast',
	handle(content = '', type = '') {
		if (type) {
			if (type != 'success' && type != 'warning' && type != 'error') {
				type = '';
			}
		}
		this.$message({
			showClose: true,
			message: content,
			type: type
		});
	}
}
