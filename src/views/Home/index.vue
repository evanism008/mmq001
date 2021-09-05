<!--  -->
<template>
	<div class="home" v-if="data">
		<!-- 轮播图 -->
		<div class="banner">
			<el-carousel indicator-position="outside" height="550px">
				<el-carousel-item v-for="item in banner" :key="item">
					<img :src="item" alt="" srcset="" width="100%" height="100%" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- <img src="../../assets/img/cart/buttom.jpg" width="100%" /> -->
		<!-- <div> -->
		<el-row class="banner"
			><el-col :span="8">
				<el-card shadow="hover" body-style="border:2px">
					<img
						src="../../assets/img/1.jpg"
						alt=""
						style="width:100%;height:100%;border-bottom:1px solid #f47920"
					/> </el-card></el-col
			><el-col :span="8">
				<el-card shadow="hover">
					<img
						src="../../assets/img/2.jpg"
						alt=""
						style="width:100%;height:100%;border-bottom:1px solid #f3715c"
					/> </el-card></el-col
			><el-col :span="8">
				<el-card shadow="hover">
					<img src="../../assets/img/3.jpg" alt="" style="width:100%;height:100%;border-bottom:1px solid #1d953f"
				/></el-card>
			</el-col>
		</el-row>
		<!-- </div> -->
		<!-- 爆款手机推荐 -->
		<div class="listFirst">
			<div style="width:345px;font-size:28px;margin:0px auto;color:#9999">HOTRECOMMENDATION</div>
			<el-divider content-position="center"><h2 style="font-size:28px">爆款手机推荐</h2></el-divider>
			<el-row>
				<el-col :span="6" v-for="(o, i) in homeList" :key="i">
					<el-card :body-style="{ padding: '10px' }" shadow="hover">
						<div class="imgK"><img :src="o.src" class="image" /></div>

						<!-- <img src="../../assets/img/hotT/56eb6f95Nea3fac74.jpg" class="image" /> -->
						<div style="padding:1px 10px 20px 10px">
							<span style="padding:10px 40px;font-size:20px">{{ o.goods_name }}</span>
							<span style="font-size: 10px;color:#cccccc;display:block;margin-top:5px">{{ o.goods_canshu }}</span>
							<div class="bottom clearfix">
								<span class="money">￥{{ o.goods_price }}</span>
								<el-button type="text" class="button" @click="goBuy(o.goods_no)">去购买</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<!-- 周边品牌 -->
		<div class="listTwo">
			<div style="width:345px;font-size:28px;margin:0px auto;color:#9999">HOTRECOMMENDATION</div>
			<el-divider content-position="center" style="border:3px"><h2 style="font-size:28px">周边品牌推荐</h2></el-divider>
			<el-row>
				<el-col :span="7" v-for="(o, i) in otherList" :key="i" style="margin:23px;border:1px dotted #1d953f;"
					><el-card shadow="hover">
						<el-col :span="14"
							><div class="grid-content bg-purple">
								<!-- <img src="../../assets/img/1.png" alt="" srcset="" width="100%" height="100%" />-->
							</div>
							<img :src="o.src" class="image" />
						</el-col>
						<el-col :span="10"
							><div class="grid-content bg-purple-light">
								<div style="padding:14px">
									<span style="padding:2px;font-size:16px">{{ o.goods_name }}</span>
									<span style="font-size: 10px;color:#cccccc;display:block;margin-top:15px">【直降50元】超值抢购</span>
									<div class="bottom clearfix">
										<span class="moneyt">￥{{ o.goods_price }}</span>
										<el-button type="text" class="button" @click="goBuy(o.goods_no)">去购买</el-button>
									</div>
								</div>
							</div></el-col
						></el-card
					>
				</el-col></el-row
			>
		</div>

		<div>
			<img v-for="url in urls" :key="url" v-lazy="url" width="100%" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				banner: [
					require("../../assets/img/slide-img/sl1.jpg"),
					require("../../assets/img/slide-img/sl2.jpg"),
					require("../../assets/img/slide-img/sl3.jpg"),
					require("../../assets/img/slide-img/sl4.jpg"),
					require("../../assets/img/slide-img/sl5.jpg"),
					require("../../assets/img/slide-img/sl6.jpg"),
				],
				urls: [require("../../assets/img/lazy-img/l1.jpg"), require("../../assets/img/lazy-img/l2.jpg")],
				data: null,
				homeList: [],
				otherList: [],
				Img: "../../assets/img/mainImg/",
			};
		},
		methods: {
			goBuy(goods_no) {
				// 编程式导航
				this.$router.push({
					name: "goodsDetail",
					query: {
						goods_no: goods_no,
					},
				});
			},
			getAll() {
				this.$http
					.get("http://localhost:8080/goodsdata", {})
					.then(res => {
						console.log(res);
						this.data = res.data;
						this.data.forEach(ele => {
							ele.src = require("@/assets/img/mainImg/" + ele.goods_img);
						});
						this.homeList = this.data.filter(function(item) {
							return item.goods_stype_id != 9 && item.hotType === 1;
						});
						this.otherList = this.data.filter(function(item) {
							return item.goods_stype_id === 9 && item.hotType === 1;
						});
						console.log(this.homeList);
					})
					.catch(err => {
						console.log(err);
					});
			},
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {
			this.getAll();
		},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.home {
		/* margin-top: 170px; */
		display: flex;
		flex-direction: column;
	}
	.banner {
		width: 100%;
		margin: 4px auto;
	}
	.el-carousel__item h3 {
		color: #294f81;
		font-size: 14px;
		opacity: 0.75;
		line-height: 400px;
		margin: 0;
	}
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
	.listFirst {
		width: 95%;
		height: auto;
		/* border: 1px solid #294f81; */
		margin: 50px auto;
	}
	.listTwo {
		width: 95%;
		height: 700px;
		border-radius: 10px;
		/* background: #f4f5f7; */
		margin: 10px auto;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}
	.imgK {
		width: 100%;
		overflow: hidden;
		height: 280px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both;
	}

	.money {
		font-size: 22px;
		font-weight: bold;
		max-width: 122px;
		overflow: hidden;
		white-space: nowrap;
		color: rgb(221, 9, 9);
		margin-left: 60px;
	}
	.moneyt {
		height: 40px;
		line-height: 40px;
		font-size: 22px;
		font-weight: bold;
		max-width: 122px;
		overflow: hidden;
		white-space: nowrap;
		color: rgb(221, 9, 9);
		display: block;
		margin-top: 20px;
	}

	.el-card img {
		cursor: pointer;
		transition: all 0.6s;
	}
	.el-card img:hover {
		transform: scale(1.1);
	}
	.el-divider {
		margin: 20px 0 60px 0;
		background: 0 0;
		border-top: 3px solid #f66f0052;
	}
</style>
