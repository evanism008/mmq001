<!--  -->
<template>
	<div style="background:#ffffff;height:600px;padding-top:20px">
		<div class="content-top">
			<el-row>
				<el-col :span="2"
					><i
						class="el-icon-document"
						style="background-color:#007d65;font-size:30px;color:#ffffff;;padding:10px;margin-top:-10px"
					></i></el-col
				><el-col :span="3">条件筛选订单:</el-col>
				<el-col :span="12">
					<el-radio-group v-model="radio" @change="change">
						<el-radio label="1">全部订单</el-radio>
						<el-radio label="2">已处理</el-radio>
						<el-radio label="3">未处理</el-radio>
						<el-radio label="4">今日订单</el-radio>
					</el-radio-group>
				</el-col>
				<el-col :span="5">
					<el-input placeholder="请输入订单号/商品名" width="200" size="small" v-model="search"></el-input>
				</el-col>
				<el-col :span="1">
					<el-button type="primary" icon="el-icon-search" size="small" @click="searchFn">搜索</el-button>
				</el-col></el-row
			>
		</div>

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
			<el-table-column prop="goods_amount" label="数量" width="60" align="center"></el-table-column>
			<el-table-column prop="goods_price" label="总额" width="70" align="center"></el-table-column>
			<el-table-column prop="createDate" label="日期" width="120" align="center"></el-table-column>
			<el-table-column prop="address" label="地址" width="250" align="center"></el-table-column>

			<el-table-column label="处理状态" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.processingState === 0">已处理</span>
					<span style="color:#409EFF;cursor: pointer;" v-else @click="proState(scope.row.orderId)">未处理</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="100" align="center">
				<template slot-scope="scope">
					<!-- <span style="color:#F56C6C">删除</span> -->
					<el-tag
						type="danger"
						effect="dark"
						size="small"
						style="cursor: pointer;"
						@click="deleteFn(scope.row.orderId)"
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				radio: "1",

				total: 0, //默认数据总数
				pagesize: 9, //每页的数据条数
				currentPage: 1, //默认开始页面
				tableData: [],
				search: "",
			};
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			change(value) {
				//已处理
				if (value === "2" || value === "3") {
					this.$http.post("http://localhost:8080/getUnPre", { value: value }).then(res => {
						if (res.status === 200) {
							this.tableData = res.data;
							this.tableData.forEach((v, index) => {
								v.key = v.name;
								v.index = index;
							});
						}
					});
				} else if (value === "4") {
					this.$http.post("http://localhost:8080/todayOrder", {}).then(res => {
						if (res.status === 200) {
							this.tableData = res.data;
							this.tableData.forEach((v, index) => {
								v.key = v.name;
								v.index = index;
							});
						}
					});
				} else {
					this.getOrder();
				}
			},
			current_change: function(currentPage) {
				// console.log(currentPage);
				this.currentPage = currentPage;
			},
			//处理状态
			proState(orderId) {
				this.$http.post("http://localhost:8080/proState", { orderId: orderId }).then(res => {
					if (res.data.statusCode === 200) {
						this.$message.success(res.data.msg);
						this.getOrder();
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			deleteFn(orderId) {
				this.$http.post("http://localhost:8080/deleteOrder", { orderId: orderId }).then(res => {
					if (res.data.statusCode === 200) {
						this.$message.success(res.data.msg);
						this.getOrder();
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			//搜索
			searchFn() {
				this.$http.post("http://localhost:8080/searchOrder", { search: this.search }).then(res => {
					if (res.status === 200) {
						this.tableData = res.data;
						this.tableData.forEach((v, index) => {
							v.key = v.name;
							v.index = index;
						});
					}
				});
			},
			getOrder() {
				this.$http.post("http://localhost:8080/getOrderCount", {}).then(res => {
					if (res.status === 200) {
						console.log(res);
						this.tableData = res.data;
						this.tableData.forEach((v, index) => {
							v.key = v.name;
							v.index = index;
						});
					} else {
						console.log(err);
					}
				});
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
</style>
