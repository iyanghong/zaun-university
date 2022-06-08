<script>
export default {
	created() {
		const { params, query } = this.$route;
		const { path,router } = params;
		if(router){
			this.$router.replace(params.router)
		}else{
			this.$router.replace({ path: '/' + path, query });
		}
		
	},
	render: function(h) {
		return h();
	}
};
</script>
