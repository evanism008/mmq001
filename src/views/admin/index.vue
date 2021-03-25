<!--  -->
<template>
	<div>
		<a-header></a-header>
		<el-row>
			<el-col :span="4"
				><div class="left-menu-con">
					<leftMenu /></div
			></el-col>
			<el-col :span="20">
				<div class="right_content">
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>

		<!--导航  子路由的出口-->
	</div>
</template>

<script>
	import aHeader from "@/views/admin/common/aHeader";
	import leftMenu from "@/views/admin/common/leftMenu";
	export default {
		data() {
			return {};
		},
		components: {
			aHeader,
			leftMenu,
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.left-menu-con {
		width: 100%;
	}
	.left-menu-con {
		float: right;
	}
	.right_content {
		margin: 30px;
	}
</style>
