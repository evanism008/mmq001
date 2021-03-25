<!--  -->
<template>
	<div>
		<m-header></m-header>
		<!--导航  子路由的出口-->

		<div style="min-height:500px;"><router-view></router-view></div>

		<div style="width: 100%;height: 100%;">
			<el-backtop :bottom="60"></el-backtop>
		</div>
		<m-footer></m-footer>
	</div>
</template>

<script>
	import MHeader from "@/common/MHeader";
	import MFooter from "@/common/MFooter";
	export default {
		data() {
			return {};
		},
		components: {
			MHeader,
			MFooter,
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
