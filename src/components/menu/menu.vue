<template>
  <view class="menu">
    <view v-for="item in menu" class="menu-item">
      {{ item.menuTag }}
    </view>
  </view>
</template>

<script setup>
import {reactive} from 'vue'
const menu =reactive([
  {
    menuTag:'关于我'
  }
])
</script>

<style scoped lang="scss">
.menu{
  padding-top: 50rpx;
  display: flex;
  .menu-item{
    margin-right: 20rpx;
    padding: 10rpx  20rpx;
    cursor: pointer;
    &:hover{
      border-radius: 10rpx;
      background: #e8bebe;
      color: white;
    }
  }
}
</style>