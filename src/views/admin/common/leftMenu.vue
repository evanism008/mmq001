<!--  -->
<template>
	<div>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu
					default-active="1"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
					style="height:630px"
				>
					<el-menu-item index="1">
						<router-link to="/admin/all_list">
							<i class="el-icon-s-marketing"></i>
							<span>后台首页</span></router-link
						></el-menu-item
					>
					<el-menu-item index="2">
						<router-link to="/admin/phone_list">
							<i class="el-icon-mobile"></i>
							<span>手机管理</span></router-link
						>
					</el-menu-item>
					<el-menu-item index="3">
						<router-link to="/admin/accessories_list">
							<i class="el-icon-menu"></i>
							<span>配件管理</span></router-link
						>
					</el-menu-item>
					<el-menu-item index="4"
						><router-link to="/admin/order_list"> <i class="el-icon-document"></i> <span>订单管理</span></router-link>
					</el-menu-item>
					<el-menu-item index="5"
						><router-link to="/admin/customer_list">
							<i class="el-icon-chat-dot-round"></i> <span>评论管理</span></router-link
						>
					</el-menu-item>
					<el-menu-item index="6"
						><router-link to="/admin/customer_list">
							<i class="el-icon-s-custom"></i> <span>用户管理</span></router-link
						>
					</el-menu-item>
					<el-menu-item index="7"
						><router-link to="/admin/sales_list"> <i class="el-icon-s-check"></i> <span>管理员管理</span></router-link>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
</style>
