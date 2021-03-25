<!--  -->
<template>
	<div class="footer">
		<el-row>
			<el-col :span="3" :offset="1">
				<ul>
					<li>购物相关</li>
					<li>购物指南</li>
					<li>配送方式</li>
					<li>售后到位</li>
					<li>快递信息</li>
				</ul>
			</el-col>
			<el-col :span="3"
				><ul>
					<li>支付方式</li>
					<li>支持微信付款</li>
					<li>支付宝付款</li>
					<li>信用卡支付</li>
					<li>翼支付</li>
				</ul></el-col
			>
			<el-col :span="3"
				><ul>
					<li>售后服务</li>
					<li>支持退货换货</li>
					<li>支持上门维修</li>
					<li>信用卡支付</li>
					<li>一年免费维修</li>
				</ul></el-col
			>
			<el-col :span="3"
				><ul>
					<li>合作伙伴</li>
					<li>华为手机供应商</li>
					<li>小米手机供应商</li>
					<li>vivo手机供应商</li>
					<li>oppo手机供应商</li>
					<li>魅族手机供应商</li>
					<li>....</li>
				</ul></el-col
			>
			<el-col :span="8" :offset="1">
				<div class="connet">
					<ul>
						<li style="font-size:35px;margin:10px 30px">
							<i class="el-icon-phone-outline"></i
							><span style="font-size:18px;margin-left:20px">热线电话，全年无休，24小时在线</span>
						</li>
						<li style="font-size:25px;margin:10px 100px;color:#409EFF">15289546955</li>
						<li style="font-size:35px;margin-left:30px">
							<i class="el-icon-medal-1"></i><span style="font-size:18px;margin-left:20px">店铺评价：</span>
						</li>
						<li style="font-size:45px;width:100%;height:60px; color:#f67000;margin-left:80px">
							<i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
							><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.footer {
		background: #242933;
		width: 100%;
		height: 400px;
		position: absolute;
	}
	.el-row {
		margin-top: 50px;
		position: relative;
	}
	.el-col > ul > li {
		display: block;
		margin-top: 15px;
		color: rgb(163, 159, 159);
		font-size: 14px;
		/* font-family: "宋体"; */
	}
	.el-col > ul > li:nth-child(1) {
		color: #e4dada;
		font-size: 20px;
		font-family: "黑体";
	}
	.el-col > ul > li:hover {
		color: #ffffff;
		cursor: pointer;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	.connet {
		width: 100%;
		height: 250px;
		color: #e4dada;
		border-left: 1px dotted rgb(163, 159, 159);
	}
</style>
