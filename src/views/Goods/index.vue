<!--  -->
<template>
	<div class="allgoods">
		<div class="listFirst">
			<div style="margin:40px 20px;color:#333333;">
				<el-row>
					<el-col :span="5">
						<!-- <a
							@click="handleSort(i)"
							:class="{ printer: i === isIndex }"
							v-for="(navItem, i) in navList"
							:key="i"
							style="margin-right:20px;"
							>{{ navItem.title }}</a
						> -->
						<span>价格排序：</span>
						<el-select v-model="value" placeholder="请选择" @change="handleSort(value)" size="mini" style="width:110px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</el-col>

					<el-col :span="4">
						<span>价格搜索：</span>
						<el-input placeholder="价格" v-model="min" clearable size="mini" type="number" style="width:80px">
						</el-input>
						&nbsp;—</el-col
					>
					<el-col :span="2"
						><el-input placeholder="价格" v-model="max" clearable size="mini" type="number" style="width:80px">
						</el-input
					></el-col>
					<el-col :span="2" style="cursor: pointer;"><el-tag @click="reset" size="medium">搜索</el-tag></el-col>
					<el-col :span="5">
						<span>按品牌分类：</span>
						<el-select v-model="value1" placeholder="请选择" size="mini" style="width:100px" @change="handleFn(value1)">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="6"
						><span>模糊搜索：</span>
						<el-input
							placeholder="请输入商品信息"
							suffix-icon="el-icon-search"
							v-model="search"
							size="mini"
							style="width:200px"
							@change="onSearch(search)"
						></el-input>
						<!-- <el-input
							placeholder="请输入商品名/售价"
							width="200"
							v-model="search"
							size="mini"
							style="width:200px;margin-right:10px"
						></el-input
						><el-button type="primary" icon="el-icon-search" @click="onSearch" size="mini"></el-button
					> -->
					</el-col>
				</el-row>
				<el-divider></el-divider>
			</div>
			<el-row>
				<el-col
					:span="5"
					style="height:358px;overfloat:hidden;margin:23px"
					v-for="(o, i) in data.slice((currentPage1 - 1) * pageSize, currentPage1 * pageSize)"
					:key="i"
				>
					<el-card :body-style="{ padding: '10px' }" shadow="hover">
						<img :src="o.src" class="image" />
						<!-- <img src="../../assets/img/hotT/56eb6f95Nea3fac74.jpg" class="image" /> -->
						<div style="padding:14px">
							<span style="padding:15px">{{ o.goods_name }}</span>
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
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage1"
				:page-size="pageSize"
				layout="total, prev, pager, next"
				:total="total"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				total: 0,
				currentPage1: 0,
				pageSize: 8,
				input: "",
				sort: "",
				max: "",
				min: "",
				search: "",
				options: [
					{
						value: 0,
						label: "综合排序",
					},
					{
						value: 1,
						label: "由低到高",
					},
					{
						value: 2,
						label: "由高到低",
					},
				],
				value: "",
				options1: [
					{
						value: 1,
						label: "华为手机",
					},
					{
						value: 2,
						label: "小米手机",
					},
					{
						value: 3,
						label: "Redmi手机",
					},
					{
						value: 4,
						label: "vivo手机",
					},
					{
						value: 5,
						label: "oppo手机",
					},
					{
						value: 6,
						label: "一加手机",
					},
					{
						value: 7,
						label: "苹果手机",
					},
					{
						value: 8,
						label: "其他手机",
					},
					{
						value: 9,
						label: "周边配件",
					},
				],
				value1: "",
				navList: [{ title: "综合排序" }, { title: "价格由低到高" }, { title: "价格由高到低" }],
				isIndex: 0,
			};
		},
		watch: {
			$route: "getAllGoods",
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
			// 按品牌分类
			handleFn(v) {
				this.$http
					.post("http://localhost:8080/allGoods", {})
					.then(res => {
						this.data = res.data;
						this.data.forEach(ele => {
							ele.src = require("@/assets/img/mainImg/" + ele.goods_img);
						});
						this.data = this.data.filter(function(item) {
							return item.goods_stype_id === v;
						});
						this.total = this.data.length;
					})
					.catch(err => {
						console.log(err);
					});
			},
			//搜索
			onSearch(v) {
				let params = { search: v };
				this.$http
					.post("http://localhost:8080/getsearchData", params)
					.then(res => {
						this.data = res.data;
						this.total = this.data.length;
						this.data.forEach(ele => {
							ele.src = require("@/assets/img/mainImg/" + ele.goods_img);
						});
						console.log(this.data);
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			getAllGoods() {
				let params = {
					sort: this.sort,
					max: this.max,
					min: this.min,
				};
				this.$http
					.post("http://localhost:8080/allGoods", params)
					.then(res => {
						console.log(res);
						this.data = res.data;
						this.total = this.data.length;
						this.data.forEach(ele => {
							ele.src = require("@/assets/img/mainImg/" + ele.goods_img);
						});
						this.homeList = this.data.find(item => item.goods_stype_id != 9);
						this.otherList = this.data.find(item => item.goods_stype_id === 9);
						// console.log(this.homeList);
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 排序

			priceSort(v) {
				this.sort = v;
				this.getAllGoods();
			},
			reset() {
				this.currentPage = 1;
				this.sort = "";
				this.getAllGoods();
			},
			handleSort(i) {
				this.isIndex = i;
				switch (i) {
					case 0:
						//   综合排序
						(this.max = ""), (this.min = ""), this.reset();
						break;
					case 1:
						this.priceSort(1);
						//   正序
						break;
					case 2:
						this.priceSort(-1);
						//   倒序
						break;

					default:
						break;
				}
				console.log(i);
			},
		},
		//生命周期 - 创建完成（访问当前this实例）
		created() {
			this.getAllGoods();
		},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.allgoods {
		position: relative;
	}
	.listFirst {
		width: 90%;
		height: auto;
		/* border: 1px solid #294f81; */
		margin: 10px auto;
	}
	.money {
		font-size: 22px;
		font-weight: bold;
		max-width: 122px;
		overflow: hidden;
		white-space: nowrap;
		color: rgb(221, 9, 9);
		margin-left: 40px;
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
		height: 215px;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.printer {
		color: #f67000;
		cursor: pointer;
		transition: 0.5s;
	}
	/* .printer:hover {
		color: #f67000;
		cursor: pointer;
		transition: 0.5s;
	} */

	.clearfix:after {
		clear: both;
	}
	.block {
		margin: 30px 400px;
	}
	.el-card img {
		cursor: pointer;
		transition: all 0.6s;
	}
	.el-card img:hover {
		transform: scale(1.4);
	}

	.el-divider {
		margin: 20px 0 60px 0;
		background: 0 0;
		border-top: 3px solid #f66f0052;
	}
</style>
