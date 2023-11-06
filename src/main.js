import {
	createSSRApp
} from "vue";
import { createPinia } from 'pinia'

import App from "./App.vue";
import piniaToLocalStoragePlugin from "./store/piniaToLocalStoragePlugin";
const store = createPinia()
// todo 节流 （暂）
store.use( piniaToLocalStoragePlugin({
	key: 'pinia', // 这是给缓存到本地时，加一个特殊的前缀，以免造成污染到其他缓存数据
}))
export function createApp() {
	const app = createSSRApp(App).use(store);
	return {
		app,
	};
}
