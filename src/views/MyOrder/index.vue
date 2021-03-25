<!--  -->
<template>
	<div style="background:#ffff;position:relative">
		<div style="width:90%;padding-top:30px;height:80px;padding-left:80px">
			<el-page-header @back="goBack" content="我的订单"> </el-page-header>
		</div>

		<!-- <el-page-header @back="goBack" content="详情页面" style="width:90%;margin:20px auto"> </el-page-header> -->
		<el-table
			style="width:90%;margin:0px auto;min-height:500px"
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			stripe
			><el-table-column label="序号" width="60" align="center" type="index"> </el-table-column>
			<el-table-column label="图片" width="80" align="center">
				<template slot-scope="scope">
					<img :src="scope.row.src" class="image" />
				</template>
			</el-table-column>

			<el-table-column prop="orderId" label="订单号" width="120" align="center"> </el-table-column>
			<el-table-column prop="goods_name" label="商品名" width="150" align="center"> </el-table-column>
			<el-table-column prop="goods_amount" label="数量" width="70" align="center"> </el-table-column>
			<el-table-column prop="goods_price" label="价格" align="center" width="70"></el-table-column>
			<el-table-column prop="goods_canshu" label="参数" show-overflow-tooltip align="center" width="280">
			</el-table-column>
			<el-table-column label="处理状态" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.processingState === 0">已处理</span>
					<span v-else>未处理</span>
				</template>
			</el-table-column>
			<el-table-column prop="processingTime" label="处理时间" show-overflow-tooltip align="center" width="130">
			</el-table-column>
			<el-table-column prop="address" label="地址" show-overflow-tooltip align="center" width="200"> </el-table-column>
			<el-table-column label="操作" width="150" align="center" show-overflow-tooltip
				><template slot-scope="scope">
					<el-tag
						type="danger"
						effect="dark"
						size="small"
						style="cursor: pointer;margin-right:10px"
						@click="deleteOrder(scope.row)"
					>
						删除
					</el-tag>
					<el-tag
						type="success"
						effect="dark"
						size="small"
						style="cursor: pointer;margin-right:10px"
						@click="toCom(scope.row)"
					>
						去评论
					</el-tag>
					<!-- <el-tag type="warning" effect="dark" size="small" style="cursor: pointer;" @click="goBuy(scope.row)">
						去购买
					</el-tag> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- <div style="width:450px;margin:20px auto">
			<span class="money">总金额：￥{{ this.subPrice }}</span> <span class="joinBuy" @click="goBuy()">立即下单</span>
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				// goods_amount: 1,

				subPrice: 0,
			};
		},

		methods: {
			goBack() {
				window.history.go(-1);
			},
			deleteOrder(row) {
				this.$http.post("http://localhost:8080/deleteOrder", { orderId: row.orderId }).then(res => {
					if (res.data.statusCode === 200) {
						this.$message.success(res.data.msg);
						this.showOrder();
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			goBuy(row) {
				this.$http
					.post("http://localhost:8080/addOrder", {
						no: row.goods_no,
						num: row.goods_amount,
						price: row.goods_amount * row.goods_prices, //总价
						cno: this.userInfo.cno,
						name: row.goods_name,
					})
					.then(res => {
						console.log(res);
						if (res.data.statusCode === 200) {
							console.log(res.data.orderId);
							this.orderId = res.data.orderId;
							// this.$message.success(res.data.msg);
							this.$router.push({
								path: "BuyList",
								query: {
									orderId: this.orderId,
								},
							});
							// this.deleteCart(row);
						} else {
							this.$message.error(res.data.msg);
						}
					});
			},

			toCom(row) {
				this.$router.push({
					path: "addCom",
					query: {
						orderId: row.orderId,
						goods_no: row.goods_no,
						con: row.cno,
					},
				});
			},
			showOrder() {
				this.$http.post("http://localhost:8080/showMyOrder", { cno: this.$route.query.cno }).then(res => {
					if (res) {
						this.tableData = res.data;
						this.tableData.forEach(ele => {
							ele.src = require("@/assets/img/mainImg/" + ele.goods_img);
						});
					}
				});
			},
		},
		created() {
			this.showOrder();
		},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.image {
		width: 100%;
		display: block;
	}
	.money {
		vertical-align: middle;
		font-size: 20px;
		max-width: 200px;
		overflow: hidden;
		white-space: nowrap;
		color: rgba(12, 12, 12, 0.623);
		display: inline-block;
	}

	.joinBuy {
		font-size: 18px;
		margin: 20px 50px;
		display: inline-block;
		width: 150px;
		height: 40px;
		background-color: #f61000;
		color: #ffffff;
		line-height: 40px;
		padding-left: 35px;
	}
	.joinBuy:hover {
		background-color: #f610009a;
		cursor: pointer;
	}
</style>
