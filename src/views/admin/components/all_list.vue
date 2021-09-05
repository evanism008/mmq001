<!--  -->
<template>
	<div>
		<el-row :gutter="12">
			<el-col :span="5" :offset="1">
				<el-card shadow="always">
					<i
						class="el-icon-user"
						style="background-color:#2a5caa;font-size:30px;color:#ffffff;display:block;float:left;padding:10px"
					></i>
					<span style="font-size:30px;margin:auto 10px;">{{ customerCount }}</span>
					<span style="font-size:10px;display:block;padding-left:10px">&nbsp;&nbsp;&nbsp;&nbsp;关注人数(个)</span>
				</el-card>
			</el-col>

			<el-col :span="5" :offset="1">
				<el-card shadow="always">
					<i
						class="el-icon-tickets"
						style="background-color:#007d65;font-size:30px;color:#ffffff;display:block;float:left;padding:10px"
					></i>
					<span style="font-size:30px;margin:auto 10px;">{{ orderCount }}</span>
					<span style="font-size:10px;display:block;padding-left:10px">&nbsp;&nbsp;&nbsp;&nbsp;订单总数(笔)</span>
				</el-card>
			</el-col>
			<el-col :span="5" :offset="1">
				<el-card shadow="always">
					<i
						class="el-icon-date"
						style="background-color:#f36c21;font-size:30px;color:#ffffff;display:block;float:left;padding:10px"
					></i>
					<span style="font-size:30px;margin:auto 10px;"> {{ todayOrderCount }}</span>
					<span style="font-size:10px;display:block;padding-left:10px">&nbsp;&nbsp;&nbsp;&nbsp;今日订单(笔))</span>
				</el-card>
			</el-col>
			<el-col :span="5" :offset="1">
				<el-card shadow="always">
					<i
						class="el-icon-coin"
						style="background-color:#decb00;font-size:22px;color:#ffffff;display:block;float:left;padding:10px"
					></i>
					<span style="font-size:30px;margin:auto 10px;">{{ income }}</span>
					<span style="font-size:10px;display:block;padding-left:10px">&nbsp;&nbsp;&nbsp;&nbsp;今日收入(元))</span>
				</el-card>
			</el-col>
		</el-row>
		<div style="width:75px;font-size:20px;margin:10px auto;color:#9999">RANK</div>
		<el-divider content-position="center" style="border:3px"><h2 style="font-size:22px">品牌销量TOP10</h2></el-divider>
		<div class="plist">
			<el-table
				v-loading="loading"
				element-loading-text="拼命加载中"
				:data="tableData"
				border
				style="width: 100%"
				:row-class-name="tableRowClassName"
			>
				<el-table-column type="index" align="center" :resizable="false" label="名次" width="100"> </el-table-column>
				<el-table-column prop="goods_no" label="商品号" width="300" align="center"> </el-table-column>
				<el-table-column prop="goods_name" label="商品名" width="300" align="center"> </el-table-column>
				<el-table-column prop="goods_price" label="总额" width="200" align="center"> </el-table-column>
				<el-table-column prop="rank" label="销量" align="center"> </el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				tableData: [],
				customerCount: 0,
				orderCount: 0,
				todayOrderCount: 0,
				income: 0,
				sumPrices: 0,
			};
		},
		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			getCustomerCount() {
				this.$http.post("http://localhost:8080/getCustomerCount", {}).then(res => {
					if (res.status === 200) {
						// console.log(res.data);
						this.customerCount = res.data.length;
					}
				});
			},
			getOrderCount() {
				this.$http.post("http://localhost:8080/getOrderCount", {}).then(res => {
					if (res.status === 200) {
						// console.log(res.data);
						this.orderCount = res.data.length;
					}
				});
			},
			getTodayOrder() {
				this.$http.post("http://localhost:8080/todayOrder", {}).then(res => {
					if (res.status === 200) {
						// console.log(res.data);
						this.todayOrderCount = res.data.length;
						let sum = 0;
						res.data.forEach(item => {
							sum += item.goods_price;
						});
						this.income = sum;
					}
				});
			},
			getRank() {
				this.$http.post("http://localhost:8080/getRank", {}).then(res => {
					console.log(res);
					res.data.forEach(item => {
						for (let attr in item) {
							if (attr === "sum(goods_amount)") {
								let v = item[attr];
								delete item[attr];
								item["rank"] = v;
							}
						}
						item.goods_price = item.goods_price * item.rank;
					});

					this.tableData = res.data;
				});
				setTimeout(() => {
					this.loading = false;
				}, 2000);
			},
			tableRowClassName({ row, rowIndex }) {
				if (rowIndex === 0) {
					return "n1";
				} else if (rowIndex === 1) {
					return "n2";
				} else if (rowIndex === 2) {
					return "n3";
				}
				return " ";
			},
		},
		mounted() {},
		created() {
			this.getCustomerCount();
			this.getOrderCount();
			this.getTodayOrder();
			this.getRank();
		},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.plist {
		width: 100%;
		height: auto;
		margin: 30px auto;
	}
	.el-table .n1 {
		background-color: #f0f9eb;
	}

	.el-table .n2 {
		background: #f0f9eb;
	}
	.el-table .n3 {
		background: #f0f9eb;
	}
	.el-divider {
		margin: 20px 0 20px 0;
		background: 0 0;
		border-top: 3px solid #f66f0052;
	}
</style>
