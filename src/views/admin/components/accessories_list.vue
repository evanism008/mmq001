<!--  -->
<template>
	<div style="background:#ffffff;height:600px">
		<div class="content-top">
			<el-row>
				<el-col :span="5"
					><el-input placeholder="请输入商品名/售价" width="200" v-model="search" size="small"></el-input
				></el-col>
				<el-col :span="17">
					<el-button type="primary" icon="el-icon-search" @click="onSearch" size="small">搜索</el-button>
				</el-col>
				<el-col :span="1"
					><el-button type="success" icon="el-icon-plus" @click="addClick" size="small">添加</el-button></el-col
				>
			</el-row>
		</div>

		<el-table
			:data="otherList.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
			border
			style="width: 100%;"
			:header-cell-style="{ background: '#909399', color: '#ffffff' }"
		>
			<el-table-column fixed label="序号" width="50" align="center">
				<template slot-scope="scope"> {{ scope.row.index + 1 }}</template>
			</el-table-column>
			<el-table-column prop="goods_no" label="商品号" width="190" align="center"></el-table-column>
			<el-table-column prop="goods_name" label="名字" width="200" align="center"> </el-table-column>
			<el-table-column prop="goods_price" label="标价" width="80" align="center"> </el-table-column>
			<el-table-column prop="goods_origin" label="进价" width="80" align="center"> </el-table-column>
			<el-table-column prop="goods_total" label="库存" width="80" align="center"> </el-table-column>
			<!-- <el-table-column prop="goods_stype_id" label="类型" width="100" align="center"> </el-table-column> -->
			<el-table-column label="是否热门" width="80" align="center">
				<template slot-scope="scope"
					><el-switch v-model="scope.row.hotType" :active-value="1" :inactive-value="0" @change="hotType(scope.row)">
					</el-switch
				></template>
			</el-table-column>
			<!-- <el-table-column prop="goods_canshu" label="参数" width="450" align="center"> </el-table-column> -->
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button @click="viewClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="editClick(scope.row)">修改</el-button>
					<el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
						:total="otherList.length"
						:page-size="pagesize"
						@current-change="current_change"
					></el-pagination></el-col
			></el-row>
		</div>

		<!-- 查看对话框 -->
		<el-dialog title="商品信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-row>
				<el-col class="dialog-t"
					><span>商品号:</span><span>{{ dataList.goods_no }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>商品名:</span><span>{{ dataList.goods_name }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>售价:</span><span>{{ dataList.goods_price }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>原价:</span><span>{{ dataList.goods_origin }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>库存:</span><span>{{ dataList.goods_total }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>参数:</span><span>{{ dataList.goods_canshu }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>相关简介:</span><span>{{ dataList.goods_content }}</span></el-col
				>
				<el-col class="dialog-t"><span>图片展示:</span><span>444</span></el-col>
			</el-row>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加 -->
		<el-dialog title="添加商品信息" :visible.sync="dialogFormVisiblet" width="40%">
			<el-form :model="form" ref="form">
				<el-form-item label="商品名" :label-width="formLabelWidth">
					<el-col :span="20"><el-input v-model="form.goods_name" autocomplete="off" width="200px"></el-input></el-col>
				</el-form-item>
				<el-form-item label="标价" :label-width="formLabelWidth">
					<el-col :span="4"><el-input v-model="form.goods_price" autocomplete="off" width="200px"></el-input></el-col>
				</el-form-item>
				<el-form-item label="原价" :label-width="formLabelWidth">
					<el-col :span="4"><el-input v-model="form.goods_origin" autocomplete="off" width="200px"></el-input></el-col>
				</el-form-item>
				<el-form-item label="库存" :label-width="formLabelWidth">
					<el-col :span="4"><el-input v-model="form.goods_total" autocomplete="off" width="200px"></el-input></el-col>
				</el-form-item>

				<el-form-item label="参数" :label-width="formLabelWidth">
					<el-col :span="20"><el-input v-model="form.goods_canshu" autocomplete="off" width="200px"></el-input></el-col>
				</el-form-item>
				<el-form-item label="简介" :label-width="formLabelWidth">
					<el-col :span="20"
						><el-input type="textarea" v-model="form.goods_content" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>
				<el-form-item label="图片" ref="uploadElement" :label-width="formLabelWidth">
					<el-input v-model="form.goods_img" v-if="false"></el-input>
					<el-upload
						class="avatar-uploader"
						action="/index/upload"
						ref="upload"
						:show-file-list="false"
						:before-upload="beforeUpload"
						:on-change="handleChange"
						:data="form"
						list-type="picture-card"
						:auto-upload="false"
					>
						<img class="avatar" v-if="goods_img11" :src="goods_img11" alt="" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisiblet = false">取 消</el-button>
				<el-button type="primary" @click="submitForm">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog title="修改商品信息" :visible.sync="dialogFormVisiblete" width="40%">
			<el-form :model="editForm" ref="form">
				<el-form-item label="商品号" :label-width="formLabelWidth">
					<el-col :span="12"
						><el-input v-model="editForm.goods_no" autocomplete="off" width="200px" :disabled="true"></el-input
					></el-col>
				</el-form-item>
				<el-form-item label="商品名" :label-width="formLabelWidth">
					<el-col :span="20"
						><el-input v-model="editForm.goods_name" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>
				<el-form-item label="标价" :label-width="formLabelWidth">
					<el-col :span="4"
						><el-input v-model="editForm.goods_price" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>
				<el-form-item label="原价" :label-width="formLabelWidth">
					<el-col :span="4"
						><el-input v-model="editForm.goods_origin" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>
				<el-form-item label="库存" :label-width="formLabelWidth">
					<el-col :span="4"
						><el-input v-model="editForm.goods_total" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>

				<el-form-item label="参数" :label-width="formLabelWidth">
					<el-col :span="20"
						><el-input v-model="editForm.goods_canshu" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>
				<el-form-item label="简介" :label-width="formLabelWidth">
					<el-col :span="20"
						><el-input type="textarea" v-model="editForm.goods_content" autocomplete="off" width="200px"></el-input
					></el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisiblete = false">取 消</el-button>
				<el-button type="primary" @click="submitEditForm">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 删除 -->
		<el-dialog title="提示" :visible.sync="dialogVisible3" width="30%" :before-close="handleClose">
			<span>确认删除这个商品吗？</span>
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
				dataList: [],
				otherList: [],
				no: "",
				dialogVisible: false,
				dialogFormVisible: false,
				dialogFormVisiblet: false,
				dialogFormVisiblete: false,
				dialogVisible3: false,
				search: "",
				goods_img11: "",
				form: {
					goods_name: "",
					goods_price: "",
					goods_origin: "",
					goods_canshu: "",
					goods_stype_id: 9,
					goods_content: "",
					goods_total: "",
					goods_img: "",
				},
				editForm: {
					goods_name: "",
					goods_price: "",
					goods_origin: "",
					goods_canshu: "",
					goods_stype_id: 9,
					goods_content: "",
					goods_total: "",
					// goods_img: "",
				},

				formLabelWidth: "120px",
			};
		},
		components: {
			// phoneView,
		},

		methods: {
			hotType(row) {
				console.log(row);
				this.$http
					.post("http://localhost:8080/hotType", {
						hotType: row.hotType == true ? 1 : 0,
						no: row.goods_no,
					})
					.then(res => {
						if (res.data.statusCode === 200) {
							this.$message.success(res.data.msg);
						} else {
							this.$message.error(res.data.msg);
						}
					});
			},
			handleChange(file, fileList) {
				this.goods_img11 = URL.createObjectURL(file.raw);
				this.form.goods_img = file.name;
				console.log(this.form.goods_img);
			},
			beforeUpload(file) {
				return true;
			},
			submitForm() {
				this.$http
					.post("http://localhost:8080/addData", this.form)
					.then(res => {
						console.log(res);
						if (res.data.statusCode === 200) {
							this.$message.success(res.data.msg);
						} else {
							this.$message.error(res.data.msg);
						}
						this.form = "";
						this.dialogFormVisiblet = false;
						this.getDataList();
					})
					.catch(err => {
						console.log(err);
					});
			},

			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			viewClick(row) {
				this.dialogVisible = true;
				let params = { goods_no: row.goods_no };
				this.$http.post("http://localhost:8080/viewData", params).then(res => {
					if (res.status === 200) {
						console.log(res);
						this.dataList = res.data[0];
					}
				});
			},
			addClick: function() {
				this.dialogFormVisiblet = true;
			},
			// 修改
			editClick: function(row) {
				this.dialogFormVisiblete = true;
				console.log(row);
				this.editForm.goods_no = row.goods_no;
				this.editForm.goods_name = row.goods_name;
				this.editForm.goods_price = row.goods_price;
				this.editForm.goods_canshu = row.goods_canshu;
				this.editForm.goods_stype_id = row.goods_stype_id;
				this.editForm.goods_content = row.goods_content;
				this.editForm.goods_total = row.goods_total;
				this.editForm.goods_origin = row.goods_origin;
				this.editForm.goods_img = row.goods_img;
			},

			submitEditForm() {
				let params = this.editForm;
				this.$http.post("http://localhost:8080/updateData", params).then(res => {
					if (res.data.statusCode === 200) {
						this.$message.success(res.data.msg);
					} else {
						this.$message.error(res.data.msg);
					}
					this.dialogFormVisiblete = false;
					this.getDataList();
				});
			},
			// 删除
			handleDelete(row) {
				this.dialogVisible3 = true;
				this.no = row.goods_no;
			},
			deleteClick() {
				let params = { goods_no: this.no };
				this.$http
					.post("http://localhost:8080/deleteData", params)
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
					.get("http://localhost:8080/goodsdata", {})
					.then(res => {
						this.data = res.data;
						this.otherList = this.data.filter(function(item) {
							return item.goods_stype_id === 9;
						});
						this.otherList.forEach((v, index) => {
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
					.post("http://localhost:8080/getsearchData", params)

					.then(res => {
						console.log(res);
						this.otherList = res.data.filter(item => item.goods_stype_id === 9);
						this.otherList.forEach((v, index) => {
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
