<template>
  <view class="Personal-Information">
    <skeleton
        :loading="skeleton.infoLoading"
        :row="skeleton.infoRow"
        :showAvatar="skeleton.infoShowAvatar"
        :showTitle="skeleton.infoShowTitle"
        :titleWidth="skeleton.infoTitleWidth"
    >
      <view class="info-item">
        <view>Age :</view>
        <view>{{ cacheProps.age }}</view>
      </view>
      <view class="info-item">
        <view>Gender :</view>
        <view> {{ cacheProps.gender }}</view>
      </view>
      <view class="info-item">
        <view>Education :</view>
        <view> {{ cacheProps.education }} </view>
      </view>
      <view class="info-item">
        <view>Seniority :</view>
        <view>{{cacheProps.seniority}}</view>
      </view>
      <view class="info-item">
        <view>Address :</view>
        <view>{{ cacheProps.address }}</view>
      </view>
      <view class="info-item qrcode-box">
        <view>E-mail :</view>
        <view>
          <view class="iconfont icon-ico icon-qrcode" @mouseenter="qrcodeOpen" @mouseleave="qrcodeOpen"></view>
          <view class="qrcode" :style="`left:${client.x}`">
            <uqrcode
                ref="uqrcode"
                canvas-id="qrcode"
                :value="cacheProps.email"
                :options="{ margin: 10 }"
                :hide="qrcodeHide"
            ></uqrcode>
          </view>
        </view>
      </view>
    </skeleton>
  </view>
</template>

<script setup>
import Skeleton from '@/components/primewind-skeleton/components/skeleton/index.vue'
import {reactive, ref, watch} from "vue";

const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const cacheProps = ref({})
watch(()=>props.modelValue,(n,o)=>{
  if(n){
    skeleton.infoLoading=false
    cacheProps.value = n
  }
})

/**
 *  骨架屏
 */
const skeleton = reactive({
  infoLoading :true,
  infoRow: 5,
  infoShowAvatar: false,
  infoShowTitle: false,
  infoTitleWidth:'20%',
})

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
  //width: 25%;
  //min-width: 450rpx;
  padding: 50rpx;
  margin-bottom: 50rpx;
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