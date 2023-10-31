<template>
  <layout>
    <view class="content">
      <person-info></person-info>
    </view>
  </layout>
</template>

<script setup>
import layout from '@/components/layout/layout.vue'
import personInfo from '@/components/about-com/side-person-info.vue'
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  padding-bottom: 50rpx;
}
</style>
