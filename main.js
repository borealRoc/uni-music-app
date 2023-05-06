import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import './css/index.scss'


import RecommendSong from '@/components/global/recommend-song/RecommendSong.vue'
Vue.component('recommend-song', RecommendSong)

import './libs/iconfont.js'
import SvgIcon from '@/components/global/svg-icon/SvgIcon'
Vue.component('svg-icon', SvgIcon)

Vue.prototype.$imgSuffix = '?imageView&thumbnail=369x0&quality=75&tostatic=0';

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif