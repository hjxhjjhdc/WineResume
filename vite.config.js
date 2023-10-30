import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3300
  },
  resolve: { // 这里配置需要注意：Vite新版本resolve配置改为对象形式，如下：
    alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, "src"),
        }
      ]
  },
  plugins: [
    uni(),
  ],
})
