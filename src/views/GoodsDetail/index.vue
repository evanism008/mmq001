<!--  -->
<template>
	<div>
		<!-- style="background:#ffff" -->
		<el-row>
			<el-col :span="10"
				><div class="leftImg">
					<!-- <img src="../../assets/img/mainImg/101.jpg" class="image" /> -->
					<img :src="data.src" class="image" />
				</div>
				<div class="leftImgbt">
					<img src="../../assets/img/bott.png" class="image" /></div
			></el-col>
			<el-col :span="14">
				<div class="content">
					<ul>
						<li style="font-size:25px">
							{{ data.goods_name }}{{ data.goods_canshu }}
							<!-- HUAWEI Mate 30E Pro 5G 全网通 8GB+128GB（丹霞橙） -->
						</li>
						<li style="margin-top:10px">
							<span style="color:red;font-size:16px"
								>【新品上市】①享3期免息 3月8日0点再次开售！购机享延保5折，碎屏保8折；赠5G定制电话卡</span
							>
						</li>
						<li class="detail">
							<el-row>
								<el-col :span="3" class="premoney">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格:</el-col>
								<el-col class="money">￥{{ data.goods_price }}</el-col>
							</el-row>
							<el-row>
								<el-col :span="3" class="premoney">商品参数:</el-col>
								<el-col :span="20" style="font-size:14px;line-height:28px"
									>{{ data.goods_canshu }}
									<!-- 麒麟990E
									5G旗舰SoC芯片，支持双模SA/NSA；超感光徕卡电影影像；超曲面OLED环幕屏；40W有线与27W无线双超级快充；3D面容支付与屏内指纹识别 -->
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="3" class="premoney">服务说明:</el-col>
								<el-col :span="20" style="font-size:14px;line-height:28px"
									>现货，今天21:59前付款，预计3月6日（周六）送达 已满48元已免运费
									由华为商城负责发货，并提供售后服务</el-col
								>
							</el-row>
							<el-row>
								<el-col :span="3" class="premoney">促销说明:</el-col>
								<el-col :span="20" style="font-size:14px;line-height:28px"
									>现货， 满48元已免运费 由华为商城负责发货，并提供售后服务</el-col
								>
							</el-row>
							<el-row>
								<el-col :span="3" class="premoney">商品编码:</el-col>
								<el-col :span="20" style="font-size:14px;line-height:28px">{{ data.goods_no }}</el-col>
							</el-row>
							<el-row>
								<el-col :span="3" class="premoney">商品数量:</el-col>
								<el-col :span="20" style="font-size:14px;line-height:28px"
									><el-input-number
										size="mini"
										v-model="num"
										@change="handleChange"
										:min="1"
										:max="10"
										label="描述文字"
									></el-input-number
								></el-col>
							</el-row>
							<el-row>
								<el-col :span="6" class="premoney"> <span class="joinCart" @click="addCart()">加入购物车</span></el-col>
								<el-col :span="18"><span class="joinBuy" @click="goBuy()">立即下单</span></el-col>
							</el-row>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
		<div style="width:170px;font-size:28px;margin:0px auto;color:#9999">COMMENTS</div>
		<el-divider content-position="center" style="border:3px"
			><h2 style="font-size:28px;color:#666666">评论详情</h2></el-divider
		>
		<!-- 评论详情 -->
		<div
			style="width:80%;margin:20px auto;	padding-bottom:20px; border-bottom: 1px solid #f67000"
			v-for="(item, i) in comData"
			:key="i"
		>
			<el-row>
				<el-col :span="3" :offset="1">
					<el-avatar
						src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
						style="height:100px;width:100px"
					></el-avatar>
				</el-col>
				<el-col :span="3" style="padding-top:50px;color:#E6A23C;font-size:16px">
					<span>用户:{{ item.cno }}</span>
				</el-col>
				<el-col :span="16">
					<el-row style="color:#f67000;font-size:26px"
						><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
						><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
					></el-row>
					<el-row>
						<el-rate
							v-model="value"
							:icon-classes="iconClasses"
							void-icon-class="icon-rate-face-off"
							:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
						>
						</el-rate>
					</el-row>
					<el-row
						><span style="line-height:25px">{{ item.content }}</span></el-row
					>
					<el-row
						><div style="width:100px;height:100px;margin-top:20px" v-if="item.src">
							<img :src="item.src" alt="" srcset="" width="100%" height="100%" /></div
					></el-row>
					<el-row style="color:#9999;margin-top:10px">
						{{ item.comDate }}
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { removeStore, getStore, setStore } from "@/utils/storage";
	export default {
		data() {
			return {
				value: null,
				iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
				num: 1,
				data: [],
				comData: [],
				orderId: "",
			};
		},
		mounted() {},
		computed: {
			...mapState(["login", "userInfo"]),
		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			addCart() {
				this.$http
					.post("http://localhost:8080/addCart", {
						cno: this.userInfo.cno,
						amount: this.num,
						no: this.data.goods_no,
						price: this.data.goods_price,
					})
					.then(res => {
						console.log(res);
						if (res.data.statusCode === 200) {
							this.$message.success(res.data.msg);
							this.$router.push({
								path: "CartList",
								query: {
									cno: this.userInfo.cno,
								},
							});
						} else {
							this.$message.error("您已经添加过该商品了，请去购物车查看");
						}
					});
			},
			goBuy() {
				this.$http
					.post("http://localhost:8080/addOrder", {
						no: this.data.goods_no,
						num: this.num,
						price: this.data.goods_price * this.num, //总价
						cno: this.userInfo.cno,
						name: this.data.goods_name,
					})
					.then(res => {
						console.log(res);
						if (res.data.statusCode === 200) {
							console.log(res.data.orderId);
							this.orderId = res.data.orderId;
							this.$message.success(res.data.msg);
							this.$router.push({
								path: "BuyList",
								query: {
									orderId: this.orderId,
								},
							});
						} else {
							this.$message.error(res.data.msg);
						}
					});
			},
			getGoodsDtail() {
				this.$http
					.post("http://localhost:8080/viewData", {
						goods_no: this.$route.query.goods_no,
					})
					.then(res => {
						console.log(res);
						this.data = res.data[0];
						this.data.src = require("@/assets/img/mainImg/" + this.data.goods_img);
					});
			},
			//获取评论
			getaddCom() {
				this.$http.post("http://localhost:8080/getCom", {}).then(res => {
					this.comData = res.data;
					console.log(this.comData);
					this.comData.forEach(function(ele) {
						if (ele.imgs) {
							ele.src = require("@/assets/img/pinglun/" + ele.imgs);
						}
					});
					this.comData = this.comData.filter(item => {
						return item.commentsStatus === 0;
					});
				});
			},
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {
			this.getGoodsDtail();
			this.getaddCom();
		},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.leftImg {
		border: 1px solid #f79400ee;
		width: 400px;
		height: 400px;
		margin: 50px;
		border-radius: 10px;
		overflow: hidden;
	}
	.content {
		/* border: 1px solid #f67000; */
		width: 100%;
		height: 600px;
		margin: 50px auto;
		border-radius: 10px;
	}
	.leftImg img {
		cursor: pointer;
		transition: all 0.6s;
	}
	.leftImg img:hover {
		transform: scale(1.4);
	}
	.leftImgbt {
		margin: 50px;
		border-radius: 2px;
		overflow: hidden;
	}
	.image {
		width: 100%;
		display: block;
	}
	.detail {
		height: 500px;
		background: rgba(212, 205, 205, 0.212);
		margin-top: 20px;
		padding: 10px 15px;
	}
	.money {
		font-size: 22px;

		max-width: 122px;
		overflow: hidden;
		white-space: nowrap;
		color: rgb(221, 9, 9);
	}
	.premoney {
		display: inline-block;
		height: 28px;
		line-height: 28px;
		font-size: 14px;
	}
	.detail .el-col {
		margin-top: 10px;
	}
	.joinCart {
		font-size: 18px;
		margin: 20px 50px;
		display: block;
		width: 150px;
		height: 40px;
		background-color: #f67000;
		color: #ffffff;
		line-height: 40px;
		padding-left: 35px;
	}
	.joinBuy {
		font-size: 18px;
		margin: 20px 50px;
		display: block;
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
	.joinCart:hover {
		background-color: #f66f00b6;
		cursor: pointer;
	}
	.el-divider {
		margin: 20px 0 60px 0;
		background: 0 0;
		border-top: 3px solid #f66f0052;
	}
</style>
