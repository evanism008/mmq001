<!--  -->
<template>
	<div style="background:#ffffff;height:600px;padding-top:20px">
		<el-table
			:data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
			border
			style="width: 100%;"
			:header-cell-style="{ background: '#909399', color: '#ffffff' }"
		>
			<el-table-column fixed label="序号" width="50" align="center"
				><template slot-scope="scope">
					{{ scope.row.index + 1 }}
				</template></el-table-column
			>
			<el-table-column label="订单编号" width="200" align="center" prop="orderId"></el-table-column>
			<el-table-column prop="goods_name" label="商品名" width="180" align="center"></el-table-column>
			<el-table-column prop="cno" label="客户" width="100" align="center"></el-table-column>
			<el-table-column prop="content" label="内容" width="380" align="center"></el-table-column>
			<el-table-column prop="comDate" label="时间" width="110px" align="center"></el-table-column>
			<el-table-column label="处理状态" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.commentsStatus === 0">已审核</span>
					<span style="color:#409EFF;cursor: pointer;" v-else @click="proState(scope.row.commentsId)">未审核</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-tag type="succeed" effect="dark" size="small" style="cursor: pointer;" @click="viewClick(scope.row)">
						查看
					</el-tag>
					<el-tag
						type="danger"
						effect="dark"
						size="small"
						style="cursor: pointer;"
						@click="deleteFn(scope.row.commentsId)"
					>
						删除
					</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			:page-size="pagesize"
			layout="total,prev, pager, next"
			:total="tableData.length"
			style="float:right;margin-top:30px"
			@current-change="current_change"
		>
		</el-pagination>
		<el-dialog title="评论查看" :visible.sync="dialogFormVisible" width="500px">
			<el-row>
				<el-col class="dialog-t"
					><span>订单编号:</span><span>{{ dataList.orderId }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>商品名:</span><span>{{ dataList.goods_name }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>评论用户:</span><span>{{ dataList.cno }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>评论时间:</span><span>{{ dataList.comDate }}</span></el-col
				>
				<el-col class="dialog-t"
					><span>评论内容:</span><span>{{ dataList.content }}</span></el-col
				>

				<el-col class="dialog-t"
					><span>图片展示:</span>
					<div style="width:200px;height:200px">
						<img :src="dataList.src" alt="" srcset="" width="100%" height="100%" />
					</div>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				total: 0, //默认数据总数
				pagesize: 9, //每页的数据条数
				currentPage: 1, //默认开始页面
				tableData: [],
				dataList: {},
				dialogFormVisible: false,
			};
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},

			current_change: function(currentPage) {
				// console.log(currentPage);
				this.currentPage = currentPage;
			},
			//处理状态
			proState(commentsId) {
				this.$http.post("http://localhost:8080/comState", { commentsId: commentsId }).then(res => {
					if (res.data.statusCode === 200) {
						this.$message.success(res.data.msg);
						this.getOrder();
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			deleteFn(commentsId) {
				this.$http.post("http://localhost:8080/deleteCom", { commentsId: commentsId }).then(res => {
					if (res.data.statusCode === 200) {
						this.$message.success(res.data.msg);
						this.getOrder();
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},

			getOrder() {
				this.$http.post("http://localhost:8080/getCom", {}).then(res => {
					if (res.status === 200) {
						console.log(res);
						this.tableData = res.data;
						this.tableData.forEach((v, index) => {
							v.key = v.commentsId;
							v.index = index;
						});
					} else {
						console.log(err);
					}
				});
			},
			//查看评论
			viewClick(r) {
				this.dialogFormVisible = true;
				this.dataList = r;
				this.dataList.src = require("@/assets/img/pinglun/" + this.dataList.imgs);
			},
		},
		created() {
			this.getOrder();
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
</style>
