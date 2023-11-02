<template>
  <view class="externalBox">
    <!--    content-->
    <view class="content">
      <!--      info-->
      <information></information>
      <!--      menu-->
      <m-menu></m-menu>
      <!--      slot-->
      <view style="margin-top: 60rpx">
        <slot></slot>
      </view>
    </view>
  </view>
  <view class="fix-top" v-show="scrollFlag" @click="toTop">
    <view class="icon">👆</view>
  </view>
</template>

<script setup>
import information from '@/components/information/information.vue'
import mMenu from '@/components/menu/menu.vue'
import {onMounted, ref} from "vue";
import * as _ from "lodash";

const scrollFlag = ref(false)
const handleScroll = () => {
  scrollFlag.value = window.scrollY > 300;
}
/**
 *  回滚至头部
 */
const toTop = () => {
  let time = setInterval(() => {
    document.documentElement.scrollTop = document.documentElement.scrollTop - 50;
    if (window.scrollY <= 0) {
      clearInterval(time)
    }
  }, 10)
}
onMounted(() => {
  window.addEventListener("scroll", _.throttle(handleScroll, 100))
})
</script>

<style scoped lang="scss">
.externalBox {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rpx;

  .content {
    max-width: 1200px;
    width: 90%;
  }
}

.fix-top {
  position: fixed;
  bottom: 150rpx;
  right: 150rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;

  .icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>