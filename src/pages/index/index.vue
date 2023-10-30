<template>
  <view class="externalBox">
    <!--    content-->
    <view class="content">
      <!--      info-->
      <information></information>
      <!--      menu-->
      <m-menu></m-menu>

    </view>
  </view>
</template>

<script setup>
import information from '@/components/information/information.vue'
import mMenu from '@/components/menu/menu.vue'

</script>

<style lang="scss" scoped>
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
</style>
