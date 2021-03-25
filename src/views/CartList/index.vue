<!--  -->
<template>
	<div style="background:#ffff;position:relative">
		<div style="width:90%;padding-top:30px;height:80px;padding-left:80px">
			<el-page-header @back="goBack" content="我的购物车"> </el-page-header>
		</div>
		<!-- <el-page-header @back="goBack" content="详情页面" style="width:90%;margin:20px auto"> </el-page-header> -->
		<el-table
			style="width:90%;margin:0px auto;min-height:500px"
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55"> </el-table-column>
			<el-table-column label="图片" width="120" align="center">
				<template slot-scope="scope">
					<!-- <img src="../../assets/img/mainImg/101.jpg" class="image" /> -->
					<img :src="scope.row.src" class="image" />
				</template>
			</el-table-column>
			<el-table-column prop="goods_no" label="商品号" width="120" align="center"> </el-table-column>
			<el-table-column prop="goods_name" label="商品名" width="200" align="center"> </el-table-column>
			<el-table-column label="数量" width="150" align="center"
				><template slot-scope="scope">
					<el-input-number
						v-model="scope.row.goods_amount"
						@change="handleChange"
						:min="1"
						:max="110"
						size="mini"
					></el-input-number>
				</template>
			</el-table-column>
			<el-table-column prop="goods_prices" label="价格" align="center" width="70"></el-table-column>
			<el-table-column prop="goods_canshu" label="参数" show-overflow-tooltip align="center" width="300">
			</el-table-column>
			<el-table-column label="操作" width="130" align="center" show-overflow-tooltip
				><template slot-scope="scope">
					<el-tag
						type="danger"
						effect="dark"
						size="small"
						style="cursor: pointer;margin-right:10px"
						@click="deleteCart(scope.row)"
					>
						移除
					</el-tag>
					<el-tag type="warning" effect="dark" size="small" style="cursor: pointer;" @click="goBuy(scope.row)">
						去购买
					</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<!-- <div style="width:450px;margin:20px auto">
			<span class="money">总金额：￥{{ this.subPrice }}</span> <span class="joinBuy" @click="goBuy()">立即下单</span>
		</div> -->
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { removeStore, getStore, setStore } from "@/utils/storage";
	export default {
		data() {
			return {
				tableData: [],
				// goods_amount: 1,
				multipleSelection: [],
				subPrice: 0,
			};
		},
		computed: {
			...mapState(["login", "userInfo"]),
		},
		watch: {
			$route: "handleSelectionChange",
		},
		methods: {
			goBack() {
				window.history.go(-1);
			},
			deleteCart(row) {
				this.$http.post("http://localhost:8080/deleteCart", { no: row.goods_no }).then(res => {
					if (res.data.statausCode === 200) {
						this.$message.success(res.data.msg);
						this.shouCart();
					} else {
						this.$message.success(res.data.msg);
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
							this.deleteCart(row);
						} else {
							this.$message.error(res.data.msg);
						}
					});
			},
			// goBuy() {
			// 	this.$router.push({
			// 		path: "BuyList",
			// 	});
			// },
			handleChange(value) {
				console.log(value);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val);
				if (val) {
					this.multipleSelection.forEach(ele => {
						this.subPrice += ele.goods_price * ele.goods_amount;
					});
				} else {
					this.subPrice = 0;
				}
			},
			shouCart() {
				this.$http.post("http://localhost:8080/viewCart", { cno: this.$route.query.cno }).then(res => {
					if (res.status === 200) {
						this.tableData = res.data;
						this.tableData.forEach(ele => {
							ele.src = require("@/assets/img/mainImg/" + ele.goods_img);
						});
					}
				});
			},
		},
		created() {
			this.shouCart();
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
