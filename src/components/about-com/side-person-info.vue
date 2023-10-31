<template>
  <view class="Personal-Information">
    <view class="info-item">
      <view>Age :</view>
      <view>98年</view>
    </view>
    <view class="info-item">
      <view>Gender :</view>
      <view> 男</view>
    </view>
    <view class="info-item">
      <view>Education :</view>
      <view> 本科 </view>
    </view>
    <view class="info-item">
      <view>Seniority :</view>
      <view> Three Year </view>
    </view>
    <view class="info-item">
      <view>Address :</view>
      <view>济南</view>
    </view>
    <view class="info-item qrcode-box">
      <view>E-mail :</view>
      <view>
        <view class="iconfont icon-ico icon-qrcode" @mouseenter="qrcodeOpen" @mouseleave="qrcodeOpen"></view>
        <view class="qrcode" :style="`left:${client.x}`">
          <uqrcode
              ref="uqrcode"
              canvas-id="qrcode"
              value="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=QHFxcHVycXV1dnIAMTFuIy8t"
              :options="{ margin: 10 }"
              :hide="qrcodeHide"
          ></uqrcode>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive, ref} from "vue";
/**
 * 二维码
 * */
const qrcodeHide = ref(true )
const client = reactive({
  x:'50%',
  y:0,
})
const qrcodeOpen = (e)=>{
  qrcodeHide.value = !qrcodeHide.value
}
</script>

<style scoped lang="scss">
@import "../src/uni";
.Personal-Information{
  width: 25%;
  min-width: 570rpx;
  padding: 50rpx;
  border-radius: 20rpx;
  //background: #e8bebe;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  max-height: 320rpx;
  .info-item{
    margin-bottom:15rpx;
    display: flex;
    justify-content: space-between;
  }
  .qrcode-box{
    position: relative;
    display: flex;
    align-items: center;
    .icon-qrcode{
      font-size: $icon-font-size;
      cursor: pointer;
    }
    .qrcode{
      position: absolute;
      left: 50%;
      border-radius: 20rpx;
      overflow: hidden;
      box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
    }
  }
}
</style>