import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import Axios from "axios";
import "@/assets/font/iconfont.css";
import axios from "axios";
import VCharts from "v-charts-v2";
// import * as VCharts from "v-charts-v2";

import { getStore } from "@/utils/storage";
// import VCharts from "vue-echarts";
// import "echarts/lib/chart/line";

import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	throttleWait: 1000,
	attempt: 1,
});

// import VueCompositionApi from "@vue/composition-api";

// Vue.use(VueCompositionApi);

// import VCharts from "v-charts";
Vue.use(VCharts);

Vue.prototype.$http = Axios;
//挂载axios到vue的原型，由于继承性所有的组件都可以使用this.$http
Vue.use(router);
Vue.use(ElementUI);

// 请求拦截器
axios.interceptors.request.use(
	config => {
		const token = getStore("token");
		if (token) {
			//表示用户已登录
			config.headers.common["Authorization"] = token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
//守卫
router.beforeEach((to, from, next) => {
	axios
		.post("http://localhost:8080/validate", {})
		.then(res => {
			let data = res.data;
			if (data.statusCode !== 200) {
				//用户要登录
				if (to.matched.some(record => record.meta.auth)) {
					//用户未登录，需要跳转登录页面
					next({
						path: "/login",
						query: {
							//重定向了
							redirect: to.fullPath,
						},
					});
				} else {
					next();
				}
			} else {
				store.commit("ISLOGIN", data);
				if (to.path === "/login") {
					router.push({
						path: "/home",
					});
				}
				next();
			}
		})
		.catch(error => {
			console.log(err);
		});
});

new Vue({
	el: "#app",
	Axios,
	store,
	router: router,
	render: h => h(App),
});
Vue.config.productionTip = false;
