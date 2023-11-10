<template>
  <view class="externalBox">
    <view
        class="content"
        v-for="item in 4"
        :style="`border-radius:${Math.random()*80+20}rpx/ ${Math.random()*80+10}rpx`"
    >
<!--      <skeleton
          style="width: 100%;"
          :loading="skeleton.loading"
          :row="skeleton.row"
          :showAvatar="skeleton.showAvatar"
          :showTitle="skeleton.showTitle"
          :titleWidth="skeleton.titleWidth"
          :showImage="skeleton.showImage"
      >
      </skeleton>-->
      <image src="/static/icon/headerico.png" class="title-icon" mode="aspectFill"></image>
      <view class="title">
        <view>
          <h1>
            <navigator url="" hover-class="navigator-hover">
              title
            </navigator>
          </h1>
        </view>
        <view>
          content
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {computed, onMounted, provide, reactive, ref} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo";
import Skeleton from '@/components/primewind-skeleton/components/skeleton/index.vue'
/**
 * 获取userInfo
 */
const store = useGetUserInfo()

/**
 * 骨架屏
 */
const skeleton =reactive({
  loading:false,
  row:5,
  showAvatar:false,
  showTitle:true,
  titleWidth: '20%',
  showImage:true
})
</script>

<style scoped lang="scss">
.externalBox {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rpx;
  flex-wrap: wrap;

  .content {
    margin-bottom: 40rpx;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    max-width: 1200px;
    width: 100%;
    box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
    overflow: hidden;
    .title-icon{
      width: 35%;
      margin-right: 50rpx;
    }
    .title{
      //font-size: 40rpx;
      line-height: 1.5;
    }
  }
}
</style>