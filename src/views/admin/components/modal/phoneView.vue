<!--  -->
<template>
	<div>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" height="200" :before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
			};
		},
		methods: {
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleOpen(row) {
				this.dialogVisible = true;
				console.log(1111);
			},
		},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
</style>
