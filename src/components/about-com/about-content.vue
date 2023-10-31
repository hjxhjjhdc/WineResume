<template>
  <view class="content-box" v-html="marked.parse(content)">
  </view>
</template>

<script setup>
import  * as marked from 'marked'
import {ref} from "vue";

const content = ref(`
  ## 专业技能
 1. 熟练掌握前端基础（JavaScript、CSS3、HTML5），能够快速实现Web端和移动端页面搭建。
  2. 熟悉App开发，包括云函数、云数据库、云存储和云托管以及 H5 页面开发。
  3. 熟练使用 Vue 框架以及相关生态技术，能够独立完成项目搭建和项目部署，熟悉相关框架原理。
  4. 了解 Angular 框架技术，有相关实践经验。
  5. 熟悉浏览器原理以及计算机网络相关技术，在性能优化方面有实践经验。
  6. 对前端工程模块化有一定理解，熟悉webpack、vite等打包工具及其日常开发配置，可以从0到1独立搭建项目，并优化构建流程。
  7.
  8.
9.
10.
11.
12.
  `)

</script>

<style scoped lang="scss">
*{
  padding: 0;
  margin: 0;
}
.content-box{
  padding: 50rpx;
  border-radius: 20rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  margin-left: 50rpx;
}
</style>