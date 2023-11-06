<template>
  <view class="top-header">
    <!--    left-->
    <skeleton
        :loading="skeleton.infoLoading"
        :row="skeleton.infoRow"
        :showAvatar="skeleton.infoShowAvatar"
        :showTitle="skeleton.infoShowTitle"
        :titleWidth="skeleton.infoTitleWidth"
    >
      <view class="left-info">
        <view class="icon">
          <image :src="store.userInfo.pic" mode="aspectFill" style="width: 100%;height: 100%"></image>
        </view>
        <view class="info">
          <view class="user">
            {{ store.userInfo.name }}
          </view>
          <view class="introduction">
            {{ store.userInfo.briefIntroduction }}
          </view>
        </view>
      </view>
    </skeleton>
    <!--    right-->
    <view class="right-btn">
      <!--      <view @click="eyeProtection" style="cursor: pointer">护眼</view>-->
    </view>
  </view>
</template>

<script setup>
import Skeleton from '@/components/primewind-skeleton/components/skeleton/index.vue'
import {inject, onMounted, reactive, watch} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo"

/**
 * pinia store
 */
const store = useGetUserInfo()


watch(() => store.userInfo, (n, o) => {
  if (n) {
    skeleton.infoLoading = false
  }
})
/**
 * 骨架屏
 */
const skeleton = reactive({
  infoLoading: true,
  infoRow: 3,
  infoShowAvatar: true,
  infoShowTitle: true,
  infoTitleWidth: '20%',
})
onMounted(()=>{
  if(store.userInfo){
    skeleton.infoLoading = false
  }
})
</script>

<style scoped lang="scss">
.top-header {
  width: 100%;
  height: 120rpx;
  padding-top: 100rpx;
  display: flex;
  justify-content: space-between;

  .left-info {
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
        text-shadow: 0 0 15rpx rgba(0, 0, 0, .8);
        font-size: 35rpx;
        //color: #c0c0c0;
        color: #fff;
      }
    }
  }

  .right-btn {

  }
}
</style>