<!--  -->
<template>
	<div class="header">
		<div class="logo">
			<router-link to="/admin/index" title="商城官网"
				><img src="@/assets/logo.png" alt="logo" width="100%" height="100%"
			/></router-link>
		</div>
		<div class="titleT">
			阿蒙电子设备官方旗舰店后台管理
		</div>
		<div class="user">
			<ul>
				<li>{{ userInfo.admin_name }}</li>
				<li>admin</li>
				<li v-if="login" @click="handleCommand">退出</li>
			</ul>
		</div>
		<div style="float:right;margin:30px 10px"><el-avatar size="large" :src="circleUrl"></el-avatar></div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { removeStore, getStore, setStore } from "@/utils/storage";
	export default {
		data() {
			return {
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			};
		},
		computed: {
			...mapState(["login", "userInfo"]),
		},
		methods: {
			handleCommand(command) {
				// console.log("推出");
				removeStore("token");
				// removeStore("buyCart");
				window.location.href = "/admin/adminLogin";
			},
		},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.main {
		background: #ffffff;
	}
	.header {
		position: relative;
		width: 100%;
		height: 100px;
		background: #252831;
	}
	.user {
		float: right;
		margin-right: 50px;
	}
	.user > ul > li {
		display: inline-block;
		line-height: 100px;
		height: 100px;
		margin-right: 15px;
		color: #ffffff;
	}
	.user > ul > li:nth-child(3) {
		cursor: pointer;
	}
	.logo {
		position: absolute;
		height: 80px;
		width: 80px;
		margin: 15px 60px;
		display: inline-block;
	}
	/* .titleN {
		float: left;
		display: inline-block;
	} */
	.titleT {
		margin-top: 30px;
		margin-left: 18%;
		color: #909399;
		font-size: 30px;
		font-faimly: "宋体";
		position: absolute;
	}
</style>
