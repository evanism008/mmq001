<template>
	<div>
		<header class="header">
			<div class="header-top">
				<el-row>
					<el-col :span="3"
						><div class="grid-content bg-purple">
							<div class="logo">
								<router-link to="/" title="商城官网"
									><img src="@/assets/logo.png" alt="logo" width="100%" height="100%"
								/></router-link>
							</div></div
					></el-col>
					<el-col :span="6"
						><span style="display:block;color:#f67000;font-size:25px;font-family:'宋体';padding-top:25px"
							>嗨！购机！</span
						></el-col
					>
					<el-col :span="7"
						><div class="grid-content bg-purple-light">
							<div class="search">
								<el-input placeholder="请输入商品信息" suffix-icon="el-icon-search" v-model="input" size="small">
								</el-input>
							</div></div
					></el-col>
					<el-col :span="8"
						><div class="grid-content bg-purple">
							<ul class="icc">
								<li>
									<!-- <div class="block" style="margin-top:15px"><el-avatar :size="40" :src="circleUrl"></el-avatar></div> -->
									<!-- <span v-if="login">{{ userInfo.name }}</span> -->
									<el-dropdown v-if="login" @command="handleCommand">
										<span class="el-dropdown-link">
											{{ userInfo.cno }}<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="a">个人中心</el-dropdown-item>
											<el-dropdown-item command="b">我的订单</el-dropdown-item>
											<el-dropdown-item command="c">我的购物车</el-dropdown-item>
											<el-dropdown-item command="d">我的优惠券</el-dropdown-item>
											<el-dropdown-item divided command="e">退出登录</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
									<router-link to="/login" v-else>
										<span>登录/注册</span>
									</router-link>
								</li>
								<li @click="myCart()" style="cursor: pointer;">
									<!-- <i class="iconfont icon-gouwuche"></i> -->
									我的购物车(<span style="color:#f67000">{{ cartCount }}</span
									>)
								</li>
							</ul>
							<ul class="list">
								<li><router-link to="/goods">全部商品</router-link></li>
								<li><router-link to="/admin/adminLogin" @click="admin">后台管理</router-link></li>
							</ul>
						</div></el-col
					>
				</el-row>
			</div>
			<div class="header-botton">
				<ul>
					<li>
						<router-link to="/"> 首页</router-link>
					</li>
					<li><router-link to="/"> 近期活动</router-link></li>
					<li><router-link to="/"> 商品分类</router-link></li>
					<li><router-link to="/"> 周边品牌</router-link></li>
					<li><router-link to="/"> 平台宣传</router-link></li>
					<li><router-link to="/"> 公司简介</router-link></li>
				</ul>
			</div>
			<div class="manu"></div>
		</header>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { removeStore, getStore, setStore } from "@/utils/storage";
	export default {
		data() {
			return {
				input: "",
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				sizeList: ["large", "medium", "small"],
				cartCount: 0,
			};
		},

		created() {},
		mounted() {},
		computed: {
			...mapState(["login", "userInfo"]),
		},
		methods: {
			selectCartCount() {
				this.$http.post("http://localhost:8080/viewCart", { cno: this.userInfo.cno }).then(res => {
					if (res.status === 200) {
						this.cartCount = res.data.length;
					}
				});
			},
			myCart() {
				this.$router.push({
					path: "CartList",
					query: {
						cno: this.userInfo.cno,
					},
				});
			},
			myOrder() {
				this.$router.push({
					path: "myOrder",
					query: {
						cno: this.userInfo.cno,
					},
				});
			},
			handleCommand(command) {
				if (command === "e") {
					console.log("推出");
					removeStore("token");
					// removeStore("buyCart");
					window.location.href = "/home";
				} else if (command === "c") {
					this.myCart();
				} else if (command === "b") {
					this.myOrder();
				}
			},
			admin() {
				removeStore("token");
			},
		},
		created() {
			if (this.login) {
				this.selectCartCount();
			}
		},
	};
</script>
<style scoped>
	.header {
		height: 120px;
		width: 100%;
		/* position: fixed; */
		margin-top: -1px;
		z-index: 999;
	}
	.header-top {
		height: 80px;
		width: 100%;
		background: #333333;
	}
	.header-top .logo {
		position: relative;
		height: 60px;
		width: 80px;
		margin: 10px 30px;
	}
	.header-top .search {
		margin: 24px 10%;
		background-color: #ededed;
		border-radius: 5px;
	}
	.icc {
		float: right;
	}
	.list li {
		display: inline-block;
		color: #ffffff;
		line-height: 80px;
		margin-right: 30px;
		height: 80px;
	}
	.icc li {
		display: inline-block;
		line-height: 80px;
		height: 80px;
		margin-right: 30px;
		color: #ffffff;
	}
	.header-botton {
		height: 50px;
		width: 100%;
		background: #ffffff;
		border-bottom: #ebcbcb1f;
		-moz-box-shadow: 0px 0px 5px #696060;
		-webkit-box-shadow: 0px 0px 5px #574e4e;
		box-shadow: 0px 0px 5px #a19393;
		padding-left: 7.5%;
	}
	.header-botton > ul > li {
		display: inline-block;
		margin-right: 40px;
		line-height: 50px;
		height: 50px;
	}
	.el-dropdown-link {
		cursor: pointer;
		color: #ffffff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
	.manu {
		height: 0px;
		background: rgba(0, 0, 0, 0.1);
		transition: all 0.3s;
		overflow: hidden;
	}
	.header-botton:hover .manu {
		height: 285px;
		width: 100%;
	}
</style>
