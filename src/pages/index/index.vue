<template>
  <layout>
    <view class="content">
      <view class="Personal-Information">
        <view class="info-item">Age : 98年</view>
        <view class="info-item">Gender : 男</view>
        <view class="info-item">Graduation institution : </view>
<!--        <view>Graduation institution : </view>-->
      </view>
    </view>
  </layout>
</template>

<script setup>
import layout from '@/components/layout/layout.vue'

</script>

<style lang="scss" scoped>
.content{
  display: flex;
  .Personal-Information{
    width: 25%;
    padding: 50rpx;
    border-radius: 20rpx;
    //background: #e8bebe;
    box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
    .info-item{
      margin-bottom:15rpx;
    }
  }
}
</style>
