<!--  -->
<template>
	<div style="background:#ffffff;height:600px">
		<div class="content-top">
			<el-row>
				<el-col :span="22">.</el-col>
				<el-col :span="2">
					<el-button type="success" icon="el-icon-plus" size="small" @click="dialogFormVisiblet = true">添加</el-button>
				</el-col>
			</el-row>
		</div>

		<el-table
			:data="data.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
			border
			style="width: 100%;"
			:header-cell-style="{ background: '#909399', color: '#ffffff' }"
		>
			<el-table-column label="序号" width="50" align="center">
				<template slot-scope="scope"> {{ scope.row.index + 1 }}</template>
			</el-table-column>
			<el-table-column prop="admin_name" label="账号" width="190" align="center"></el-table-column>
			<el-table-column prop="admin_pwd" label="密码" width="190" align="center"> </el-table-column>
			<el-table-column prop="authonty" label="职称" width="190" align="center"> </el-table-column>

			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="handleDelete(scope.row.admin_id)">删除</el-button>
				</template>
			</el-table-column>
			<!-- <phoneView ref="phoneView" /> -->
		</el-table>
		<div style="float:right;margin-top:30px;font-size:20px">
			<el-row
				><el-col :span="16"
					><el-pagination
						background
						layout="total,prev, pager, next"
						:total="data.length"
						:page-size="pagesize"
						@current-change="current_change"
					></el-pagination></el-col
			></el-row>
		</div>
		<!-- 删除 -->
		<el-dialog title="提示" :visible.sync="dialogVisible3" width="30%">
			<span>确认删除这个管理员吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible3 = false">取 消</el-button>
				<el-button type="primary" @click="deleteClick">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加 -->
		<el-dialog title="添加管理员" :visible.sync="dialogFormVisiblet" width="40%">
			<el-form :model="form" ref="form">
				<el-form-item label="账号" :label-width="formLabelWidth">
					<el-col :span="20"><el-input v-model="form.admin_name" autocomplete="off"></el-input></el-col>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-col :span="20"><el-input v-model="form.admin_pwd" autocomplete="off"></el-input></el-col>
				</el-form-item>
				<el-form-item label="职称类型" :label-width="formLabelWidth">
					<el-select v-model="form.authonty" placeholder="请选择职称">
						<el-option label="经理" value="经理"></el-option>
						<el-option label="管理员" value="管理员"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisiblet = false">取 消</el-button>
				<el-button type="primary" @click="addAdmin()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	// import phoneView from "@/views/admin/components/modal/phoneView";
	export default {
		data() {
			return {
				total: 0, //默认数据总数
				pagesize: 7, //每页的数据条数
				currentPage: 1, //默认开始页面
				data: [],
				dialogFormVisiblet: false,
				form: {
					admin_id: "",
					admin_name: "",
					admin_pwd: "",
				},
				formLabelWidth: "120px",
				dialogVisible3: false,
			};
		},
		components: {
			// phoneView,
		},

		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},

			// 删除
			handleDelete(admin_id) {
				this.dialogVisible3 = true;
				this.admin_id = admin_id;
			},
			deleteClick() {
				let params = { admin_id: this.admin_id };
				this.$http
					.post("http://localhost:8080/deleteAdmin", params)
					.then(res => {
						if (res.data.statusCode === 200) {
							this.$message.success(res.data.msg);
						} else {
							this.$message.error(res.data.msg);
						}
						this.getDataList();
						this.dialogVisible3 = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 添加
			addAdmin() {
				let params = this.form;
				this.$http
					.post("http://localhost:8080/addAdmin", params)
					.then(res => {
						if (res.data.statusCode === 200) {
							this.$message.success(res.data.msg);
						} else {
							this.$message.error(res.data.msg);
						}
						this.getDataList();
						this.dialogFormVisiblet = false;
					})
					.catch(err => {
						console.log(err);
					});
			},

			// 获取数据
			getDataList() {
				this.$http
					.post("http://localhost:8080/getAdmin", {})
					.then(res => {
						this.data = res.data;
						this.data.forEach((v, index) => {
							v.key = v.admin_id;
							v.index = index;
						});
					})
					.catch(err => {
						console.log(err);
					});
			},
			//搜索
		},
		created() {
			this.getDataList();
		},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.content-top {
		margin-bottom: 20px;
	}
	.content-top > ul > li {
		display: inline-block;
	}
	.dialog-t {
		margin: 10px 20px;
	}
	.dialog-t > span:nth-child(1) {
		color: cadetblue;
		font-size: 13px;
		padding: 5px;
	}

	.dialog-t > span:nth-child(2) {
		font-size: 13px;
	}

	input[type="file"] {
		display: none;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 105px;
		height: 150px;
		line-height: 150px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
