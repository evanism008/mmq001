import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Goods from "@/views/Goods";
import User from "@/views/User";
import Register from "@/views/Register";
import GoodsDetail from "@/views/GoodsDetail";
import CartList from "@/views/CartList";
import BuyList from "@/views/BuyList";
import MyOrder from "@/views/MyOrder";
import PaySuccess from "@/views/PaySuccess";
import AddCom from "@/views/AddCom";
Vue.use(Router);
export default new Router({
	routes: [
		{
			path: "/",
			redirect: "/home",
			name: "home",
			component: Index,
			children: [
				{
					path: "home",
					component: Home,
				},
				{
					path: "goods",
					component: Goods,
				},
				{
					path: "paySuccess",
					component: PaySuccess,
				},
				{
					path: "BuyList",
					component: BuyList,
				},
				{
					path: "addCom",
					component: AddCom,
				},
				{
					path: "goodsDetail",
					name: "goodsDetail",
					component: GoodsDetail,
					meta: {
						//需要守卫
						auth: true,
					},
				},
				{
					path: "CartList",
					component: CartList,
				},
				{
					path: "myOrder",
					component: MyOrder,
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/user",
			name: "user",
			component: User,
			meta: {
				//需要守卫
				auth: true,
			},
		},

		// 后台管理
		{
			path: "/admin/adminLogin",
			name: "adminLogin",
			component: () => import("@/views/admin/Login"),
		},
		{
			path: "/test",
			name: "test",
			component: () => import("@/views/admin/components/test"),
		},
		{
			path: "/admin/index",
			name: "adminIndex",
			component: () => import("@/views/admin/index"),
			children: [
				{
					path: "/admin/all_list",
					component: () => import("@/views/admin/components/all_list"),
				},
				{
					path: "/admin/phone_list",
					component: () => import("@/views/admin/components/phone_list"),
				},

				{
					path: "/admin/accessories_list",
					component: () => import("@/views/admin/components/accessories_list"),
				},
				{
					path: "/admin/order_list",
					component: () => import("@/views/admin/components/order_list"),
				},
				{
					path: "/admin/sales_list",
					component: () => import("@/views/admin/components/sales_list"),
				},
				{
					path: "/admin/customer_list",
					component: () => import("@/views/admin/components/customer_list"),
				},
				{
					path: "/admin/comments_list",
					component: () => import("@/views/admin/components/comments_list"),
				},
			],
		},
	],
});
