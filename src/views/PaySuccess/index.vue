<!--  -->
<template>
	<div class="min">
		<span><i class="el-icon-check"></i></span>
		<span>支付完成！</span>
		<span style="display:inline-block;font-size:14px;color:#ffffff;margin-top:40px"
			><router-link to="/home"><i class="el-icon-thumb"></i>&nbsp;&nbsp;返回首页</router-link></span
		>
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
	.min {
		font-size: 20px;
		width: 250px;
		color: #f67000;
		height: 30px;
		margin: 190px auto;
	}
</style>
