<template>
  <view class="top-header">
<!--    left-->
   <view class="left-info">
     <view class="icon">
       <image src="/static/icon/headerico.png" mode="aspectFill" style="width: 100%;height: 100%"></image>
     </view>
     <view class="info">
       <view class="user">
         Wine
       </view>
       <view class="introduction">
         一名前端开发工程师
       </view>
     </view>
   </view>
<!--    right-->
    <view class="right-btn">
<!--      <view @click="eyeProtection" style="cursor: pointer">护眼</view>-->
    </view>
  </view>
</template>

<script setup>
const eyeProtection = ()=>{

}
</script>

<style scoped lang="scss">
.top-header {
  width: 100%;
  height: 120rpx;
  padding-top: 100rpx;
  display: flex;
  justify-content: space-between;
  .left-info{
    display: flex;
    align-items: center;
    .icon {
      border-radius: 50%;
      overflow: hidden;
      height: 120rpx;
      width: 120rpx;
    }

    .info {
      font-weight: 600;
      margin-left: 40rpx;

      .user {
        margin-bottom: 10rpx;
        font-size: 40rpx;
      }

      .introduction {
        text-shadow:0 0 15rpx rgba(0, 0, 0,.8);
        font-size: 35rpx;
        //color: #c0c0c0;
        color: #fff;
      }
    }
  }
  .right-btn{

  }
}
</style>