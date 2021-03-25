import { from } from "core-js/fn/array";
import Vue from "vue";
import Vuex from "vuex";
import { setStore } from "@/utils/storage";
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		login: false, //是否登录
		userInfo: null, //用户信息
		cartList: [], //加入购物车
		showCart: false,
	},
	mutations: {
		SHOWCART(state, { showCart }) {
			state.showCart = showCart;
		},
		ISLOGIN(state, info) {
			state.userInfo = info;
			state.login = true;
			setStore("userInfo", info);
		},
	},
});
