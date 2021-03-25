<!--  -->
<template>
	<div style="background:#ffffff;height:600px">
		<div class="content-top">
			<el-row>
				<el-col :span="5"
					><el-input placeholder="请输入客户账名/名字/手机号" width="200" v-model="search" size="small"></el-input
				></el-col>
				<el-col :span="17">
					<el-button type="primary" icon="el-icon-search" @click="onSearch" size="small">搜索</el-button>
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
			<el-table-column prop="cno" label="账号" width="190" align="center"></el-table-column>
			<el-table-column prop="name" label="名字" width="150" align="center"> </el-table-column>
			<el-table-column prop="sex" label="性别" width="80" align="center"> </el-table-column>
			<el-table-column prop="phone" label="手机号" width="120" align="center"> </el-table-column>
			<el-table-column prop="address" label="地址" width="300" align="center"> </el-table-column>
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="handleDelete(scope.row.cno)">删除</el-button>
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
			<span>确认删除这个用户吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible3 = false">取 消</el-button>
				<el-button type="primary" @click="deleteClick">确 定</el-button>
			</span>
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
				cno: "",
				dialogVisible3: false,
				search: "",
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
			handleDelete(cno) {
				this.dialogVisible3 = true;
				this.cno = cno;
			},
			deleteClick() {
				let params = { cno: this.cno };
				this.$http
					.post("http://localhost:8080/deleteCustomer", params)
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

			// 获取数据
			getDataList() {
				this.$http
					.post("http://localhost:8080/getCustomerCount", {})
					.then(res => {
						this.data = res.data;
						this.data.forEach((v, index) => {
							v.key = v.goods_stype_id;
							v.index = index;
						});
					})
					.catch(err => {
						console.log(err);
					});
			},
			//搜索
			onSearch() {
				let params = { search: this.search };
				this.$http
					.post("http://localhost:8080/getsearchCustomer", params)

					.then(res => {
						this.data = res.data;
						this.data.forEach((v, index) => {
							v.key = v.goods_stype_id;
							v.index = index;
						});
					})
					.catch(err => {
						console.log(err);
					});
			},
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
