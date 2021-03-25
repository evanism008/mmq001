<!--  -->
<template>
	<div style="width:80%;margin:0px auto;background-color:#ffffff;padding:30px 200px">
		<span style="font-size:18px display:block;margin-bottom:30px">+请补全基本信息</span>
		<el-input
			v-model="address"
			type="textarea"
			placeholder="请输入地址"
			maxlength="100"
			show-word-limit
			style="margin-top:20px"
		>
		</el-input>
		<el-input v-model="phone" placeholder="请输入手机" style="margin-top:20px"> </el-input>
		<div class="order">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>订单详情</span>
				</div>
				<div class="text item">
					<span>订单编号:</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{{ data.orderId }}</span>
				</div>
				<div class="text item">
					<span>商品名称:</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{{ data.goods_name }}</span>
				</div>
				<div class="text item">
					<span>商品数量:</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{{ data.goods_amount }}（个）</span>
				</div>
				<div class="text item"><span>优惠价格:</span><span>&nbsp;&nbsp;&nbsp;&nbsp;￥200（元）</span></div>
				<div class="text item">
					<span>实际支付:</span><span>&nbsp;&nbsp;&nbsp;&nbsp;￥{{ data.goods_price }}（元）</span>
				</div>
				<div class="text item"><span>售后服务:</span><span>&nbsp;&nbsp;&nbsp;&nbsp;七天无理由退货</span></div>
			</el-card>
			<span class="payBt" @click="payFn()">立即支付</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				address: "",
				phone: "",
				data: [],
			};
		},

		methods: {
			payFn() {
				this.$http
					.post("http://localhost:8080/payFor", {
						address: this.address,
						orderId: this.data.orderId,
						phone: this.phone,
					})
					.then(res => {
						if (res.data.statusCode === 200) {
							this.open1();
							this.$router.push({
								path: "/paySuccess",
							});
						}
					});
				// this.open1();
				// this.$router.push({
				// 	path: "/home",
				// });
			},
			open1() {
				this.$notify({
					title: "支付成功",
					type: "success",
				});
			},
			getOrder() {
				this.$http
					.post("http://localhost:8080/getOrder", {
						orderId: this.$route.query.orderId,
					})
					.then(res => {
						console.log(res);
						if (res.status === 200) {
							this.data = res.data[0];
							console.log(res);
						}
					});
			},
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {
			this.getOrder();
		},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both;
	}

	.box-card {
		margin-top: 30px;
		width: 720px;
	}
	.payBt {
		display: block;
		width: 150px;
		height: 40px;
		background: #f67000;
		color: #ffffff;
		font-size: 20px;
		margin: 20px auto;
		cursor: pointer;
		height: 40px;
		line-height: 40px;
		border-radius: 3px;
		padding-left: 35px;
	}
</style>
